import React from "react";
import { toggleClass } from "../helper.js";
import { useNavigate } from "react-router-dom";

function Navbar({ userData, listCard, setListCard }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully.");
  };
  return (
    <div className="flex justify-between items-center bg-[#141414] w-screen h-20 px-20">
      <div className=" left flex  gap-2 ">
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
            width: "50px",
            height: "40px",
          }}
          xml:space="preserve"
        >
          <g>
            <path d="M44.97,12.84h-17.2L0,49.37L27.77,85.9h17.2L17.2,49.37L44.97,12.84L44.97,12.84z M77.91,12.84h17.2l27.77,36.53 L95.11,85.9h-17.2l27.77-36.53L77.91,12.84L77.91,12.84z M70.17,0.04l5.96,1.39c0.94,0.22,1.52,1.16,1.31,2.1l-22.5,96.69 c-0.22,0.93-1.16,1.52-2.1,1.31l-5.95-1.39c-0.94-0.22-1.52-1.16-1.31-2.1l22.5-96.69C68.3,0.42,69.24-0.17,70.17,0.04L70.17,0.04 L70.17,0.04z" />
          </g>
        </svg>
        <p className="text-white text-sm mt-1 font-semibold items-start">
          Just <span className="text-blue-700">code</span> it.
        </p>
      </div>
      <div className="flex items-center text-slate-200 gap-14 text-md">
        <p className="hidden lg:block cursor-pointer hover:text-slate-400  font-thin">
          Home
        </p>
        <p className=" hidden lg:block cursor-pointer hover:text-slate-400 font-thin">
          About
        </p>
        <p className=" hidden  lg:block cursor-pointer hover:text-slate-400 font-thin mr-4">
          Contact
        </p>
        <div
          onClick={() => {
            toggleClass(".dropDown", "hidden");
          }}
          className=" rounded-full bg-violet-500 w-10 h-10 cursor-pointer mr-[-14px] flex justify-center text-black text-lg font-semibold items-center"
        >
          {typeof userData === "string" && userData.length > 0
            ? userData.charAt(0).toUpperCase()
            : "A"}
        </div>
      </div>
      <div className="dropDown hidden absolute rounded-tl-[40px] rounded-b-xl w-[150px] h-[150px] p-[10px] bg-[#1A1919]/90 top-[80px] right-[70px]">
        <div className="py-[10px] border-b-[1px] border-b-[#ffffff71] flex items-center justify-center">
          <h3 className="text-white text-[16px]">{userData}</h3>
        </div>
        <div className="flex flex-col mt-3 "></div>

        {listCard ? (
          <div className="flex gap-2 items-center mb-2 px-2">
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/health-data.png"
              alt="health-data"
            />

            <p
              onClick={() => setListCard(!listCard)}
              className="text-white text-[14px] cursor-pointer "
            >
              Grid
            </p>
          </div>
        ) : (
          <div className="flex gap-2 items-center mb-2 px-2">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/list.png"
              alt="list"
            />
            <p
              onClick={() => setListCard(!listCard)}
              className="text-white text-[14px] cursor-pointer "
            >
              List
            </p>
          </div>
        )}
        <div className="flex gap-2 items-center mb-2 px-2.5">
          <img
            width="15"
            height="15"
            src="https://img.icons8.com/ios/50/FFFFFF/exit--v1.png"
            alt="exit--v1"
          />
          <p
            onClick={logout}
            className="text-white text-[14px] cursor-pointer "
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
