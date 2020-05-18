const inquirer = require('inquirer');
const mysql = require('mysql');
const ctable = require('console.table');

var dbconnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Xander0530!',
    database: 'employeeDB'
});

dbconnection.connect ((err) =>  {
    if (err) throw err;
    promptUser();
});


