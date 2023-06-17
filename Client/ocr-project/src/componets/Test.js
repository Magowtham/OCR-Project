import React, { useEffect } from "react";
import axios from "axios";
import { detectFileType } from "./DetectFileType.js";

function Test() {
  const reader = new FileReader();
  reader.onloadend = async function () {
    const fileType = detectFileType(reader.result);
    splitDataToChunk(reader.result, fileType);
  };

  //spliting of the data to chunk
  const splitDataToChunk = async (bufferFile, fileType) => {
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
      sendDataTOServer(chunk, 3, 0);
    }
  };

  //Sending data to server ;
  const sendDataTOServer = async (chunk, numRetry, retryAttempt) => {
    try {
      const response = await axios.post("", chunk);
      if (response.status != 200) {
        if (retryAttempt < numRetry) {
          retryAttempt++;
          setTimeout(() => {
            sendDataTOServer(chunk, numRetry, retryAttempt);
          }, calculateRetryDelay(retryAttempt));
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //calculating the time delay
  const calculateRetryDelay = (retryAttempt) => {
    const baseDelay = 100;
    const factor = 2;
    return baseDelay * Math.pow(factor, retryAttempt);
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
