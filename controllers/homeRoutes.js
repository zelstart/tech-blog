const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
      const posted = await Post.findAll({ 
          include: [{ model: User }]
      });
      const posts = posted.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in, 
           
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    }
});

// get login page
router.get('/login', async (req, res) => {
    res.render('login')
})

// get signup page
router.get('/signup', async (req, res) => {
    res.render('signup')
})

// get dashboard page
router.get('/dashboard', async (req, res) => {
    res.render('dashboard')
})

// get new post page
router.get('/newpost', async (req, res) => {
    res.render('newpost')
})

module.exports = router;
