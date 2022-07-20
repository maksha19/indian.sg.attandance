import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import footerImage from "./footerImage.jpeg";
import header from "./header.png";

function App() {
  const [registrationId, setRegistrationId] = useState("");
  const [name, setName] = useState("Enter your registration number");
  const [showSuccess, setShowSuccess] = useState(false);

  const inputOnChange = (e: any) => {
    console.log(e);
    setRegistrationId(e);
  };

  const submitRequest = async () => {
    const url =
      "https://script.google.com/macros/s/AKfycbyQstp77AxQ5qyw9yIPcLs67Kf8PAmjkaw_lF5QY6LUIrQYgaQwQLE-cLPzsxQ9zyfV/exec";
    const response = await axios.post(
      url,
      { id: registrationId.toLowerCase() },
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );

    if (response.status === 200) {
      const statusCode = response.data.statusCode;
      if (statusCode === "202") {
        setShowSuccess(true);
        setInterval(() => {
          setShowSuccess(false);
        }, 2000);
      } else if (statusCode === "208") {
        setName("Already Register !");
      } else if (statusCode === "404") {
        setName("Record not found !");
      }
      setInterval(() => {
        setName("Enter your registration number");
      }, 2000);
    }
    setRegistrationId("");
  };

  return (
    <div className="container mx-auto grid min-h-screen bg-dark-green">
      <div className="grid justify-items-center">
        <img src={header} alt="image" />
      </div>
      <div className="grid my-12 grid-cols-6 gap-4 ">
        <div className="col-start-2 col-span-4">
          <span className="text-white font-bold">{name}</span>
          <div className="flex flex-col">
            <input
              className="border-4 lowercase my-4 h-12 border-bt-bg-color"
              onChange={(e) => inputOnChange(e.target.value)}
              value={registrationId}
            />
            <div className="flex justify-center">
              <button
                className="bg-bt-bg-color text-bt-text-color font-bold w-auto py-2 px-4 m-4 rounded"
                onClick={() => submitRequest()}
              >
                Submit
              </button>
            </div>
            {/* <div className="flex text-white justify-center">
              <span>{name}</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="grid justify-items-center bg-white">
        <img src={footerImage} alt="image" />
      </div>
      {showSuccess && (
        <div>
          <div className="container">
            <div className="action">
              <div className="trophy">
                <svg
                  fill="#FFD600"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                </svg>
              </div>
              <div className="confetti"></div>
              <div className="confetti two"></div>
              <div className="confetti three"></div>
              <div className="confetti four"></div>
              <div className="confetti--purple"></div>
              <div className="confetti--purple two"></div>
              <div className="confetti--purple three"></div>
              <div className="confetti--purple four"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
