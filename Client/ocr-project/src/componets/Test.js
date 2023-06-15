import React, { useEffect } from "react";
import axios from "axios";
import { detectFileType } from "./DetectFileType.js";

function Test() {
  const reader = new FileReader();
  reader.onloadend = async function () {
    const fileType = detectFileType(reader.result);
    sendData(reader.result, fileType);
  };

  //function to send the data to node js server
  const sendData = async (bufferFile, fileType) => {
    const headers = {
      "Content-Type": "application/octet-stream",
      fileType,
    };
    const chunkSize = 1024 * 1024;
    const totalChunks = Math.ceil(bufferFile.byteLength / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, bufferFile.byteLength);
      const chunk = bufferFile.slice(start, end);

      axios
        .post("http://localhost:5000/data", chunk, { headers })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(`Erorr ocurred at the react ${err}`);
        });
    }
  };

  //handling file uploads
  const handleFileUpload = (e) => {
    reader.readAsArrayBuffer(e.target.files[0]);
  };
  useEffect(() => {
    const input = document.querySelector("input");
    input.addEventListener("change", handleFileUpload);
  }, []);
  return (
    <>
      <input type="file" />
    </>
  );
}

export default Test;
