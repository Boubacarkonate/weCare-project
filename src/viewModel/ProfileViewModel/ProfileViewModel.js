// ProfileViewModel.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, authentication } from '../../../firebase/firebaseConfig';
import User from '../../model/User.model';

export default function ProfileViewModel() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = authentication.currentUser;
                if (currentUser) {
                    const userRef = collection(db, 'utilisateurs');
                    const snapshot = await getDocs(userRef);
                    snapshot.forEach((doc) => {
                        if (doc.id === currentUser.uid) {
                            const userData = doc.data();
                            setUserData(new User(doc.id, userData.email, userData.username, userData.avatarUrl));
                        }
                    });
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur :', error);
            }
        };

        fetchUserData();
    }, []);

    return {
        userData,
    };
}
