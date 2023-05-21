const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require(".././utilities/jwtGenerator");

module.exports = {
  getAll: async (req, res) => {
    const client = await pool.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, first_name, last_name, email, role FROM users"
      );

      res.json(rows);
    } catch (err) {
      console.log("Error getting users from database: ", err);
      res.status(500).json({ msg: "Unable to get users from database" });
    } finally {
      client.release();
    }
  },
  addUser: async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    const client = await pool.connect();

    try {
      //Look if user already exists
      const user = await client.query("SELECT id FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length !== 0) {
        return res.status(401).send("User already exists");
      }

      //password encryption before adding to DB
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      //Add new user to DB
      const newUser = await client.query(
        "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [firstName, lastName, email, hash, role]
      );

      //Generate Token
      const token = jwtGenerator(newUser.rows[0].id);

      res.json({ token });
    } catch (err) {
      console.log(
        `Failed to add ${firstName} ${lastName} to the database: `,
        "\n",
        err
      );
      res.status(400).json({ msg: "Please review user add query" });
    } finally {
      client.release();
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();

    try {
      const { rows } = await client.query(
        "SELECT id, first_name, last_name, email, role, password_hash FROM users WHERE id = $1",
        [id]
      );

      res.json(rows[0]);
    } catch (err) {
      console.log(`Failed to get user ${id}: `, "\n", err);
      res.status(400).json({ msg: "Please review user request query" });
    } finally {
      client.release();
    }
  },

  lookupUserByEmail: async (req, res) => {
    const { email } = req.body;
    console.log(`Looking for existing email: ${email}`);

    const client = await pool.connect();

    try {
      console.log("connected to postgres Pool");

      const { rows } = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      console.log(`query result: ${rows}`);

      res.json(rows);
    } catch (err) {
      console.log(`Failed to get user: `, "\n", err);
      res.status(400).json({ msg: "Please review user request query" });
    } finally {
      client.release();
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, role } = req.body;
    const client = await pool.connect();

    try {
      const updateUser = await client.query(
        "UPDATE users SET (first_name, last_name, email, role) = ($1, $2, $3, $4) WHERE id = $5",
        [first_name, last_name, email, role, id]
      );

      res.json(`${first_name} ${last_name} profile: updated successfully`);
    } catch (err) {
      console.log(`Failed to update user ${id}: `, "\n", err);
      res.status(400).json({ msg: "Please review user update query" });
    } finally {
      client.release();
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();

    try {
      const deleteUser = await client.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);

      res.status(200).json({ msg: `User ${id} succesfully deleted` });
    } catch (err) {
      console.log(`Failed to delete user ${id}: `, "\n", err);
      res.status(500).json({ msg: `Project deletion of ${id} failed` });
    } finally {
      await client.release();
    }
  },
};