import { authoriseUser } from "../Api";
import { useNavigate, Link } from "react-router-dom";
import { setTimeOutSync } from "./setTimeOutSync";

const deleteLocalStorage = () => {
  localStorage.removeItem("otpSent");
};

export const handleOtp = async ({ otp, setIsLoading, setOtpCorrect, navigate }) => {

  console.log(otp);

  if (otp.length === 8) {
    setIsLoading(true);
    const response = await authoriseUser(parseInt(otp));
    if(response.message === "Request failed with status code 403"){
        setOtpCorrect(false);
        setIsLoading(false);
    } else {
        await setTimeOutSync(1000); //we create the impression that the OTP is being checked against the DB here with a timeout.
    setIsLoading(false);
    deleteLocalStorage();
    navigate("/home");
    }
   
 } 
    
  
};
