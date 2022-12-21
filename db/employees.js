const db = require("./connection");

async function viewAllEmployees() {
  try {
    const employees = await db.query(
      "SELECT * FROM employee LEFT Join role ON role.id = employee.role_id"
    );
    return employees;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllEmployees };
