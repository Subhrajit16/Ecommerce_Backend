const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [
        {

            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                default: 0
            },
        }
    ],
    totalQuantity: {
        type: Number,
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;