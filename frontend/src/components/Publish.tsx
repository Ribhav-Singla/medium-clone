import axios from "axios";
import { BACKEND_URL } from "../config";
import { Appbar } from "./Appbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full mt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="email"
            id="helper-text"
            className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              navigate(`/blog/${response.data.id}`);
            }}
            type="button"
            className="text-white mt-4 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-10 bg-blue-600"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
    onChange : (e: ChangeEvent<HTMLInputElement>)=> void;
}) {
  return (
    <div>
      <textarea
        onChange={onChange}
        className="bg-gray-50 w-full border border-1 focus:outline-none rounded-md p-3 mt-4"
        rows={15}
        placeholder="content..."
      ></textarea>
    </div>
  );
}
