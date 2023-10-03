const router = require('express').Router();


router.get('/', async (req, res) => {
    console.log("Route hit!");
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        const user = req.session.user;
        res.render('partials/homepage', {
            user,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
