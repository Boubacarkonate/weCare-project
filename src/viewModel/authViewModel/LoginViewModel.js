import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { authentication, db } from '../../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage

export default function LoginViewModel({ navigation }) {
    const [user, setUser] = useState({ email: '', password: '' });
    const [loginAttempts, setLoginAttempts] = useState(0);
    const maxLoginAttempts = 3; // Nombre maximal de tentatives de connexion autorisées

    const loginUser = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(authentication, user.email, user.password);
            const token = await userCredential.user.getIdToken();
            console.log("Utilisateur connecté avec succès");
            console.log('token: ', token);
            // Réinitialiser le nombre de tentatives de connexion après une connexion réussie
            setLoginAttempts(0);
            // Stocker le token localement
            await AsyncStorage.setItem('token', token);
        } catch (err) {
            console.log(err.message);
            // Incrémenter le nombre de tentatives de connexion en cas d'échec de connexion
            setLoginAttempts(loginAttempts + 1);
        }
    };

    useEffect(() => {
        onAuthStateChanged(authentication, async (user) => {
            if (user) {
                const userDocRef = doc(db, "utilisateurs", authentication.currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.role === "admin") { 
                        navigation.replace("Home"); // Rediriger vers la page d'accueil admin si l'utilisateur est admin
                    } else {
                        navigation.replace("HomeUser"); // Rediriger vers la page d'accueil utilisateur sinon
                    }
                } else {
                    console.log("User data not found");
                }
            } else {
                console.log('Utilisateur déconnecté');
            }
        });
        
    }, []); 

    return {
        user,
        setUser,
        loginUser,
        loginAttempts,
        maxLoginAttempts
    };
}
