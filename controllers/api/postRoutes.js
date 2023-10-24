const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId, {
            include: [{ model: Comment, include: User }, User]
        });

        if (!post) {
            return res.status(404).send('Post not found');
        }

        const user = await User.findByPk(post.user_id, {
            attributes: ['username', 'id']
        });

        res.json({ post, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the post');
    }
});

module.exports = router;
