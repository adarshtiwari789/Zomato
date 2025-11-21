const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String
    },
    foodvideo: {
        type: String
    },
    foodpartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodPartner"
    },
    description: {
        type: String
    }
});
    const food = mongoose.model('food' , foodSchema)

    module.exports = {food}
