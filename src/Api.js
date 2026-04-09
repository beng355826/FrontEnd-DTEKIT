import axios from "axios";

export const createUser = async (emailAd, pass, rememberMeBool) => {

  // console.log(emailAd, pass, rememberMeBool);
  try {
    const response = await axios.post(
      "api/users",
      {
        email: emailAd,
        password: pass,
        accountStatus : "inactive",
        rememberMe : rememberMeBool,
        sessionId : false,
        sessionIdExpires: false

      }
    );
    // console.log(response.data.accountStatus , "<------ OTP"
    // );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const authoriseUser = async (oneTimePasscode) => {
  try {
    const response = await axios.patch(
      "api/validate/authoriseUser",   //the full address is obscured due to the proxy. The proxy is eliminating cors issues with cookies
      {
        otp: oneTimePasscode
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error
  }
};

export const login = async (email,password,rememberMe) => {
console.log(email, password, rememberMe);
  try {
    const response = await axios.patch(
      "api/validate/login",
      {
        email,
        password,
        rememberMe
      },{},
      { withCredentials: true }          // not yet sure what format it will be. Will know when developing returning user journey
    )

    
    return response.data
  } catch (error) {
    return error.response.status
    
  }

} 

export const refresh = async () => {

    const response = await axios.patch(
      "api/validate/refresh", {},
      {withCredentials: true}
    ).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
    
    return response


}

export const pics = async () => {

 const response = await axios.get("api/pics").catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return error.response.status
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

  return response
    
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