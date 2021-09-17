const router = require("express").Router();
const BlogCtrl = require("./../controllers/blog.controller");

/*
create blog post
*/
router.post("/create", BlogCtrl.create);
/*
update blog post
*/
router.put("/update/:blogId", BlogCtrl.update);
/*
delet blog post
*/
router.delete("/delete/:blogId", BlogCtrl.deletePostById);
/*
get blog post by id
*/
router.get("/:blogId", BlogCtrl.getblogPostById);

/*
all create blog post
*/
router.get("/paginated/:page", BlogCtrl.getAllWithPage);

/*
all create blog post
*/
router.get("/", BlogCtrl.getAllblogPost);

/*
comment on a blog post
*/
router.post("/create-comment/:blogId", BlogCtrl.creatComment);
/*
update a comment on a blog post
*/
router.put("/update-comment/:commentId", BlogCtrl.updateComment);
/*
get a comment by id
*/
router.get("/get-comment/:commentId", BlogCtrl.getCommentById);
/*
delete a comment on a blog post
*/
router.delete("/delete-comment/:commentId", BlogCtrl.deleteCommentById);
/*
get all comments  on a blog post
*/
router.get("/comments/:blogId", BlogCtrl.getComments);
module.exports = router
