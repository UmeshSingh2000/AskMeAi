const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    pdfId:{ // this is vector db pdf id 
        type:String,
        required:true,
        unique:true
    },
    pdfUrl:{ // this is cloudinary url of the pdf
        type:String,
        required:true
    },
    chatHistory:{
        type:Array,
        default:[]
    },
},
{
    timestamps:true
})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
