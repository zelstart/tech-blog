const router = require('express').Router();
const { User, Post } = require('../../models');

// router.get('/signup', (req, res) => {
//     res.render('signup');
//   });

// // sign up (api/users/signup)
// router.post('/signup', async (req, res) => {
//     try {
//         const newUser = await User.create({
//             name: req.body.name,
//             password: req.body.password
//         });

//         req.session.save(() => {
//             req.session.userId = newUser.id;
//             req.session.name = newUser.name;
//             req.session.loggedIn = true;
//         });
//         console.log(req.session)

//         res.json(newUser);
//         req.session.user = user
//         res.redirect('/homepage');
        

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Login route
// router.get('/login', (req, res) => {
//     res.render('login');
//   });

// // login (api/users/login)
// router.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 name: req.body.name,
//             },
//         });
// // if user doesn't exist or password doesn't match stored password
//         if (!user || !user.checkPassword(req.body.password)) {
//             return res.status(400).json({ message: 'Invalid login. Please try again.' });
//         }

//         req.session.save(() => {
//             req.session.userId = user.id;
//             req.session.name = user.name;
//             req.session.loggedIn = true;

//             res.json({ user });
//             req.session.user = user
//             res.redirect('/homepage');

//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



// Signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Create a new user in the database
    const user = await User.create({
      name,
      password, 
    });

    // Redirect to login page or dashboard
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during registration');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { name } });

    if (!user || !user.checkPassword(req.body.password)) {
      return res.status(401).send('Invalid username or password');
    }

    // Start a user session
    req.session.user = user;

    // Redirect to the dashboard
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during login');
  }
});



// get all users (api/users)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user by ID. include their posts (api/#)
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
