const express = require("express");
const router = express.Router();
const { registerUserController } = require("../../controller/registerController");
const { loginUserController } = require("../../controller/loginController");


router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/test", (req, res) => {
  res.send("Auth route is working");
});

router.get("/set-mpin", (req, res) => {
    res.send("Set MPIN route is working");  
    });

router.get("/profile", (req, res) => {
    res.send("Profile route is working");  
    });   
    
    

module.exports = router;