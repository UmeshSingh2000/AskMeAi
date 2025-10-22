const cloudinary = require('cloudinary').v2;

const uploadToCloud = async (pdf) => {
    try {
        const result = await cloudinary.uploader.upload(pdf, {
            folder: 'askmeai_pdfs',
            resource_type: 'auto',
            use_filename: true,
            unique_filename: false,
        });
        return result;
    } catch (error) {
        console.error('Error uploading PDF to Cloudinary:', error);
        throw new Error('PDF upload failed');
    }
}

module.exports = uploadToCloud;