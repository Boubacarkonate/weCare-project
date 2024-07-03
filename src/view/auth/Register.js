//RegisterView
import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import useRegister from '../../viewModel/authViewModel/RegisterModelView';
import Checkbox from 'expo-checkbox';


export default function Register() {
    const { user, setUser, registerUser, showImagePickerOptions, error } = useRegister();

    return (
        <ScrollView 
            contentContainerStyle={styles.container} 
            showsHorizontalScrollIndicator={true}
            indicatorStyle="pink" // Couleur de la barre de défilement
            style={{ width: '100%', height: '100%', scrollbarWidth: 10, scrollbarColor: 'yellow' }} // Style pour la ScrollView
        >
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
                placeholder='Enter your password'
                label='Password'
                value={user.password}
                onChangeText={text => setUser({...user, password: text})}
                leftIcon={{ type: 'material', name: 'lock' }}
                // secureTextEntry
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
            />
            <Input
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                leftIcon={{ type: 'material', name: 'lock' }}
                // secureTextEntry
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
                <Text style={styles.introText}>Choisissez votre avatar</Text>

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

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={user.isAdmin}
                    onValueChange={value => setUser({...user, isAdmin: value})}
                    color={user.isAdmin ? '#4630EB' : undefined}
                />
                <Text style={styles.label}>Administrateur</Text>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button
                onPress={registerUser}
                title='Register'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
    btnContainer: {
        width: '100%',
        marginTop: 20,
        borderRadius:15
    },
    btn: {
        backgroundColor: '#38b6ff'
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});