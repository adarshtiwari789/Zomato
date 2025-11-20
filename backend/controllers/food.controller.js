const {food} = require("../model/food.model")
const image = require("../services/service.storage")

const createFood = async function (req, res) {


  try {

    const uploaded = await image.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    const {foodname , description} = req.body 
    const fooddb =  await food.create({
    foodname , 
    foodvideo : uploaded.url , 
    foodpartner : req.foodpartner , 
    description , 
   })
   res.status(201).json({fooddb})

  } catch
   (err) {
    res.status(500).json({ error: "this is from imagekit " + err.message });
  }

 

}

const getfood = async function (req , res){
    const fooditems =await food.find({})
     
    res.status(200).json({message : "food item fetched successfull",
      fooditems :fooditems,
    })
  }

module.exports = {
    createFood , 
    getfood 
}