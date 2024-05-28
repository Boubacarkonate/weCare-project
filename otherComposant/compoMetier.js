import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { authentication, db } from '../../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import User from '../../model/User.model'; 

export default function LoginViewModel({ navigation }) {
    const [user, setUser] = useState(new User('', '', '', '', false, '')); 
    const [loginAttempts, setLoginAttempts] = useState(0);
    const maxLoginAttempts = 3; // Règle métier : Nombre maximum de tentatives de connexion

    // Logique métier : Authentification de l'utilisateur
    const loginUser = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(authentication, user.email, user.password);
            const token = await userCredential.user.getIdToken();
            console.log("Utilisateur connecté avec succès");
            console.log('token: ', token);
           
            setLoginAttempts(0); // Logique métier : Réinitialisation des tentatives de connexion en cas de succès
         
            await AsyncStorage.setItem('token', token); // Logique métier : Stockage du jeton utilisateur
        } catch (err) {
            console.log(err.message);
           
            setLoginAttempts(loginAttempts + 1); // Logique métier : Incrémentation des tentatives de connexion en cas d'échec
        }
    };

    // Logique métier : Suivi de l'état d'authentification de l'utilisateur
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, async (firebaseUser) => {
            if (firebaseUser) {
                // Logique métier : Récupération des données utilisateur depuis Firestore
                const userDocRef = doc(db, "utilisateurs", firebaseUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const currentUser = new User(
                        userData.email,
                        userData.username,
                        userData.role
                    );
                    setUser(currentUser);
                    // Règle métier : Redirection basée sur le rôle de l'utilisateur
                    if (userData.role === "admin") { 
                        navigation.replace("Home"); 
                    } else {
                        navigation.replace("HomeUser"); 
                    }
                } else {
                    console.log("User data not found");
                }
            } else {
                console.log('Utilisateur déconnecté');
            }
        });

        return () => unsubscribe();
    }, []); 

    return {
        user,
        setUser,
        loginUser,
        loginAttempts,
        maxLoginAttempts
    };
}
