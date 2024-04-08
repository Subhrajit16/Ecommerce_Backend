const Cart = require('../Schema/Cart.model');
const Product = require('../Schema/Product.model');
const findUserCart = async (req, res) => {
    const { userId } = req.user;
    try {
        const cart = await Cart.findOne({ user: userId })
        // .populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found', success: false });
        }
        res.status(200).json({ message: 'Cart found', cart, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error, success: false });
    }
}

const addProductToCart = async (req, res) => {
    const { userId } = req.user;
    const { productId, quantity } = req.body;
    try {
        let totalQuantity = 0;
        let totalPrice = 0;
        const cart = await Cart.findOne({ user: userId });

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }

        const productIndex = cart.products.findIndex(product => product.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }

        for (let p of cart.products) {
            totalQuantity += p.quantity;
            totalPrice += product.price * p.quantity;
        }

        cart.totalQuantity = totalQuantity;
        cart.totalPrice = totalPrice;
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart, success: true });

    } catch (error) {
        res.status(500).json({ message: 'Faild to add cart', error, success: false });
    }
}

const removeProductFromCart = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.params;
    const { removeAll } = req.body
    try {

        const cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }
        const productIndex = cart.products.findIndex(product => product.product.toString() === productId);
        if (productIndex > -1) {
            if (removeAll) {
                cart.totalQuantity -= cart.products[productIndex].quantity;
                cart.totalPrice -= product.price * cart.products[productIndex].quantity;
                cart.products.splice(productIndex, 1);
            } else {

                cart.products[productIndex].quantity -= 1;
                cart.totalQuantity -= 1;
                cart.totalPrice -= product.price;
                if (cart.products[productIndex].quantity === 0) {
                    cart.products.splice(productIndex, 1);
                }
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart, success: true });

    } catch (error) {
        res.status(500).json({ message: 'Faild to remove product from cart', error, success: false });
    }
}

module.exports = {
    findUserCart,
    addProductToCart,
    removeProductFromCart
}