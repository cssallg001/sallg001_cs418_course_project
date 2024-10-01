import mysql from 'mysql2';

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'user_accounts'
})



const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs_beers'
})







export { connection };
export { pool };