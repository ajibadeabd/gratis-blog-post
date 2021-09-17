
const Comment = require("./../models/comment.model");
const Blog = require("./../models/blog.model");
const mongoose = require("mongoose");
const CustomError = require("../utils/custom-error");
const ObjectId = require('mongoose').Types.ObjectId;
class BlogService {
  /*
  create a blog post 
  */
  async create(data) {
   const {  blogBody } = data
   if(!blogBody || blogBody.toString().trim().length<10){
     throw new CustomError('please provide  message with at least 10 character')
   }
   const doesBlogExist = await Blog.findOne({blogBody})
   if(doesBlogExist){
    throw new CustomError('A post with this exact message message already exist, Provide a new blog message ')
  }
   const newBlog = await Blog.create({blogBody})
   return newBlog
}


/*
update a blog post
*/
async update(blogId,newPost) {
  
  const isValid = ObjectId.isValid(blogId)

  if(!isValid){
    throw new CustomError('Please pass in a valid blog id')
  }
   const isBlogExist = await Blog.findById(blogId)
  if(!isBlogExist){
    throw new CustomError('You cant edit a non existing blog post ')
  }
  if(!newPost || newPost.toString().trim().length<10){
    throw new CustomError('please provide  message with at least 10 character to update  a blog post ')
  }
  isBlogExist.blogBody=newPost
  return isBlogExist.save()
}

/*
delete a blog post
*/
async deletePostById(blogId) {
  
  const isValid = ObjectId.isValid(blogId)
  if(!isValid){
    throw new CustomError('Please pass in a valid blog id to delete this post ')
  }
   const isBlogExist = await Blog.findById(blogId)
  if(!isBlogExist){
    throw new CustomError('You cant delete a non existing blog post ')
  }
 await isBlogExist.delete()

//  delete all post related comment

   await Comment.deleteMany({ blogId: blogId,blogId: { $in: [blogId ] } })
  return  
}

/*
get all blog post
*/
async getAll() {
  return await Blog.find({})
}


/*
get Get blog posts with pagination
*/
async getAllWithPage(page) {
  if(isNaN(page)){
    throw new CustomError('Please pass a valid page number')
      }
      if(page<1){
        throw new CustomError('page cannot be less that ')
       }
       
   if(page % 1 !== 0){
    throw new CustomError('page can only be a number ')
   }
            
          const limit = 5
  const pages = limit*(page-1)
  const blogs = await Blog.find({}).limit(limit).skip(pages)
  if(blogs.length== 0){
    throw new CustomError('No blog content on this page ')
   }

  return blogs
}

/*
get one post
*/
async getPostById(blogId) {
  const isValid = ObjectId.isValid(blogId)
  if(!isValid){
    throw new CustomError('Please pass in a valid blog id')
  }
  const isBlogExist = await Blog.findOne({_id:blogId})
  if(!isBlogExist){
    throw new CustomError('Blog does not exist')
  }
  return isBlogExist

}
/*
post comment on a post
*/
async creatComment(data,blogId) {
  await  this.getPostById(blogId)
  const {  commentBody } = data
  if(!commentBody || commentBody.toString().trim().length<10){
    throw new CustomError('please provide  message with at least 10 character ')
  }
  const comment = await Comment.create({blogId,comment: commentBody})
  return comment

}



/*
update a comment post
*/
async updateComment(blogId,newComment) {
  
  const isValid = ObjectId.isValid(blogId)
  if(!isValid){
    throw new CustomError('Please pass in a valid comment id')
  }
   const isCommentExist = await Comment.findById(blogId)
  if(!isCommentExist){
    throw new CustomError('You cant edit a non existing comment post ')
  }
  if(!newComment || newComment.toString().trim().length<10){
    throw new CustomError('please provide  message with at least 10 character to update  a comment post ')
  }
  isCommentExist.comment=newComment
  return await isCommentExist.save()
  
}

/*
delete a blog post
*/
async deleteCommentById(commentId) {
  
  const isValid = ObjectId.isValid(commentId)
  if(!isValid){
    throw new CustomError('Please pass in a valid comment id to delete this comment ')
  }
   const isCommentExist = await Comment.findById(commentId)
  if(!isCommentExist){
    throw new CustomError('You cant delete a non existing comment post ')
  }
 await isCommentExist.delete()
return 
}


/*
get comment by id 
*/
async getCommentById(commentId) {
  const isValid = ObjectId.isValid(commentId)
  if(!isValid){
    throw new CustomError('Please pass in a valid comment id')
  }
  const isCommentExist = await Comment.findById(commentId).populate('blogId')
  if(!isCommentExist){
    throw new CustomError('Comment does not exist ')
  }
  return isCommentExist
}


/*
get all comments related to a post 
*/
async getComments(blogId) {
  const isValid = ObjectId.isValid(blogId)
  if(!isValid){
    throw new CustomError('Please pass in a valid blog id')
  }
  const isBlogExist = await Blog.findById(blogId)
  if(!isBlogExist){
    throw new CustomError('Blog with this id  does not exist')
  }
  return await Comment.find({blogId}).populate('blogId')
}

}

module.exports = new BlogService();