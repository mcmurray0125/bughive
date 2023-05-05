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
    const client = await pool.connect();

    const { projectId } = req.params;

    try {
      const {
        rows,
      } = await client.query(
        "SELECT id, email, first_name, last_name FROM users as U WHERE NOT EXISTS (SELECT user_id FROM user_projects as UP WHERE UP.user_id = U.id AND UP.project_id = $1)",
        [projectId]
      );

      res.status(201).json(rows);
    } catch (err) {
      console.log(err);
      res.send(500).json({ msg: "Failed to fetch available users" });
    }
  },
};