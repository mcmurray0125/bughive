const router = require("express").Router();
const commentController = require("../../controllers/commentController");
// const authorization = require("../../middleware/authorization");

// Matches route with "/api/comments/"
router
  .route("/:ticketId")
  .post(commentController.createComment)
  .get(commentController.getTicketComments);

router
  .route("/:ticketId/:commentId")
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;