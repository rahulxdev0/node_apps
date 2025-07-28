const express = require('express');
const { connectDB } = require('./connect')
const urlRoute = require('./routes/url')
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());


async function startServer() {
    try {
        await connectDB('mongodb://localhost:27017/shorturl');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

startServer();

app.use('/url', urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});