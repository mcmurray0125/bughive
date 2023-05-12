const pool = require("../db");

module.exports = {
  addUserToProject: async function (req, res) {
      const { projectId } = req.params;
      const { userId } = req.body;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "INSERT INTO user_projects (project_id, user_id) VALUES ($1, $2)",
        [projectId, userId]
      );

      res
        .status(201)
        .json(`User ${userId} successfully added to project: ${projectId}`);
    } catch (err) {
      console.log("addUserToProject error: ",err);
      res
        .status(500)
        .json({ msg: `Failed to add user ${userId}to project.` });
    }
  },

  removeUserFromProject: async function (req, res) {
      const { projectId } = req.params;
      const { userId } = req.body;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "DELETE FROM user_projects WHERE project_id = $1 AND user_id = $2",
        [projectId, userId]
      );

      res
        .status(202)
        .json(`User ${userId} successfully removed from project: ${projectId}`);
    } catch (err) {
      console.log("removeUserFromProject error: ",err);
      res
        .status(500)
        .json({ msg: `Failed to remove user ${userId}to project.` });
    }
  },

  getProjectUsers: async function (req, res) {
    const { projectId } = req.params;
    const client = await pool.connect();


    try {
      const {
        rows,
      } = await client.query(
        "SELECT user_id, first_name, last_name, email FROM users JOIN user_projects ON (user_projects.user_id = users.id) WHERE project_id = $1",
        [projectId]
      );

      res.status(201).json(rows);
      console.log(rows);
    } catch (err) {
      console.log(err);
      res
      .status(500)
      .json({ msg: "Failed to fetch available users" });
    }
  },
};