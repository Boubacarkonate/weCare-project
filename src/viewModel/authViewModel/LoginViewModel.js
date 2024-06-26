// import { useState, useEffect } from 'react';
// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { authentication, db } from '../../../firebase/firebaseConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import User from '../../model/User.model';

// export default function LoginViewModel({ navigation }) {
//     // Initialiser l'état utilisateur avec une instance vide de User
//     const [user, setUser] = useState(new User('', '', '', '', false, ''));
//     const [loginAttempts, setLoginAttempts] = useState(0);
//     const maxLoginAttempts = 3;

//     // Fonction pour connecter l'utilisateur
//     const loginUser = async () => {
//         try {
//             // Tentative de connexion avec Firebase Authentication
//             const userCredential = await signInWithEmailAndPassword(authentication, user.email, user.password);
//             const token = await userCredential.user.getIdToken();
//             console.log("Utilisateur connecté avec succès");
//             console.log('token: ', token);

//             // Réinitialiser les tentatives de connexion après une connexion réussie
//             setLoginAttempts(0);

//             // Stocker le token localement avec AsyncStorage
//             await AsyncStorage.setItem('token', token);
//         } catch (err) {
//             console.log(err.message);

//             // Incrémenter le nombre de tentatives de connexion en cas d'échec
//             setLoginAttempts(loginAttempts + 1);
//         }
//     };

//     // Utiliser useEffect pour surveiller les changements d'état de l'authentification
//     useEffect(() => {
//         onAuthStateChanged(authentication, async (firebaseUser) => {
//             if (firebaseUser) {
//                 // Récupérer les données utilisateur depuis Firestore
//                 const userDocRef = doc(db, "utilisateurs", firebaseUser.uid);
//                 const userDocSnap = await getDoc(userDocRef);
//                 if (userDocSnap.exists()) {
//                     const userData = userDocSnap.data();
//                     const role = user.isAdmin ? 'admin' : 'user';
//                     // Mettre à jour l'instance utilisateur avec les données récupérées
//                     const updatedUser = new User(
//                         userData.email,
//                         '', // Ne pas stocker le mot de passe
//                         userData.username,
//                         userData.avatarUrl,
//                         role,
//                         '' // Ne pas stocker le mot de passe de confirmation
//                     );
//                     setUser(updatedUser);

//                     // Redirection en fonction du rôle de l'utilisateur
//                     if (userData.role === "admin") {
//                         navigation.replace("Home"); // Rediriger vers la page d'accueil admin
//                     } else {
//                         navigation.replace("HomeUser"); // Rediriger vers la page d'accueil utilisateur
//                     }
//                 } else {
//                     console.log("User data not found");
//                 }
//             } else {
//                 console.log('Utilisateur déconnecté');
//             }
//         });
//     }, []); // L'effet ne s'exécute qu'une fois après le montage du composant

//     return {
//         user, // L'utilisateur actuel
//         setUser, // Fonction pour mettre à jour l'utilisateur
//         loginUser, // Fonction pour tenter de connecter l'utilisateur
//         loginAttempts, // Le nombre actuel de tentatives de connexion
//         maxLoginAttempts // Le nombre maximal de tentatives de connexion autorisées
//     };
// }




// import { useState, useEffect } from 'react';
// import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { authentication, db } from '../../../firebase/firebaseConfig';
// import User from '../../model/User.model';

// export default function LoginViewModel({ navigation }) {
//     const [user, setUser] = useState(new User('', '', '', '', false, ''));
//     const [loginAttempts, setLoginAttempts] = useState(0);
//     const maxLoginAttempts = 3;

//     const loginUser = async () => {
//         try {
//             const userCredential = await signInWithEmailAndPassword(authentication, user.email, user.password);
//             setLoginAttempts(0);
//         } catch (err) {
//             console.log(err.message);
//             setLoginAttempts(loginAttempts + 1);
//         }
//     };

//     useEffect(() => {
//         onAuthStateChanged(authentication, async (firebaseUser) => {
//             if (firebaseUser) {
//                 const userDocRef = doc(db, "utilisateurs", firebaseUser.uid);
//                 const userDocSnap = await getDoc(userDocRef);
//                 if (userDocSnap.exists()) {
//                     const userData = userDocSnap.data();
//                     const role = user.isAdmin ? 'admin' : 'user';
//                     const updatedUser = new User(userData.email,'', userData.username, userData.avatarUrl, role,'' );
//                     setUser(updatedUser);

//                     if (userData.role === "admin") {
//                         navigation.replace("Home"); 
//                     } else {
//                         navigation.replace("HomeUser"); 
//                     }
//                 } else {
//                     console.log("Utilisateur non trouvéyy");
//                 }
//             } else {
//                 console.log('Utilisateur déconnecté');
//             }
//         });
//     }, []); 

//     return {
//         user, 
//         setUser, 
//         loginUser, 
//         loginAttempts, 
//         maxLoginAttempts 
//     };
// }


                                                /////////////////////////////////////////////////////



import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { authentication, db } from '../../../firebase/firebaseConfig';
import User from '../../model/User.model';

export default function LoginViewModel({ navigation }) {
    const [user, setUser] = useState(new User('', '', '', '', false, ''));
    const [loginAttempts, setLoginAttempts] = useState(0);
    const maxLoginAttempts = 3;

    // Logique métier : Gestion de la connexion utilisateur
    const loginUser = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(authentication, user.email, user.password);
            setLoginAttempts(0);
        } catch (err) {
            console.log(err.message);
            setLoginAttempts(loginAttempts + 1);

            // Règle métier : Limite de tentatives de connexion
            if (loginAttempts + 1 >= maxLoginAttempts) {
                // Actions supplémentaires à prendre en cas de dépassement de la limite
                console.log("Nombre maximal de tentatives de connexion atteint.");
                // Par exemple, verrouiller le compte ou demander une récupération de mot de passe
            }
        }
    };

    useEffect(() => {
        // Logique métier : Mise à jour de l'utilisateur authentifié
        onAuthStateChanged(authentication, async (firebaseUser) => {
            if (firebaseUser) {
                const userDocRef = doc(db, "utilisateurs", firebaseUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const role = user.isAdmin ? 'admin' : 'user';
                    const updatedUser = new User(userData.email,'', userData.username, userData.avatarUrl, role,'' );
                    setUser(updatedUser);

                    // Règle métier : Redirection en fonction du rôle de l'utilisateur
                    if (userData.role === "admin") {
                        navigation.replace("Home"); 
                    } else {
                        navigation.replace("HomeUser"); 
                    }
                } else {
                    console.log("Utilisateur non trouvé");
                }
            } else {
                console.log('Utilisateur déconnecté');
            }
        });
    }, []); 

    return {
        user, 
        setUser, 
        loginUser, 
        loginAttempts, 
        maxLoginAttempts 
    };
}


