const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const likemodel = mongoose.model('Like', LikeSchema)

module.exports = likemodel