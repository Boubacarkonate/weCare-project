// CalendarViewModel.js
import EventCalendar from '../model/EventCalendar.model';

export default class CalendarViewModel {
  constructor() {
    this.items = {};
    this.selectedDate = '';
    this.textInputValue = '';
  }

  // Fonction appelée lorsque l'utilisateur change de date
  handleDayPress = (day) => {
    this.selectedDate = day.dateString;
  };

  // Fonction pour enregistrer le texte associé à la date sélectionnée
  handleSaveText = () => {
    const newItem = new EventCalendar(this.textInputValue, new Date(), this.selectedDate, this.selectedDate);
    if (this.items[this.selectedDate]) {
      this.items[this.selectedDate].push(newItem);
    } else {
      this.items[this.selectedDate] = [newItem];
    }
    this.textInputValue = '';
  };

  // Getter pour les données de l'agenda
  getItems() {
    return this.items;
  }

  // Getter pour la date sélectionnée
  getSelectedDate() {
    return this.selectedDate;
  }

  // Getter pour la valeur du champ de texte
  getTextInputValue() {
    return this.textInputValue;
  }

  // Setter pour la valeur du champ de texte
  setTextInputValue(value) {
    this.textInputValue = value;
  }
}
