import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="card w-80 space-y-4">
          <h1 className="text-9xl font-bold">HABITS</h1>
          <h1 className="text-xl font-bold">Log In</h1>
          <button className="btn btn-primary w-full" onClick={handleLogin}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
