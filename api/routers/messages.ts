import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutID} from "../types";
import {imagesUpload} from "../multer";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.message) {
        res.status(400).send({error: "Please send a message!"});
        return;
    }
    const oneMessage: MessageWithoutID = {
        author: req.body.author || 'Anonymous',
        message: req.body.message,
        image: req.file ? `/images${req.file.filename}` : null,
    };

    const savedMessages = await fileDb.addMessage(oneMessage);
    res.send(savedMessages);
});

export default messagesRouter;