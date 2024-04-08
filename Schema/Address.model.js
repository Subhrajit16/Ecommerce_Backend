const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;