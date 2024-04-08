const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    level: {
        type: Number,
        required: true
    },
    // subCategories: [
    //     {type: Schema.Types.ObjectId, ref: 'Category'}
    // ],
    // products: [
    //     {type: Schema.Types.ObjectId, ref: 'Product'}
    // ],


}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;