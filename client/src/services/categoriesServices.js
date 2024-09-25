import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";
import { BASE_URL } from "../utils/urls";
import axios from "axios";

//! createAPI
const token = getUserFromLocalStorage();
export const createAPI = async ({ title, description, date }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/createlist`,
      {
        title,
        description,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error Creating Task:", err);
    throw err;
  }
};

//!listsAPI
export const listsAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error Fetching Lists", err);
    throw err;
  }
};
