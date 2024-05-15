import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { authentication, db, storage } from "../../firebase/firebaseConfig";

export default function GroupPhotoAlbum({ route }) {
  const groupId = route.params.id;
  const [groupPhotos, setGroupPhotos] = useState([]);

  useEffect(() => {
    const fetchGroupPhotos = async () => {
      try {
        const photosRef = collection(db, 'photos');
        const q = query(photosRef, where('groupId', '==', groupId));
        const querySnapshot = await getDocs(q);
        const photosData = querySnapshot.docs.map(doc => doc.data().imageUrl);
        setGroupPhotos(photosData);
      } catch (error) {
        console.error('Erreur lors de la récupération des photos du groupe :', error);
      }
    };
    fetchGroupPhotos();
  }, [groupId]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={groupPhotos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 200, height: 200, margin: 5 }} />
        )}
      />
    </View>
  );
};
