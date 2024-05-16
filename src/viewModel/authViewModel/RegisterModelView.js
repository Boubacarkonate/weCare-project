import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { authentication, db, storage } from '../../../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import User from '../../model/User.model';
import { Alert } from 'react-native';
// import bcrypt from 'bcryptjs';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterViewModel() {
    // États pour l'utilisateur et les erreurs
    const [user, setUser] = useState(new User('', '', '', null, false));
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    // Fonction pour enregistrer l'utilisateur
    const registerUser = async () => {
        try {
            // Vérification des données utilisateur
            if (!isValidUserData(user)) {
                throw new Error('Données utilisateur invalides. Veuillez entrer des informations valides.');
            }

            // Vérification que les deux mots de passe correspondent
            if (user.password !== user.confirmPassword) {
                throw new Error('Les mots de passe ne correspondent pas. Veuillez vérifier les mots de passe.');
            }

            // // Hachage du mot de passe
            // const hashedPassword = await hashPassword(user.password);

            // Création de l'utilisateur dans Firebase Authentication
            const credentials = await createUserWithEmailAndPassword(authentication, user.email, user.password);
            const userUID = credentials.user.uid;

            // Téléchargement de l'image si une image d'avatar est sélectionnée
            const avatarUrl = user.avatarUrl ? await uploadImage(user.avatarUrl) : 'https://static.thenounproject.com/png/363640-200.png';

            // Enregistrement des informations utilisateur dans Firestore
            const docUserRef = doc(db, 'utilisateurs', userUID);
            const role = user.isAdmin ? 'admin' : 'user';
            await setDoc(docUserRef, {
                avatarUrl,
                username: user.username,
                email: user.email,
                // password: hashedPassword,
                password: user.password,
                userUID,
                role,
                createdAt: serverTimestamp()
            });

            // Envoi de l'e-mail de vérification
            await sendEmailVerification(credentials.user);

            // Affichage d'une confirmation à l'utilisateur
            Alert.alert('Succès', 'Enregistrement réussi');
            if (user.isAdmin === 'admin') {
                navigation.navigate('Home');
            } else {
                navigation.navigate('HomeUser');
            }
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement :', error.message);
            setError(error.message);
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
        }
    };

    // Fonction de validation des données utilisateur
    const isValidUserData = (userData) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{14,}$/;
        return userData.email && userData.password && userData.confirmPassword && userData.username && emailRegex.test(userData.email) && passwordRegex.test(userData.password);
    };

    // Fonction pour hacher le mot de passe
    // const hashPassword = async (password) => {
    //     if (typeof password !== 'string') {
    //         throw new Error('Le mot de passe doit être une chaîne de caractères');
    //     }
    //     const saltRounds = 10;
    //    return  await bcrypt.hash(password, saltRounds);
    // };

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
        registerUser,
        showImagePickerOptions,
        error
    };
}
