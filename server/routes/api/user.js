const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches route with "/api/users/"
router.route("/").get(userController.getAll).post(userController.addUser);

// Matches route with "/api/users/:id"
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
