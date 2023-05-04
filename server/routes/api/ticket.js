const router = require("express").Router();
const ticketController = require("../../controllers/ticketController");
const authorization = require("../../middleware/authorization");

// Matches route with "/api/tickets/"
router.route("/").get(ticketController.getUserTickets);

router
  .route("/:projectId")
  .post(authorization, ticketController.createTicket)
  .get(ticketController.getProjectTickets);

router
  .route("/:projectId/:ticketId")
  .get(ticketController.getTicket)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;