const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const initEndpoints = require('./controller');
const initSocketIO = require('./io');

const app = express();
const port = 8000;

const mongoUrl = 'mongodb+srv://eldarmussagali:hQzl9Uwwe49o2vxG@intellectdialog.rlndkvw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors());

initEndpoints(app);
initSocketIO(app);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})