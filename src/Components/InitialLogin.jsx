import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleSubmit } from "../Functions/handleSubmit";
import { handleOtp } from "../Functions/handleOtp";
import { setTimeOutSync } from "../Functions/setTimeOutSync";
import MotionWrapper from "./Animation/MotionWrapper";
import TermsPopUp from "./Popup/PopUp";
import { Mail } from "./Mail";

const InitialLogin = () => {
  const [agree, setAgree] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incorrectEmailFormat, setIncorrectEmailFormat] = useState(null);
  const [incorrectPasswordFormat, setIncorrectPasswordFormat] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userReconfirmPassword, setUserReconfirmPassword] = useState(null);
  const [passwordDiff, setPasswordDiff] = useState(false);
  const [emailAlreadyCreated, setEmailAlreadyCreated] = useState(false);
  const [otp, setOtp] = useState(0);
  const [otpCorrect, setOtpCorrect] = useState(true)
  const [step, setStepPage] = useState("request");

  const [mode, setMode] = useState("signIn")

  // const setTimeOutSync = async (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }; // this is to transform the setTimeout function into synchronous operation

  const navigate = useNavigate();

  const formData = {
    userEmail,
    userPassword,
    userReconfirmPassword,
    rememberMe,
    setIncorrectEmailFormat,
    setIncorrectPasswordFormat,
    setEmailAlreadyCreated,
    setPasswordDiff,
    setIsLoading,
    setTimeOutSync,
    setStepPage,
    localStorage,
    passwordDiff,
    otp,
    setOtpCorrect,
    navigate
  };

  useEffect(() => {
    if (localStorage.getItem("otpSent") === "true") {
      setStepPage("otp")
    }
  }, []);

  useEffect(() => {
    handleOtp(formData);
  }, [formData.otp]);

  return (
    <div key={step}>
      {/* key={} unmounts the component so when state changes it removes whats been typed */}
            <Mail/>
      <div className="sign-in-box">

      

      {step === "request" ? (
        <div>
            <div>
            <button onClick={() => setStepPage("request")}>Sign Up</button>
            </div>
          
          <input
            className={
              incorrectEmailFormat || emailAlreadyCreated ? "formatVal" : ""
            }
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <div>
            <input
              className={
                incorrectPasswordFormat || passwordDiff ? "formatVal" : ""
              }
              type="password"
              placeholder="password"
              autoComplete="off"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
            <br />
            <input
              className={
                incorrectPasswordFormat || passwordDiff ? "formatVal" : ""
              }
              type="password"
              placeholder="re-confirm password"
              autoComplete="off"
              onChange={(e) => {
                setUserReconfirmPassword(e.target.value);
              }}
            />
            <p>
              {incorrectEmailFormat ? "Please input a valid email address" : ""}
            </p>
            <p>
              {incorrectPasswordFormat
                ? "Please input a password with at least 6 characters, a capital letter and 1 special character"
                : ""}
            </p>
            <p>
              {passwordDiff
                ? "Please ensure you enter the same password in both fields"
                : ""}
            </p>
            <p>
              {emailAlreadyCreated
                ? "This email address has already been registered"
                : ""}
            </p>
            <br></br>
            <span>Remember Me?</span>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </div>
          <span>
            I agree to the
            <a
              href="#"
              onClick={() => {
                setOpenTerms(true);
              }}
            >
              {" "}
              terms and conditions
            </a>
          </span>

          <TermsPopUp openTerms={openTerms} setOpenTerms={setOpenTerms} />

          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <br />
          <p>
            {agree
              ? "✅ Agreed to the terms"
              : "❌ Please agree to the terms before signing up"}
          </p>
          <button
            onClick={() => {
              handleSubmit(formData);
            }}
            disabled={!agree}
          >
            Request log in
          </button>

          <br />
          <Link to="/returningUser">Returning user?</Link>
        </div>
      ) : step === "otp" ? (
        <MotionWrapper>
          <div>
            <input
              className={otpCorrect ? "" : "formatVal"}
              id="otp"
              type="text"
              maxLength="8"
              onChange={(e) => setOtp(e.target.value)}
            />
            <h1>Enter OTP</h1>
            <p>{otpCorrect ? "" : "Your One time passcode is incorrect"}</p>
          </div>
        </MotionWrapper>
      ) : null}
      {isLoading === true ? <div className="loader"></div> : null}
    </div>

    </div>
  );
};

export default InitialLogin;
