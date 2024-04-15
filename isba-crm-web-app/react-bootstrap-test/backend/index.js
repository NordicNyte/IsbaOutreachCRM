import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "msam.lmu.build",
    user: 'msamlmub_crmWeb',
    password: 'ISBACRMOutreach2024',
    database: 'msamlmub_crm24'
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello this is the backend");
});

app.get("/ContactMaster", (req, res) => {
    const q = "SELECT cm.ContactID, cm.First, cm.Last, cm.LinkedInUrl, GROUP_CONCAT(s.skill SEPARATOR ', ') AS skill FROM ContactMaster cm LEFT JOIN SkillDump sd ON cm.ContactID = sd.ContactID LEFT JOIN Skill s ON sd.ContactID = s.alumni_id GROUP BY cm.ContactID";
    
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/skills", (req, res) => {
    const q = "SELECT DISTINCT SkillName FROM SkillDump";
    
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        const skills = data.map(item => item.SkillName);  // Corrected to match the expected column name in the database
        return res.json(skills);
    });
});

app.post("/ContactMaster", (req, res) => {
    const q = "INSERT INTO ContactMaster (`First`, `Last`, `LinkedInUrl`) VALUES (?)";
    const values = [
        req.body.First,
        req.body.Last,
        req.body.LinkedInUrl,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Contact has been created successfully");
    });
});

app.listen(8800, () => {
    console.log('Connected to backend!');
});