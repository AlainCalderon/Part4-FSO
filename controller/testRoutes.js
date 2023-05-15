const testRoutes = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')



testRoutes.post('/reset',async(req,res,next)=>{
    await Blog.deleteMany({});
    await User.deleteMany({})
    res.status(204).end();
})



module.exports = testRoutes;