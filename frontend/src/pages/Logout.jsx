import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("user");
  navigate("/");
};

export default Logout;
