const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
  try {
    const employees = await db.query(
      "SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id"
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
    const { first_name, last_name, role } = inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "last_name",
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
      `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${first_name}", "${last_name}", "${role}")`
    );
    const newEmployees = await viewAllEmployees();

    return newEmployees;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
};
