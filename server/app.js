// console.log('Hello from node application');

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import user from "./routes/user.js";
import course from "./routes/course.js";
import course_prereqs from "./routes/course_prereqs.js";
import prerequisite_sets from "./routes/prerequisite_sets.js";
import prerequisites from "./routes/prerequisites.js";
const app=express();
const port=8080;

const myLogger=function(req,res,next){
    console.log('Calling Api');
    next()
    console.log('Database has been successfully called');
}

app.use(myLogger);
app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use('/user',user);
app.use('/course',course);
app.use('/course_prereqs',course_prereqs);
app.use('/prerequisite_sets',prerequisite_sets);
app.use('/prerequisites',prerequisites);



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});

export default app;