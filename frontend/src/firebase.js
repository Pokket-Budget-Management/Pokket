// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC6hUtiUKiaMCcoQCAiaR0M0b5wsLTvtqc",
	authDomain: "pokket-c55b4.firebaseapp.com",
	projectId: "pokket-c55b4",
	storageBucket: "pokket-c55b4.appspot.com",
	messagingSenderId: "462660689245",
	appId: "1:462660689245:web:b9693a9e5315dab1915cb4",
	measurementId: "G-2422PMHLG5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initalize Firebase Authentication
const auth = getAuth(app);
export { auth, db };
