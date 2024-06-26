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
            <View style={{marginTop:50}}>
                <View style={{marginBottom:30}}>
                <Input
                placeholder='Enter your email'
                label='Email'
                value={user.email}
                onChangeText={text => setUser({ ...user, email: text })}
                leftIcon={{ type: 'material', name: 'email' }}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
            />
            </View>
            <Input
                placeholder='Enter your password'
                label='Password'
                value={user.password}
                onChangeText={text => setUser({ ...user, password: text })}
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.inputLabel}
            />
                
            

            {remainingAttempts > 0 && (
                <Text style={styles.remainingAttemptsText}>Remaining login attempts: {remainingAttempts}</Text>
            )}

            {remainingAttempts === 0 && (
                <Text style={styles.errorText}>Too many login attempts. Please try again later.</Text>
            )}

            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 20, marginBottom: 60}}>
                 <Button
                onPress={handleLogin}
                title='Login'
                containerStyle={{width: '45%', borderRadius: 20}}
                buttonStyle={{ backgroundColor:'#38b6ff' }}
                // titleStyle={{  }}
            />
            <Button
                onPress={() => navigation.navigate("ForgotPassword")}
                title='Password forgotten'
                containerStyle={{width: '45%', borderRadius: 15}}
                buttonStyle={{ backgroundColor:'#38b6ff' }}
            /> 
            </View>
          
            <Button
                style={styles.btn}
                onPress={() => navigation.navigate("Register")}
                title='Register'
                containerStyle={{marginTop: 10, borderRadius: 15}}
                buttonStyle={{ backgroundColor:'#38b6ff' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        margin:20
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
