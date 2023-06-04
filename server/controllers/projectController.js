const pool = require("../db");

module.exports = {
  getAll: async (req, res) => {;
    const client = await pool.connect();

    try {
      const { rows } = await client.query("SELECT * FROM projects");

      res.json(rows)
    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500).json({ msg: "Unable to get projects from database" });
    } finally {
      client.release();
    }
  },
  getProject: async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();

    try {
      const {
        rows,
      } = await client.query("SELECT * FROM projects WHERE id = $1", [id]);

      res.json(rows[0]);
    } catch (e) {
      console.log("getProject query error: ", e);
      res.status(400).json({
        msg: "Unable to get project from database. Please review query",
      });
    } finally {
      client.release();
    }
  },
  createProject: async (req, res) => {
    const { name, description } = req.body;
    const client = await pool.connect();
    //May need some logic to ensure project doesn't already exist

    try {
      const {
        rows,
      } = await client.query(
        "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING id",
        [name, description]
      );

      res.status(201).json(rows[0]);
    } catch (err) {
      console.log("createProject query error: ", err);
      res.status(400).json({ msg: "Please review project creation query" });
    } finally {
      client.release();
    }
  },
  deleteProject: async (req, res) => {
    const projectId = req.params.id;

    console.log(projectId);
    const client = await pool.connect();

    //Need to delete all rows in tables with foreign keys as well
    try {
      //initialize transaction
      await client.query("BEGIN");

      //delete dev_assignments, ticket history, comments from tickets
      Promise.all([
        await client.query(
          "DELETE FROM dev_assignments WHERE ticket_id IN (SELECT id FROM tickets WHERE project_id = $1)",
          [projectId]
        ),
        await client.query(
          "DELETE FROM comments WHERE ticket_id IN (SELECT id FROM tickets WHERE project_id = $1)",
          [projectId]
        ),
      ]);

      //delete tickets, user_projects from projects
      Promise.all([
        await client.query("DELETE FROM tickets WHERE project_id = $1", [
          projectId,
        ]),
        await client.query("DELETE FROM user_projects WHERE project_id = $1", [
          projectId,
        ]),
      ]);

      //delete project
      await client.query("DELETE FROM projects WHERE id = $1", [projectId]);

      //if no errors, commit the transaction
      await client.query("COMMIT");

      res.status(200).json({
        msg: `Project ${projectId} and associated tickets/team data succesfully deleted`,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.log("deleteProject query error: ", err);
      res.status(500).json({ msg: `Project deletion of ${projectId} failed` });
    } finally {
      client.release();
    }
  },
  updateProject: async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    const client = await pool.connect();

    try {
      const updateProject = await client.query(
        "UPDATE projects SET (name, description) = ($1, $2) WHERE id = $3",
        [name, description, id]
      );

      res.json(`Project: ${name} updated successfully`);
    } catch (e) {
      console.log("updateProject query error: ", e);
      res.status(400).json({ msg: "Please review project update query" });
    } finally {
      client.release();
    }
  },
};