// get post page
router.get('/newpost', (req, res) => {
    res.render('newpost');
  });

// get dashboard page
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });