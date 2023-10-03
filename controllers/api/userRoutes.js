const router = require('express').Router();
const { User, Post } = require('../../models');

// sign up 
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.name = newUser.name;
            req.session.loggedIn = true;
        });

        res.json(newUser);

    } catch (err) {
        res.status(500).json(err);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                name: req.body.name,
            },
        });

        if (!user || !user.checkPassword(req.body.password)) {
            return res.status(400).json({ message: 'Invalid login. Please try again.' });
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.name = user.name;
            req.session.loggedIn = true;

            res.json({ user, message: `Welcome back, ${user.name}` });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all users 
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user by ID. include their posts
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Post }]
        });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
