const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Connecting to the database
 */
async function connectDb() {
    const connection = await mongoose
        .connect("mongodb://127.0.0.1:27017/appdb")
        .then(() => {
            console.log("connected with database");
        });
}

const userSchema = new mongoose.Schema({
        name: {
            type:String,
            trim: true,
            required: true,
        },
        gender: {
            type:String,
            trim:true
        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:true,
            lowercase:true
        },
        password: {
            type:String,
            required:true,
        }
    },
    {
        timestamps: true
    }
);
// we use function expression instead of arrow fn cause we are using this ka reference here...
userSchema.pre("save",function(next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})
const User = mongoose.model("users",userSchema)
module.exports = { connectDb, User };
