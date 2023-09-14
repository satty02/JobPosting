// this is the model for Jobs
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    username:{
        type:String
    },
    password: {
        type: String,
        required : true,
    }
});

module.exports = mongoose.model('candidate', candidateSchema);

