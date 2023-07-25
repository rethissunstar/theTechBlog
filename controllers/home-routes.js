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
          attributes: ['username'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
      username: req.session.username, 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/update/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const dbBlogData = await Blog.findOne({
      where: { blog_id: blogId },
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date','username'],
      include: [
        {
          model: User,
         attributes: ['username'],
        },
      ],
    });

    if (!dbBlogData) {
      return res.status(404).json({ message: 'No blog found with this id' });
    }

    const blog = dbBlogData.get({ plain: true });

   
    const loggedInUser = req.session.loggedIn ? req.session.username : null;
    const isOwner = loggedInUser === blog.username;
    console.log(req.session.user);

    res.render('update', {
      blog,
      loggedIn: req.session.loggedIn,
      isOwner, 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one painting - no paintings to get this is not needed
router.get('/blog/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const dbBlogData = await Blog.findOne({
      where: { blog_id: blogId },
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date','username'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!dbBlogData) {
      return res.status(404).json({ message: 'No blog found with this id' });
    }

    const blog = dbBlogData.get({ plain: true });

   
    const loggedInUser = req.session.loggedIn ? req.session.username : null;
    const isOwner = loggedInUser === blog.username;
   // console.log(req.session.user);

    res.render('blog', {
      blog,
      loggedIn: req.session.loggedIn,
      isOwner, 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//update routes

router.put('/update-complete/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, blog_post } = req.body;
    const dbBlogData = await Blog.findOne({
      where: { blog_id: blogId },
    });

    if (!dbBlogData) {
      return res.status(404).json({ message: 'No blog found with this id' });
    }

    const loggedInUser = req.session.loggedIn ? req.session.username : null;
    if (dbBlogData.username !== loggedInUser) {
      return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }

    Blog.update(
      {
        title,
        blog_post,
        update_date: new Date(),
      },
      {
        where: { blog_id: blogId },
      }
    );

    res.redirect(`/blog/${blogId}`); 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});


router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect('/login');
    }

    const loggedInUser = req.session.loggedIn ? req.session.username : null;

    const userPosts = await Blog.findAll({
      where: { username: loggedInUser },
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date'],
    });

    console.log(userPosts);

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      posts: userPosts.map(post => post.get({ plain: true })),
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//create route
router.get('/dashboard-create', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.redirect('/login');
    }

    const loggedInUser = req.session.loggedIn ? req.session.username : null;

    const userPosts = await Blog.findAll({
      where: { username: loggedInUser },
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date'],
    });

    console.log(userPosts);

    res.render('dashboard-create', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      posts: userPosts.map(post => post.get({ plain: true })),
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// router.post('/dashboard-create', async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const loggedInUser = req.session.loggedIn ? req.session.username : null;
 
//     const newPost = await Blog.create({
//       title,
//       blog_post: content,
//       username: loggedInUser,
//       creation_date: new Date(),
//       updated_at: new Date(), 
//     });

//        const userPosts = await Blog.findAll({
//       where: { username: loggedInUser },
//       attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date'],
//     });

//     console.log(userPosts);

//      res.render('dashboard-create', {
//       loggedIn: req.session.loggedIn,
//       username: req.session.username,
//       posts: userPosts.map(post => post.get({ plain: true })),
//     })
//     .then(() => {
//       res.redirect('/dashboard');
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
router.post('/dashboard-create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const loggedInUser = req.session.loggedIn ? req.session.username : null;

    const newPost = await Blog.create({
      title,
      blog_post: content,
      username: loggedInUser,
      creation_date: new Date(),
      updated_at: new Date(), 
    });

    const userPosts = await Blog.findAll({
      where: { username: loggedInUser },
      attributes: ['blog_id', 'title', 'blog_post', 'creation_date', 'update_date'],
    });

    console.log(userPosts);

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = true;
  
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
