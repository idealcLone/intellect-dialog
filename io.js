const http = require('http');
const { Server } = require("socket.io");

const { createMessage, updateMessage } = require('./services/Dialog.service');

const initSocketIO = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('joinDialog', (dialogId) => {
            socket.join(dialogId);
        });

        socket.on('sendMessage', async ({ dialogId, userId, message }) => {
            const newMessage = await createMessage({ dialogId, senderId: userId, text: message });
            io.to(dialogId).emit('receiveMessage', newMessage);
        });

        socket.on('respondToMessage', async ({ dialogId, replyId, userId, message }) => {
            const newMessage = await createMessage({ dialogId, replyId, senderId: userId, text: message });
            io.to(dialogId).emit('receiveMessage', newMessage);
        });

        socket.on('forwardMessage', async ({ dialogId, forwarChatId, userId, message }) => {
            const newMessage = await createMessage({ dialogId, forwarChatId, senderId: userId, text: message });
            io.to(dialogId).emit('receiveMessage', newMessage);
        });

        socket.on('typeMessage', async ({ dialogId, userId, messageId, text }) => {
            if (messageId) {
                await updateMessage(messageId, text);
            } else {
                await createMessage({ dialogId, senderId: userId, text });
            }
        });
    });

    io.listen(8001);
}

module.exports = initSocketIO;