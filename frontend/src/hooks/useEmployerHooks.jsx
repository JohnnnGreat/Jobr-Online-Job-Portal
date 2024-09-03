import { useEffect } from "react";
import { useState } from "react";
import { useEmployer } from "../contexts/employerContext";

export const useEmployerHooks = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const WS_URL = "ws://127.0.0.1:8080";
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      console.log("Message received:", event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      console.log(socket);
      ws.close();
    };
  }, [WS_URL]);

  return { socket, messages };
};
