//firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence  } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Config from "./Config";
// import {FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

// import AsyncStorage from '@react-native-async-storage/async-storage'; // Importez AsyncStorage

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication= getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialisez Firebase Auth avec AsyncStorage pour la persistance
// const authWithPersistence = getReactNativePersistence(AsyncStorage);
// const authentication = getAuth(app, authWithPersistence);

export { app,  authentication, db, storage};
