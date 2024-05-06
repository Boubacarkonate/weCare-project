// Login.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import useLogin from '../../viewModel/authViewModel/LoginViewModel';

export default function Login({ navigation }) {
    const { user, setUser, loginUser, loginAttempts, maxLoginAttempts } = useLogin({ navigation });

    const handleLogin = async () => {
        await loginUser();
    };

    const remainingAttempts = maxLoginAttempts - loginAttempts;

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your email'
                label='Email'
                value={user.email}
                onChangeText={text => setUser({ ...user, email: text })}
                leftIcon={{ type: 'material', name: 'email' }}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                value={user.password}
                onChangeText={text => setUser({ ...user, password: text })}
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
            />

            {remainingAttempts > 0 && (
                <Text style={styles.remainingAttemptsText}>Remaining login attempts: {remainingAttempts}</Text>
            )}

            {remainingAttempts === 0 && (
                <Text style={styles.errorText}>Too many login attempts. Please try again later.</Text>
            )}

            <Button
                onPress={handleLogin}
                title='Login'
            />
            <Button
                style={styles.btn}
                onPress={() => navigation.navigate("Register")}
                title='Register'
            />
            <Button
                style={{ marginTop: 50 }}
                onPress={() => navigation.navigate("ForgotPassword")}
                title='Password forgotten'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        marginTop: 10
    },
    remainingAttemptsText: {
        textAlign: 'center',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    }
});
