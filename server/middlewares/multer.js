import multer from "multer";

//creating multer middleware for parsing formdata
const storage = multer.diskStorage({
    filename: function(re,file,callback){
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})
//Name of middleware is upload
const upload = multer({storage})

export default upload 
