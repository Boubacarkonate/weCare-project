// GroupChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import { createMessage, fetchMessages } from '../../model/Group.model'; // Importation de la logique de modèle commun
import { authentication, db } from "../../../firebase/firebaseConfig";

export default function GroupChatScreen({ route }) {
  const uid = route.params.id;
  const [messages, setMessages] = useState([]);
  const currentUser = authentication.currentUser.uid;

  useEffect(() => {
    const fetchMessagesData = async () => {
      const messagesData = await fetchMessages(uid);
      setMessages(messagesData);
    };
    fetchMessagesData();
  }, [uid]);

  const onSend = useCallback(async (newMessages = []) => {
    try {
      if (uid && newMessages.length > 0 && currentUser) {
        const message = {
          _id: newMessages[0]._id,
          text: newMessages[0].text,
          createdAt: newMessages[0].createdAt,
          user: {
            _id: currentUser,
          },
        };
        await createMessage(uid, message);
      } else {
        console.error('Impossible d\'envoyer le message : uid, newMessages ou currentUser est indéfini.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  }, [uid, currentUser]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: currentUser,
        }}
      />
    </View>
  );
};
