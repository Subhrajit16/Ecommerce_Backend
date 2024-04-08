const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId, 
                ref: 'Product'
            },
            quantity: {
                type: Number, // 2, 3
                required: true,
                default: 0
            }
        }
    ],
    totalQuantity: { // 5
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: { // 500
        type: Number,
        required: true,
        default: 0
    },
    //Discount will do later

}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;