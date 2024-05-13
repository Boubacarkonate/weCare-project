//RegisterViewModel
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { authentication, db } from '../../../firebase/firebaseConfig';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import User from '../../model/User.model';
import { Alert } from 'react-native';
import bcrypt from 'bcryptjs'; 

export default function RegisterViewModel() {
    const [user, setUser] = useState(new User('', '', '', null, false));
    const [error, setError] = useState(null); // Ajout du state pour gérer les erreurs

    const registerUser = async () => {
        try {
            // Vérification des données utilisateur
            if (!isValidUserData(user)) {
                throw new Error('Invalid user data. Please enter valid information.');
            }
            
            // Vérification que les deux mots de passe correspondent
            if (user.password !== user.confirmPassword) {
                throw new Error('Passwords do not match. Please make sure the passwords match.');
            }
            // Hash the password
            const hashedPassword = await hashPassword(user.password); 

            // Création de l'utilisateur dans Firebase Authentication
            const credentials = await createUserWithEmailAndPassword(authentication, user.email, user.password);
            const userUID = credentials.user.uid;

            // Enregistrement des informations utilisateur dans Firestore
            const docUserRef = doc(db, 'utilisateurs', userUID);
            const role = user.isAdmin ? 'admin' : 'user';
            await setDoc(docUserRef, {
                avatarUrl: user.avatarUrl ? user.avatarUrl : 'https://static.thenounproject.com/png/363640-200.png',
                username: user.username,
                email: user.email,
                password: hashedPassword, // Store hashed password
                userUID,
                role,
                createdAt: serverTimestamp()
            });
            
            // Envoi de l'e-mail de vérification
            await sendEmailVerification(credentials.user);
            
            // Affichage d'une confirmation à l'utilisateur
            Alert.alert('Success', 'Registered successfully');
        } catch (error) {
            console.error('Registration error:', error.message);
            setError(error.message); // Set error state with the error message
            Alert.alert('Error', 'An error occurred during registration. Please try again.');
        }
    };

    // Fonction de validation des données utilisateur
    const isValidUserData = (userData) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'e-mail
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{14,}$/; // Regex pour valider le mot de passe
        return userData.email && userData.password && userData.confirmPassword && userData.username && emailRegex.test(userData.email) && passwordRegex.test(userData.password);
    };

    const hashPassword = async (password) => {
        const saltRounds = 10; // Nombre de tours de hachage
        return await bcrypt.hash(password, saltRounds);
    };

    return {
        user,
        setUser,
        registerUser,
        error // Ajout du state d'erreur
    };
}
