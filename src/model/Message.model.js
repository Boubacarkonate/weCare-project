class Message {
    constructor(id, text, image, documentFile, createdAt, sentBy, sentTo) {
        this.id = id;
        this.text = text;
        this.image = image;
        this.documentFile = documentFile;
        this.createdAt = createdAt;
        this.sentBy = sentBy;
        this.sentTo = sentTo;
    }
}

export default Message;