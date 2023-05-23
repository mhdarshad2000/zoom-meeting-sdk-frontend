import React from 'react'
import { CLIENT_ID, REDIRECT_URI } from './constants/constant';
import axios from "axios"
import Cookies from "js-cookie"

export default function Oauth() {
  const refresh = async() => {
    const {data} = await axios.post("http://localhost:4000/refresh_token", {
      refresh_token: JSON.parse(Cookies.get("token")).refresh_token,
    })

    Cookies.set("token", JSON.stringify(data))
  }
  return (
    <div>
      <a
        href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
      >
        Connect Zoom
      </a>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
