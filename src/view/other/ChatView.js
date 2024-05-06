import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import useChatViewModel from "../../viewModel/other/ChatViewModel";
import Message from "../../model/Message.model";
import { authentication, db, storage } from "../../../firebase/firebaseConfig";

const ChatView = ({ route }) => {
    const uid = route.params.uid;
    const currentUser = authentication?.currentUser?.uid;
    const navigation = useNavigation();
    const { messages, sendMessage, deleteMessage, setImage, setDocumentFile } = useChatViewModel(uid, currentUser, authentication, db, storage);

    const onSend = (messagesArray) => {
        sendMessage(messagesArray[0]);
    };

    const renderSendButton = (props) => {
        // Code pour afficher un bouton d'envoi personnalisé
    };

    const renderCustomAccessory = () => {
        // Code pour afficher un composant d'accessoire personnalisé
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            renderSend={renderSendButton}
            renderAccessory={renderCustomAccessory}
            // Autres props de GiftedChat...
        />
    );
};

const styles = StyleSheet.create({
    headerRightBtn: {
        flexDirection: "row",
    },
    // Ajoutez d'autres styles ici...
});

export default ChatView;