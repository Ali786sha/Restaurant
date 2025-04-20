import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
        navigate("/");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    logout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center text-xl">
      Logging you out...
    </div>
  );
}
