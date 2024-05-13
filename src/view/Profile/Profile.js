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
                <View>
                    <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
                </View>
                    <Text style={styles.text}>Username: {userData.username}</Text>
                    <Text style={styles.text}>Email: {userData.email}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
            <Button
                onPress={() => navigation.navigate("UpdateProfile")}
                title='Update'
                containerStyle={{width: '60%', margin: 20, marginBottom:60}}
                buttonStyle={{ backgroundColor:'#38b6ff' }}
            />
            <Button
                onPress={() => navigation.navigate("DeleteProfile")}
                title='Delete'
                containerStyle={{width: '60%'}}
                buttonStyle={{ backgroundColor:'#38b6ff' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 50,
        marginBottom: 70,
        marginTop:10
    },
    text: {
        fontSize: 18,
        margin: 10,
        marginBottom: 30,
    },
});
