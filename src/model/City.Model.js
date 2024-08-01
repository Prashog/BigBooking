const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    cuisines : {
        type : [String],
    }
})

const CityModel = mongoose.model( "cities" , CitySchema);

module.exports = CityModel;