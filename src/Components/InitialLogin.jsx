import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleCreateUserSubmit } from "../Functions/handleCreateUserSubmit";
import { handleLogInSubmit } from "../Functions/handleLogInSubmit";
import { handleOtp } from "../Functions/handleOtp";
import { setTimeOutSync } from "../Functions/setTimeOutSync";
import { motion, AnimatePresence } from "framer-motion";
import TermsPopUp from "./Popup/PopUp";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const InitialLogin = () => {
  const [agree, setAgree] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incorrectEmailFormat, setIncorrectEmailFormat] = useState(false);
  const [incorrectPasswordFormat, setIncorrectPasswordFormat] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userReconfirmPassword, setUserReconfirmPassword] = useState(null);
  const [passwordDiff, setPasswordDiff] = useState(false);
  const [emailAlreadyCreated, setEmailAlreadyCreated] = useState(false);
  const [otp, setOtp] = useState(0);
  const [otpCorrect, setOtpCorrect] = useState(true);
  const [step, setStepPage] = useState("request");
  const [signInLogIn, setSignInLogIn] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

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
    navigate,
    invalidLogin,
    setInvalidLogin,
  };

  const handleSwitchChange = (checked) => {
    if (rememberMe) setRememberMe(false) 

    setInvalidLogin(false)
    setEmailAlreadyCreated(false)
    setIncorrectEmailFormat(false)
    setIncorrectPasswordFormat(false)
    setPasswordDiff(false)
    
    setSignInLogIn(checked)
    setAgree(checked)
  }

  useEffect(() => {
    if (localStorage.getItem("otpSent") === "true") {
      setStepPage("otp");
    }
  }, []);

  useEffect(() => {
    handleOtp(formData);
  }, [formData.otp]);

  return (
    <div
      key={step}
      className="grid grid-cols-1 pt-10 gap-y-10 md:grid-cols-2 md:pt-35"
    >
      {/* key={} unmounts the component so when state changes it removes what's been typed */}
      <div className="grid place-items-center">
        <Card
          className={`w-[70vw] md:w-[35vw] h-[40vh] md:h-[45vh] ${signInLogIn ? "bg-red-100" : "bg-blue-100"} `}
        >

{step === "request" ? (<CardHeader className="p-3 flex gap-2">
            <Switch
              checked={signInLogIn}
              onCheckedChange={(checked) => handleSwitchChange(checked)}
              id="login-signup"
            />
            <Label htmlFor="login-signup" className="whitespace-nowrap">
              {signInLogIn
                ? "Need to create an account?"
                : "Log in?"}
            </Label>


          </CardHeader>) : step === "otp" ? (
  <Label>We have sent you a One Time Passcode</Label>
) : null}

          

          {step === "request" ? (
            <AnimatePresence mode="wait">
              {signInLogIn ? (
                <motion.div
                  key="Log In"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent
                    id="Log in"
                    className="flex justify-center text-center "
                  >
                    <div className="w-full max-w-sm">
                      <Label htmlFor="email" className="sr-only">
                        Email
                      </Label>
                      <Input
                        className={
                          invalidLogin
                            ? "border border-solid border-red-500"
                            : "border border-solid border-slate-400"
                        }
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                      />
                      <p className="opacity-0 select-none">Reserved Space</p>

                      <div>
                        <Label htmlFor="password" className="sr-only">
                          Password
                        </Label>
                        <Input
                          className={
                            invalidLogin
                              ? "border border-solid border-red-500"
                              : "border border-solid border-slate-400"
                          }
                          id="password"
                          type="password"
                          placeholder="password"
                          autoComplete="off"
                          onChange={(e) => {
                            setUserPassword(e.target.value);
                          }}
                        />

                        {isLoading? 
                        <div className="flex justify-center">
                        <Spinner className="size-6"/>
                        </div> : <p
                          className={
                            invalidLogin
                              ? "text-[clamp(11.5px,1vw,14px)] whitespace-nowrap text-red-500"
                              : "invisible"
                          }
                        > 
                          * Invalid email or password
                        </p>}
                        
                      </div>
                      <div className="pt-2 flex gap-2 justify-center whitespace-nowrap">
                        <Label htmlFor="rememberMe">Remember Me?</Label>
                        <Checkbox
                          className="border-slate-400"
                          id="rememberMe"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked)}
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          className="pl-5 pr-5"
                          variant="outline"
                          onClick={() => {
                            handleLogInSubmit(formData);
                          }}
                        >
                          Log in
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              ) : (
                <motion.div
                  key="Sign Up"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent
                    id="Sign Up"
                    className="flex justify-center text-center"
                  >
                    <div className="w-full max-w-sm">
                      <Label htmlFor="email" className="sr-only">
                        Email
                      </Label>
                      <Input
                        className={
                          incorrectEmailFormat || emailAlreadyCreated
                            ? "border border-solid border-red-500"
                            : "border border-solid border-slate-400"
                        }
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                      />
                      <p
                        className={
                          incorrectEmailFormat
                            ? "text-[clamp(11.5px,1vw,14px)] whitespace-nowrap text-red-500"
                            : emailAlreadyCreated
                              ? "text-[clamp(11.5px,1vw,14px)] whitespace-nowrap text-red-500"
                              : "invisible"
                        }
                      >
                        {" "}
                        {incorrectEmailFormat
                          ? "* Input a valid email address"
                          : emailAlreadyCreated
                            ? "This email address has already been registered"
                            : "This email address has already been registered"}
                      </p>

                      <div>
                        <Label htmlFor="password" className="sr-only">
                          Password
                        </Label>
                        <Input
                          className={
                            incorrectPasswordFormat || passwordDiff
                              ? "border border-solid border-red-500"
                              : "border border-solid border-slate-400"
                          }
                          id="password"
                          type="password"
                          placeholder="password"
                          autoComplete="off"
                          onChange={(e) => {
                            setUserPassword(e.target.value);
                          }}
                        />

                        <Label htmlFor="password" className="sr-only">
                          Password
                        </Label>
                        <Input
                          className={
                            incorrectPasswordFormat || passwordDiff
                              ? "mt-2 border border-solid border-red-500"
                              : "mt-2 border border-solid border-slate-400"
                          }
                          id="re-confirm-password"
                          type="password"
                          placeholder="re-confirm password"
                          autoComplete="off"
                          onChange={(e) => {
                            setUserReconfirmPassword(e.target.value);
                          }}
                        />
                        <p
                          className={
                            incorrectPasswordFormat
                              ? "text-[clamp(11.5px,1vw,14px)] whitespace-nowrap text-red-500"
                              : "invisible"
                          }
                        >
                          * Min. 6 chars, 1 uppercase, 1 special.
                        </p>
                        { isLoading ? <div className="flex justify-center">
                          <Spinner className="size-6"/>
                        </div> : <p
                          className={
                            passwordDiff
                              ? "text-[clamp(11.5px,1vw,14px)] whitespace-nowrap text-red-500"
                              : isLoading ? "text-[clamp(11.5px,1vw,14px)] whitespace-nowrap text-red-500" : "invisible"
                          }
                        >
                          * Enter the same password in both fields
                        </p>}
                        
                      </div>
                      <div className="pt-2 flex gap-2 justify-center whitespace-nowrap">
                        <Label htmlFor="rememberMe">Remember Me?</Label>
                        <Checkbox
                          className="border-slate-400"
                          id="rememberMe"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked)}
                          // onChange={(e) => }
                        />
                      </div>

                      <div className=" flex gap-2 justify-center whitespace-nowrap">
                        <span>
                          I agree to the
                          <a
                            className="font-semibold"
                            href="#"
                            onClick={() => {
                              setOpenTerms(true);
                            }}
                          >
                            {" "}
                            <u>terms and conditions</u>
                          </a>
                        </span>

                        <TermsPopUp
                          openTerms={openTerms}
                          setOpenTerms={setOpenTerms}
                        />

                        <Checkbox
                          className="border-slate-400"
                          id="terms and conditions"
                          checked={agree}
                          onCheckedChange={(checked) => setAgree(checked)}
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          className="pl-5 pr-5"
                          variant="outline"
                          onClick={() => {
                            handleCreateUserSubmit(formData);
                          }}
                          disabled={!agree}
                        >
                          Sign up
                        </Button>
                      

                       
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          ) : step === "otp" ? (
            <div>
              <CardContent>
                <input
                  className={otpCorrect ? "" : "formatVal"}
                  id="otp"
                  type="text"
                  maxLength="8"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <h1>Enter OTP</h1>
                <p>{otpCorrect ? "" : "Your One time passcode is incorrect"}</p>
              </CardContent>
            </div>
          ) : null}
          {isLoading === true ? <div className="loader"></div> : null}
        </Card>
      </div>

      <div className="grid place-items-center ">
        <Card className="w-[70vw] h-[40vh]  md:w-[45vw] h-[40vh] md:w-[30vw] h-[40vh] bg-red-100">
          <h1>You Have Mail</h1>
        </Card>
      </div>
    </div>
  );
};

export default InitialLogin;
