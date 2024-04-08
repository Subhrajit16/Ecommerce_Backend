const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: this.firstName + ' ' + this.lastName
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    address: [
        { type: Schema.Types.ObjectId, ref: 'Address' }
    ],
    orders: [
        { type: Schema.Types.ObjectId, ref: 'Order' }
    ],
    paymentInfo: [
        { type: Schema.Types.ObjectId, ref: 'Payment' }
    ],
    //cart, review, rating, wishlist will do later
    // cart:[
    //     {type: Schema.Types.ObjectId, ref: 'Cart'}
    // ]
}, { timestamps: true });



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
