import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { authentication, db } from '../../../firebase/firebaseConfig';
import User from './User.model';

const UserManageViewModel = () => {
    const [users, setUsers] = useState([]);

    // Fonction pour créer un nouvel utilisateur
    const createUser = async (userData) => {
        try {
            const newUserRef = await addDoc(collection(db, 'utilisateurs'), userData);
            const newUser = new User(
                userData.email,
                userData.password,
                userData.username,
                userData.avatarUrl,
                userData.isAdmin,
                userData.confirmPassword
            );
            newUser.id = newUserRef.id;
            setUsers([...users, newUser]);
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    };

    // Fonction pour lire tous les utilisateurs depuis la collection "utilisateurs"
    const readUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'utilisateurs'));
            const usersData = [];
            querySnapshot.forEach(doc => {
                const userData = doc.data();
                const user = new User(
                    userData.email,
                    userData.password,
                    userData.username,
                    userData.avatarUrl,
                    userData.isAdmin,
                    userData.confirmPassword
                );
                user.id = doc.id;
                usersData.push(user);
            });
            setUsers(usersData);
        } catch (error) {
            console.error("Error reading users: ", error);
        }
    };

    // Fonction pour mettre à jour un utilisateur
    const updateUser = async (updatedUser) => {
        try {
            await updateDoc(doc(db, 'utilisateurs', updatedUser.id), {
                email: updatedUser.email,
                password: updatedUser.password,
                username: updatedUser.username,
                avatarUrl: updatedUser.avatarUrl,
                isAdmin: updatedUser.isAdmin,
                confirmPassword: updatedUser.confirmPassword
            });
            const updatedUsers = users.map(user => {
                if (user.id === updatedUser.id) {
                    return updatedUser;
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, 'utilisateurs', userId));
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    // Utilisation du useEffect pour charger les utilisateurs une fois que le composant est monté
    useEffect(() => {
        readUsers();
    }, []);

    return {
        users,
        createUser,
        updateUser,
        deleteUser,
    };
};

export default UserManageViewModel;
