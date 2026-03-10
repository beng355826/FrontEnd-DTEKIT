import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, refresh } from "../Api";
import MotionWrapper from "./Animation/MotionWrapper";
import TermsPopUp from "./Popup/PopUp";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function patchLogin() {
      try {
        const response = await login();
        if (response) {
          setLoggedIn(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    patchLogin();
  }, []);

  return (
    <>
      <h1>{loggedIn ? "logged In" : "Loading circle"}</h1>
    </>
  );
}

export default Home;
