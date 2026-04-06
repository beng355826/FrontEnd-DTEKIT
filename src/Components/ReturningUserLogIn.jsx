import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, authoriseUser } from "../Api";
import MotionWrapper from "./Animation/MotionWrapper";
import TermsPopUp from "./Popup/PopUp";
import { login } from "../Api";

function ReturningUserLogIn () {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [rememberMe, setRememberMe] = useState(false)

    async function handleReturn (email,password,rememberMe) {
        const response = await login(email,password,rememberMe)
        console.log(response);
    }

    return (
        <>
        <MotionWrapper>
        <h1>Guess the time? Its Welcome back time</h1>

        <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.function)
            }}
          />
          <br/>

          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => {
              
            }}
          />
            <br/>
            <span>Remember Me?</span>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

          <br/>
          <button onClick={() => handleReturn(email,password,rememberMe)}>
            Request log in
          </button>
        </MotionWrapper>
        </>
    )

}

export default ReturningUserLogIn;