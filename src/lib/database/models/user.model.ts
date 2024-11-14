import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    userBio: {
        type: String,
        default: "",
    },
    verificationToken: String,
    verificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {
    timestamps: true
})

const User = models?.user || model("User", UserSchema);

export default User;