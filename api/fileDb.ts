import {Message, MessageWithoutID} from "./types";
import {promises as fs} from 'fs';
import crypto from "crypto";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const messageContent = await fs.readFile(fileName);
            data = await JSON.parse(messageContent.toString()) as Message[];
        } catch (e) {
            console.error(e);
        }
    },
    async getMessages() {
        return data;
    },
    async addMessage(item: MessageWithoutID) {
        const id = crypto.randomUUID();
        const message = {id, ...item}
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;