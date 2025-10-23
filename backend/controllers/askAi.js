
const { GoogleGenAI } = require("@google/genai");
const { chatting } = require("../services/chatting");
const Chat = require("../database/models/chatModel");
const ai = new GoogleGenAI({});
const history = [];
const askAi = async (req, res) => {
    try {
        const { question, namespace } = req.body;
        if (!question || !namespace) {
            return res.status(400).json({ message: 'Question and namespace are required.' });
        }
        const chat = await Chat.findOne({ pdfId: namespace });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        const currentChat = {
            user: {
                text: question
            }
        }
        const response = await chatting(question, namespace, ai, history);

        // save history in db
        currentChat.model = {
            text: response
        }
        chat.chatHistory.push(currentChat);
        await chat.save();
        return res.status(200).json({ answer: response });

    } catch (error) {
        console.error('Error in askAi controller:', error);
        return res.status(500).json({ message: 'Failed to get answer from AI.' });
    }
}
module.exports = {
    askAi
}