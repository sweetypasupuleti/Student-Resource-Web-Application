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