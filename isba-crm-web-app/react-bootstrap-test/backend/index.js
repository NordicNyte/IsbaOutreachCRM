import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Set up MySQL connection
const db = mysql.createConnection({
    host: "msam.lmu.build",
    user: 'msamlmub_crmWeb',
    password: 'ISBACRMOutreach2024',
    database: 'msamlmub_crm24'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connection established');
});

app.use(express.json());
app.use(cors());

// Middleware for logging all incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    console.log("Responding to root route");
    res.json("Hello, this is the backend");
});

app.get("/ContactMaster", (req, res) => {
    const query = "SELECT cm.ContactID, cm.First, cm.Last, cm.LinkedInUrl, GROUP_CONCAT(s.skill SEPARATOR ', ') AS skill FROM ContactMaster cm LEFT JOIN SkillDump sd ON cm.ContactID = sd.ContactID LEFT JOIN Skill s ON sd.ContactID = s.alumni_id GROUP BY cm.ContactID";
    console.log("Fetching all contact masters");
    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching contact masters:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(data);
    });
});

app.get("/skills", (req, res) => {
    const query = "SELECT DISTINCT SkillName FROM SkillDump";
    console.log("Fetching skills");
    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching skills:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(data);
    });
});

app.post("/ContactMaster", (req, res) => {
    const query = "INSERT INTO ContactMaster (`First`, `Last`, `LinkedInUrl`) VALUES (?)";
    const values = [req.body.First, req.body.Last, req.body.LinkedInUrl];
    console.log(`Inserting new contact: ${values.join(", ")}`);
    db.query(query, [values], (err, data) => {
        if (err) {
            console.error("Error inserting new contact:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json("Contact has been created successfully");
    });
});

app.get("/contact/:contactId", (req, res) => {
    const { contactId } = req.params;
    const query = `
        SELECT 
            cm.ContactID as 'Contact Id', cm.First as 'First Name', cm.Last as 'Last Name', cm.LinkedInUrl, cm.Country, ad.City, 
            cm.CreateDate as 'Date Contact Added to Database', cm.UpdateDate as 'Date Contact Updated', 
            ah.institute as 'College Studied At', ah.FieldOfStudy as 'Field of Study', ah.TypeofDegree as 'Degree Type', 
            ah.GraduationYear as 'Year Graduated', ad.Email1 as 'Primary Email'
        FROM 
            ContactMaster cm 
        LEFT JOIN AcademicHistory ah ON cm.ContactID = ah.ContactID
        LEFT JOIN Addresses ad ON cm.ContactID = ad.ContactID
        LEFT JOIN WorkHistory wk ON cm.ContactID = wk.ContactID
        WHERE cm.ContactID = ?
        GROUP BY cm.ContactID;
    `;
    console.log(`Fetching details for contact ID ${contactId}`);
    db.query(query, [contactId], (err, data) => {
        if (err) {
            console.error("Error fetching contact details:", err);
            return res.status(500).json({ error: err.message });
        }
        if (data.length) {
            res.json(data[0]);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    });
});

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
