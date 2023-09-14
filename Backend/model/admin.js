// this is the model for Jobs
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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

module.exports = mongoose.model('admin', adminSchema);

