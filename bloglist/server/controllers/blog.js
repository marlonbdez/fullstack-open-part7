const jwt = require('jsonwebtoken')
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      "username": 1,
      "name": 1,
      "id": 1
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body

    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    if (!request.user) {
      return response.status(401).json({
        error: 'user not found'
      })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: request.user._id
    })

    const savedBlog = await blog.save();
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    await savedBlog.populate('user', { username: 1, name: 1 })

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {

    console.log('request.user', request.user)
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(401).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(403).json({error: 'permission denied'})
    } 
    
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body

    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {
      "username": 1,
      "name": 1,
      "id": 1
    });

    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const { comment } = request.body
    const blogId = request.params.id

    if (!comment) {
      return response.status(400).json({ error: 'Comment cannot be empty' })
    }

    const blog = await Blog.findById(blogId)
    if(!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    blog.comments = blog.comments.concat({ content: comment, createdAt: new Date() })
    const updatedBlog = await blog.save();
    response.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
