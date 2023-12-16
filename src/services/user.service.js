// export const sigIn = async (data) => {
//     try {
//         const response = await fetch('Users/signup', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data),
//         });
//         if (!response.ok) { throw new Error('Network error') }
//         return response;
//     } catch (error) {
//         console.log("Error", error);
//     }

import { axiosAuth, axiosWithoutAuth } from "./axios.config";

export const logUp = async (data) => {
  try {
    const resp = await axiosWithoutAuth("/Users/signup", {
      method: "POST",
      data,
    });

    return resp.data.content;
  } catch (error) {
    throw new Error(error);
  }
};

export const logIn = async (data) => {
  try {
    const resp = await axiosWithoutAuth("/Users/signin", {
      method: "POST",
      data,
    });

    return resp.data.content;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async () => {
  try {
    const resp = await axiosAuth("/Users/getUser", {
      method: "GET",
    });

    return resp.data.content;
  } catch (error) {
    throw new Error(error);
  }
};
