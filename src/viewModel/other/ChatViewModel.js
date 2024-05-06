// ChatViewModel.js

import { useState, useEffect, useCallback } from "react";
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, addDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import Message from "../../model/Message.model";

const useChatViewModel = (uid, currentUser, authentication, db, storage) => {
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);

    useEffect(() => {
        const chatId = uid > currentUser ? `${uid + "-" + currentUser}` : `${currentUser + "-" + uid}`;
        const documentRef = doc(db, "chatRooms", chatId);
        const collectionRef = collection(documentRef, "messages");
        const q = query(collectionRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const allMessages = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return new Message(
                    doc.id,
                    data.text,
                    data.image,
                    data.documentFile,
                    data.createdAt.toDate(),
                    data.sentBy,
                    data.sentTo
                );
            });
            setMessages(allMessages);
        });

        return () => unsubscribe();
    }, [currentUser, uid, db]);

    const sendMessage = useCallback(async (message) => {
        const chatId = uid > currentUser ? `${uid + "-" + currentUser}` : `${currentUser + "-" + uid}`;
        const documentRef = doc(db, "chatRooms", chatId);
        const collectionRef = collection(documentRef, "messages");

        if (image) {
            await uploadImage();
            message.image = image;
            setImage(null);
        }

        if (documentFile) {
            const downloadURL = await uploadDocumentFile(documentFile.uri, documentFile.name);
            message.documentFile = downloadURL;
            setDocumentFile(null);
        }

        await addDoc(collectionRef, {
            text: message.text,
            image: message.image || null,
            documentFile: message.documentFile || null,
            createdAt: serverTimestamp(),
            sentBy: currentUser,
            sentTo: uid,
        });
    }, [currentUser, uid, image, documentFile, db]);

    const deleteMessage = async (messageToDelete) => {
        const chatId = uid > currentUser ? `${uid + "-" + currentUser}` : `${currentUser + "-" + uid}`;
        const documentRef = doc(db, "chatRooms", chatId);
        const collectionRef = collection(documentRef, "messages");

        if (messageToDelete.image) {
            await deleteImgToStorage(messageToDelete.image);
        }

        if (messageToDelete.documentFile) {
            await deleteDocumentToStorage(messageToDelete.documentFile);
        }

        await deleteDoc(doc(collectionRef, messageToDelete.id));
    };

    const uploadImage = async () => {
        try {
          console.log("Image sélectionnée :", image); // Vérifier l'URI de l'image
            const filename = image.substring(image.lastIndexOf("/") + 1);
            const storageRef = ref(storage, `images/${filename}`);
            const response = await fetch(image);
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

    const uploadDocumentFile = async (documentUri, fileName) => {
        try {
            const filename = fileName || documentUri.substring(documentUri.lastIndexOf("/") + 1);
            const storageRef = ref(storage, `documents/${filename}`);
            const response = await fetch(documentUri);
            const blob = await response.blob();
            const uploadTask = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(uploadTask.ref);
            console.log("Document téléchargé avec succès vers Firebase Storage", downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Erreur lors du téléchargement du document vers Firebase Storage :", error);
            throw error;
        }
    };

    const deleteImgToStorage = async (imageUrl) => {
        try {
            const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            const storageRef = ref(storage, `images/${filename}`);
            await deleteObject(storageRef);
            console.log("Image supprimée avec succès de Firebase Storage");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'image de Firebase Storage :", error);
            throw error;
        }
    };

    const deleteDocumentToStorage = async (document) => {
        try {
            const filename = document.substring(document.lastIndexOf("/") + 1);
            const storageRef = ref(storage, `documents/${filename}`);
            await deleteObject(storageRef);
            console.log("document supprimé avec succès de Firebase Storage");
        } catch (error) {
            console.error("Erreur lors de la suppression du document de Firebase Storage :", error);
            throw error;
        }
    };

    return { messages, sendMessage, deleteMessage, setImage, setDocumentFile };
};

export default useChatViewModel;