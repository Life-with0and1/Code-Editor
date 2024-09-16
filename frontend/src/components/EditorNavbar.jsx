import React from "react";
import { Link } from "react-router-dom";

function EditorNavbar({title}) {
  return (
    <div
      className={`flex  justify-between items-center 
       bg-[#1a191996] text-white
       w-screen h-20 px-20`}
    >
      {" "}
      <Link to={"/home"}>
        <div className=" left flex  gap-2 ">
          <svg
            className="cursor-pointer"
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

          <p className="text-white text-sm mt-1 cursor-pointer font-semibold items-start">
            Just <span className="text-blue-700">code</span> it.
          </p>
        </div>
      </Link>
      <p className="text-slate-100">
        File /{" "}
        <span className="text-sm font-semibold text-[gray]">
          {title}
        </span>
      </p>
      <img
        className="cursor-pointer"
        width="17"
        height="17"
        src="https://img.icons8.com/tiny-glyph/16/FFFFFF/downloading-updates.png"
        alt="downloading-updates"
      />
    </div>
  );
}

export default EditorNavbar;
