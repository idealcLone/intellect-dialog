const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId: { type: String, required: true },
    dialogId: { type: String, required: true },
    readBy: { type: Array, required: true },
    text: { type: String, required: true },
    replyId: { type: String, required: false },
    forwarChatId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);