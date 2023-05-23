import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_ENDPOINT } from "../constants/constant";

export const createMeeting = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/createMeeting",
      {},
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(Cookies.get("token")).access_token
          }`,
        },
      }
    );

    if (data) {
      console.log(data, "(-----data-----)");
      localStorage.setItem("meeting", JSON.stringify(data));
    }
  } catch (error) {
    console.log(error, "(-----error while creating meeting-----)");
  }
};

export const getSignatures = async (meetingNumber) => {
  try {
    const { data } = await axios.post(
      AUTH_ENDPOINT,
      {
        meetingNumber,
        role: 1,
      },
      { "Content-Type": "application/json" }
    );

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error, "(-----error while getting signature-----)");
  }
};

export const getMeeting = async (meetingNumber) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/getMeeting/${meetingNumber}`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(Cookies.get("token")).access_token
          }`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error, "(-----error while getting meeting-----)");
  }
};
