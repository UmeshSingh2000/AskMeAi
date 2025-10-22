const mongoose = require('mongoose');
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed",err);
        process.exit(1);
    }
}

module.exports = connectDb;