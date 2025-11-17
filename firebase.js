// firebase.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ====== Replace with your Firebase config if you want a different project ======
const firebaseConfig = {
  apiKey: "AIzaSyBNnNfTHE6h-hnTW6LAixiAJ7X--HMTMA0",
  authDomain: "imperial-techub.firebaseapp.com",
  projectId: "imperial-techub",
  storageBucket: "imperial-techub.firebasestorage.app",
  messagingSenderId: "361070773876",
  appId: "1:361070773876:web:ce41754e58a058e827f321"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
