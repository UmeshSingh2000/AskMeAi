const express = require('express');
const { uploadPDF, getPdf } = require('../controllers/pdfController');
const router = express.Router();

const multer = require('multer');
const { askAi } = require('../controllers/askAi');
const { registerUser, loginUser } = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { getChats } = require('../controllers/chatController');
const upload = multer({ dest: 'uploads/' })


//this route upload the pdf to vector db
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/uploadpdf', isAuthenticated, upload.single('pdf'), uploadPDF)
router.post('/ask/ai', isAuthenticated, askAi)
router.get('/getChats',isAuthenticated,getChats)
router.get('/getpdf/:chatId',isAuthenticated,getPdf)
module.exports = router;