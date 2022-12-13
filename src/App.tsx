import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import footerImage from "./cot_2_footer.png";
import header from "./cot_2_header.png";
import classNames from "classnames";

function App() {
  const [registrationId, setRegistrationId] = useState("");
  const [name, setName] = useState("Enter your mobile number");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const inputOnChange = (e: any) => {
    setRegistrationId(e);
  };

  const submitRequest = async () => {
    setIsSubmit(true);
    const url =
      "https://script.google.com/macros/s/AKfycbxXVb73hkfx9iOJt1OTjuut_f2SSTjGLpVgcxLaO9p0xc18jpDGfDvxlUKqpdz_TFis/exec";
    const response = await axios.post(
      url,
      { id: Number(registrationId) },
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );
    if (response.status === 200) {
      const statusCode = response.data.statusCode;
      if (statusCode === "202") {
        setTimeout(() => {
          setShowSuccess(true);
          setIsSubmit(true);
        }, 0);
        return;
      } else if (statusCode === "208") {
        setName("Already Register !");
        return;
      } else if (statusCode === "404") {
        setName("Record not found !");
      }
    }
    setTimeout(() => {
      setName("Enter your registration number");
      setIsSubmit(false);
      setRegistrationId("");
    }, 3000);
  };

  return (
    <div className="container mx-auto grid min-h-screen bg-dark-green">
      <div className="grid justify-items-center">
        <img src={header} alt="headerImage" />
      </div>
      <div className="grid my-12 grid-cols-6 gap-4 ">
        <div className="col-start-2 col-span-4">
          <span className="text-white font-bold">{name}</span>
          <div className="flex flex-col">
            <input
              className="border-4 lowercase my-4 h-12 border-bt-bg-color"
              onChange={(e) => inputOnChange(e.target.value)}
              value={registrationId}
              type="number"
            />
            <div className="flex justify-center">
              <button
                className={classNames(
                  "text-bt-text-color font-bold w-auto py-2 px-4 m-4 rounded bg-bt-bg-color"
                )}
                type="button"
                disabled={isSubmit}
                onClick={() => submitRequest()}
              >
                {isSubmit ? (
                  <div className="loader1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <>Submit</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-items-center bg-white">
        <img src={footerImage} alt="footerImage" />
      </div>
      {showSuccess && (
        <a href="/">
          <div className="bg-white">
            <div className="container">
              <div className="action">
                <div className="trophy">
                  <svg
                    fill="#f9bc60"
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
        </a>
      )}
    </div>
  );
}

export default App;
