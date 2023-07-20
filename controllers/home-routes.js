const router = require('express').Router();
const { Blog} = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {

  try {
    const dbBlogData = await Blogs.findAll({
      include: [
        {
          model: Blogs,
          attributes: ['Title', 'blogPost', 'blog_id','creation_date', 'update_date'],
        },
      ],
    });

    const blog = dbBlogData.map((blog) =>
      Blog.get({ plain: true })
    );
    res.render('homepage', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog - this used to be get one gallery
const Blog = require('../models/Blog'); 


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
