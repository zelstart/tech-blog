const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });

        console.log(req.session);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// signup route
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // create a new user in the database
        const user = await User.create({
            username,
            password,
        });

        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        // redirect to homepage
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during registration');
    }
});

// login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // find the user in the database
        const user = await User.findOne({ where: { username } });
        // check if user exists & if password matches
        if (!user || !user.checkPassword(password)) {
            return res.status(401).send('Invalid username or password');
        }
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        console.log('Session saved');
        // log userId
        console.log('User ID:', req.session.userId);
        // log loggedIn status
        console.log('Logged In:', req.session.loggedIn);

        console.log('Saved session data:', req.session);

        // redirect to homepage
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during login');
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});


// get dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.userId },
            include: [{ model: User }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        const user = await User.findByPk(req.params.id);
        console.log(user); // Check if this prints the user object

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// get new post page
router.get('/newpost', withAuth, async (req, res) => {
    res.render('newpost', {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
    })
})

// create new post
router.post('/createpost', withAuth, async (req, res) => {
    const { title, body } = req.body;

    try {
        const post = await Post.create({
            title,
            content: body,
            user_id: req.session.userId
        });

        res.redirect(`/post/${post.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the post');
    }
});

// get blog post page
router.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: Comment, include: User }, User]
        });

        console.log(post.comments)
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const user = await User.findByPk(post.user_id, {
            attributes: ['username', 'id']
        });

        res.render('postpage', {
            post,
            user,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the post');
    }
});


// create comment
router.post('/post/:postId', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;
        const { body } = req.body;

        if (!req.session.loggedIn) {
            // alert the user that they were logged out due to inactivity
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

// get the page for updating posts
router.get('/updatepost/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        console.log(postId, post)
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.user_id !== req.session.userId) {
            return res.status(403).send('You are not authorized to update this post');
        }

        res.render('updatepost', {
            post,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the post');
    }
});

// update the post
router.put('/updatepost/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, body } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }
        // user has to be the author of the post to update
        if (post.user_id !== req.session.userId) {
            return res.status(403).send('You are not authorized to update this post');
        }

        await post.update({
            title,
            content: body,
        });

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the post');
    }
});


// delete post
router.delete('/deletepost/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }
        // user has to be the author of the post to delete
        if (post.user_id !== req.session.userId) {
            return res.status(403).send('You are not authorized to delete this post');
        }

        await post.destroy();
        res.status(200).send('Post deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the post');
    }
});


module.exports = router;


