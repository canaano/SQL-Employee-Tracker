const db = require("./connection");

async function viewAllDepartments() {
  try {
    const departments = db.query("SELECT * FROM department");
    return departments;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllDepartments };
