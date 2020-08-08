const express = require('express');
const router = express.Router();
const {PersonOrOrganization} = require('../models/user');

router.get('/:id', async (req, res) => {
    let user = await PersonOrOrganization.findById(req.params.id);

    if(!user)
        return res.status(404).send("The user with the given Id was not found");

    res.send(user);
});

router.post('/', async (req, res) => {

    const personOrOrganization = new PersonOrOrganization({
        user_name: req.body.user_name,
        email: req.body.email,
        mobile_num: req.body.mobile_num,
        country: req.body.country,
        person: req.body.person,
        address: req.body.address,
        organization: req.body.organization,
        social_medias: req.body.social_medias,
        summary: req.body.summary
    })

    await personOrOrganization.save();
    res.send(personOrOrganization);
    
})

module.exports = router;