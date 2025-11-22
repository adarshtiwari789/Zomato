const { food } = require("../model/food.model")
const supabase = require("../services/service.storage")
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

const getfood = async function (req, res) {
  const fooditems = await food.find({})

  res.status(200).json({
    message: "food item fetched successfull",
    fooditems: fooditems,
  })
}

module.exports = {
  createFood,
  getfood
}