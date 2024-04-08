const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sizes:[{
        type: String,
        required: true
    }],
    ratings:[{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    ratingSum: {
        type: Number,
        required: true
    }
    // reviews:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Review'
    // }],
    // discountPercent: {
    //     type: Number,
    //     required: true
    // }
    // discountedPrice: {
    //     type: Number,
    //     required: true
    // }

}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;