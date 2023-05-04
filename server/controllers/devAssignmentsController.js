const pool = require("../db");

module.exports = {
    assignDev: async (req, res) => {
        const { ticketId } = req.params;
        const { devId } = req.body; //If multiple users assigned, frontend will run this call for each user.
        const client = await pool.connect();

        try {
            await client.query(
                "INSERT INTO dev_assignments (ticket_id, user_id) VALUES ($1, $2)",
                [ticketId, devId]
            );

            res
                .status(201)
                .json({ msg: `User ${devId} assigned to ${ticketId} succesfully` })
        } catch (error) {
            console.log("assignUsers query error: ", err);
            res
              .status(400)
              .json({ msg: "Please review user project assign creation query" });
        } finally {
            client.release();
        }
    },

    removeDev: async (req, res) => {
        const { ticketId } = req.params;
        const { devId } = req.body;
        const client = await pool.connect();

        try {
            await client.query(
                "DELETE FROM dev_assignments WHERE user_id = $1 AND ticket_id = $2",
                [devId, ticketId]
            );

            res
                .status(201)
                .json({ msg: `User ${devId} removed from ${ticketId} succesfully` })
        } catch (error) {
            console.log("assignUsers query error: ", err);
            res
              .status(400)
              .json({ msg: "Please review user removal query" });
        } finally {
            client.release();
        }
    },

    getAssignedDevs: async (req, res) => {
        const { ticketId } = req.params;
        const client = await pool.connect();
    
        try {
          const { rows, } = await client.query(
            "SELECT user_id, first_name, last_name, email FROM users JOIN dev_assignments ON (dev_assignments.user_id = users.id) WHERE ticket_id = $1",
            [ticketId]
          );
    
          res.json(rows);
        } catch (err) {
          console.log("getProjectUsers query error: ", err);
          res.status(400).json({ msg: "Please review query" });
        } finally {
          client.release();
        }
      },

      removeAllDevs: async (req, res) => {
        const { ticketId } = req.params;
        const client = await pool.connect();
    
        try {
          await client.query("DELETE FROM dev_assignments WHERE ticket_id = $1", [
            ticketId,
          ]);
    
          res.status(204).json({ msg: "All devs removed from ticket" });
        } catch (err) {
          console.error(err.message);
          res.status(500);
        } finally {
          client.release();
        }
      },
}