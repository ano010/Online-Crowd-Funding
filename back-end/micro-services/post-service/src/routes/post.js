const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {Post} = require('../models/post');
const { onPostCreated } = require('../amqp/publish');


router.get('/:id', async (req, res) => {
    let post = await Post.findById(req.params.id)

    if(!post) return res.status(404).send("The post with the given Id was not found");

    res.send(post);
});

router.post('/', async (req, res) => {
    if (!req.body) return res.status(400).send("Post data was not found in the request body");

    const post = new Post(req.body);
    await post.save();

 

    const msg = _.pick(post, ['_id', 'by', 'title', 'timestamp', 'user_id']);
    onPostCreated(msg);

    res.send(post);
});

module.exports = router;