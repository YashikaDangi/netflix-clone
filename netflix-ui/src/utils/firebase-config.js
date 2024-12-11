
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBQyuGL27BxcfMoANl4VlrajA9HZnBPK24",
  authDomain: "react-netflix-clone-66bfd.firebaseapp.com",
  projectId: "react-netflix-clone-66bfd",
  storageBucket: "react-netflix-clone-66bfd.firebasestorage.app",
  messagingSenderId: "533869631652",
  appId: "1:533869631652:web:82b6f4313d553b829cee31",
  measurementId: "G-D98DGWNZM9"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);