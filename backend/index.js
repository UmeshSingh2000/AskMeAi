const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    return res.json({message: "Hello from backend!"});
})
app.use('/api/user',require('./routes/userRoutes'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})