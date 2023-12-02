import express from "express"
import mysql from "mysql"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'; 
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

con.connect(function(err) {
    if(err) {   
        console.log("Error in Connection");
        console.log(err);
    } else {
        console.log("SQL server Connected");
    }
})

app.listen(process.env.SERVER_PORT, () => {
  console.log("Running");
});

// Configure Multer for profile picture uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));


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


  app.get('/getcourse/:id', (req, res) => {
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
      const studentId = results[0].id; 
      console.log('Logged in as a Student. Student ID:', studentId);
      res.status(200).json({ Status: 'Success', studentId });
    } else {
      res.status(401).json({ Status: 'Failure' });
    }
  });
});


app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'SELECT * FROM students WHERE id = ?';
  con.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ Status: 'Error', Message: 'Database error' });
    } else if (results.length === 1) {
      const studentData = results[0];
      res.status(200).json({ Status: 'Success', data: studentData });
    } else {
      res.status(404).json({ Status: 'Not Found' });
    }
  });
});

app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const user = req.body;
  const query = 'UPDATE students SET ? WHERE id = ?';

  con.query(query, [user, studentId], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ Status: 'Error', Message: 'Database error' });
    } else {
      res.json({ Status: 'Success' });
    }
  });
});

app.post('/uploadProfilePic', upload.single('profilePic'), (req, res) => {
  if (req.file) {
    const studentId = req.body.studentId; // Assuming you're passing student ID in the request
    const profilePicPath = `/uploads/${req.file.filename}`;
    const query = 'UPDATE students SET profilePic = ? WHERE id = ?';
    con.query(query, [profilePicPath, studentId], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ Status: 'Error', Message: 'Database error' });
      } else {
        res.json({ Status: 'Success', profilePicURL: profilePicPath });
      }
    });
  } else {
    res.status(400).json({ Status: 'Bad Request' });
  }
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


app.get('/getproblem',(req,res)=>{
  const sql="SELECT * FROM problems";
  con.query(sql,(err,result)=>{
      if(err) return res,json({Error:"Got an error in the sql"});
      return res.json({Status:"Success",Result:result})

  })
})

app.put('/updateproblem', (req, res) => {
  const { id, stat } = req.body;

  if (!id || !stat) {
      return res.status(400).json({ success: false, message: 'ID and status are required.' });
  }

  const sql = "UPDATE problems SET stat = ? WHERE id = ?";

  con.query(sql, [stat, id], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Database error' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Application not found.' });
      }

      res.status(200).json({ success: true, message: 'Status updated successfully.' });
  });
});



app.post('/addproblem', (req, res) => {
  // SQL query to insert new course details into the database
  const sql = "INSERT INTO problems (`name`, `email`, `problem`, `solution`, `stat`) VALUES (?)";
  
  // Values extracted from the incoming request
  const values = [
      req.body.name,
      req.body.email,
      req.body.problem,
      req.body.solution,
      req.body.stat
  ];
  
  // Execute the query
  con.query(sql, [values], (err, data) => {
      // Error handling for the query
      if(err) {
          console.error("Error occurred during query execution:", err); // log the detailed error
          return res.status(500).json({status: 'Error', message: 'Unable to add problem to the database.'});
      }

      // Return a success response if course details were inserted successfully
      return res.status(200).json({status: 'Success', message: 'problem added successfully.', data: data});
  });
});



app.put('/updatesolution/:id', (req, res) => {
  const { id } = req.params;
  const { solution } = req.body;

  if (!id || !solution) {
      return res.status(400).json({ success: false, message: 'ID and solution are required.' });
  }

  const sql = "UPDATE problems SET solution = ? WHERE id = ?";

  con.query(sql, [solution, id], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Database error' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Application not found.' });
      }

      res.status(200).json({ success: true, message: 'Solution updated successfully.' });
  });
});


app.delete('/deleteproblem/:id',(req,res)=>{
  const id = req.params.id;
  const sql='DELETE FROM problems WHERE id = ?';
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Error: "delete problem error in sql"});
      return res.json({Status: "Success"})
  })
})


app.post('/enrollcourse', (req, res) => {
  const sql = "INSERT INTO enroll (`name`,`selectedcourse`,`duration`) VALUES (?)";
  const values=[
      req.body.name,
      req.body.selectedcourse,
      req.body.duration,
  ]
  con.query(sql,[values],(err,data)=> {
      if(err) {
          return res.json("Error");
      }
      return res.json(data);
  })
})





app.get('/events',(req,res)=>{
  const sql="SELECT * FROM events";
  con.query(sql,(err,result)=>{
      if(err) return res,json({Error:"Got an error in the sql"});
      return res.json({Status:"Success",Result:result})

  })
})




app.post('/insertevents', (req, res) => {
  const sql = "INSERT INTO events (`title`, `start`, `end`, `time`,`endtime`) VALUES (?)";
  const values=[
      req.body.title,
      req.body.start,
      req.body.end,
      req.body.time,
      req.body.endtime,
  ]
  con.query(sql,[values],(err,data)=> {
      if(err) {
          return res.json("Error");
      }
      return res.json(data);
  })
})


app.get('/progress',(req,res)=>{
  const sql="SELECT * FROM enroll";
  con.query(sql,(err,result)=>{
      if(err) return res,json({Error:"Got an error in the sql"});
      return res.json({Status:"Success",Result:result})

  })
})

app.post('/storeGameData', (req, res) => {
  const {  title, score, correctans, wrongans, studentId } = req.body;
  
  // Insert the game result into a MySQL table
  const sql = 'INSERT INTO quizscore (title, score, correctans, wrongans, studentId) VALUES (?, ?, ?, ?, ?)';
  con.query(sql, [ title, score, correctans, wrongans,studentId], (err, result) => {
    if (err) {
      console.error('Error storing game data: ' + err);
      res.status(500).json({ error: 'Error storing game data' });
    } else {
      res.status(200).json({ message: 'Game data stored successfully' });
    }
  });
});

app.get('/gameusers/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  const sql = 'SELECT * FROM students WHERE id = ?';

  con.query(sql, [studentId], (error, results) => {
    if (error) {
      console.error('Error fetching user details from the database:', error);
      res.status(500).json({ error: 'Database error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const user = results[0];
      res.json(user);
    }
  });
});

app.get('/game', (req, res) => {
  const studentId = req.query.studentId;
  if (!studentId) {
    return res.status(400).json({ error: 'Student ID is required.' });
  }
  const query = 'SELECT title, score, correctans, wrongans FROM quizscore WHERE studentId = ?';
  con.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching game statistics:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});
app.get('/getresources',(req,res)=>{
  const sql="SELECT * FROM resources";
  con.query(sql,(err,result)=>{
      if(err) return res,json({Error:"Got an error in the sql"});
      return res.json({Status:"Success",Result:result})

  })
})
app.post('/addresource', (req, res) => {
  // SQL query to insert new course details into the database
  const sql = "INSERT INTO resources (`title`, `sourceurl`, `imageurl`, `author`) VALUES (?)";
  
  // Values extracted from the incoming request
  const values = [
      req.body.title,
      req.body.sourceurl,
      req.body.imageurl,
      req.body.author
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
