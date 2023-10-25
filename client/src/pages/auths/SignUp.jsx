import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../../components/Oauth";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="py-20 px-8 mx-auto max-w-lg">
        <h1 className="font-bold text-center text-3xl my-4">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="focus:outline-none border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="focus:outline-none border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="focus:outline-none border p-3 rounded-lg"
          />
          <button
            disabled={loading}
            className="p-3 bg-green-800 text-white rounded-lg uppercase font-bold mt-5"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <Oauth />
        </form>

        <div className="flex font-semibold items-center gap-2">
          <p className="text-black">Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-900">Sign In</span>
          </Link>
        </div>

        {error && (
          <>
            <p className="font-medium text-sm p-2 text-center rounded-sm bg-white/60 text-red-600">{error}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
