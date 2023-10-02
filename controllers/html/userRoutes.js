const router = require('express').Router();

// get login page
router.get('/login', (req, res) => {
    res.render('partials/login');
});

// get signup page
router.get('/signup', (req, res) => {
    res.render('partials/signup');
});

// get post page
router.get('/newpost', (req, res) => {
    res.render('partials/newpost');
});

// get dashboard page
router.get('/dashboard', (req, res) => {
    res.render('partials/dashboard');
});

module.exports = router;
