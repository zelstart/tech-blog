const router = require('express').Router();
const { User, Post } = require('../../models');

// get all users (api/users)
router.get('/', async (req, res) => {
  try {
      const users = await User.findAll();
      res.json(users);
  } catch (err) {
      res.status(500).json(err);
  }
});

// get user by ID. include their posts (api/users/#)
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
