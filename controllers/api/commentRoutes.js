const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:postId', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;
        const { body } = req.body;

        if (!req.session.loggedIn) {
            return res.status(401).send('You were logged out due to inactivity - please login to continue that activity');
        }

        const comment = await Comment.create({
            body,
            user_id: req.session.userId,
            post_id: postId,
        });

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the comment' });
    }
});


module.exports = router;
