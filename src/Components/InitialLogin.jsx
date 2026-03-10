import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { detectUser, authoriseUser } from "../Api";
import MotionWrapper from "./Animation/MotionWrapper";
import TermsPopUp from "./Popup/PopUp";

const initialLogin = () => {
  const [agree, setAgree] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [initialEmail, setInitialEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState(null);

  const [step, setStepPage] = useState("request");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  // The below function handles the first instance of the email being provided, if the email is correct flips to the otp section and passes the OTP to state so it can be recognised

  async function handleInitial(email) {
    const result = await detectUser(email);
    if (typeof result === "object") {
      setTimeout(() => setStepPage("otp"), 300); //this is for the transition
    }
  }

  async function handleOtp(passedOtp) {
    const setTimeOutSync = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }; // this is to transform the setTimeout function into synchronous operation

    if (passedOtp.toString().length === 8) {
      setIsLoading(true);
      setOtp(passedOtp);
      await setTimeOutSync(1000); //we create the impression that the OTP is being checked against the DB here with a timeout.
      setStepPage("password");
      setIsLoading(false);
    }
  }

  async function handlePassword(otp, password, rememberMe) {
    console.log(rememberMe, typeof rememberMe);
    const result = await authoriseUser(parseInt(otp), password, rememberMe);
   if(result.status === 201){
    navigate('/home')
   }
    

  }

  return (
    <div key={step}>
      {/* key={} unmounts the component so when state changes it removes whats been typed */}
      <div>
        <h1>Take me back to the Klump</h1>
      </div>

      {step === "request" ? (
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setInitialEmail(e.target.value);
            }}
          />
          <br />
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
          <p>{agree ? "✅ Agreed" : "❌ Not agreed"}</p>
          <button onClick={() => handleInitial(initialEmail)} disabled={!agree}>
            Request log in
          </button>
          <br/>
          <Link to="/returningUser">
            Returning user?
          </Link>
        </div>
      ) : step === "otp" ? (
        <MotionWrapper>
          <div>
            <input
              id="otp"
              type="text"
              maxLength="8"
              onChange={(e) => handleOtp(e.target.value)}
            />
            <h1>Enter OTP</h1>
          </div>
        </MotionWrapper>
      ) : step === "password" ? (
        <MotionWrapper>
          <div>
            <input
              type="password"
              placeholder="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br></br>
            <span>Remember Me?</span>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <h1>Enter Provided Password</h1>
            <button onClick={(e) => handlePassword(otp, password, rememberMe)}>
              log in
            </button>
          </div>
        </MotionWrapper>
      ) : null}

      {isLoading === true ? <div className="loader"></div> : null}
    </div>
  );
};

export default initialLogin;
