const mongoose = require('mongoose')

const Drugs = mongoose.model("Drug", {
    name: {
        type: String,
        required: true,
    },
    numberPerPackage: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Number,
        required: true,
    },
    quantityOfPackage: {
        type: Number,
        required: true,
    },
})

module.exports = Drugs