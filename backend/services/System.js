// here write logic for the sytem(gemini) model 
const { GoogleGenAI } = require("@google/genai");
const { extractFirstPagePreview } = require("../utils/extractContent");
const ai = new GoogleGenAI({});
const generateChatName = async (pdfPath) => {
    try {
        const text = await extractFirstPagePreview(pdfPath);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: text,
            config: {
                systemInstruction: `You are a helpful assistant that generates concise and relevant chat names based on the content of a PDF document.
                Generate a chat name that accurately reflects the main topic or theme of the PDF.
                Keep the name under 5 words.
                `,
            }
        })
        return response.text.trim()
    } catch (error) {
        console.error("❌ Error in generateChatName service:", error);
        return "New Chat";
    }
}


module.exports = {
    generateChatName
}