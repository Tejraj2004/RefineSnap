import { createContext } from "react";
import { useState } from "react";

import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    
    const [credit, setCredit] = useState(0);
    const [image, setImage] = useState(false);//to store the image to be uploaded in image state, initially it is false
    const [resultImage, setResultImage] = useState(false)// to store the resultant image that is the removed background image and for that we also have to call backend apis to clear the background


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const {getToken} = useAuth()
    const {isSignedIn} = useUser()
    const {openSignIn} = useClerk()

    const loadCreditsData = async () => {
        try {
            const token = await getToken()//get the token generated which authenticates the user
            const {data} = await axios.get(backendUrl+'/api/user/credits',{headers:{token}})
            if(data.success){
                setCredit(data.credits)
                console.log(data.credits)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeBg = async (image) =>{
        try {
            if(!isSignedIn){//open Sign In pop up if not yet signed In
                return openSignIn()
            }
            setImage(image)
            setResultImage(false)

            //Navigate user to result page after the user uploads an image so, that he can see the resultant image 
            navigate('/result')

            const token = await getToken()

            //create form data where we will send image to backend which will be again processed by backend i.e will  remove background
            const formData = new FormData()
            image && formData.append('image',image)

            const {data} = await axios.post(backendUrl+'/api/image/remove-bg',formData,{headers:{token}})
            if(data.success){// if data is success means the background has been removed and now we will store the remove BG Image in resultImage
                setResultImage(data.resultImage)
                if (data.creditBalance !== undefined) 
                    {
                        setCredit(data.creditBalance)
                    }

                // data.creditBalance && setCredit(data.creditBalance)

            } else{
                toast.error(data.message)
               if (data.creditBalance !== undefined) 
                {
                    setCredit(data.creditBalance)
                }
            // data.creditBalance && setCredit(data.creditBalance)

                if(data.creditBalance === 0){
                    navigate('/buy')
                }

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
        credit,setCredit,
        loadCreditsData,
        backendUrl,
        image,setImage,
        removeBg,resultImage,
        setResultImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
