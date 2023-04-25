const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    is_published: {
        type: Boolean,
        required: true
    },
    likes: {
        type: Array,
        required: true
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Blog', BlogSchema)