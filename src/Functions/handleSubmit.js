import { createUser } from "../Api";

export const handleSubmit = async ({    
    userEmail = null,
    userPassword = null,
    userReconfirmPassword = null,
    rememberMe,
    setIncorrectEmailFormat,
    setIncorrectPasswordFormat,
    setEmailAlreadyCreated,
    setPasswordDiff,
    setIsLoading,
    setTimeOutSync,
    setStepPage,
    localStorage,
}) => {

setIncorrectEmailFormat(null)
setIncorrectPasswordFormat(null)
setEmailAlreadyCreated(false)
setPasswordDiff(false)

setIsLoading(true)    
const isEmailValid = (isEmail) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(isEmail)
const isPasswordValid = (isPassword) => /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/.test(isPassword)


const check = {
    email : isEmailValid(userEmail),
    password : isPasswordValid(userPassword),
    matchPassword : (userPassword === userReconfirmPassword),
}

console.log(check);

if(!check.email) {setIncorrectEmailFormat(true), setIsLoading(false)}
if(!check.password) {setIncorrectPasswordFormat(true), setIsLoading(false)}
if(!check.matchPassword) {setPasswordDiff(true), setIsLoading(false)}

    

const finalCheck = Object.values(check)
if(finalCheck.every((value) => value === true)) {
    const response = await createUser(userEmail, userPassword, rememberMe)
    if(response.message === 'Request failed with status code 400') {
        
        await setTimeOutSync(750)
        setIsLoading(false)
        return setEmailAlreadyCreated(true)
    
    }
    else if (response.accountStatus){
        console.log(response.accountStatus);
        localStorage.setItem("otpSent", true);
        await setTimeOutSync(300)
        setIsLoading(false)
        setStepPage("otp")
}}}