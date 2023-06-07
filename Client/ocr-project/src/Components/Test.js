import  React from "react";
import axios from "axios"

function Test(){
    const fileUploader=(eventData)=>{
        const file=eventData.target.files[0];
        const formData=new FormData();
        formData.append('file',file);

        //sending the uplaoded file to server by using axios rout handler
        axios.post('/upload',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
    }
return(
    <>
       <input type="file" onChange={fileUploader} />
    </>
)
}

export default Test;