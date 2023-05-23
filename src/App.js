import "./App.css";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import axios from "axios";

function App() {
  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = "http://localhost:4000";
  var sdkKey = "CH6MG2MPQCOagOUUSS68MQ";
  var meetingNumber = 96911527872;
  var password = 467330;
  var role = 1;
  var userName = "Muhammad Arshad";
  var userEmail = "arshad.cm@bosctechlabs.com";
  // var registrantToken = "";
  // var zakToken = "";

  function getSignature(e) {
    e.preventDefault();

    axios
      .post(
        authEndpoint,
        {
          meetingNumber: meetingNumber,
          role: role,
        },{ "Content-Type": "application/json" },
      )
      .then(({ data }) => {
        console.log(data)
        startMeeting(data.signature);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function startMeeting() {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      zoomAppRoot: meetingSDKElement,
      debug: true,
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
        video: {
          popper: {
            disableDraggable: true,
          },
        },
      },
    });

    client.join({
      signature:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJDSDZNRzJNUFFDT2FnT1VVU1M2OE1RIiwiYXBwS2V5IjoiQ0g2TUcyTVBRQ09hZ09VVVNTNjhNUSIsIm1uIjoiOTY5MTE1Mjc4NzIiLCJyb2xlIjoxLCJpYXQiOjE2ODQ0MDM1NTcsImV4cCI6MTY4NDQxMDc1NywidG9rZW5FeHAiOjE2ODQ0MTA3NTd9.lqhSRW55Hj8tvg0Mi0_GKain_l9hxJQXQn88h6Brs9U",
      sdkKey,
      meetingNumber: meetingNumber + "",
      userName: userName,
      userEmail: userEmail,
      // password,
      role,
      // tk: registrantToken,
      zak: "eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6InROOXZydC1lU1hLdllENnVoM2l0elEiLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjEwMCwid2NkIjoiYXcxIiwiY2x0IjowLCJleHAiOjE2ODQ0MTE2NDQsImlhdCI6MTY4NDQwNDQ0NCwiYWlkIjoiaGpmZnFreTFUbXVJNjRSR3Nha3ZOdyIsImNpZCI6IiJ9.Lk9e_C1PTMnyK1oiE0zTDYwETt0Z4mEv7b0eaK2ztPg",
    });
  }

  // const handleJoin = async () => {
  //   try {
  //     let meetingSDKElement = document.getElementById("meetingSDKElement");

  //     client.init({
  //       zoomAppRoot: meetingSDKElement,
  //       language: "en-US",
  //       customize: {
  //         video: {
  //           popper: {
  //             disableDraggable: true,
  //           },
  //         },
  //       },
  //     });
  //     // client.join({
  //     //   sdkKey: "CH6MG2MPQCOagOUUSS68MQ",
  //     //   signature:
  //     //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJDSDZNRzJNUFFDT2FnT1VVU1M2OE1RIiwibW4iOjk5MTY5NzM4NDU0LCJyb2xlIjowLCJpYXQiOjE2ODQyMjk3NjcsImV4cCI6MTY4NDIzNjk2NywiYXBwS2V5IjoiQ0g2TUcyTVBRQ09hZ09VVVNTNjhNUSIsInRva2VuRXhwIjoxNjg0MjM2OTY3fQ.RTo2zc5e1E9nzlOZIb0oa1NcmfHWRHRQcCZVqGXCbh8",
  //     //   meetingNumber: 99169738454,
  //     //   password: "8rar6L",
  //     //   userName:"test",
  //     // });

  //     // client.join({
  //     //   sdkKey: "CH6MG2MPQCOagOUUSS68MQ",
  //     //   signature:
  //     //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJDSDZNRzJNUFFDT2FnT1VVU1M2OE1RIiwibW4iOjk5MTY5NzM4NDU0LCJyb2xlIjoxLCJpYXQiOjE2ODQyMzAzODMsImV4cCI6MTY4NDIzNzU4MywiYXBwS2V5IjoiQ0g2TUcyTVBRQ09hZ09VVVNTNjhNUSIsInRva2VuRXhwIjoxNjg0MjM3NTgzfQ.VceKcTQGCmPzVLOcHJ8dYzc_THkpNCFObjonb82Ovdk",
  //     //   meetingNumber: 99169738454,
  //     //   password: "8rar6L",
  //     //   userName: "test",
  //     //   role: 1,
  //     // });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <>
      <div
        id="meetingSDKElement"
        style={{ position: "fixed", right: 0, top: 0 }}
      ></div>
      <button onClick={startMeeting}>click</button>
    </>
  );
}

export default App;
