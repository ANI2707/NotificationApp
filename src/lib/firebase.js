import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyByY8Il4u9MOlfiEntXnnToK_h6bAa7ChU",
    authDomain: "cloud-messaging-49970.firebaseapp.com",
    projectId: "cloud-messaging-49970",
    storageBucket: "cloud-messaging-49970.appspot.com",
    messagingSenderId: "652914102036",
    appId: "1:652914102036:web:da7ac3c22b3269e9ea7c01"
  };


  export const app = initializeApp(firebaseConfig);
  export const messaging=getMessaging(app);