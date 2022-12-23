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
    const { firstName, lastName } = inquirer.prompt([
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
    ]);

    await db.query(
      `INSERT INTO employee (firstName, lastName, role_id) VALUES ("${firstName}", "${lastName}", 1)`
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
