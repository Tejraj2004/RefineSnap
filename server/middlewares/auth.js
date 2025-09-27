import jwt from 'jsonwebtoken'

//Middlewares function to decode jwt token to get clerkid

const authUser = async (req,res,next) =>{
    try {
        const {token} = req.headers //in the header give the token to get details of user, postman check

        if(!token) {
            return res.json({success:false, message:'Not Authorised Login Again'})
        }

        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId //clerkId present in token_decode
        next() //to execute next code
    } catch (error) {
         console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export default authUser