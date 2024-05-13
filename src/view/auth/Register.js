//RegisterView
import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import useRegister from '../../viewModel/authViewModel/RegisterModelView';
import Checkbox from 'expo-checkbox';

export default function Register() {
    const { user, setUser, registerUser, showImagePickerOptions, error } = useRegister(); // Modification ici

    return (
        <View style={styles.container}>
            {/* Input pour l'email, le mot de passe et le nom d'utilisateur */}
            <Input
                placeholder='Enter your email'
                label='Email'
                value={user.email}
                onChangeText={text => setUser({...user, email: text})}
                leftIcon={{ type: 'material', name: 'email' }}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                value={user.password}
                onChangeText={text => setUser({...user, password: text})}
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />
            <Input
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />
            <Input
                placeholder='Enter your username'
                label='Username'
                value={user.username}
                onChangeText={text => setUser({...user, username: text})}
                leftIcon={{ type: 'material', name: 'account-circle' }}
            />
           

            {/* Affichage de l'avatar avec les options de sélection d'image */}
            <View style={styles.containerAvatar}>
                <Text style={styles.introText}>📸 Choisissez votre avatar</Text>

                {!user.image && (
                    <Pressable onPress={showImagePickerOptions}>
                        <View style={{ borderRadius: 300, overflow: 'hidden' }}>
                            <Ionicons name="image" size={150} color="grey" />
                        </View>
                    </Pressable>
                )}

                {user.avatarUrl && (
                    <Pressable onPress={showImagePickerOptions}>
                        <Image source={{ uri: user.avatarUrl }} style={styles.avatarUrl} />
                    </Pressable>
                )}
            </View>

            {/* Case à cocher pour choisir le rôle */}
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={user.isAdmin}
                    onValueChange={value => setUser({...user, isAdmin: value})}
                    color={user.isAdmin ? '#4630EB' : undefined}
                />
                <Text style={styles.label}>Administrateur</Text>
            </View>

            {/* Affichage du message d'erreur */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Bouton pour s'inscrire */}
            <Button
                onPress={registerUser}
                style={styles.btn}
                title='Register'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerAvatar: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2f2f2',
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
    btn: {
        marginTop: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    }
});
