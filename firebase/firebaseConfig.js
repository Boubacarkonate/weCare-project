import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence  } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import AsyncStorage from '@react-native-async-storage/async-storage'; // Importez AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyBZ4bfQXRF3n6XfkKIG9H1fBVoO-MqqqEg",
  authDomain: "project-wecare.firebaseapp.com",
  projectId: "project-wecare",
  storageBucket: "project-wecare.appspot.com",
  messagingSenderId: "772381402792",
  appId: "1:772381402792:web:f8f647959db4a67dff449d"
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
