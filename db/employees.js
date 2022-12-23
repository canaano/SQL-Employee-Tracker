const db = require("./connection");
const inquirer = require("./inquirer");

async function viewAllEmployees() {
  try {
    const employees = db.query(
      "SELECT * FROM employee LEFT Join role ON role.id = employee.role_id"
    );
    return employees;
  } catch (err) {
    console.log(err);
  }
}

async function addEmployee() {
  try {
    const roles = await viewAllRoles();
    const employees = await viewAllEmployees();
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
        message: "Who is the employees manager?",
        choices: [
          ...employees.map((employee) => {
            return {
              value: employee.id,
              name: `${employee.firstName} ${employee.lastName}}`,
            };
          }),
          {
            value: null,
            name: "No manager",
          },
        ],
      },
    ]);

    await db.query(
      `INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role}. ${manager})`
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
