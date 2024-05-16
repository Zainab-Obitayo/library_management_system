const mongoose=require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/library_management_system");
// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})
// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true,
        
    },
    
    phone:{
        type: String,
        required:true,
        unique:true

    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    usertype:{
        type:String,
        required: true
    },
});
// collection part
const collection = new mongoose.model("users", Loginschema);
module.exports = collection;