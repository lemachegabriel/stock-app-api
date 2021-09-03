const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs')

const UserSchema = new Schema({
    name: {
        type : String,
        require: true,
    },
    email: {
        type : String,
        unique : true,
        reqquired : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        select: false,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
})


mongoose.model("User", UserSchema)
