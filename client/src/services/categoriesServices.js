import { decryptData } from "../utils/crypto";
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";
import { BASE_URL } from "../utils/urls";
import axios from "axios";

//! createAPI
const token = getUserFromLocalStorage();

console.log(token);

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
    return response?.data;
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
//!update

export const updateAPI = async ({ id, done }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/task/markDone/${id}`,
      {
        done,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Mark Done Error", err);
    throw err;
  }
};

//!deleteAPI
export const deleteAPI = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/task/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error Deleting List", err);
    throw err;
  }
};
