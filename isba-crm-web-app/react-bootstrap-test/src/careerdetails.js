import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Establish a database connection
const db = mysql.createConnection({
    host: "msam.lmu.build",
    user: "msamlmub_crmWeb",
    password: "ISBACRMOutreach2024", // Caution: Avoid exposing sensitive credentials in code
    database: "msamlmub_crm24"
});

// Use JSON and CORS middleware
app.use(express.json());
app.use(cors());

// Root endpoint for basic testing
app.get("/", (req, res) => {
    res.json({ message: "Hello, this is the backend" });
});

// Endpoint to fetch tags of the type "Industry"
app.get("/industryTags", (req, res) => {
    const query = "SELECT DISTINCT `Tag` FROM `TagMaster` WHERE `TypeOfTag` = 'Industry'";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Failed to fetch industry tags:", err);
            return res.status(500).send("Error fetching industry tags.");
        }
        const tags = results.map(row => row.Tag);
        res.json(tags);
    });
});

// Start the server
const port = process.env.PORT || 8800; // Use the environment variable or default to 8800
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
