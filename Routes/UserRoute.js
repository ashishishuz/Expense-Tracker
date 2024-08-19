const express=require('express');
const { loginController, registerController } = require('../Controller/UserController');


//router object
const router=express.Router();

//routers


//POST || NEW USER
router.post("/register",registerController);

//POST || LOGIN
router.post("/login",loginController);





module.exports=router;