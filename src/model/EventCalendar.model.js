// Calendar.model.js
export default class EventCalendar {
    constructor(text, createdAt, event_at, event_end) {
        this.text = text;
        this.createdAt = createdAt;
        this.event_at = event_at;
        this.event_end = event_end;
    }
}