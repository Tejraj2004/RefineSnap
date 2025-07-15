import {Webhook} from 'svix'
import userModel from '../models/userModel.js'

// API Controller function to Manage Clerk User with database
//http:localhost:4000/api/user/webhooks
const clerkWebhooks = async (requestAnimationFrame,res)=>{
    try {
        //  Create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(requestAnimationFrame.body),{
            "svix-id":requestAnimationFrame.headers["svix-id"],
            "svix-timestamp":requestAnimationFrame.headers["svix-timestamp"],
            "svix-signature":requestAnimationFrame.headers["svix-signature"]
        })

        const {data, type} = req.body

        switch (type) {
            case "user.created":{

                const userData = {
                    clerkId: data.id,
                    email:data.email_address[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,

                }

                await userModel.create(userData)
                res.json({})

                break;
            }
            
            case "user.updated":{

                const userData = {
                    email:data.email_address[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,

                }
                await userModel.findOneAndUpdate({clerkId:data.id},userData)
                res.json({})

                break;
            }

            case "user.deleted":{

                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})
                break;
            }
        
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
export {clerkWebhooks}