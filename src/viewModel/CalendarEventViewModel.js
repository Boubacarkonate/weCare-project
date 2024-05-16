import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, authentication } from "../../firebase/firebaseConfig";
import { useState } from 'react';
import { Alert } from 'react-native';
import EventCalendar from "../model/EventCalendar.model";

const useCalendarEventViewModel = () => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [newEventText, setNewEventText] = useState('');

  const fetchEvents = async () => {
    try {
      const eventsCollectionRef = collection(db, 'events');
      const querySnapshot = await getDocs(eventsCollectionRef);
      const formattedEvents = {};

      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const eventDate = eventData.date;
        const eventName = eventData.name;
        const event = new EventCalendar(eventName,eventDate, );
        
        if (!formattedEvents[eventDate]) {
          formattedEvents[eventDate] = [];
        }

        formattedEvents[eventDate].push(event);
      });

      setItems(formattedEvents);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
      Alert.alert("Une erreur s'est produite lors de la récupération des événements. Veuillez réessayer.");
    }
  };

  const saveEvent = async () => {
    try {
      const currentUser = authentication.currentUser;
      const userId = currentUser.uid;
  
      const eventsCollectionRef = collection(db, 'events');
      await addDoc(eventsCollectionRef, {
        date: selectedDate,
        name: newEventText,
        createdBy: {
          userId: userId,
        },
        createdAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  };
  

  // const deleteEvent = async (eventId) => {
  //   try {
  //     const eventDocRef = doc(db, 'events', eventId);
  //     await deleteDoc(eventDocRef);
  //     // Actualiser la liste des événements après la suppression
  //     await fetchEvents();
  //     Alert.alert("Événement supprimé avec succès !");
  //   } catch (error) {
  //     console.error("Erreur lors de la suppression de l'événement :", error);
  //     Alert.alert("Une erreur s'est produite lors de la suppression de l'événement. Veuillez réessayer.");
  //   }
  // };

  return {
    items,
    selectedDate,
    newEventText,
    fetchEvents,
    saveEvent,
    setSelectedDate,
    setNewEventText, 
    // deleteEvent
  };
};

export default useCalendarEventViewModel;
