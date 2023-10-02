const router = require('express').Router();
const { User } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const user = req.session.user;
        res.render('homepage', {
            user,
            loggedIn: req.session.loggedIn,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;