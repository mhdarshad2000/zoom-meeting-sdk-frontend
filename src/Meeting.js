import React, { useEffect, useRef, useState } from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { createMeeting, getMeeting, getSignatures } from "./service/service";
import { startMeeting } from "./service/serv";
import { SDK_KEY } from "./constants/constant";

export default function Meeting() {
  const [newMeeting, setNewMeeting] = useState();
  const [signature, setSignature] = useState();

  const meetingNumberRef = useRef();

  const client = ZoomMtgEmbedded.createClient();

  const handleCreate = () => {
    const meeting = createMeeting();
    localStorage.setItem("meeting", JSON.stringify(meeting));
  };

  useEffect(() => {
    if (localStorage.getItem("meeting") === "undefined")
      return console.log("no meeting");
    const meeting = JSON.parse(localStorage.getItem("meeting"));
    setNewMeeting(meeting?.data);
  }, []);

  async function getSignature(e) {
    e.preventDefault();
    console.log(newMeeting?.id, "(-----meeting id-----)");
    const data = await getSignatures(newMeeting?.id);
    setSignature(data.signature);
    const zak = await startMeeting(data.signature);

    initia(zak.data.token, data.signature);
  }

  function initia(zak, signature) {
    console.log(zak, "(-----zak-----)");
    console.log(signature, "(-----signature-----)");
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            "leave",
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      }
    });
    client.join({
      sdkKey: SDK_KEY,
      signature,
      meetingNumber: newMeeting?.id,
      userName: "Muhammad Arshad",
      userEmail: "arshad.cm@bosctechlabs.com",
      password: newMeeting?.password,
      zak,
    });
  }

  const getMeet = async () => {
    let meetingId = meetingNumberRef.current.value;
    const meet = await getMeeting(meetingId);
    localStorage.setItem("meeting", JSON.stringify(meet.data));
    setNewMeeting(meet.data);
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Meeting</button>
      <br />
      <br />
      {newMeeting && (
        <div>
          <h1>Meeting Created</h1>
          <h2>Meeting ID: {newMeeting?.id}</h2>
          <h2>Meeting Password: {newMeeting?.password}</h2>

          <button onClick={getSignature}>get signature</button>
          <br />
          <br />
          <br />
          <div
            id="meetingSDKElement"
            style={{ position: "fixed", right: 0, top: 0 }}
          ></div>
        </div>
      )}
      <label>Enter Meeting ID : </label>
      <input type="text" ref={meetingNumberRef} />
      <br />
      <br />
      <button onClick={getMeet}>Get Meeting</button>
      <br />
      <br />
      <button onClick={initia}>in</button>
    </div>
  );
}
