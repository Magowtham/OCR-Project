import react, { useEffect } from "react";
import { io } from "socket.io-client";

function ClientWebSocket() {
  const socket = io.connect("http://localhost:5000");

  socket.onopen = () => {
    console.log("connection was established ");
  };
  const sendData = () => {
    socket.send("hey iam react");
  };

  socket.on("message", (message) => {
    console.log(message);
  });

  useEffect(() => {
    const btn = document.querySelector("button");
    btn.addEventListener("click", sendData);
  }, []);

  return (
    <>
      <h1>WEBSCOKET CONNECTION</h1>
      <button>send</button>
    </>
  );
}

export default ClientWebSocket;
