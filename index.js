const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment } = require("./db/departments");
const { viewAllEmployees, addEmployee } = require("./db/employees");
const { viewAllRoles } = require("./db/roles");

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
    case "View all departments":
      const departments = await viewAllDepartments();
      console.table(departments);
      break;
    case "View all employees":
      const employees = await viewAllEmployees();
      console.table(employees);
      break;
    case "View all roles":
      const roles = await viewAllRoles();
      console.table(roles);
      break;
    case "Add a department":
      const department = await addDepartment();
      console.table(Newdepartment);
      break;

    case "Add an employee":
      const newEmployees = await addEmployee();
      console.table(newEmployees);
      break;

    case "Add a role":
      const newRole = await addRoles();
      console.table(newRole);
      break;

    case "Exit":
      console.log("Complete");
      process.exit();
  }

  start(false);
};

start(true);
