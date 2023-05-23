import { AUTH_ENDPOINT } from "../constants/constant";
import axios from "axios";
import Cookies from "js-cookie";

export const startMeeting = async () => {
  try {
    const { data } = await axios.get(`${AUTH_ENDPOINT}/getZak`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(Cookies.get("token")).access_token
        }`,
      },
    });

    return data

    
  } catch (error) {
    console.log(error)
  }
};
