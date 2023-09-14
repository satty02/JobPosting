// this is the model for Jobs
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    candidate:{
        type:String
    },
    email: {
        type: String,
        required : true,
    },
    resume: {
        name :{
            type: String,
        },
        data :{
            type: Buffer,
        },
        contentType :{
            type: String,   
        }
        
    },
    status:{
        type:String
    },
    response:{
        type:String
    },

});

module.exports = mongoose.model('application', applicationSchema);

