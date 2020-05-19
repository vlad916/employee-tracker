const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const dbconnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Xander0530!',
    database: 'employeeDB'
})

dbconnection.connect ((err) => {
    if (err) throw err;
    promptUser();
})

function promptUser() {
    inquirer
    .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: [
                'View all Employees',
                'View all Departments',
                'View all Roles',
                'Add an Employee',
                'Add Department',
                'Add a Role',
                'QUIT TASK'
        ]
    }).then((data) => {
        switch (data.choice) {
            case 'View all Employees':
                viewEmployees();
                break;
            case 'View all Departments':
                viewAllDepartments();
                break;
            case 'View all Roles':
                viewAllRoles();
                break;
        }
    })
}

function viewEmployees() {
    dbconnection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(res.length + ' Employees found!!!');
        console.table('All Employees:', res); 
        promptUser();
    })
}

function viewAllDepartments() {
    dbconnection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(res.length + ' Departments Found!!!');
        console.table('All Departments:', res);
        promptUser();
    })
}

function viewAllRoles() {
    dbconnection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log(res.length + ' Roles Found!!!');
        console.table('All Roles:', res);
        promptUser();
    })
}



