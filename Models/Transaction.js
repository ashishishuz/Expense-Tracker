const mongoose = require('mongoose');

const transactionSchema=new mongoose.Schema({
    userid:{
        type:String,
        required: true,
    },
    amount:{
        type: Number,
        required: [true,'amount is required']
    },
    type:{
        type: String,
        required: [true, 'Type is tequired']

    },

    category:{
        type: String,
        required:[true,'Please add Category']
    },
    refrence:{
        type:String,

    },
    descryption:{
        type:String,
        required:[true,'Descryption required']
    },
    date:{
        type:Date,
        required:[true,'date is required']
    }

},{timestamps: true})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction;