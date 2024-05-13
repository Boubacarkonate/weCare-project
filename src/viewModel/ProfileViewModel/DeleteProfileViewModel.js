import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteUser } from 'firebase/auth';
import { authentication, db } from '../../../firebase/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

export default function DeleteProfileViewModel() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            // Vérifier si un utilisateur est actuellement authentifié
            if (authentication.currentUser) {
                // Supprimer l'utilisateur de l'authentification Firebase
                await deleteUser(authentication.currentUser);
                console.log('suppression Authentication');
    
                // Supprimer l'utilisateur de Firestore
                const userDocRef = doc(db, 'utilisateurs', authentication.currentUser.uid); // Utiliser authentication.currentUser.uid
                await deleteDoc(userDocRef);
                console.log('utilisateur deleted en bdd');
    
                // Rediriger l'utilisateur vers la page de connexion ou afficher un message de confirmation
                navigation.navigate('Login');
            } else {
                // Afficher un message d'erreur si aucun utilisateur n'est actuellement connecté
                console.error('No user is currently authenticated.');
                Alert.alert('Error', 'No user is currently authenticated.');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            // Afficher un message d'erreur à l'utilisateur
            Alert.alert('Error', 'An error occurred while deleting your account.');
        }
    };
    
    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const confirmDeleteAccount = () => {
        handleDeleteAccount();
        hideModal();
    };

    return {
        modalVisible,
        showModal,
        hideModal,
        confirmDeleteAccount,
    };
}
