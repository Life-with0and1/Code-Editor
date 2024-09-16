import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const url = "http://localhost:3000/api";
  const [showDelete, setShowDelete] = useState(false);
  const [userData, setUserData] = useState([]);
  const [listCard, setListCard] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filtering the projects based on search input
  const filteredData = projects
    ? projects.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const fetchingData = async (token) => {
    let newUrl = `${url}/project/fetch`;
    try {
      const response = await axios.get(newUrl, {
        headers: {
          token: token,
        },
      });
      if (response.data.success) {
        setProjects(response.data.data);
        setUserData(response.data.name);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const deleteProject = async (id) => {
    let newUrl = `${url}/project/delete/${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(newUrl, {
        headers: {
          token: token,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchingData(token);
      }
    } catch (error) {
      console.error("Error deleting projects:", error);
    }
  };

  const createnewProject = async (e) => {
    e.preventDefault();
    let newUrl = `${url}/project/create`;
    const token = localStorage.getItem("token");
    const response = await axios.post(
      newUrl,
      { title },
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setShowDelete(false);
      fetchingData(token);
      setTitle("");
      navigate(`/editor/${response.data.data._id}`);
    } else toast.error("Error while creating project.");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setLoggedIn(false);
    else {
      setLoggedIn(true);
      fetchingData(token);
    }
  }, []);

  return (
    <div className="bg-black w-screen min-h-screen overflow-x-hidden">
      {loggedIn ? (
        <div>
          <Navbar userData={userData} listCard={listCard} setListCard={setListCard} />
          <div className="flex items-center justify-between px-[100px] py-[40px]">
            <h2 className="text-white text-3xl">Hi, {userData} 👋</h2>
            <div className="flex gap-2">
              <input
                onChange={(e) => setSearch(e.target.value)} 
                value={search}
                className="font-semibold rounded-md  px-7  py-2 text-gray-100 outline-none bg-[#141414]  placeholder-gray-100 "
                type="text"
                placeholder="Search here..."
              />
              <img
                onClick={() => setShowDelete(true)}
                className="cursor-pointer"
                width="40"
                height="30"
                src="https://img.icons8.com/ios/50/FFFFFF/add-folder--v1.png"
                alt="add-folder--v1"
              />
            </div>
          </div>
          <div className="cards px-[100px]">
            {listCard ? (
              filteredData.map((item, index) => (
                <ListCard
                  key={index}
                  item={item}
                  index={index}
                  deleteProject={deleteProject}
                />
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredData.map((item, index) => (
                  <GridCard
                    key={index}
                    item={item}
                    index={index}
                    deleteProject={deleteProject}
                  />
                ))}
              </div>
            )}
          </div>
          {showDelete ? (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
              <div className="w-[90vw] sm:w-[60vw] lg:w-[35vw] h-auto p-6 bg-[#1f1f1f] gap-6 rounded-lg flex flex-col justify-center items-center shadow-lg">
                <h3 className="text-xl sm:text-2xl lg:text-3xl text-center text-white mb-4">
                  Create New Project
                </h3>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter project name"
                  className="w-full p-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:text-blue-700 font-semibold focus:ring-indigo-500  placeholder-gray-700"
                />
                <div className="flex gap-4 mt-6 w-full justify-center">
                  <button
                    onClick={() => setShowDelete(false)}
                    className="w-1/3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createnewProject}
                    className="w-1/3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="text-white text-center text-3xl">Please log in</div>
      )}
    </div>
  );
}

export default Home;
