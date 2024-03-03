const express = require('express')
require('dotenv').config();
const mongoose = require('./models/mongodb')
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use('/users', userRouter);
app.use('/posts', postRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});