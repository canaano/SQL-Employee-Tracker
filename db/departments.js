const db = require("./connection");

async function viewAllDepartments() {
  try {
    const departments = await db.query("SELECT * FROM department");
    return departments[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = { viewAllDepartments };
