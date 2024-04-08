const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;