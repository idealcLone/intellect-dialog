const { getAllUsers, getUserByName, createUser } = require('./services/User.service');
const { createDialog, getDialogs, getDialogMessages} = require('./services/Dialog.service');

const initEndpoints = (app) => {
    app.get('/users/:name', async (req, res) => {
        const user = await getUserByName(req.params.name);

        if (user) {
            res.json(user);
        }

        res.status(404).json('User not found');
    });

    app.get('/users', async (req, res) => {
        const users = await getAllUsers();

        res.json(users);
    });

    app.post('/users', async (req, res) => {
        const name = req.body.name;
        const user = await createUser(name, '');

        res.status(201).json(user);
    });

    app.post('/dialogs/:name', async (req, res) => {
        const dialog = await createDialog(req.params.name);

        res.json({ dialogId: dialog._id });
    });

    app.get('/dialogs/:name', async (req, res) => {
        const dialogs = await getDialogs(req.params.name);

        res.json({ dialogs });
    });

    app.get('/messages/:dialogId', async (req, res) => {
        const messages = await getDialogMessages(req.params.dialogId);

        res.json({ messages });
    })
};

module.exports = initEndpoints;