import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInError,
  signInSuccess,
} from "../../redux/user/UserSlice";
import Oauth from "../../components/Oauth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //extract data
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(signInError(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="py-20 px-8 mx-auto max-w-lg">
        <h1 className="font-bold text-center text-3xl my-4">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <Oauth />
        </form>

        <div className="flex font-semibold items-center gap-2">
          <p className="text-black">Dont have an account?</p>
          <Link to="/signup">
            <span className="text-blue-900">Sign Up</span>
          </Link>
        </div>

        {error && (
          <>
            <p className="font-medium text-sm p-2 text-center rounded-sm bg-white/60 text-red-600">
              {error}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
