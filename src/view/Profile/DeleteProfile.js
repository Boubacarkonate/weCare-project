import React from 'react';
import { StyleSheet, View, Button, Modal, Text, TouchableOpacity } from 'react-native';
import DeleteProfileViewModel from '../../viewModel/ProfileViewModel/DeleteProfileViewModel';

export default function DeleteProfile() {
    const {
        modalVisible,
        showModal,
        hideModal,
        confirmDeleteAccount,
    } = DeleteProfileViewModel();

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={confirmDeleteAccount}
                        >
                            <Text style={styles.textStyle}>Yes, delete my account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 10 }}
                            onPress={hideModal}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Button title="Delete Account" onPress={showModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
