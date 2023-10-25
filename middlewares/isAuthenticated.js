const Admin = require('../models/Admin')
const SHA256 = require("crypto-js/sha256"); // Encryptage de string
const encBase64 = require("crypto-js/enc-base64"); // Transforme l'encryptage en string



const isAuthenticated = async (req, res, next) => {

    const { email, password } = req.body
    // const bearer = req.headers.authorization
    // const token = bearer.replace('Bearer ', '')


    if (!email || !email.trim()) {
        return res.status(400).json('Unauthorized')
    }

    if (!password || !password.trim()) {
        return res.status(400).json('Unauthorized')
    }

    const findAdmin = await Admin.findOne({ email: email });
    hash2 = SHA256(password + findAdmin.salt).toString(encBase64)

    if (hash2 === findAdmin.hash) {
        // res.status(200).json("authenticated !")
        return next();
    } else {
        return res.status(400).json("Unauthorized")
    }

}

module.exports = isAuthenticated