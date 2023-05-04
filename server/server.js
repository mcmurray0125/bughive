require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes")
const db = require('./db');
const cors = require("cors")


const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
    );
    if (req.method === "options") {
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
      return res.status(200).json({});
    }
    next();
  });
  
app.use(routes);


app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})