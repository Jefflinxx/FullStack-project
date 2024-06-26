import db from "../db.js";

export async function clockIn({ employeeId, currentDate, clockTime }) {
  console.log("suc123");
  try {
    const existingRecord = await db.query(
      "SELECT * FROM employee_attendance WHERE employee_id = $1 AND date = $2",
      [employeeId, currentDate]
    );

    if (existingRecord.rows.length === 0) {
      await db.query(
        "INSERT INTO employee_attendance (employee_id, date, start_time) VALUES ($1, $2, $3)",
        [employeeId, currentDate, clockTime]
      );
    } else {
      await db.query(
        "UPDATE employee_attendance SET end_time = $1 WHERE employee_id = $2 AND date = $3",
        [clockTime, employeeId, currentDate]
      );
    }
  } catch (err) {
    console.error("Error processing clock-in request", err);
    throw err;
  }
}
