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
        .status(400)
        .json({ msg: `Failed to add user ${userId}to project.` });
    } finally {
      client.release();
    }
  },

  removeUserFromProject: async function (req, res) {
    const { projectId, userId } = req.params;
    const client = await pool.connect();

    try {
      await client.query(
        "DELETE FROM user_projects WHERE project_id = $1 AND user_id = $2",
        [projectId, userId]
      );

      res.status(202).json(`User removed from project`);
    } catch (err) {
      console.log("getProject query error: ", err);
      res
        .status(500)
        .json({ msg: "Unable to remove user_project from database" });
    } finally {
      await client.release();
    }
  },
  removeAllUsers: async (req, res) => {
    const { projectId } = req.params;
    const client = await pool.connect();

    try {
      await client.query("DELETE FROM user_projects WHERE project_id = $1", [
        projectId,
      ]);

      res.status(202).json(`Project users deleted`);
    } catch (err) {
      console.log("getProject query error: ", err);
      res
        .status(500)
        .json({ msg: "Unable to remove user_project from database" });
    } finally {
      client.release();
    }
  },
  getProjectUsers: async function (req, res) {
    const { projectId } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query(
        "SELECT user_id, first_name, last_name, email, role FROM users JOIN user_projects ON (user_projects.user_id = users.id) WHERE project_id = $1",
        [projectId]
      );

      res.status(201).json(rows);
    } catch (err) {
      console.log(err);
      res
      .status(500)
      .json({ msg: "Failed to fetch available users. Please review query." });
    } finally {
      client.release();
    }
  },
};