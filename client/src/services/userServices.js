import { BASE_URL } from "../utils/urls";
import axios from "axios";

//! registerAPI
export const registerAPI = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
};
