const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf')
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters')
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { Pinecone } = require('@pinecone-database/pinecone')
const { PineconeStore } = require('@langchain/pinecone')
const vectorizePDF = async (pdf) => {
    try {
        console.log("📄 Loading PDF:", pdf);
        const pdfLoader = new PDFLoader(pdf);

        const rawDocs = await pdfLoader.load();
        console.log(`✅ Loaded ${rawDocs.length} document(s)`);

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000, // size of each chunk words in the chunk
            chunkOverlap: 200, // overlap between chunks so chunks can be connected
        });
        const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
        const namespace = `pdf-${Date.now()}`
        console.log(namespace)
        const chunkedDocsWithMetadata = chunkedDocs.map(doc => ({
            ...doc,
            metadata: {
                ...doc.metadata,        // keep any existing metadata
                pdfNamespace: namespace // add your namespace
            }
        }));
        console.log(`📚 Split into ${chunkedDocs.length} chunks`);

        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: 'text-embedding-004',
        });

        const pinecone = new Pinecone();
        const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        console.log("🔗 Connected to Pinecone index:", process.env.PINECONE_INDEX_NAME);


        await PineconeStore.fromDocuments(chunkedDocsWithMetadata, embeddings, {
            pineconeIndex,
            maxConcurrency: 5
        });
        console.log("✅ Successfully vectorized and stored PDF!");
        return {
            status: 201,

            message: 'PDF vectorized and stored successfully!'
        }
    } catch (error) {
        console.error("❌ Error in vectorizing PDF:", error);
        return {
            status: 500,
            message: 'Failed to vectorize PDF.'
        }
    }
}

module.exports = {
    vectorizePDF
}