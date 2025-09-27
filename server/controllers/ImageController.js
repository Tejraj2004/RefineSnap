//receive image from frontend written in AppContext.jsx bg removal function and remove the backend
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

const removeBgImage = async (req,res) =>{
    try {
        //get Image from frontend to backend for that we have to parse the form data , for which multer package(A Middleware) to be used
        const {clerkId} = req.body
        
        const user = await userModel.findOne({clerkId})

        if(!user){
            return res.json({success:false, message:'User Not Found'})
        }

        //if user having credit balance !=0  then only he can remove Background

        if(user.creditBalance == 0){
            return res.json({success:false,message:'No Credit Balance', creditBalance:user.creditBalance})
        }

        // if user having Credit Balance then first get the uploaded picture file path

        const imagePath = req.file.path;

        // Reading the Image File
        const imageFile = fs.createReadStream(imagePath)

        //To remove the background of pictures, request must be an POST request and body must be multipart form data

        const formData = new FormData()
        formData.append('image_file',imageFile)

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formData,{
            headers:{
                'x-api-key' : process.env.CLIPDROP_API
            },
            responseType : 'arraybuffer'
        })

        const base64Image = Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

        //for every result image deduct 1 credit for each successful bg removal

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})

        res.json({success:true, resultImage, creditBalance:user.creditBalance-1, message:'Background Removed'})


    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

export {removeBgImage}

