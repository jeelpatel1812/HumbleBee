import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        password: String,
        refreshToken: String,
        name: String,
        role: {
            type: String,
            enum: ['beekeeper', 'admin']
        }
    }, {timestamps: true}
)

userSchema.pre("save", async function (next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema);