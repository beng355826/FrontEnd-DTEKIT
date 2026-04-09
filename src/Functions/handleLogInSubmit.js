import { login } from "../Api";

export const handleLogInSubmit = async ({
    setIsLoading,
    userEmail,
    userPassword,
    rememberMe,
    setTimeOutSync,
    localStorage,
    setInvalidLogin,
    navigate

}) => {
setIsLoading(true)  
setInvalidLogin(false)
    
const response = await login(userEmail,userPassword,rememberMe)
if(response.loggedIn === true){

    navigate("/home")
    console.log('logged in');
} else {
    setInvalidLogin(true)
    setIsLoading(false)
}


}