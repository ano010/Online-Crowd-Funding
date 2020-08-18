const {onPostCreated} = require('../amqp/subscribe');
const {PersonOrOrganization} = require('../models/user');

module.exports = function(){
    updateUserOrOrganization();
}

const updateUserOrOrganization = () => {
    onPostCreated(async msg => {
        console.log(`User updated: ${msg.content.toString()}`);
        const {by, _id, title, timestamp} = JSON.parse(msg.content.toString());

        await PersonOrOrganization.updateOne(
            {user_name: by},
            {$push: {summary: {post_id: _id, title, timestamp}}},
            {new: true, upsert: true}
        );

    });
};
