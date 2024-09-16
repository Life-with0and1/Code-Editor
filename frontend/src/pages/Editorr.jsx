import React, { useEffect, useState } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";

function Editorr() {
  const [tab, setTab] = useState("html");
  const [title,setTitle] = useState("Title")
  const [htmlCode, setHtmlCode] = useState("<!-- Write HTML here -->");
  const [cssCode, setCssCode] = useState("/* Write CSS here */");
  const [jsCode, setJsCode] = useState("// Write JavaScript here");
  const { id } = useParams();
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const run = debounce(() => {
    const iframe = document.getElementById("output");
    const combinedCode = `
      ${htmlCode}
      <style>${cssCode}</style>
      <script>${jsCode}<\/script>
    `;
    iframe.srcdoc = combinedCode;
  }, 500);

  const fetchCode = async () => {
    const url = `http://localhost:3000/api/project/get${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: { token: token },
      });
      if (response.data.success) {
        setShowContent(true);
        const { title, htmlCode, cssCode, jsCode } = response.data.data;
        setHtmlCode(htmlCode || "<!-- Write HTML here -->");
        setCssCode(cssCode || "/* Write CSS here */");
        setJsCode(jsCode || "// Write JavaScript here");
        setTitle(title)
      } else {
        console.log("Error in fetching code");
        setShowContent(false);
      }
    } catch (error) {
      console.error("Error fetching code:", error);
    }
  };
  const updateProject = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/project/update/${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        url,
        { htmlCode, cssCode, jsCode },
        {
          headers: { token: token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error("rror updating code");
      }
    } catch (error) {
      console.error("Error updating code:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCode();
    }
  }, [id]);

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div
      className={`bg-black
       w-screen h-screen overflow-hidden`}
    >
      {showContent ? (
        <div>
          <EditorNavbar title={title} />
          <div className="flex sm:flex-col lg:flex-row h-[calc(100vh-80px)]">
            <div className="left lg:w-[50%] sm:w-full sm:h-[50%] lg:h-full">
              <div
                className={`flex items-center justify-between w-full text-white h-[50px] px-[40px] bg-[#1a191996] text-white`}
              >
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setTab("html")}
                    className={`tab p-[6px] bg-[#1e1e1e] px-[12px] text-[15px] cursor-pointer ${
                      tab === "html" ? "bg-[#333]" : ""
                    }`}
                  >
                    HTML
                  </div>
                  <div
                    onClick={() => setTab("css")}
                    className={`tab p-[6px] bg-[#1E1E1E] px-[12px] text-[15px] cursor-pointer ${
                      tab === "css" ? "bg-[#333]" : ""
                    }`}
                  >
                    CSS
                  </div>
                  <div
                    onClick={() => setTab("javascript")}
                    className={`tab p-[6px] bg-[#1E1E1E] px-[12px] text-[15px] cursor-pointer ${
                      tab === "javascript" ? "bg-[#333]" : ""
                    }`}
                  >
                    JavaScript
                  </div>
                </div>

                <div
                  onClick={updateProject}
                  className={`tab p-[6px] bg-[#1E1E1E] px-[12px] text-[15px] cursor-pointer`}
                >
                  Save code
                </div>
              </div>

              {tab === "html" ? (
                <Editor
                  height="calc(100% - 50px)"
                  className="h-full"
                  onChange={(value) =>
                    setHtmlCode(value || "<!-- Write HTML here -->")
                  }
                  language="html"
                  theme="vs-dark"
                  value={htmlCode}
                />
              ) : tab === "css" ? (
                <Editor
                  height="calc(100% - 50px)"
                  onChange={(value) =>
                    setCssCode(value || "/* Write CSS here */")
                  }
                  className="h-full"
                  language="css"
                 theme="vs-dark"
                  value={cssCode}
                />
              ) : (
                <Editor
                  height="calc(100% - 50px)"
                  onChange={(value) =>
                    setJsCode(value || "// Write JavaScript here")
                  }
                  className="h-full"
                  language="javascript"
                  theme="vs-dark"
                  value={jsCode}
                />
              )}
            </div>
            <iframe
              className="lg:w-[50%] sm:w-full lg:order-last sm:order-first sm:h-[50%] lg:h-full bg-[#fff]"
              id="output"
            />
          </div>
        </div>
      ) : (
        <h1>Invalid access</h1>
      )}
    </div>
  );
}

export default Editorr;
