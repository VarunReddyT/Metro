const express = require('express');
const router = express.Router();
const ticketschema = require('../schema/TicketSchema.js');
// const jwt = require('jsonwebtoken');

router.post('/bookedticket', async (req, res) => {
    const {username,source, destination, tickets, fare, distance, transactionId, paymentMode, qrCode } = req.body;
    console.log(req.body);
    if (!username || !source || !destination || !tickets || !fare || !distance || !transactionId || !qrCode || !paymentMode) {
        return res.status(400).send('Please fill all the fields');
    }

    const ticket = new ticketschema({
        username:username,
        source : source,
        destination : destination, 
        tickets : tickets, 
        fare : fare,
        distance : distance, 
        transactionId : transactionId, 
        paymentMode: paymentMode,
        qrCode : qrCode
    });
    try{
        await ticket.save();
        res.status(200).send('Ticket booked successfully');
    }
    catch(err){
        res.status(500).send('Error booking ticket. Please try again.');
    }
    
}
);


router.get('/getticket', async (req, res) => {
    const {username} = req.query;
    if (!username) {
        return res.status(400).send('Please fill all the fields');
    }
    const ticket = await ticketschema.find({username});
    if (!ticket) {
        return res.status(400).send('No tickets found');
    }
    try{
        res.send(ticket);
    }
    catch(err){
        res.status(500).send('Error fetching ticket. Please try again.');
    }
}
);


module.exports = router;