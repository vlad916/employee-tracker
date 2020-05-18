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

function promptUser() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: [
            'View all Employees',
            'View all Departments',
            'View all Roles',
            'Add and Employee',
            'Add a Department',
            'Add a Role',
            'QUIT TASK'
        ]
    }).
}



