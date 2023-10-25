const { stringify } = require('crypto-js/enc-base64')
const mongoose = require('mongoose')

const Admins = mongoose.model("Admin", {
    name: String,
    email: String,
    token: String,
    hash: String,
    salt: String,
})

module.exports = Admins