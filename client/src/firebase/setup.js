import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyDvdFZ9o1R-JHwChxKzg4ey9Sa_XkFDru4",

    authDomain: "robo-cup-ecec.firebaseapp.com",

    projectId: "robo-cup-ecec",

    storageBucket: "robo-cup-ecec.firebasestorage.app",

    messagingSenderId: "228122202408",

    appId: "1:228122202408:web:0b57e8f077531ddc8fc01d"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);