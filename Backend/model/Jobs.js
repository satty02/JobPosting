// this is the model for Jobs
const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    jobCategory:{
        type:String,
        required:true
    },
    jobType: {
        type: String,
        required : true,
    },
    title: {
        type: String,
        required : true,
    },
    companyDetail: {
        type: String,
        required : true,
    },
    tags:{
        type:String,
        required:true
    },
    skills:{
        type: String,
        required:true

    },
    experience:{
        type: Number,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    salary:{
        type: Number,
        required:true
    },
    additional:{
        type:Object
    }
});

module.exports = mongoose.model('Jobs', jobsSchema);