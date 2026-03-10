import axios from "axios";

export const detectUser = async (emailAd) => {
  try {
    const response = await axios.patch(
      "api/validate/detectUser",
      {
        email: emailAd,
      }
    );
    console.log(response.data.userObject);
    return response.data.userObject;
  } catch (error) {
    return error;
  }
};

export const authoriseUser = async (otp, password, rememberMe) => {
  try {
    const response = await axios.patch(
      "api/validate/authoriseUser",   //the full address is obscured due to the proxy. The proxy is eliminating cors issues with cookies
      {
        otp: otp,
        password: password,
        rememberMe: rememberMe,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email,password,rememberMe) => {

  try {
    const response = await axios.patch(
      "api/validate/login",
      {
        email,
        password,
        rememberMe
      },
      { withCredentials: true }          // not yet sure what format it will be. Will know when developing returning user journey
    )
   console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }

} 

export const refresh = async () => {

  try {
    const response = await axios.patch(
      "api/validate/refresh",
      {withCredentials: true}
    )
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }


}



// const api = axios.create({
//   baseURL: "api/validate/login",
//   withCredentials: true
// })

// api.interceptors.response.use(
//   function success (response) {
//       return response
//   }, function error () {

//   }
// )