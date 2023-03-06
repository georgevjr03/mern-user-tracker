const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema =new Schema({
    username:{type:String,required:true},
    number:{type:Number,required:true},
    description:{type:String,required:true},
    DOB:{type:Number,required:true},
}, {
    timestamps:true,
});

const contact = mongoose.model('Contact',contactSchema);

module.exports =contact;