//this service is used for chatting purpose 
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { Pinecone } = require('@pinecone-database/pinecone');
const Chat = require("../database/models/chatModel");
const chatting = async (message, namespace, ai, history, boost) => {
    try {
        //embedding model
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: 'text-embedding-004',
        });


        const queryVector = await embeddings.embedQuery(message);
        const pinecone = new Pinecone();

        const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        const searchResults = await pineconeIndex.query({
            topK: 10,
            vector: queryVector,
            includeMetadata: true,
            filter: { pdfNamespace: namespace }
        });
        const context = searchResults.matches
            .map(match => match.metadata.text)
            .join("\n\n---\n\n");

        history.push({
            role: 'user',
            parts: [{ text: message }]
        })

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: history,
            config: {
                systemInstruction: `${boost ? 'Boost is enabled' : "Boost is disabled"} 
                You are an expert in any field. According to Boost answer the question.
                If the boost is enabled then search the internet as well as context for better answer and merge those two for better response.
                If the boost is disabled then answer from the context only.
                If the context is insufficient, when the boost is disabled say "This file does not contain the information you need. Enable 'Boost' for better results.".
                Keep the answer concise.".
                Question: ${message}
                Context: ${context}
      `,
            },
        });
        history.push({
            role: 'model',
            parts: [{ text: response.text }]
        })
        return response.text
    } catch (error) {
        console.error("❌ Error in chatting service:", error);
    }
}

module.exports = {
    chatting
}