const router = require('express').Router();
const { User, Post } = require('../../models');

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

      
      // Start a session and set session variables
      req.session.save(() => {
          req.session.userId = user.id;
          req.session.name = user.name;
          req.session.loggedIn = true;
          req.session.user = name;
    });
  
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
    const { name, password } = req.body;
  
    try {
      // find the user in the database
      const user = await User.findOne({ where: { name } });
        // check if user exists & if password matches
      if (!user || !user.checkPassword(password)) {
        return res.status(401).send('Invalid username or password');
      }
      
      req.session.save(() => {
          req.session.userId = user.id;
          req.session.name = user.name;
          req.session.loggedIn = true;
          req.session.user = name;
      });
  
      console.log(req.session);
  
      // redirect to homepage
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
