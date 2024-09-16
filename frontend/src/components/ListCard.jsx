import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function ListCard({ item, index, deleteProject }) {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate()

  return (
    <div  className="w-full flex items-center justify-between bg-[#141414] mb-[10px] p-[10px] rounded-lg  hover:bg-[#202020]">
      {item ? (
        <>
          <div className="flex items-center gap-2">
            <img
            style={{cursor:"pointer"}}
            onClick={()=>navigate(`/editor/${item._id}`)}
              width="80"
              height="80"
              src="https://img.icons8.com/arcade/64/code.png"
              alt="code"
            />
            <div className="flex flex-col">
              <h3  onClick={()=>navigate(`/editor/${item._id}`)} className="text-lg cursor-pointer text-white">{item.title ? item.title : "Title"}</h3>
              <p className="text-[gray] text-sm">
                {format(new Date(item.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="mr-3">
            <svg
              onClick={() => setShowDelete(true)}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 300 300"
              className="cursor-pointer"
            >
              <g
                fill="#fa5252"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <g transform="scale(9.84615,9.84615)">
                  <path d="M11,-0.03125c-0.83594,0 -1.65625,0.16406 -2.25,0.75c-0.59375,0.58594 -0.78125,1.41797 -0.78125,2.28125h-3.96875c-0.55078,0 -1,0.44922 -1,1h-1v2h22v-2h-1c0,-0.55078 -0.44922,-1 -1,-1h-3.96875c0,-0.86328 -0.1875,-1.69531 -0.78125,-2.28125c-0.59375,-0.58594 -1.41406,-0.75 -2.25,-0.75zM11,2.03125h4c0.54688,0 0.71875,0.12891 0.78125,0.1875c0.0625,0.05859 0.1875,0.22266 0.1875,0.78125h-5.9375c0,-0.55859 0.125,-0.72266 0.1875,-0.78125c0.0625,-0.05859 0.23438,-0.1875 0.78125,-0.1875zM4,7v16c0,1.65234 1.34766,3 3,3h12c1.65234,0 3,-1.34766 3,-3v-16zM8,10h2v12h-2zM12,10h2v12h-2zM16,10h2v12h-2z"></path>
                </g>
              </g>
            </svg>
          </div>

          {showDelete && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
              <div className="w-[90vw] sm:w-[50vw] lg:w-[30vw] p-6 bg-[#141414] gap-6 rounded-lg flex flex-col justify-center items-center">
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
          )}
        </>
      ) : (
        <p>No project</p>
      )}
    </div>
  );
}

export default ListCard;
