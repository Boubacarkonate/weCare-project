import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ClassRegisterViewModel from '../viewModel/ClassRegisterViewModel';

export default class ClassRegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                username: '',
            },
            error: null
        };
        this.classRegisterViewModel = new ClassRegisterViewModel(); 
    }

    render() {
        const { user } = this.state;

        return (
            <View style={styles.container}>
                <Input
                    placeholder='Enter your email'
                    label='Email'
                    value={user.email}
                    onChangeText={text => this.setState({ user: { ...user, email: text } })}
                    leftIcon={{ type: 'material', name: 'email' }}
                />
                <Input
                    placeholder='Enter your password'
                    label='Password'
                    value={user.password}
                    onChangeText={text => this.setState({ user: { ...user, password: text } })}
                    leftIcon={{ type: 'material', name: 'lock' }}
                    secureTextEntry
                />
                <Input
                    placeholder='Enter your username'
                    label='Username'
                    value={user.username}
                    onChangeText={text => this.setState({ user: { ...user, username: text } })}
                    leftIcon={{ type: 'material', name: 'account-circle' }}
                />
                <Button
                    onPress={() => this.registerUser()}
                    style={styles.btn}
                    title='Register'
                />
            </View>
        );
    }

    registerUser = async () => {
        try {
            await this.classRegisterViewModel.registerUser(this.state.user);
        } catch (error) {
            console.error('Registration error:', error.message);
            Alert.alert('Error', 'An error occurred during registration. Please try again.');
        }
    }
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
    }
});
