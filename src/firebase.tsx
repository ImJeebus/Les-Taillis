// Import the functions you need from the SDKs you need
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBzcDd71VMSjD38uqr4FOptg4kKP5vXOh8',
  authDomain: 'letaillis-27218.firebaseapp.com',
  projectId: 'letaillis-27218',
  storageBucket: 'letaillis-27218.appspot.com',
  messagingSenderId: '822652616299',
  appId: '1:822652616299:web:82c3e46c139a2a6b913b2e',
  measurementId: 'G-8Q5JWVFXK9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, firestore };
