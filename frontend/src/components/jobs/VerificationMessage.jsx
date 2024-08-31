import { Link } from "react-router-dom";

const VerificationMessage = () => (
  <div className="bg-white rounded-md p-4 border">
    <h1 className="font-bold text-red-600 mb-2">Verify Your Account</h1>
    <p className="text-gray-500 font-light mb-2">
      To start posting jobs, please verify your email address and phone number. If you haven't
      received a verification code, check your spam folder or contact us for support.
    </p>
    <p className="text-gray-500 font-light">
      For assistance, reach out to us at{" "}
      <Link to="mailto:support@example.com" className="text-blue-600 underline">
        support@example.com
      </Link>
      .
    </p>
  </div>
);

export default VerificationMessage;
