const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { response } = require("express");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "VishnU6409@@",
    database: "room_db", 
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({fextended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM ro_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {name, gender, contact, pincode, deposit, beds, location, rent} = req.body;
    const sqlInsert = "INSERT INTO ro_db (name, gender, contact, pincode, deposit, beds, location, rent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; 
    db.query(sqlInsert, [name, gender, contact, pincode, deposit, beds, location, rent], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});


app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM ro_db WHERE id = ?"; 
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM ro_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {name, gender, contact, pincode, deposit, beds, location, rent} = req.body;
    const sqlUpdate = "UPDATE ro_db SET name = ?, gender = ?, contact = ?, pincode = ?, deposit = ?, beds = ?, location = ?, rent = ? WHERE id = ?";
    db.query(sqlUpdate, [name, gender, contact, pincode, deposit, beds, location, rent, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});


// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO ro_db (name, gender, contact, pincode, deposit, beds, location, rent) VALUES ('Kapil Prakash Gowar', 'Girls', 9606112027, 411001, 10000, 3, 'Koregaon Park', 7000)";
//     db.query(sqlInsert, (error, result) => {
//         console.log("error", error);
//         console.log("result", result);
//         res.send("Hello Express");
//     });    
// });
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})