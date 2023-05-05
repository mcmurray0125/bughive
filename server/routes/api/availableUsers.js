const router = require("express").Router();
const availableUsersController = require("../../controllers/availableUsersController");

router
  // Matches route with "/api/availableusers/:projectId"
  .route("/:projectId")
  .get(availableUsersController.getAvailableUsers);

module.exports = router;