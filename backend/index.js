require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');
const userRoutes = require('./Routes/User.js'); 
const ticketRoutes = require('./Routes/Ticket.js');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors(
    {
        origin: 'https://hyd-metro-eight.vercel.app',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
}
);

app.use('/api/users', userRoutes); 
app.use('/api/tickets', ticketRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
