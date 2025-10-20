import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { SignupInput } from "@tufail2000/blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    userName: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      //alert the user that the request failed
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center ">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signup"
                ? "Alredy have an account! "
                : "Don't have an account "}
              <Link
                className="pt-2 underline "
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Sign-In" : "Sign-Up"}
              </Link>
            </div>
          </div>
          <div className="pt-8 ">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="john..."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Username"
              placeholder="john001"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  userName: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="Password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-8 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 hover:cursor-pointer dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type == "signup" ? "Sign-Up" : "Sign-In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block text-sm text-black font-semibold pt-3">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full  p-2 h-8  placeholder-gray-400 placeholder:italic"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
