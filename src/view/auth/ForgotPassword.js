// ForgotPasswordView.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import useForgotPassword from '../../viewModel/authViewModel/ForgotPasswordViewModel';

export default function ForgotPassword() {
    const { user, setUser, handleResetPassword } = useForgotPassword();

  return (
    <View style={styles.container}>
      <Input
        placeholder="Adresse email"
        value={user.email}
        onChangeText={text => setUser({...user, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title="Réinitialiser le mot de passe"
        onPress={handleResetPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
