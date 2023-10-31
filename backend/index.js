import express  from "express";
import mysql from 'mysql'
import cors from 'cors'
import jwt from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt'
import cookieParser from "cookie-parser";


const salt = 10;

function main(){
    try{
        const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const db = mysql.createConnection({
   host: "http://127.0.0.1",
   user: 'root',
   password: 'root',
   database: 'signup'
});

app.get('/',  (req, res)=>{
   
    res.json("qwewqe")
    
})

app.post('/register', (req, res)=>{
    console.log(req.body.name);
    try{ const sql = 'INSERT INTO login (`name`, `email`, `password`) VALIES(?)';
    bcrypt.hash(req.body.password.toString(), salt, (err, hash)=> {
        if(err) return res.json({Error: 'error for hashing password'})
        const values =[
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result)=> {
            if(err) return res.json({Error: 'Inserting data error'})
            return res.json({Status: 'Secsuss'})
        })
    })}
   catch(e){console.log(e)}
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})

}
catch(error){
    console.log(error)
}
}

main()







// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)