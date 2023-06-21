import React, { useEffect } from "react";
import axios from "axios";
import { detectFileType } from "./DetectFileType.js";

function Test() {
  const reader = new FileReader();
  reader.onloadend = async function () {
    const fileType = detectFileType(reader.result);
    const base64Data = btoa(reader.result);
    sendDataToServer(base64Data);
  };

  //Sending data to server ;
  const sendDataToServer = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/data", data);
      console.log(response);
    } catch (error) {
      console.log("Error occurred while uploading ..");
    }
  };

  //handling file uploads
  const handleFileUpload = (e) => {
    reader.readAsArrayBuffer(e.target.files[0]);
  };
  useEffect(() => {
    const input = document.querySelector("input");
    const btn = document.querySelector("button");
    input.addEventListener("change", handleFileUpload);
  }, []);

  return (
    <>
      <input type="file" />
    </>
  );
}

export default Test;
