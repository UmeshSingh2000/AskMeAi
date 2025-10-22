const express = require('express')
const app = express();
const cors = require('cors');
const cloudinaryConfig = require('./cloudinary/config');
const connectDb = require('./database/config');
require('dotenv').config();
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
connectDb();
cloudinaryConfig();

app.get('/', (req, res) => {
    return res.json({ message: "Hello from backend!" });
})
app.use('/api/user', require('./routes/userRoutes'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})