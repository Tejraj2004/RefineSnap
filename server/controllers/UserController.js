import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import transactionModel from "../models/TransactionModel.js";


// API Controller function to Manage Clerk User with database
//http:localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
  try {
    //  Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        res.json({});

        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});

        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API controller function to get user available credits data
const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    // const clerkId = req.headers.token;
    const userData = await userModel.findOne({ clerkId });
    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//gateway Initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API to make payment for credits
const paymentRazorpay = async (req, res) => {
  try {
    //get ClerkId and planId from req.body
    const { clerkId, planId } = req.body;
    const userData = await userModel.findOne({ clerkId });
    if (!userData || !planId) {
      res.json({ success: false, message: "Invalid Credentials" });
    }

    let credits, plan, amount, date;
    //for different plans we will change the values
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        break;
    }

    date = Date.now()
    // creating Transaction which will be saved into mongodb database using the transaction models schema

    const transactionData = {
        clerkId,
        plan,
        amount,
        credits,
        date
    };

    const newTransaction = await transactionModel.create(transactionData)

    //create a razorpay order

//Razorpay expects amount in the smallest unit (paise for INR) — amount * 100 is correct only if amount is in rupees and currency is INR.

//receipt should be a string (use newTransaction._id.toString()).

//If order creation succeeds, backend responds with { success: true, order }.

    const options = {
        amount : amount * 100,
        currency: process.env.CURRENCY,
        //receipt auto generated within mongodb 
        receipt: newTransaction._id
    }
    
    await razorpayInstance.orders.create(options,(error, order)=>{
        if(error){
            return res.json({success:false,message:error})
        }
        //response being sent to frontend to respond accordingly i.e by creating a razorpay checkout
        res.json({success:true,order})
    })

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API Controller function to verify razorpay payment and accordingly update credits
const verifyRazorpay = async (req,res) =>{
  try {
    //get razorpay order id generated in console 
    const {razorpay_order_id} = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status === 'paid'){
      const transactionData = await transactionModel.findById(orderInfo.receipt)
      if(transactionData.payment){
        return res.json({success:false, message:'Payment Failed'})
      }

      //Adding Credits in user Data
      const userData = await userModel.findOne({clerkId: transactionData.clerkId})
      const creditBalance = userData.creditBalance + transactionData.credits
      await userModel.findByIdAndUpdate(userData._id,{creditBalance} )
    }

    // making the payment true
    await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})
    res.json({success: true, message:"Credits Added"});

  } catch (error) {
     console.log(error.message);
    res.json({ success: false, message: error.message });

  }
}

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay};
