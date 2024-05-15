import React, { useEffect } from 'react';
import { View, Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import useCalendarEventViewModel from "../viewModel/CalendarEventViewModel";

const CalendarEventViewUser = () => {
  const viewModel = useCalendarEventViewModel();

  useEffect(() => {
    viewModel.fetchEvents();
  }, []);

  const handleDayPress = (day) => {
    viewModel.setSelectedDate(day.dateString);
  };

  const handleTextChange = (text) => {
    viewModel.setNewEventText(text);
  };

  const handleSaveEvent = async () => {
    if (viewModel.newEventText.trim() === '') {
      Alert.alert("Veuillez saisir un événement.");
      return;
    }
  
    try {
      await viewModel.saveEvent();
      Alert.alert("Événement enregistré avec succès !");
      viewModel.setNewEventText('');
      await viewModel.fetchEvents();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'événement :", error);
      Alert.alert("Une erreur s'est produite lors de l'enregistrement de l'événement. Veuillez réessayer.");
    }
  };


  const renderItem = (item) => {
    return (
      <View>
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>C'est une date vide !</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={viewModel.items}
        selected={viewModel.selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        onDayPress={handleDayPress}
      />
    </View>
  );
};

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

export default CalendarEventViewUser;