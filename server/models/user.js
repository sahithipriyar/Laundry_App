const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String , unique:true},
    phone: { type: Number , minlength:10, maxlength: 10, unique:true},
    state: { type: String },
    district: { type: String },
    address: { type: String },
    pincode: { type: Number },
    password: {type: String, required:true}
})

const User = mongoose.model('User',userSchema)

module.exports = User;