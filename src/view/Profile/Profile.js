// Profile.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import ProfileViewModel from '../../viewModel/ProfileViewModel/ProfileViewModel';

export default function Profile({ navigation }) {
    const { userData } = ProfileViewModel();

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
                    <Text style={styles.text}>Username: {userData.username}</Text>
                    <Text style={styles.text}>Email: {userData.email}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
            <Button
                onPress={() => navigation.navigate("UpdateProfile")}
                title='Update'
            />
            <Button
                onPress={() => navigation.navigate("DeleteProfile")}
                title='Delete'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // avatar: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 50,
    //     marginBottom: 20,
    // },
    // text: {
    //     fontSize: 18,
    //     marginBottom: 10,
    // },
});
