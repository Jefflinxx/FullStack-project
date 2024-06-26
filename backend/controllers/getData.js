import db from "../db.js";

export async function getData(employeeId) {
  try {
    const result = await db.query(
      "SELECT id, employee_id, date, start_time, end_time FROM employee_attendance WHERE employee_id = $1",
      [employeeId]
    );
    const resData = result.rows.map((r) => ({
      // employeeId: r.employee_id,
      date: r.date,
      startTime: r.start_time,
      endTime: r.end_time,
    }));
    return resData /* 處理後的數據 */;
  } catch (err) {
    console.error("Error querying database", err);
    throw err;
  }
}
