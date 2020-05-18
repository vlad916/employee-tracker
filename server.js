const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

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
    }).then((data) => {
        switch (data.choice) {
            case 'View Employees':
            viewAllEmployees();
            break;
        }
    })
}

function viewAllEmployees() {
    dbconnection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        Console.log(res.length + " employees found!");
        console.log('All Employees:', res);
    })
}



