import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    authId: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        }
    ]
})

module.exports = mongoose.model('User', userSchema)