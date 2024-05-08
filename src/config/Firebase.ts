import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb6wiVmjvJsbTba-HaW9kID9PSf2_W1zM",
  authDomain: "mybussiness-lk.firebaseapp.com",
  databaseURL: "https://mybussiness-lk.firebaseio.com",
  projectId: "mybussiness-lk",
  storageBucket: "mybussiness-lk.appspot.com",
  messagingSenderId: "936068109881",
  appId: "1:936068109881:web:f06296486231ff05101fe8",
  measurementId: "G-MGDMFJ90VB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
