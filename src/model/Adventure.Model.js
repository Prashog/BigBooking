const mongoose = require("mongoose");

const AdventureSchema = new mongoose.Schema({
    cityId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "cities",
        required : true
    },
    name : {
        type : String,
        required : true
    },
    category : {
        type : [String]
    },
    images : {
        type : [String],
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    pricePerHead : {
        type : Number,
        required : true
    },
    currency : {
        type : String,
        default : "INR"
    }
})

const AdventureModel = mongoose.model("adventures", AdventureSchema)

module.exports = AdventureModel