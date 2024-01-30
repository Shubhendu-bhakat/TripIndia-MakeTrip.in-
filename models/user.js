const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
//pasport local moongoose uses username id and pasword automatically
const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);