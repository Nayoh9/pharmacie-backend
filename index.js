const express = require('express');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/pharmacie");


const app = express();
app.use(express.json());

const drugsRoute = require('./routes/drug');
const adminRoute = require('./routes/admin');

app.use(drugsRoute);
app.use(adminRoute);

app.get('*', (req, res) => {
    res.status(400).json('this routes does not exist');
})


app.listen(3000);
