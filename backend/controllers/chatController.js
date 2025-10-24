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

const toggleBoost = async(req,res)=>{
    try {
        const {chatId} = req.params;
        const chat = await Chat.findById(chatId);
        if(!chat){
            return res.status(404).json({message:"Chat not found"});
        }
        chat.boost = !chat.boost;
        await chat.save();
        res.status(200).json({message:"Boost toggled", boost:chat.boost});
    } catch (error) {
        console.error('Error toggling boost:', error);
        res.status(500).json({ message: 'Failed to toggle boost.' });
    }
}

module.exports={
    getChats,
    toggleBoost
}