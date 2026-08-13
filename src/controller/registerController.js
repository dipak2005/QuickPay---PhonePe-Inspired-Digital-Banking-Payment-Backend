const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUserController = async (req, res) => {
  try {
    const { username, email, phone,  password  } = req.body;

    if (!username || !email || !phone || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide all required Details" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedMpin = await bcrypt.hash(mpin, 10);

    // dynamic UPI ID generation based on email (ex : dipak1705@quickpay)
    const sanitizedName = email.toLowerCase();
    const upiId = `${sanitizedName.split("@")[0]}@quickpay`;


    // Create new user
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      upiId, // Generate UPI ID based on email
    });
     
    if(newUser){
      res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        upiId: newUser.upiId,
        hasmpin: false,
        balance: newUser.balance,
        token: genrateToken(newUser._id),
      },
    });
    } else {
      res.status(400).json({ message: "User registration failed" });
    }
   
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUserController };
