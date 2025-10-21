
const { GoogleGenAI } = require("@google/genai");
const { chatting } = require("../services/chatting");

const ai = new GoogleGenAI({});
const history = [];
const askAi = async (req, res) => {
    try {
        const { question, namespace } = req.body;
        if (!question || !namespace) {
            return res.status(400).json({ message: 'Question and namespace are required.' });
        }
        const response = await chatting(question, namespace, ai,history);
        return res.status(200).json({ answer: response });

    } catch (error) {
        console.error('Error in askAi controller:', error);
        return res.status(500).json({ message: 'Failed to get answer from AI.' });
    }
}
module.exports = {
    askAi
}