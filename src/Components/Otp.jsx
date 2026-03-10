import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { detectUser } from "../Api";

function Otp () {


    return (
        <div>
        <input type="text" 
        maxLength="8"
        />
        <h1>Enter OTP</h1>
        </div>
    )
    


 }
 
 export default Otp;