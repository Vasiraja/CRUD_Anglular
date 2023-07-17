const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "practical",
  password: "Mysql#7",
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connection;

pool.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to database: ", err);
  } else {
    connection = conn;

    app.post("/create", (req, res) => {
      const name = req.body.name;
      const class_ = req.body.class;
      const phone = req.body.phone;

      const sql = `INSERT INTO first (name, class, phone) VALUES ('${name}', '${class_}', '${phone}');`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("Error inserting data: ", err);
          res.status(500).json({ error: "Failed to insert data." });
        } else {
          console.log("Insertion successful");
          res.status(200).json({ message: "Insertion successful." });
        }
      });
    });

    app.get("/reading", (req, res) => {
      const sql = "SELECT * FROM first";
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("Error reading data: ", err);
          res.status(500).json({ error: "Failed to read data." });
        } else {
          res.status(200).json(result);
        }
      });
    });
    app.get("/readid/:id", (req,res) => {
      const id = req.params.id;
      const sql = `select * from first where id = ${id}`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("Error retrieving data");
          console.log(err)
        } else {
          res.status(200).json(result)
        }
      })
    });
 
 
    app.delete("/del/:id", (req, res) => {
      const id = req.params.id;
      const sql = `delete from first where id = ${id}`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("Error deleting Data", err);
        } else {
          res.status(200).json(result);
        }
      });
    });

    app.get("/search", (req, res) => {
      const searchkey = req.query.searchkey;

      const sql =
        "SELECT * FROM first WHERE name LIKE ? OR name LIKE ? OR class LIKE ? OR phone LIKE ?";

      const searchPattern1 = `${searchkey}%`;
      const searchPattern2 = `%${searchkey}`;
      const searchPattern3 = `${searchkey}%`;
      const searchPattern4 = `${searchkey}%`;

      connection.query(
        sql,
        [searchPattern1, searchPattern2, searchPattern3, searchPattern4],
        (err, result) => {
          if (err) {
            console.error("Error searching data");
            console.log(err);
            res.status(500).send("Error searching data");
          } else {
            res.status(200).json(result);
          }
        }
      );
    });

    app.put("/edit/:id", (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const sql = `UPDATE first SET ? WHERE id = ?`;

      connection.query(sql, [data, id], (err, result) => {
        if (err) {
          console.error("Error updating data");
          console.log(err);
          res.status(500).send("Error updating data");
         } else {
          console.log(result);
          res.status(200).json(result);
        
        }
      });
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }
});
