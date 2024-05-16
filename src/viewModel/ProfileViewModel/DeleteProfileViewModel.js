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
            const currentUser = authentication.currentUser;
            if (currentUser) {
                // Supprimer l'utilisateur de Firestore
                const userDocRef = doc(db, 'utilisateurs', currentUser.uid); // Utiliser authentication.currentUser.uid
                await deleteDoc(userDocRef);
                console.log('Utilisateur supprimé de la BDD');
    
                // Supprimer l'utilisateur de l'authentification Firebase
                await deleteUser(currentUser);
                console.log('Utilisateur supprimé de l\'authentification Firebase');
    
                // Rediriger l'utilisateur vers la page de connexion ou afficher un message de confirmation
                navigation.navigate('Login');
            } else {
                // Afficher un message d'erreur si aucun utilisateur n'est actuellement connecté
                console.error('Aucun utilisateur n\'est actuellement authentifié.');
                Alert.alert('Erreur', 'Aucun utilisateur n\'est actuellement authentifié.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
            // Afficher un message d'erreur à l'utilisateur
            Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression de votre compte.');
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
