import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./layout/Header";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoggedIn = useLoaderData();

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
