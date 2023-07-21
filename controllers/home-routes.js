const router = require('express').Router();
const { Blog, User} = require('../models');


// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User, // Use the User model
          as: 'user', // Use the alias 'user' for the User model
          attributes: ['username'], // Add any attributes you want to include from the User model
        },
      ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs, // Use the correct variable name here
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog - this used to be get one gallery
//const Blog = require('../models/Blog'); 


router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      attributes: [
        'blog_id',
        'Title', 
        'blogPost',
        'update_date', 
        'creation_date', 
      ],
    });

    if (!dbBlogData) {
      return res.status(404).json({ message: 'No blog found with this id' });
    }

    const blog = dbBlogData.get({ plain: true });
    res.render('blog', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// GET one painting - no paintings to get this is not needed


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
