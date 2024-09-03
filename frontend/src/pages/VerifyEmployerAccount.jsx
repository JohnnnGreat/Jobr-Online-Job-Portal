/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEmployer } from "../contexts/employerContext";
import { employerAxiosInstance } from "../axiosInstance";

const VerifyEmployerAccount = () => {
  const { token } = useParams(); // Get the token from the URL
  const [message, setMessage] = useState("Verifying your account...");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshEmployer } = useEmployer();
  useEffect(() => {
    const verifyAccount = async () => {
      const res = await employerAxiosInstance.get(`/verify/${token}`);
      await toast.success("Account Verified Successfully");
      refreshEmployer(res.data.user);
      navigate("/employer/dashboard");
    };

    verifyAccount();
  }, [navigate, refreshEmployer, token]);

  return (
    <div className="verification-container">
      <h2>Account Verification</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyEmployerAccount;
