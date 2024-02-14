const Dialog = require('../models/Dialog.model');
const UserDialog = require('../models/UserDialog.model');
const Message = require('../models/Message.model');

const { getUserByName, getUserById } = require('./User.service');

const createDialog = async (name) => {
    const dialog = new Dialog({});
    const savedDialog = await dialog.save();
    const user = await getUserByName(name);
    const userDialog = new UserDialog({ dialogId: savedDialog._id, userId: user._id });
    await userDialog.save();

    return savedDialog;
}

const getDialogs = async (name) => {
    const user = await getUserByName(name);
    const userDialogs = await UserDialog.find({ userId: user._id });

    return Promise.all(userDialogs.map(async userDialog => getDialogById(userDialog.dialogId)));
}

const getDialogById = async (dialogId, userId = null) => {
    const dialog = await Dialog.findById(dialogId);

    const response = { ...dialog };

    if (userId) {
        response.user = await getUserById(userId);
        response.lastMessage = await Message.find({ dialogId }).sort({ createdAt: -1 });

        if (response.lastMessage) {
            response.lastMessage.user = await getUserById(response.lastMessage.senderId);
        }
    }

    return response;
}

const getDialogMessages = (dialogId) => {
    return Message.find({ dialogId });
}

const createMessage = (body) => {
    const newMessage = new Message({
        senderId: body.senderId,
        dialogId: body.dialogId,
        readBy: [],
        text: body.text
    });

    return newMessage.save();
};

const getMessageById = (messageId) => {
    return Message.findById(messageId);
}

const updateMessage = (messageId, text) => {
    return Message.findByIdAndUpdate(messageId, { text });
}

module.exports = {
    createDialog,
    getDialogs,
    getDialogMessages,
    createMessage,
    getMessageById,
    updateMessage
}