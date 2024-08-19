const express=require('express');
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../Controller/transectionCntr');


//router object
const router=express.Router();


//routes
//add transections
router.post('/add-transection', addTransaction);

//Edit transections
router.post('/edit-transection', editTransaction);

//delete transections
router.post('/delete-transection', deleteTransaction);

//get trancations
router.post('/get-transection',getAllTransaction);




module.exports=router;