const Payment = require('../Model/paymentModel');

exports.postPayment = async (req, res) => {
    try {
        const item = req.body
        const result = await Payment.create(item);
        res.status(201).json(result)
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }

}
exports.getPayment = async (req, res) => {
    try {
        const result = await Payment.find({ email: req.query.email });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
} 