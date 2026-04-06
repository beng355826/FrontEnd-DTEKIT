import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  authoriseUser } from "../Api";
import MotionWrapper from "./Animation/MotionWrapper";
import { handleOtp } from "../Functions/handleOtp";

// import { createUser } from "../Api";

function Otp () {
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState(0)
    const [otpCorrect, setOtpCorrect] = useState(true)
     const navigate = useNavigate();

  const formData = {
   otp,
   setIsLoading,
   setOtpCorrect,
   navigate
  };

  useEffect(() => {
    handleOtp(formData)
  }, [formData.otp])

    // const handleOtp = async (passedOtp) => {

    //         const setTimeOutSync = (ms) => {
    //           return new Promise((resolve) => setTimeout(resolve, ms));
    //         }; // this is to transform the setTimeout function into synchronous operation
        
    //         if (passedOtp.toString().length === 8) {
    //           await authoriseUser(parseInt(passedOtp))
    //           await setTimeOutSync(1000); //we create the impression that the OTP is being checked against the DB here with a timeout.
    //           deleteLocalStorage()
    //           navigate('/home')
    //         }
          

    // }

    return (
        <MotionWrapper>
          <div>
            <input
              id="otp"
              type="text"
              maxLength="8"
              onChange={(e) => setOtp(e.target.value)}
            />
            <h1>Enter OTP</h1>
            <p>{otpCorrect ? "" : "Your One time passcode is incorrect"}</p>
          </div>
          {isLoading === true ? <div className="loader"></div> : null}
        </MotionWrapper>
        
    )
    


 }
 
 export default Otp;