import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export default function Redirect() {
  const [loading, setLoading] = React.useState(true)
  const [location,setLocation] = React.useState()
  const a = useLocation();
  const navigate = useNavigate()

  React.useEffect(()=>{
    setLocation(a.search.split("=")[1])
  },[a])

  React.useEffect(() => {
    console.log(location,"12356789")
    if (location) {
      fetch("http://localhost:4000/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: location }),
      })
        .then(async(data) => {
          await data.json().then((a)=>{
            Cookies.set("token", JSON.stringify(a));
            navigate("/meeting")
          }).catch((err)=>{
            console.error(err)
            })
          /* Show success message to user */
        })
    }
  }, [location]);
  return (
    <div>
      <div>Redirecting...</div>
    </div>
  );
}
