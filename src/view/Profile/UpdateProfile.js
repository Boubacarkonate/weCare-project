// UpdateProfile.js
import React from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import UpdateProfileViewModel from '../../viewModel/ProfileViewModel/UpdateProfileViewModel';
import { Ionicons } from '@expo/vector-icons';

export default function UpdateProfile() {
    const { user, setUser, updateUserProfile, showImagePickerOptions } = UpdateProfileViewModel();

    return (
        <View style={styles.container}>
             <Input
                placeholder='Enter your email'
                label='Email'
                value={user.email}
                onChangeText={text => setUser({...user, email: text})}
                leftIcon={{ type: 'material', name: 'email' }}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
            />
            <Input
                placeholder='Enter your username'
                label='Username'
                value={user.username}
                onChangeText={text => setUser({...user, username: text})}
                leftIcon={{ type: 'material', name: 'account-circle' }}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
            />
            <View style={styles.containerAvatar}>
                <Text style={styles.introText}>📸 Choisissez votre avatar</Text>

                {!user.avatarUrl && (
                    <Pressable onPress={showImagePickerOptions}>
                        <View style={{ borderRadius: 300, overflow: 'hidden' }}>
                            <Ionicons name="image" size={150} color="grey" />
                        </View>
                    </Pressable>
                )}

                {user.avatarUrl && (
                    <Pressable onPress={showImagePickerOptions}>
                        <Image source={{ uri: user.avatarUrl }} style={styles.image} />
                    </Pressable>
                )}
            </View>

            <Button
                onPress={updateUserProfile}
                style={styles.btn}
                title='Save Changes'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 10
    },
    containerAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 20,
        borderRadius: 50,
    },
    introText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#333',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    inputLabel: {
        color: '#333',
        fontSize: 16,
        // marginBottom: 1,
    },
});
