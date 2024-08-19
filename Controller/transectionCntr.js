
const Transaction = require('../Models/Transaction')
const moment = require('moment')

const getAllTransaction = async(req,res) =>{
    try {
        const {freq,selectedDate,type} = req.body
        //filtering based on dates
        const transections= await Transaction.find({
            ...(freq !=='custom' ? {
                date:{
                    $gt : moment().subtract(Number(freq),'d').toDate(),   //mongodb querry to get something greater than condition
                },
            } : {
                date:{
                    $gt: selectedDate[0],
                    $lte : selectedDate[1],  //lte -> less than eqaul to
                }
            }),
            
            userid: req.body.userid,
          //filtering based on type
            ...(type != 'all' && {type}),
        });
            res.status(200).json(transections)       
    } catch (error) {
        // console.log(error);
        res.status(500).json(error);
        
    }

}

const deleteTransaction = async (req,res) =>{
    try {
        await Transaction.findOneAndDelete({_id: req.body.transectionId})
        res.status(200).send('Transaction deleted Successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}

//edit transectionController
const editTransaction= async (req,res) =>{
    try {
        await Transaction.findOneAndUpdate({_id:req.body.transectionId}, req.body.payload) 
        res.status(200).send('edit successfully')
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }

}

//add TransectionController
const addTransaction = async(req,res) =>{
    try{
        const newTransection = new Transaction(req.body)
        await newTransection.save()
        res.status(201).send('Transection Created')
    }
    catch(error){
       console.log(error);
       res.status(500).json(error)
    }

};

module.exports = {getAllTransaction,addTransaction,editTransaction,deleteTransaction};