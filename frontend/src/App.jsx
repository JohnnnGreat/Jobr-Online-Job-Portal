import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./layout/Header";
import { ToastContainer } from "react-toastify";
import useWebSocket from "react-use-websocket";
import { useEmployer } from "./contexts/employerContext";
import { employerAxiosInstance } from "./axiosInstance";

function App() {
  const isLoggedIn = useLoaderData();
  const WS_URL = "ws://localhost:8080";
  const { refreshEmployer } = useEmployer();
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      const id = data.documentKey._id;
      (async function () {
        const response = await employerAxiosInstance.get(`/getemployer/${id}`);
        refreshEmployer(response.data);
      })();
    },
  });

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div>
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
