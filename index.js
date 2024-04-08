require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/VERIFY_JWT');
const app = express();
const mongoUrl = process.env.MONGO_URI;

app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));



async function connectDB() {
    try {
        await mongoose.connect(mongoUrl)
        console.log('Database connected successfully')
    } catch (err) {
        console.log('error connecting to database', err)
    }

}
connectDB()

//Routes --Users
const userRouter = require('./Routers/user.router');
app.use('/api/v1/user', userRouter);

//Routes --Cart
const cartRouter = require('./Routers/cart.router');
app.use('/api/v1/cart', verifyToken,cartRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
