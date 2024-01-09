import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        required: true,
    },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    savedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    likedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
}, 
{ timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
