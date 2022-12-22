const { prompt } = require("inquirer");
const db = require("./db/connection");
const viewAllDepartments = require("./db/departments");
const viewAllEmployees = require("./db/employees");

const start = async (s) => {
  if (s) console.log("Welcome to the Employee Manager!");
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

  switch (choice) {
    case "view all departments":
      const departments = await viewAllDepartments();
      console.table(departments);
      break;
    case "view all employees":
      const employees = await viewAllEmployees();
      console.table(employees);
      break;
    case "view all roles":
      const roles = await viewAllRoles();
      console.table(roles);
      break;
    case "add a department":
      const department = await addDepartment();
      break;

    case "add an employee":
      const newEmployee = await addEmployee();
      console.table(newEmployee);
      break;

    case "add a role":
      const newRole = await addRole();
      console.table(newRole);
      break;

    case "Exit":
      console.log("Complete");
      return;
  }

  start(false);
};

start(true);
