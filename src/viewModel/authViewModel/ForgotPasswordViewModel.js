import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import User from '../../model/User.model'; // Importer le modèle User
import { authentication, db } from '../../../firebase/firebaseConfig'; // Importer authentication et db depuis firebaseConfig
import { updateDoc } from 'firebase/firestore';

export default function ForgotPasswordViewModel() {
    const [user, setUser] = useState(new User(''));

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(authentication, user.email);
            Alert.alert('Success', 'Un email de réinitialisation de mot de passe a été envoyé.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', 'Une erreur s\'est produite lors de l\'envoi de l\'email de réinitialisation de mot de passe.');
        }
    };

    const updateUserPasswordInDatabase = async (newPassword) => {
        try {
            // Mettre à jour le mot de passe de l'utilisateur dans Firebase Authentication
            await authentication.currentUser.updatePassword(newPassword);
            console.log('Password updated in Firebase Authentication');
            
            // Mettre à jour le mot de passe dans le document utilisateur dans Firestore
            const userRef = db.collection('utilisateurs').doc(authentication.currentUser.uid);
            await updateDoc(userRef, {
                password: newPassword,
            });
            console.log('Password updated in Firestore document');
            
            Alert.alert('Success', 'Mot de passe mis à jour avec succès');
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Une erreur s\'est produite lors de la mise à jour du mot de passe');
        }
    };

    return {
        user,
        setUser,
        handleResetPassword,
        updateUserPasswordInDatabase,
    };
}
