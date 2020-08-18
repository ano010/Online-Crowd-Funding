const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    by: {type: String, required: true},
    user_id: {type: String, required: true},
    image_urls: [{type: String}],
    vedio_urls: [{type: String}],
    story: {
        type: String,
        max: 1000,
        required: true
    },
    target_amount: {
        currency: {type: String, required: true},
        amount: {type: Number, require: true},
        collected_amount: {type: String, default: 0},
    },
    compaign_period: {
        start: {type: Date, required: true},
        end: {type: Date, required: true}
    },
    shares: {
        total: {type: Number},
        facebook: {type: Number},
        twitter: {type: Number}
    },
    comments: [
        {
            by: {type: String},
            body: {type: String, max: 1000, required: true},
            timestamp: {type: Date, required: true}
        }
    ],
    description: {type: String, max: 1000, required: true},
    compaign_location: {
        country: [{type: String}],
        places: [{type: String}]
    },
    timestamp: {type: Date, default: Date.now},
    donation_button: {type: String, required: true},
    end: {type: Boolean, default: false}
})
const Post = mongoose.model('Post', postSchema);
exports.Post = Post;