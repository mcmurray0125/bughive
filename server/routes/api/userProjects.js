const router = require("express").Router();
const userProjectsController = require("../../controllers/userProjectsController");
const authorization = require("../../middleware/authorization");

router
  // Matches route with "/api/userprojects/:projectId"
  .route("/:projectId")
  .get(authorization, userProjectsController.getProjectUsers)
  .post(authorization, userProjectsController.addUserToProject)
  .delete(authorization, userProjectsController.removeAllUsers);

  // Matches route with "/api/userprojects/:projectId/:userId"
router
  .route("/:projectId/:userId")
  .delete(authorization, userProjectsController.removeUserFromProject);

module.exports = router;