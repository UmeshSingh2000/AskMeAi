//upload to pinecone vector db
const fs = require("fs/promises");
const { vectorizePDF } = require("../services/vectorize");
const uploadToCloud = require("../cloudinary/uploadToCloudinary");
const Chat = require("../database/models/chatModel");

const uploadPDF = async (req, res) => {
    let pdfPath;
    try {
        pdfPath = req.file.path;

        //upload to cloudinary
        const uploadResponse = await uploadToCloud(pdfPath);
        console.log('PDF uploaded to Cloudinary:', uploadResponse.secure_url);

        const response = await vectorizePDF(pdfPath);
        if (response.status === 201) {
            const { namespace } = response;
            // save in db
            const newChat = new Chat({
                userId: req.user.id,
                pdfUrl: uploadResponse.secure_url,
                pdfId: namespace
            });
            await newChat.save();
            res.status(200).json({ message: response.message, chatId: newChat._id });
        }
    } catch (error) {
        console.error('Error uploading PDF:', error);
        res.status(500).json({ message: 'Failed to upload and vectorize PDF.' });
    }
    finally {
        if (pdfPath) {
            try {
                await fs.unlink(pdfPath);
                console.log(`🧹 Deleted local file: ${pdfPath}`);
            } catch (err) {
                console.error(`Failed to delete file ${pdfPath}:`, err);
            }
        }
    }
}

const getPdf = async (req,res)=>{
    try {
        const {chatId} = req.params;
        const chat = await Chat.findById(chatId);
        if(!chat){
            return res.status(404).json({message:"Chat not found"});
        }
        res.status(200).json({
            pdfUrl:chat.pdfUrl,
            pdfId:chat.pdfId
        })
    } catch (error) {
        console.error("Error fetching PDF data:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {
    uploadPDF,
    getPdf
}