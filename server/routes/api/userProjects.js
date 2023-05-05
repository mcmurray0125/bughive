const router = require("express").Router();
const userProjectsController = require("../../controllers/userProjectsController");

router
  // Matches route with "/api/userprojects/:projectId"
  .route("/:projectId")
  .get(userProjectsController.getProjectUsers)
  .post(userProjectsController.addUserToProject)
  .delete(userProjectsController.removeUserFromProject);

module.exports = router;