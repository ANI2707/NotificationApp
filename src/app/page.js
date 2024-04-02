"use client";

import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

export default function Home() {
  const handleSendMessage = async () => {
    try {
      const token = await requestPermission();
      if (token) {
        sendMessage(token, "This Application works fine");
      } else {
        alert("Failed to get token. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  async function sendMessage(token, message) {
    try {
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "key=AAAAmAS2jxQ:APA91bHpRi90RvFyYvMOS7z8aAl5BfxOZSx9dByzHbpkc7Zbec70JwlWwWXKQA1IJKRWPpWeJI2YY7bByHMahu2dB68jA8Jrf402-uxAfy_8ZbbThT1vn_iS0iEf5FKn2lsOZK2y3N0j" // Replace with your server key
        },
        body: JSON.stringify({
          to: token,
          notification: {
            title: "Notification",
            body: message
          }
        })
      });
      console.log("Message sent successfully:", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //genrate token
      const token = await getToken(messaging, {
        vapidKey:
          "BImN2lLBHjTO0TQwCTBAUN3j3gEozsvwiFArpr3U9LoLR5hKCte2xXBipCoKFdexjdmTYxlZpZFym97ne5MgLdg",
      });

      return token;
      
      

    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  

  

  return (
    <div className="w-full  bg-black flex flex-col items-center justify-center pt-[78px] pb-[69px] pr-[15px] pl-4  gap-[100px] text-center text-[29px] text-white font-inter">
      <div>
        <h2>Lorem Ipsum...</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <section className=" h-[352px] relative">
        <img
          className=" top-[0px] left-[0px] w-[344px] h-[344px]"
          alt=""
          src="/error-msgillustration.svg"
        />
        <img
          className="absolute top-[140px] left-[140px] w-16 h-16 overflow-hidden z-[1]"
          loading="lazy"
          alt=""
          src="/bell.png"
        />
      </section>

      <div className=" h-[42px] flex flex-row items-start justify-start py-0 pr-1.5 pl-2  w-[327px]">
        <button  onClick={handleSendMessage} className="cursor-pointer py-[13px] px-5 bg-[transparent] h-[44.8px] flex-1 rounded-lg [background:linear-gradient(90deg,_rgba(157,_13,_61,_0)_2.62%,_#df522b_50.55%,_rgba(199,_125,_44,_0))] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.12)] box-border flex flex-row items-start justify-center  border-[1.4px] border-solid border-brown">
          <b className="w-36 relative text-[16px] tracking-[0.03em] leading-[100%] inline-block font-inter text-white text-center">
            Send Notification
          </b>
        </button>
      </div>
    </div>
  );
}
