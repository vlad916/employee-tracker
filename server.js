const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const employeeLogo = require('asciiart-logo');

const dbconnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Xander0530!',
    database: 'employeeDB'
})

dbconnection.connect ((err) => {
    if (err) throw err;
    showLogo ();
})

function showLogo() {
    const logo = employeeLogo ({name:'Employee Manager'}).render();
    console.log(logo);
    promptUser();
}

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
                'Update Employee role',
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
            case 'Add a Role':
                addRole();
                break;
            case 'Update Employee role':
                updateEmployeeRole();
                break;
            case 'QUIT TASK':
                finish();
                break;
            default:
                break;
        }
    })
}

function viewEmployees() {
    dbconnection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(`${res.length} Employees found!!!`);
        console.table('All Employees:', res); 
        promptUser();
    })
}

function viewAllDepartments() {
    dbconnection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log(`${res.length} Departments Found!!!`);
        console.table('All Departments:', res);
        promptUser();
    })
}

function viewAllRoles() {
    dbconnection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log(`${res.length} Roles Found!!!`);
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
    ]).then((data) => {
            dbconnection.query( 
                'INSERT INTO department SET ?',
                {
                    department: data.department
                }
        );
            dbconnection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            console.table('All Departments:', res);
            promptUser();        
        })
    })
}

function addRole() {
    const query = 'SELECT * FROM department'
    dbconnection.query(query, (err, res) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter a title for the new role'
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Enter a salary for the new role'
                },
                {
                    type: 'rawlist',
                    name: 'roleDepartment',
                    choices: function () {
                        let arry = [];
                        for (let i = 0; i < res.length; i++) {
                            arry.push(res[i].department);
                        }
                        return arry;
                    },
                }
            ]).then((data) => {
                let deptId;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].department == data.roleDepartment) {
                        deptId = res[j].id;
                    }
                }

                dbconnection.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: data.roleName,
                        salary: data.roleSalary,
                        department_id: deptId
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log('A new role has been added to the system...');
                        promptUser();
                    }
                )
            })
    })
}

function updateEmployeeRole() {
    dbconnection.query('SELECT * FROM roles', (err, roles) => {
        dbconnection.query('SELECT * FROM department', (err, departments) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    name: "updatedRole",
                    type: "rawlist",
                    choices: function () {
                        var array = [];
                        for (var i = 0; i < roles.length; i++) {
                            array.push(roles[i].title);
                        }

                        return array;
                    },
                    message: "Choose a role that you want to update"
                },
                {
                    name: "updatedSalary",
                    type: "input",
                    message: "Enter a salary for the new role"

                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var array = [];
                        for (var i = 0; i < departments.length; i++) {
                            array.push(departments[i].department);
                        }
                        return array;
                    },
                    message: "Which department do you want to add this role?"
                },
            ]).then((data) => {

                for (let i = 0; i < departments.length; i++) {
                    if (departments[i].department === data.choice) {
                        data.department_id = departments[i].id;
                    }
                }
                const VALUES = [
                    { title: data.updatedRole },
                    { salary: data.updatedSalary },
                    { department_id: data.department_id }
                ]
                let query1 = dbconnection.query('UPDATE roles SET title=?,salary= ? WHERE department_id= ?', VALUES, (err) => {
                    if (err) throw err;
                    console.table("You have successfully updated a Role...");
                    promptUser()
                });

            })
        })
    })
}

function finish(){
    dbconnection.end();
}
    