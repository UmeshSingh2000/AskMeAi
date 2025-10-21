const express = require('express');
const { uploadPDF } = require('../controllers/pdfController');
const router = express.Router();

const multer = require('multer');
const { askAi } = require('../controllers/askAi');
const upload = multer({ dest: 'uploads/' })


//this route upload the pdf to vector db
router.post('/uploadpdf', upload.single('pdf'), uploadPDF)
router.post('/ask/ai', askAi)

module.exports = router;