import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuRry5Q12dKjrwxqd2S1Esix-gaTbTlFQ",
  authDomain: "ezolis-40e2f.firebaseapp.com",
  projectId: "ezolis-40e2f",
  storageBucket: "ezolis-40e2f.firebasestorage.app",
  messagingSenderId: "888862203670",
  appId: "1:888862203670:web:9d3a459a237820bd9a3a37",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
