const Chat = require("../database/models/chatModel");
const getChats = async(req,res)=>{
    try {
        const userId = req.user.id;
        const chats = await Chat.find({userId}).sort({createdAt:-1});
        res.status(200).json({chats});
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Failed to fetch chats.' });
    }
}

module.exports={
    getChats
}