const express = require('express')
const mongoose = require('mongoose')
const Admin = require('../models/Admin')
const uid = require('uid2'); // Generation de string
const SHA256 = require("crypto-js/sha256"); // Encryptage de string
const encBase64 = require("crypto-js/enc-base64"); // Transforme l'encryptage en string
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router()


router.post('/admin/signin', async (req, res) => { // Création d'un nouvel admin
    try {
        const token = uid(16)
        const { name, email, password } = req.body

        const salt = uid(16)
        const hash = SHA256(req.body.password + salt).toString(encBase64)


        if (!password || !password.trim()) {
            return res.status(400).json('You need a password to signin')
        }

        if (!name || !name.trim()) {
            return res.status(400).json('You need a name to signin')
        }

        let count = 0;
        for (i = 0; i < email.length; i++) {
            if (email[i] === "@") {
                count++
            }
        }

        if (!email || !email.trim() || count !== 1) {
            return res.status(400).json('You need an email to signin')
        }

        const newAdmin = new Admin({
            name: name,
            email: email,
            password: password,
            token: token,
            salt: salt,
            hash: hash,
        })

        await newAdmin.save()

        res.status(200).json({
            message: "admin created",
            name: name,
            email: email,
            token: token,
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.put('/admin/login', isAuthenticated, async (req, res) => {  // Route pour se log en admin
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router