const Cart = require('../Model/cartModel');

exports.createCart = async (req, res) => {
    const { item_id, name, price, quantity, image, email } = req.body;

    try {
        const existingCartItem = await Cart.findOne({ item_id, email });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            const updatedCartItem = await existingCartItem.save();
            return res.status(200).json(updatedCartItem);
        } else {
            const item = req.body
            const result = await Cart.create(item)
            res.status(201).json(result)
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({ email: req.query.email });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

exports.updateQuantity = async (req, res) => {
    try {
        const id = req.params.id;
        const { method } = req.body;

        // Find the cart item by id
        const item = await Cart.findById(id);


        // Update quantity based on the method
        if (method === 'increase') {
            item.quantity += 1;
        } else if (method === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }

        await item.save();

        return res.json(item);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteCartItem = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedItem = await Cart.findByIdAndDelete(id);
        res.json(deletedItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

exports.clearCartAfterCheckout = async (req, res) => {

    try {
            const {email }= req.body;
            const result = await Cart.deleteMany({email})
            res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }


};
