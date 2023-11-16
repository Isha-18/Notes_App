const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "18122002",
    database: "nodesql"
})

client.connect();

client.query(`Select * from student`,(err,res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;
})