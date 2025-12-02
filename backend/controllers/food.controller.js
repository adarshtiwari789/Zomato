const { food } = require("../model/food.model")
const supabase = require("../services/service.storage")
const foodlike = require('../model/foodlike.model')
// use `food` (destructured above) as the mongoose model
const saveModel = require('../model/save.model')
const createFood = async function (req, res) {
  
  
  let uploadedUrl = null;
  const file = req.file
  const { foodname, description } = req.body
  const foodpartner = req.foodpartner._id
  try {
    const fileName = `${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from("foodstorage")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    const { data: publicUrl } = supabase.storage
      .from("foodstorage")
      .getPublicUrl(data.path);

    uploadedUrl = publicUrl.publicUrl
    const videodb = await food.create({
      foodname,
      foodvideo: uploadedUrl,
      description,
      foodpartner
    })

    return res.json({
      videodb
    })
  } catch
  (err) {
    res.status(500).json({ error: "this is from sub " + err.message });
  }



}
async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;
  console.log(foodId , user)
    const isAlreadyLiked = await foodlike.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await foodlike.deleteOne({
            user: user._id,
            food: foodId
        })

        await food.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await foodlike.create({
      user: user._id,
      food: foodId
    })

    await food.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}
const savefood = async function(req,res) {
  const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await food.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await food.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })


}
const getsavedfood = async function (req, res){
    const user = req.user;
    
    const savedFoods = await saveModel.find({ user: user._id }).populate('food');
    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
}
const getfood = async function (req, res) {
  const fooditems = await food.find({})

  res.status(200).json({
    message: "food item fetched successfull",
    fooditems: fooditems,
  })
}

module.exports = {
  createFood,
  getfood ,
  likeFood,
  getsavedfood,
  savefood,
  likeFood
}