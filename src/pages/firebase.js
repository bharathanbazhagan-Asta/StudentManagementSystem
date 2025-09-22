// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDO6WrD3revXKM-FDgWoRrFgv7huYUF1tg",
  authDomain: "stud-manage-sys.firebaseapp.com",
  projectId: "stud-manage-sys",
  storageBucket: "stud-manage-sys.appspot.com", // ✅ correct value
  messagingSenderId: "835435108784",
  appId: "1:835435108784:web:560a18372d3d2a7917de75",
  measurementId: "G-TPGPQXXEDL",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore and Storage references
export const db = getFirestore(app);
export const storage = getStorage(app);
