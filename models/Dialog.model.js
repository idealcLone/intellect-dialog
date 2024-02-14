const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dialogSchema = new Schema({
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dialog', dialogSchema);