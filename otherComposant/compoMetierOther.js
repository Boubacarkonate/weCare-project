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


