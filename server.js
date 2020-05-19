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
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
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

function addEmployee() {
    dbconnection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
    
        inquirer.prompt([
            {
                type: 'input',
                message: "Enter the Employee's first name",
                name: 'first_name'
            },
            {
                type: 'input',
                message: "Enter the Employee's last name",
                name: 'last_name'
            },
            {
                type: 'list',
                name: 'roles',
                choices: function () {
                    let arr = [];
                    for (let i = 0; i < res.length; i++){
                        arr.push(res[i].title);
                    }
                    return arr;
                },
                message: "What is the Employee's role"
            }
        ]).then ((data) => {
            let roleId;
            for (let j = 0; j < res.length; j++){
                if (res[j].title == data.roles) {
                    roleId = res[j].id;
                    console.log(roleId)
                }
            }
            dbconnection.query('INSERT INTO employee SET ?',
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role_id: roleId,
                },
                function (err) {
                    if (err) throw err;
                    console.log('Employee added...');
                    promptUser();
                }
            )
        })
    })
}
    
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter a name for the new Department',
            name: 'department'
        }
    ]).then(data => {
        const query = `INSERT INTO department (department) VALUES ('${data.department}')`;
        dbconnection.query(query, (err, res) => {
            promptUser();
        })
    })
}
    
    