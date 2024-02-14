const User = require('../models/User.model');

const getAllUsers = () => {
    return User.find({});
}

const createUser = (name, avatar) => {
    const newUser = new User({ name, avatar });

    return newUser.save();
}

const getUserByName = (name) => {
    return User.findOne({ name });
}

const getUserById = (userId) => {
    return User.findById(userId);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByName,
    getUserById
};