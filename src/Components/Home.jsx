import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, refresh, pics } from "../Api";
import MotionWrapper from "./Animation/MotionWrapper";
import TermsPopUp from "./Popup/PopUp";
import { g } from "motion/react-client";

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [devReloadPics, setDevReloadPics] = useState(false);
  let navigate = useNavigate();



  const handleButton = () => {
    if (devReloadPics) return setDevReloadPics(false);
    else return setDevReloadPics(true);
  };

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
    localStorage.removeItem("otpSent");
  }, []);

  useEffect(() => { // hello future Beeg. this function uses closure and recursion to limit the amount of retries to refresh and send an access cookie
    let count = 1;
    async function getPics() {
      count++;
      try {
        const response = await pics();
        if (typeof response === "number") {
          await sendRefresh();
          if (count < 3) {
            getPics();
          } else {
            console.log("exceeded attempts to refresh");
          }
        }
        console.log(response);
        return response;
      } catch (err) {
        console.log(err);
      }
    }
    getPics();
  }, [devReloadPics]);

  const sendRefresh = async () => {
    const response = await refresh();
  };

  return (
    <>
      <MotionWrapper>
        <h1>{loggedIn ? "logged In" : "Loading circle"}</h1>
        <button onClick={() => handleButton()}>Do things</button>
      </MotionWrapper>
    </>
  );
}

export default Home;
