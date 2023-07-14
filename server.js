const Questions = require('./questions.js');
const inquirer = require('inquirer');

inquirer
  .prompt({
    type: 'list',
    name: 'startOptions',
    message: "What would you like to do?",
    choices: ['View All Employees', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
  })
  .then((answers) => {
    if (answers.startOptions === 'Add Employee') {
      const questions = new Questions();
      questions.addEmployees();
    }
    else if (answers.startOptions === 'Add Role') {
      const questions = new Questions();
      questions.addRole()
    }
    else if (answers.startOptions === 'Add Department') {
      const questions = new Questions();
      questions.addDepartment()
    }
    else if (answers.startOptions === 'View All Employees') {
      const questions = new Questions();
      questions.viewEmployees();
    }
    else if (answers.startOptions === 'View All Roles') {
      const questions = new Questions();
      questions.viewRoles();
    }
    else if (answers.startOptions === 'View All Departments') {
      const questions = new Questions();
      questions.viewDepartments();
    }
    else {
      process.exit(0);
    }
  });