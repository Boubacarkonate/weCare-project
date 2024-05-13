// UpdateProfileViewModel.js
import { useState, useEffect } from 'react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { authentication, db } from '../../../firebase/firebaseConfig';
import User from '../../model/User.model';
import { Alert } from 'react-native';

export default function UpdateProfileViewModel() {
    const [user, setUser] = useState(new User('', '', '', '', false));

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = doc(db, 'utilisateurs', authentication.currentUser.uid);
                const snapshot = await getDoc(userDoc);
                if (snapshot.exists()) {
                    const userData = snapshot.data();
                    const { email, username, avatarUrl } = userData;
                    setUser(new User(email, '', username, avatarUrl, false));
                    // Ne pas récupérer le mot de passe de la base de données
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const updateUserProfile = async () => {
        try {
            const userDoc = doc(db, 'utilisateurs', authentication.currentUser.uid);
            await updateDoc(userDoc, {
                email: user.email,
                username: user.username,
                avatarUrl: user.avatarUrl,
                updateDate: serverTimestamp()
            });
            console.log('User profile updated successfully');
            Alert.alert('Success', 'Profile updated successfully');
            setTimeout(() => {
                if (user.role === 'admin') {
                    navigation.navigate('Home');
                } else {
                    navigation.navigate('HomeUser');
                }
                
            }, 2000);
        } catch (error) {
            console.error('Error updating user profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    return {
        user,
        setUser,
        updateUserProfile,
    };
}
