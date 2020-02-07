const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type:String,required:true},
    partner: { type:String,default:null},
    assign: { type:Boolean,default:false}
});

const User = mongoose.model('User',userSchema);

module.exports.User = User;

