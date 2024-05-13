import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { authentication, db, storage } from "../../firebase/firebaseConfig";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selectedDate: '',
      newEventText: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Agenda
          items={this.state.items}
          selected={this.state.selectedDate}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          onDayPress={this.handleDayPress}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={this.handleTextChange}
            value={this.state.newEventText}
            placeholder="Entrez votre événement"
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSaveEvent}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleDayPress = (day) => {
    this.setState({ selectedDate: day.dateString });
  };

  handleTextChange = (text) => {
    this.setState({ newEventText: text });
  };

  handleSaveEvent = () => {
    const { selectedDate, newEventText } = this.state;

    // Vérifiez si le texte de l'événement n'est pas vide
    if (newEventText.trim() === '') {
      alert("Veuillez saisir un événement.");
      return;
    }

    // Ajoutez l'événement à la collection 'events' dans votre base de données Firebase
    db.collection('events').add({
      date: selectedDate,
      name: newEventText
    })
    .then(() => {
      alert("Événement enregistré avec succès !");
      this.setState({ newEventText: '' });
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement de l'événement :", error);
      alert("Une erreur s'est produite lors de l'enregistrement de l'événement. Veuillez réessayer.");
    });
  };

  renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>C'est une date vide !</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: 'white'
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});



