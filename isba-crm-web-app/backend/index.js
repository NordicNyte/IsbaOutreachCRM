import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"msam.lmu.build",
    user:'msamlmub_crmWeb',
    password: 'ISBACRMOutreach2024',
    database: 'msamlmub_crm24'
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/ContactMaster", (req,res)=>{
    const q = "SELECT * FROM ContactMaster"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/ContactMaster", (req,res)=>{
    const q = "Insert INTO ContactMaster (`First`, `Last`, `LinkedInUrl`) VALUES (?)"
    const values = [
        req.body.First,
        req.body.Last,
        req.body.LinkedInUrl,
    ]

    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created succesfully")
    })
})

app.listen(8800, ()=>{
    console.log('Connected to backend!')
})