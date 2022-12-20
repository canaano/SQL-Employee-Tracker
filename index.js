const { prompt } = require("inquirer");
const db = require("./db/connection");
const viewAllDepartments = require("./db/departments");

const start = async () => {
  console.log("Welcome to the Employee Manager!");
  //  Accomplish the following: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "what would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
        "Exit",
      ],
    },
  ]);
  console.log(choice);
};

start();
