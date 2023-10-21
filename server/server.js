import express from "express"
import mysql from "mysql"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"studenthub",
})

con.connect(function(err) {
    if(err) { 
        console.log("Error in Connection");
        console.log(err);
    } else {
        console.log("SQL server Connected");
    }
})
app.listen(8081, ()=> {
    console.log("Running");
})



app.get('/getcourses',(req,res)=>{
  const sql="SELECT * FROM courses";
  con.query(sql,(err,result)=>{
      if(err) return res,json({Error:"Got an error in the sql"});
      return res.json({Status:"Success",Result:result})

  })
})


app.delete('/deletecourse/:id',(req,res)=>{
    const id = req.params.id;
    const sql='DELETE FROM courses WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete course error in sql"});
        return res.json({Status: "Success"})
    })
})


app.put('/updatecourse/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    let sql = 'UPDATE courses SET ? WHERE id = ?';
  
    // Remove id from updatedData
    delete updatedData.id;
  
    con.query(sql, [updatedData, id], (err, result) => {
      if (err) {
        console.error('Error updating course details', err);
        return res.json({ Status: 'Error' });
      }
      return res.json({ Status: 'Success' });
    });
  });


  app.get('/getcourses/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM courses WHERE id = ?';
    con.query(sql, [id], (err, result) => {
      if (err) {
        return res.json({ Error: "get course error in SQL" });
      }
      if (result.length === 0) {
        return res.json({ Error: "Course not found" });
      }
      // Send the course data in the response
      return res.json({ Status: "Success", Result: result });
    });
  });
  app.post('/addcourse', (req, res) => {
    // SQL query to insert new course details into the database
    const sql = "INSERT INTO courses (`coursename`, `imgurl`, `description`, `duration`) VALUES (?)";
    
    // Values extracted from the incoming request
    const values = [
        req.body.coursename,
        req.body.imgurl,
        req.body.description,
        req.body.duration
    ];
    
    // Execute the query
    con.query(sql, [values], (err, data) => {
        // Error handling for the query
        if(err) {
            console.error("Error occurred during query execution:", err); // log the detailed error
            return res.status(500).json({status: 'Error', message: 'Unable to add course details to the database.'});
        }

        // Return a success response if course details were inserted successfully
        return res.status(200).json({status: 'Success', message: 'Course details added successfully.', data: data});
    });
});


app.post('/signup', (req, res) => {
  const sql = "INSERT INTO students (`firstname`,`lastname`,`dob`,`email`,`phone`,`password`) VALUES (?)";
  const values=[
      req.body.firstname,
      req.body.lastname,
      req.body.dob,
      req.body.email,
      req.body.phone,
      req.body.password
  ]
  con.query(sql,[values],(err,data)=> {
      if(err) {
          return res.json("Error");
      }
      return res.json(data);
  })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM students WHERE email = ? AND password = ?';

  con.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ Status: 'Error', Message: 'Database error' });
    } else if (results.length === 1) {
      res.status(200).json({ Status: 'Success' });
    } else {
      res.status(401).json({ Status: 'Failure' });
    }
  });
});


app.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM admin WHERE email = ? AND password = ?';

  con.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ Status: 'Error', Message: 'Database error' });
    } else if (results.length === 1) {
      res.status(200).json({ Status: 'Success' });
    } else {
      res.status(401).json({ Status: 'Failure' });
    }
  });
});

app.post('/adminsignup', (req, res) => {
  const sql = "INSERT INTO admin (`firstname`,`lastname`,`dob`,`email`,`phone`,`password`) VALUES (?)";
  const values=[
      req.body.firstname,
      req.body.lastname,
      req.body.dob,
      req.body.email,
      req.body.phone,
      req.body.password
  ]
  con.query(sql,[values],(err,data)=> {
      if(err) {
          return res.json("Error");
      }
      return res.json(data);
  })
})