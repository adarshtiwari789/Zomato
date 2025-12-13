const { usermodel } = require("../model/user.model")
const foodpartner = require("../model/food-partner.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const supabase = require("../services/service.storage")


const userRegister = async function (req, res) {
    const { email, password, username } = req.body
    const userexsist = await usermodel.findOne({ email })
    if (userexsist) {
        return res.status(201).json({
            "message": "user alredy exsist"
        })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const user = await usermodel.create({
        email: email,
        password: hashPass,
        username: username
    })
    const token = jwt.sign({ _id: user._id }, 'shh')
    res.cookie("token", token)
    return res.status(201).json({
        "message": "user created ",
    })


}
const userLogin = async function (req, res) {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email })

    if (!user) {
        return res.status(301).json({
            message: "not authenticate please register"
        })
    }


    const ispassword = await bcrypt.compare(password, user.password)

    if (!ispassword) {
        return res.status(301).json({
            message: "something went wrong"
        })
    }

    const token = jwt.sign({ _id: user._id }, "shh")
    res.cookie("token", token)
    return res.status(201).json({
        message: "login successfull"
    })
}

const userLogout = function (req, res) {
    res.cookie.token = ""
    return res.status(203).json({ message: "logout success" })
}

//  food-partner 

const foodpartnerRegister = async function (req, res) {
    const { email, password, username, mobile_number, address } = req.body;

    // Check if account already exists
    const isAccountAlreadyExists = await foodpartner.findOne({ email });
    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    let uploadedUrl = null;

    // Upload file if attached
    if (req.file) {
        try {
            const file = req.file;
            const fileName = `foodpartner/${Date.now()}_${file.originalname}`;

            // Upload to Supabase
            const { data, error } = await supabase.storage
                .from("foodstorage")
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false,
                });

            if (error) {
                return res.status(400).json({ message: "Error while uploading image", error });
            }

            // Get public URL
            const { data: publicUrl } = supabase.storage
                .from("foodstorage")
                .getPublicUrl(fileName);

            uploadedUrl = publicUrl.publicUrl;
        } catch (err) {
            console.error("Image upload error:", err);
            return res.status(500).json({ error: "Image upload failed: " + err.message });
        }
    }

    // Now create food partner after image upload works
    const newfoodpartner = await foodpartner.create({
        image: uploadedUrl,
        email,
        password: hashpassword,
        username,
        mobile_number,
        address,
    });

    const token = jwt.sign({ _id: newfoodpartner._id }, "shh");
    res.cookie("token", token);

    return res.status(201).json({
        message: "New food partner created",
        imageUrl: uploadedUrl
    });
};


const foodpartnerLogin = async function (req, res) {
    const { email, password } = req.body
    const isfoodpartner = await foodpartner.findOne({ email })

    if (!isfoodpartner) {
        return res.status(301).json({
            message: "foodpartner not exsist"
        })
    }
    const ispassword = await bcrypt.compare(password, isfoodpartner.password)

    if (!ispassword) {
        return res.status(301).json({
            message: "password is not correct"
        })
    }
    const token = jwt.sign({ _id: isfoodpartner._id }, 'shh')
    res.cookie("token", token)
    return res.status(201).json({
        message: "food partner login successfull"
    })
}

const foodpartnerLogout = function (req, res) {
    res.clearCookie('token');
    return res.status(301).json({ message: "logout successfull" })
}

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    foodpartnerRegister,
    foodpartnerLogin,
    foodpartnerLogout
}