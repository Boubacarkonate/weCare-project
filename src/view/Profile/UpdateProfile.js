// UpdateProfile.js
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import UpdateProfileViewModel from '../../src/viewModel/Profile/UpdateProfileViewModel';

export default function UpdateProfile() {
    const { user, setUser, updateUserProfile } = UpdateProfileViewModel();

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
                placeholder='Username'
                label='Username'
                value={user.username}
                onChangeText={text => setUser({ ...user, username: text })}
                leftIcon={{ type: 'material', name: 'account-circle' }}
            />
            <Input
                placeholder='Avatar'
                label='Avatar'
                value={user.avatar}
                onChangeText={text => setUser({ ...user, avatar: text })}
                leftIcon={{ type: 'material', name: 'photo' }}
            />
            {user.avatar && (
                <Image source={{ uri: user.avatar }} style={{ width: 100, height: 100 }} />
            )}

            <Button
                onPress={updateUserProfile}
                style={styles.btn}
                title='Save Changes'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // btn: {
    //     marginTop: 10
    // },
});
