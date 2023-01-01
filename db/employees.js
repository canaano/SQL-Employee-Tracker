const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
  try {
    const employees = await db.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id"
    );
    return employees;
  } catch (err) {
    console.log(err);
  }
}

async function addEmployee() {
  try {
    const roles = await viewAllRoles();
    const { firstName, lastName, role, manager } = inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employees new role?",
        choices: roles.map((role) => {
          return {
            value: role.id,
            name: role.title,
          };
        }),
      },
      {
        type: "list",
        name: "manager",
        message: "Who manages the employee?",
        choices: [
          employee.map((employee) => {
            return {
              value: employee.id,
              name: `${employee.firstName} ${employee.lastName}}`,
            };
          }),
        ],
      },
    ]);

    await db.query(
      `INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", "${manager}")`
    );
    const newEmployee = await viewAllEmployees();

    return newEmployee;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
};
