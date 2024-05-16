// UpdateProfileViewModel.js
import { useState, useEffect } from 'react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { authentication, db, storage } from '../../../firebase/firebaseConfig';
import User from '../../model/User.model';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';

export default function UpdateProfileViewModel() {
    const [user, setUser] = useState(new User('', '', '', '', false));

    const navigation = useNavigation();

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

            // Téléchargement de l'image si une image d'avatar est sélectionnée
            const avatarUrl = user.avatarUrl ? await uploadImage(user.avatarUrl) : 'https://static.thenounproject.com/png/363640-200.png';

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

       // Fonction pour choisir une image depuis la bibliothèque
       const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUser({ ...user, avatarUrl: result.assets[0].uri });
        }
    };

    // Fonction pour prendre une photo avec l'appareil photo
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUser({ ...user, avatarUrl: result.assets[0].uri });
        }
    };

    // Fonction pour afficher les options de sélection d'image
    const showImagePickerOptions = () => {
        Alert.alert(
            'Choisissez une option 📸',
            'Voulez-vous choisir une image de votre bibliothèque ou prendre une nouvelle photo?',
            [
                {
                    text: 'Choisir de la bibliothèque',
                    onPress: pickImage,
                },
                {
                    text: 'Prendre une photo',
                    onPress: takePhoto,
                },
                {
                    text: 'Annuler',
                    onPress: () => {},
                    style: 'cancel',
                },
            ]
        );
    };

    // Fonction pour télécharger l'image dans Firebase Storage et obtenir l'URL de téléchargement
    const uploadImage = async (imageUri) => {
        try {
            console.log("Image sélectionnée :", imageUri);
            const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
            const storageRef = ref(storage, `images/${filename}`);
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const uploadTask = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(uploadTask.ref);
            console.log("Image téléchargée avec succès vers Firebase Storage", downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Erreur lors du téléchargement de l'image vers Firebase Storage :", error);
            throw error;
        }
    };

    return {
        user,
        setUser,
        updateUserProfile,
        showImagePickerOptions 
    };
}
