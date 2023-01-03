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
// add the new employees information to the database
async function addEmployee() {
  try {
    const roleNames = await viewAllRoles();
    const employees = await viewAllEmployees();
    const { firstName, lastName, role } = await inquirer.prompt([
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
        choices: roleNames.map((role) => {
          return {
            value: role.id,
            name: role.title,
          };
        }),
      },
    ]);

    await db.query(
      `INSERT INTO employee (first_name, last_Name, role_id) VALUES ("${firstName}", "${lastName}", "${role}")`
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
