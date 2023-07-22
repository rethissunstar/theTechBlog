const router = require('express').Router();
const { Blog, User} = require('../models');


// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date', 'username'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
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
    const blogId = req.params.id;
    const dbBlogData = await Blog.findOne({
      where: { blog_id: blogId },
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date','username'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
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
