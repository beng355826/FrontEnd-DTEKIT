export const setTimeOutSync = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }; // this is to transform the setTimeout function into synchronous operation