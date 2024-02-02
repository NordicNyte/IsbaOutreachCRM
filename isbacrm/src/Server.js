// connection = pymysql.connect(

//     host='msam.lmu.build',

//     user='msamlmub_cap01',

//     password='Q4h786QhJEJYh9E',

//     db='msamlmub_LMUCBA_staging',

//     charset='utf8mb4')

// port 3306

const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
app.use(cors());

const port = 3000; // You can use any port that's free on your system
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.use(express.json()); // for parsing application/json


const db = mysql.createConnection({
  host: 'msam.lmu.build', // or your database host
  user: 'msamlmub_cap01',
  password: 'Q4h786QhJEJYh9E',
  database: 'msamlmub_LMUCBA_staging'
});

db.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL: ', error);
    return;
  }
  console.log("MySQL Connected...");
});

app.get('/executeQuery', (req, res) => {
    const sqlQuery = 'SELECT * FROM AcademicHistory';
    db.query(sqlQuery, (err, results) => {
      if (err) {
        res.status(500).send('Error executing the query: ' + err.message);
      } else {
        res.json(results);
      }
    });
});
