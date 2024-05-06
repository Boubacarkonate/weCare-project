// groupModel.js
import { collection, addDoc, serverTimestamp, updateDoc, doc, arrayUnion, getDocs } from 'firebase/firestore';
import { db } from "../../firebase/firebaseConfig";

export const createGroup = async (groupName, selectedMembers) => {
  try {
    const groupRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      members: selectedMembers,
      createdAt: serverTimestamp(),
    });
    const groupId = groupRef.id;
    await updateDoc(doc(db, 'groups', groupId), { id_group: groupId });
    await addUsersToGroup(groupId, selectedMembers);
    return groupId;
  } catch (error) {
    console.error('Erreur lors de la création du groupe :', error);
    throw error;
  }
};

const addUsersToGroup = async (groupId, selectedMembers) => {
  try {
    await updateDoc(doc(db, 'groups', groupId), {
      members: arrayUnion(...selectedMembers),
    });
    console.log('Utilisateurs ajoutés avec succès au groupe');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des utilisateurs au groupe:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  const usersRef = collection(db, 'utilisateurs');
  const usersSnapshot = await getDocs(usersRef);
  return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
