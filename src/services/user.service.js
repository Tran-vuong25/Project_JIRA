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

export const getUser = async (keyword) => {
  try {
    const resp = await axiosAuth(`/Users/getUser?keyword=${keyword}`, {
      method: "GET",
    });

    return resp.data.content;
  } catch (error) {
    throw new Error(error);
  }
};

export const assignUserProject = async (data) => {
  try {
    const resp = await axiosAuth({
      url: `/Project/assignUserProject`,
      method: "post",
      data,
    });

    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

