    const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
        user_name: {type: String, required: true, max: 100, min: 10},
        email: {type: String, required: true, max: 300},
        mobile_num: {type: String, required: true, max: 10, min: 10},
        country: {type: String, required: true, max: 200},
        person: {
            first_name: {type: String},
            last_name: {type: String}
        },
        address: {
            street: {type: String},
            city_or_town: {type: String},
            district: {type: String},
            state_or_province: {type: String},
            country: {type: String},
            postal_code: {type: String}
        },
        organization: {
            name: {type: String},
            is_non_profit: {type: Boolean},
            no_of_members: {type: Number, min: 1},
            has_office: {type: Boolean},
            description: {type: String, min: 1000}
        },
        social_medias: [{type: String}],
        summary: [{
            post_id: {type: String},
            title: {type: String},
            timeStamp: {type: Date},
            target: {type: Number},
            raised: {type: Number},
            payment_id: {type: String}
        }]
    
});

const PersonOrOrganization = mongoose.model('PersonOrOrganizations', userSchema);

exports.PersonOrOrganization = PersonOrOrganization;