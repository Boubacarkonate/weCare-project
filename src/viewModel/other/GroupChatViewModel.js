// GroupChatViewModel.js
import { useState, useEffect, useCallback } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { authentication, db } from "../../../firebase/firebaseConfig";

export const useGroupChatViewModel = (route) => {
  const groupId = route.params.id; // Utilisez groupId au lieu de uid pour être cohérent
  const [messages, setMessages] = useState([]);
  const currentUser = authentication.currentUser.uid;

  useEffect(() => {
    if (groupId) {
      const messagesRef = collection(db, 'groups', groupId, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: {
            _id: doc.data().user._id,
          },
        }));
        setMessages(updatedMessages);
      }, (error) => {
        console.error('Erreur lors de la récupération des messages :', error);
      });
      return () => unsubscribe();
    }
  }, [groupId]);

  const sendMessage = useCallback(async (text) => {
    try {
      if (groupId && text && currentUser) {
        const message = {
          text: text,
          createdAt: serverTimestamp(),
          user: {
            _id: currentUser,
          },
        };
        await addDoc(collection(db, 'groups', groupId, 'messages'), message);
      } else {
        console.error('Impossible d\'envoyer le message : groupId, text ou currentUser est indéfini.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  }, [groupId, currentUser]);

  return { messages, sendMessage };
};
