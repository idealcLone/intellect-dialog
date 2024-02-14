const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDialogSchema = new Schema({
    userId: { type: String, required: true },
    dialogId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserDialog', userDialogSchema);