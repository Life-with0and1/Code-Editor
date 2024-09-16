import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function GridCard({ item, index, deleteProject }) {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-[#141414] w-[270px] h-[180px]  m-2 hover:bg-[#202020] px-2 rounded-lg">
      <div>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/editor/${item._id}`)}
          width="100"
          height="100"
          src="https://img.icons8.com/arcade/64/code.png"
          alt="code"
        />
        <div className="flex flex-col px-6 mt-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
            <h3
              onClick={() => navigate(`/editor/${item._id}`)}
              className="text-lg cursor-pointer text-white w-[100%] overflow-hidden text-ellipsis whitespace-nowrap"
              style={{
                maxWidth: "250px",
              }}
            >
              {item.title ? item.title : "Title"}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[gray] px-3 text-sm">
              {format(new Date(item.createdAt), "MMM dd, yyyy")}
            </p>
            <div className="mr-3">
              <svg
                onClick={() => setShowDelete(true)}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 300 300"
              >
                <g
                  fill="#fa5252"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(9.84615,9.84615)">
                    <path d="M11,-0.03125c-0.83594,0 -1.65625,0.16406 -2.25,0.75c-0.59375,0.58594 -0.78125,1.41797 -0.78125,2.28125h-3.96875c-0.55078,0 -1,0.44922 -1,1h-1v2h22v-2h-1c0,-0.55078 -0.44922,-1 -1,-1h-3.96875c0,-0.86328 -0.1875,-1.69531 -0.78125,-2.28125c-0.59375,-0.58594 -1.41406,-0.75 -2.25,-0.75zM11,2.03125h4c0.54688,0 0.71875,0.12891 0.78125,0.1875c0.0625,0.05859 0.1875,0.22266 0.1875,0.78125h-5.9375c0,-0.55859 0.125,-0.72266 0.1875,-0.78125c0.0625,-0.05859 0.23438,-0.1875 0.78125,-0.1875zM4,7v16c0,1.65234 1.34766,3 3,3h12c1.65234,0 3,-1.34766 3,-3v-16zM8,10h2v12h-2zM12,10h2v12h-2zM16,10h2v12h-2z"></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showDelete ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center flex-col">
          <div className="w-[90vw] sm:w-[50vw] lg:w-[30vw] h-35vw p-6 bg-[#141414] gap-6 rounded-lg flex flex-col justify-center items-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl text-center text-white">
              Do you want to delete this project?
            </h3>
            <div className="flex gap-5 mt-4">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProject(item._id);
                  setShowDelete(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GridCard;
