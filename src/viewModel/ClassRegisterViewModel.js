//ClassRegisterViewModel
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { authentication, db } from '../../firebase/firebaseConfig';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import User from '../model/User.model';

export default class ClassRegisterViewModel {
    constructor() {
        this.user = new User('', '', ''); // Assurez-vous que User a les propriétés nécessaires
        this.error = null;
    }

    async registerUser() {
        try {
            // Création de l'utilisateur dans Firebase Authentication
            const credentials = await createUserWithEmailAndPassword(authentication, this.user.email, this.user.password);
            const userUID = credentials.user.uid;

            // Enregistrement des informations utilisateur dans Firestore
            const docUserRef = doc(db, 'utilisateurs', userUID);
            await setDoc(docUserRef, {
                username: this.user.username,
                email: this.user.email,
                // Vous n'avez pas besoin de hacher le mot de passe avec bcrypt pour Firebase
                password: this.user.password, 
                userUID,
                role: 'user', // Définissez le rôle ici
                createdAt: serverTimestamp()
            });
            
            // Envoi de l'e-mail de vérification
            await sendEmailVerification(credentials.user);
            
            // Affichage d'une confirmation à l'utilisateur
            Alert.alert('Success', 'Registered successfully');
            console.log('inscription ok');
        } catch (error) {
            console.error('Registration error:', error.message);
            this.error = error.message;
            Alert.alert('Error', 'An error occurred during registration. Please try again.');
        }
    }
}
