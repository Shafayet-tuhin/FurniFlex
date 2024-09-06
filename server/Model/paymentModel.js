const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    products: {
        type: [String]
    },
    images: {
        type: [String]
    },
    price: {
        type: "Number"
    },
    Date: {
        type: Date,
        default: Date.now
    },
})

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;