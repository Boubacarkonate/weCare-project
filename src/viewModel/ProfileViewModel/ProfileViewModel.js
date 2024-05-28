// ProfileViewModel.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, authentication } from '../../../firebase/firebaseConfig';
import User from '../../model/User.model';

export default function ProfileViewModel() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fonction asynchrone pour récupérer les données utilisateur depuis Firebase
        const fetchUserData = async () => {
            try {
                // Récupère l'utilisateur actuel authentifié
                const currentUser = authentication.currentUser;
                if (currentUser) {
                    const userRef = collection(db, 'utilisateurs');
                    const snapshot = await getDocs(userRef);
                    snapshot.forEach((doc) => {
                        // Vérifie si l'ID du document correspond à l'ID de l'utilisateur actuel
                        if (doc.id === currentUser.uid) {
                            // Récupère les données nécessaires du document
                            const { email, username, avatarUrl, isAdmin } = doc.data();
                            // Met à jour l'état avec les données utilisateur récupérées
                            setUserData(new User(email, null, username, avatarUrl, isAdmin, null));
                        }
                    });
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur :', error);
            }
        };

        fetchUserData();  // Appelle la fonction fetchUserData pour récupérer les données utilisateur
    }, []);

    return {
        userData,
    };
}
