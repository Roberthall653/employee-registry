const inquirer = require('inquirer')
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);





class Questions {
  main(){
  inquirer
  .prompt({
    type: 'list',
    name: 'startOptions',
    message: "What would you like to do?",
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  })
  }

  addEmployees() {
    var roleChoice = [];
    db.query('SELECT title, id FROM roles;', function (err, results) {
      for (let i = 0; i < results.length; i++) {
        roleChoice.push({
          name: results[i].title,
          value: results[i].id,
        })
      }
      var employeeChoice = ['none',];
      db.query('SELECT CONCAT(first_name," ", last_name) AS name, id FROM employees;', function (err, results) {
        for (let i = 0; i < results.length; i++) {
          employeeChoice.push({
            name: results[i].name,
            value: results[i].id,
          })
        }
        inquirer.prompt([{
          type: 'input',
          name: 'userFirstName',
          message: 'What is the first name of the Employee?',
        },
        {
          type: 'input',
          name: 'userLastName',
          message: 'What is the last name of the Employee?',
        },
        {
          type: 'list',
          name: 'userRole',
          message: "What is the employee's role?",
          choices: roleChoice,
        },
        {
          type: 'list',
          name: 'userManager',
          message: "Who is the employee's manager?",
          choices: employeeChoice
        }]
        )      
        .then((answers) => {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.userFirstName}','${answers.userLastName}','${answers.userRole}','${answers.userManager}');`)
        })
      });
    });
    process.exit(0);
  }

  addRole() {
    var departmentChoice = []
    db.query('SELECT id, name AS department FROM departments;', function (err, results) {
      if(err) console.log(err);
      for (let i = 0; i < results.length; i++) {
        departmentChoice.push({
          name: results[i].department,
          value: results[i].id,
        })
      }
      inquirer.prompt([
        {
          type: 'input',
          name: 'userRole',
          message: 'What is the name of the Role?',
        },
        {
          type: 'input',
          name: 'userSalary',
          message: 'What is the salary of the Role?',
        },
        {
          type: 'list',
          name: 'userDepartmentRole',
          message: 'Which department does the role belong to?',
          choices: departmentChoice
        }
      ])
      .then((answers) => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.userRole}', '${answers.userSalary}', '${answers.userDepartmentRole}');`)
      })
    })


    process.exit(0);
  }

  addDepartment() {
    inquirer.prompt({
      type: 'input',
      name: 'userDepartment',
      message: 'What is the name of the Department?',
    })
      .then((answers) => {
        db.query(`INSERT INTO departments (name) VALUES ('${answers.userDepartment}');`)
      });
      process.exit(0);
  }

  viewEmployees() {
    db.query('SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name," ", manager.last_name) AS manager FROM  employees JOIN roles ON roles.id = employees.role_id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;', function (err, results) {
      console.table(results);
      process.exit(0);
    }
    )
  }

  viewRoles() {
    db.query('SELECT title, name AS department, salary FROM  roles join departments on roles.department_id=departments.id;', function (err, results) {
      console.table(results);
      process.exit(0);
    })
  }

  viewDepartments() {
    db.query('SELECT id, name AS department FROM departments;', function (err, results) {
      console.table(results);
      process.exit(0);
    })
  }
}


module.exports = Questions;
