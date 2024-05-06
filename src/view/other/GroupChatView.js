// GroupChatView.js
import React from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useGroupChatViewModel } from '../../viewModel/other/GroupChatViewModel';
import { authentication, db } from "../../../firebase/firebaseConfig";

export default function GroupChatView({ route }) {
const uid = route.params.id;
  const { messages, sendMessage } = useGroupChatViewModel(uid);
  const currentUser = authentication.currentUser.uid;

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => sendMessage(newMessages[0].text)} // Envoie seulement le texte du premier nouveau message
        user={{
          _id: currentUser,
        }}
      />
    </View>
  );
};
