//upload to pinecone vector db
const fs = require("fs/promises");
const { vectorizePDF } = require("../services/vectorize");

const uploadPDF = async (req, res) => {
    let pdfPath;
    try {
        pdfPath = req.file.path;
        const response = await vectorizePDF(pdfPath)
        if (response.status === 201) {
            res.status(200).json({ message: response.message });
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

module.exports = {
    uploadPDF
}