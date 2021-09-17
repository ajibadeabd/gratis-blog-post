const BlogServ = require("../services/blog.service");
const response = require("../utils/response");

class BlogContoller {

  async create(req, res) {
    const result = await BlogServ.create(req.body);
    res.status(201).send(response("Blog created  successfully", result));
  }
  async update(req, res) {
    const result = await BlogServ.update(req.params.blogId,req.body.newPost);
    res.status(200).send(response("Blog edited successfully", result));
  }
  async deletePostById(req, res) {
    const result = await BlogServ.deletePostById(req.params.blogId);
    res.status(200).send(response("Blog deleted successfully", result));
  }
  async getAllWithPage(req, res) {
    const result = await BlogServ.getAllWithPage(req.params.page);
    res.status(200).send(response("All Blog posts fetch successfully", result));
  }
  async getAllblogPost(req, res) {
    const result = await BlogServ.getAll();
    res.status(200).send(response("All Blog posts fetch successfully", result));
  }
  async getblogPostById(req, res) {
    const result = await BlogServ.getPostById(req.params.blogId);
    res.status(200).send(response("Blog post fetch successfully", result));
  }
  async creatComment(req, res) {
    const result = await BlogServ.creatComment(req.body,req.params.blogId);
    res.status(200).send(response("comment created successfully", result));
  }
  async updateComment(req, res) {
    const result = await BlogServ.updateComment(req.params.commentId,req.body.newComment);
    res.status(200).send(response("comment updated successfully", result));
  }
  async getCommentById(req, res) {
    const result = await BlogServ.getCommentById(req.params.commentId);
    res.status(200).send(response("comment fetched successfully", result));
  }
  async deleteCommentById(req, res) {
    const result = await BlogServ.deleteCommentById(req.params.commentId);
    res.status(200).send(response("comment deleted successfully", result));
  }
  async getComments(req, res) {
    const result = await BlogServ.getComments(req.params.blogId);
    res.status(200).send(response("All comments on this blog fetch successfully", result));
  }
  
  
}

module.exports = new BlogContoller();