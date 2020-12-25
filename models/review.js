//for connecting with mongo
const mongoose = require('mongoose');

//for easier referencing
const { Schema } = mongoose;

//defining schema of campground database
const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', reviewSchema);
