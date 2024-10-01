import express from "express";
import { pool } from "./database/database.js"
import path from "path";
import { fileURLToPath } from "url";
import { url } from "inspector";
import { connect } from "http2";

const app=express();
const port=8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname + '/public')));

const myLogger=function(req,res,next){
    console.log('Calling Api');
    next()
    console.log('Api calling has done');
}

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
    console.log(`Connected to url: \"${urlString}/\"`);
});



var urlString = new String("localhost:" + port);


app.get('/pool', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`Connected to url: \"${urlString}/pool\" as id ${connection.threadId}`)
        connection.query('SELECT * from beers', (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});






app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

  
export default app;