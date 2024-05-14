// home.js    OKOKOKOKOKOKOKOKOKOKOKOKO
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Button, Pressable } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { authentication, db } from "../../firebase/firebaseConfig";
import { MaterialCommunityIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);

  const logoutUser = async () => {
    authentication.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <Pressable onPress={logoutUser} style={{ marginRight: 10 }}>
                <AntDesign name="logout" size={24} color="#fff" />
            </Pressable>
        ),
        headerStyle: {
            backgroundColor: '#38b6ff',
        },
        headerBackVisible: false,
        title: "WeCare",
        headerTitleAlign: "left",
        headerTitleStyle: { fontWeight: '900', color: 'white' },
    });
}, [navigation, logoutUser]);


  useEffect(() => {
    const unsubscribe = getData();
    return () => unsubscribe(); // Assurez-vous de désabonner correctement lors du démontage du composant
  }, []);

  const getData = () => {
    const docGetUserRef = collection(db, "utilisateurs");
    const userQuery = query(docGetUserRef, where("userUID", "!=", authentication?.currentUser?.uid));

    const docGetGroupsRef = collection(db, "groups");
    const groupQuery = query(docGetGroupsRef, where("id_group", "!=", authentication?.currentUser?.uid));

    const unsubscribeUser = onSnapshot(userQuery, (onSnap) => {
      let userData = [];
      onSnap.docs.forEach((user) => {
        userData.push({ type: "user", ...user.data() });
      });
      setData((prevData) => [...prevData, ...userData]);
    });

    const unsubscribeGroups = onSnapshot(groupQuery, (querySnapshot) => {
      let groupData = [];
      querySnapshot.forEach((doc) => {
        groupData.push({ type: "group", id: doc.id, ...doc.data() });
      });
      setData((prevData) => [...prevData, ...groupData]);
    });

    return () => {
      unsubscribeUser(); // Désabonnez-vous de l'abonnement des utilisateurs
      unsubscribeGroups(); // Désabonnez-vous de l'abonnement des groupes
    };
  };

  const renderItem = ({ item }) => {
    if (item.type === "user") {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Chat", { name: item.username, uid: item.userUID, avatar: item.avatarUrl })}
          style={{ backgroundColor: "#333" }}
        >
          <View style={styles.container}>
            <View style={styles.ownerHolder}>
              <Image source={{ uri: item.avatarUrl }} style={styles.image} />
              <Text style={styles.name}>{item.username}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#000" />
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (item.type === "group") {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("GroupChatScreen", { name: item.name, uid: item.userUID, id: item.id_group })}
          style={{ backgroundColor: "#333" }}
        >
          <View style={styles.container}>
            <View style={styles.ownerHolder}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#000" />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <Pressable onPress={() => navigation.navigate("GroupChat")}>
        <FontAwesome name="group" size={24} color="black" />
      </Pressable>
      {/* <Pressable onPress={() => navigation.navigate("AppointmentCalendar")}>
      <FontAwesome name="calendar" size={24} color="black" />
      </Pressable> */}
      <Pressable onPress={() => navigation.navigate("Calendar")}>
      <FontAwesome name="calendar" size={24} color="black" />
      </Pressable>
      {/* <Pressable onPress={() => navigation.navigate("CalendarScreen")}>
      <FontAwesome name="calendar" size={24} color="black" />
      </Pressable> */}
      <Button title="Album" onPress={() => navigation.navigate("Album")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 5,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
    marginVertical: 10,
  },
  ownerHolder: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
});
