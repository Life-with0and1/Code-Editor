import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({setToken}) {
  const url = "https://code-editor-0cr9.onrender.com/api/auth";
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");


  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        let response;
        const newUrl = `${url}/register`;
        response = await axios.post(newUrl, data);
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          navigate("/home");
        } else toast.error(response.data.message);
      } else {
        let response;
        const newUrl = `${url}/login`;
        response = await axios.post(newUrl, data);
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          navigate("/home");
        } else toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-screen overflow-hidden  lg:gap-x-36 bg-black h-screen flex flex-col lg:flex-row  items-center justify-center">
      <div className="left sm:h-1/4 sm:mt-[-150px] lg:mt-[-70px] flex flex-col lg:gap-4">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 122.88 101.57"
          style={{
            fill: "rgb(29 78 216 / var(--tw-bg-opacity))",
            width: "100px",
            height: "100px",
          }}
          xml:space="preserve"
        >
          <g>
            <path d="M44.97,12.84h-17.2L0,49.37L27.77,85.9h17.2L17.2,49.37L44.97,12.84L44.97,12.84z M77.91,12.84h17.2l27.77,36.53 L95.11,85.9h-17.2l27.77-36.53L77.91,12.84L77.91,12.84z M70.17,0.04l5.96,1.39c0.94,0.22,1.52,1.16,1.31,2.1l-22.5,96.69 c-0.22,0.93-1.16,1.52-2.1,1.31l-5.95-1.39c-0.94-0.22-1.52-1.16-1.31-2.1l22.5-96.69C68.3,0.42,69.24-0.17,70.17,0.04L70.17,0.04 L70.17,0.04z" />
          </g>
        </svg>
        <p className="text-white tracking-tight text-5xl text">
          Your own{" "}
          <span className="tracking-tighter text-blue-700 font-extrabold">
            Development
          </span>{" "}
          kit.
        </p>
      </div>
      <div className="right sm:mt-[-200px] lg:mt-0">
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center rounded-2xl items-center gap-10 px-16 py-10 border border-[#3f3f3f00] bg-[#3f3f3f4f] "
        >
          <h2 className="text-2xl font-medium leading-1 text-white">{state}</h2>
          {state === "Sign Up" ? (
            <input
              name="name"
              value={data.name}
              onChange={changeHandler}
              className="font-semibold px-3 py-1 outline-none bg-slate-100 focus:bg-[#b4bbff] placeholder-gray-500 focus:text-blue-700"
              required
              type="text"
              placeholder="Name"
            />
          ) : (
            <></>
          )}

          <input
            className="font-semibold px-3 py-1 outline-none bg-slate-100 focus:bg-[#b4bbff] placeholder-gray-500 focus:placeholder-gray-700 text-black focus:text-blue-700"
            required
            name="email"
            value={data.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email"
          />
          <input
            className="font-semibold px-3 py-1 outline-none bg-slate-100 placeholder-gray-700 focus:bg-[#b4bbff] focus:text-blue-700 text-black"
            required
            name="password"
            value={data.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />

          <button
            className="bg-blue-700 text-white rounded-md font-semibold w-full py-2"
            type="submit"
          >
            {state}
          </button>
          {state === "Sign Up" ? (
            <p className="text-white text-sm font-light">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className=" font-medium cursor-pointer text-blue-500"
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-white text-sm font-light">
              Not having an account yet?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className=" font-medium cursor-pointer text-blue-500"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
