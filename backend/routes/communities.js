const express = require('express');
const Community = require('../models/Community');
const User = require('../models/User');
const router = express.Router();

router.post('/create-community', async(req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const author = req.body.author;
    const community_id = req.body.community_id || `${author}-community${(Math.random()*10)+1}`;
    try {
        let community = await Community.findOne({community_id});
        if(community) {
            return res.status(400).json({message: 'Community already exists. Try with a different Community ID'});
        }
        community = Community.create({
            name,
            description,
            author,
            community_id,
        }); 
        // console.log('c c ', community);
        return res.status(201).json({message: 'Community created successfully.'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error.'})
    }
})

router.post('/join-community', async(req, res) => {
    console.log('api start');
    const member_id = await req.body.member_id;
    const community_id = await req.body.community_id;
    console.log('ids', member_id, community_id);
    try {
        let community = await Community.findOne({community_id});console.log('comm found ', community);
        let member = await User.findOne({username: member_id});console.log('mem resp ', member);
        if(!community) {
            return res.status(400).json({message: 'No such community exists.'})
        }
        community.members.push(member_id);
        member.communities.push(community_id);
        await User.findOneAndUpdate({username: member_id}, { $set: member });
        await Community.findOneAndUpdate({community_id}, { $set: community });
        return res.status(200).json({message: 'Community joined successfully.'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error.'})
    }
})

router.post('/community-list', async(req, res) => {
    try {
        const community_list = await Community.find();
        if(!community_list) {
            res.status(404).json({message: 'No communities exist currently.'})
        }
        res.status(200).json({community_list, message: 'All communities fetched.'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error.'})
    }
})

module.exports = router;