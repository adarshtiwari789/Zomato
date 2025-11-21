const FoodPartnerModel = require("../model/food-partner.model");
const {food} = require('../model/food.model')
async function getFoodpartner(req , res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await FoodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await food.find({ foodpartner: foodPartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

module.exports = getFoodpartner