const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Drug = require('../models/Drug')
const isAuthenticated = require('../middlewares/isAuthenticated')


router.post(('/drugs/add'), isAuthenticated, async (req, res) => { // Pour ajouter un médicament 

    const { name, quantityOfPackage, numberPerPackage, expirationDate } = req.body

    try {
        const newDrug = new Drug({
            name: name,
            quantityOfPackage: quantityOfPackage,
            numberPerPackage: numberPerPackage,
            expirationDate: expirationDate,
        })
        await newDrug.save();
        res.status(200).json("drug added");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})



module.exports = router