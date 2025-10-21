//this service is used for chatting purpose 
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { Pinecone } = require('@pinecone-database/pinecone');
const chatting = async (message, namespace, ai, history) => {
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
                systemInstruction: `You are an expert in any field. Only answer the question using the provided context. 
If the context is insufficient, say "I don't know". Keep the answer concise.".
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