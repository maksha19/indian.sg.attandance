import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [registrationId, setRegistrationId] = useState("");
  const [name, setName] = useState("");

  const inputOnChange = (e: any) => {
    console.log(e);
    setRegistrationId(e);
  };

  const submitRequest = async () => {
    const url =
      "https://script.google.com/macros/s/AKfycbzU4pLQkddWY6A4Eeuo39I9Wc4DznwvcE3vH8QxLWnvNUV7GxLEoRmKkqx-QiDH9jPR/exec";
    const response = await axios.post(
      url,
      { id: registrationId },
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );

    if (response.status === 200) {
      const registersName = response.data.name;
      if (registersName) {
        setName("registration completed for: " + registersName);
      } else {
        setName("No record found !");
      }
      setRegistrationId("");
    }
  };

  return (
    <div className="container mx-auto grid h-screen content-center bg-dark-green">
      <h1 className="text-3xl text-white  font-black">
        தேசிய தினத் தமிழ்மொழிப் போட்டிகள்
      </h1>
      <span className="block text-xl text-white text-sm font-medium  font-black">
        By Indian.Sg
      </span>
      <div className="grid my-4 grid-cols-6 gap-4 ">
        <div className="col-start-2 col-span-4">
          <div className="flex flex-col">
            <input
              className="border-4 my-4 h-12 border-bt-bg-color"
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
          </div>
        </div>
      </div>
      {name && (
        <div>
          <span className="block text-xl text-white text-sm font-medium font-black">
            {name}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;

// block text-xl text-white text-sm font-medium text-slate-700 font-black
// block text-3xl text-white text-sm font-medium
