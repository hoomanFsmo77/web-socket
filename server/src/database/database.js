require('dotenv').config()
const knex = require('knex');
const prodConnection = require('./connection.prod.json');
const devConnection = require('./connection.dev.json');
const database = knex({
    client: 'mysql',
    connection:process.env.PRODUCTION==='1' ? prodConnection : devConnection
});
database.
raw("SELECT 1").
then(() => {
    console.log("database connected");
}).catch((e) => {
    console.log("database not connected");
    console.error(e);
});
module.exports=database