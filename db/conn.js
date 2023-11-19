const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
    "amount": {
        type: Number,
        required: true
    },
    "measure": {
        type: String,
        required: true
    },
},
    {
        collection: 'products'
    })

module.exports = mongoose.model('Product', prodSchema);