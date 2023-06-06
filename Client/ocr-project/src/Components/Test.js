import  React from "react";
import axios from "axios"

function Test(){
    const fileUploader=(eventData)=>{
        const file=eventData.target.files[0];
        const formData=new FormData();
        formData.append('file',file);

        axios.post('/upload',formData).then((response)=>{

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