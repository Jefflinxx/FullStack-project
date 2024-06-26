import express from "express";
import cors from "cors";
import apiRouter from "./routes.js";
import path from "path";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// 使用 API 路由
app.use(apiRouter);

// app.get("/:id", async (req, res) => {
//   const employeeId = req.params.id;
//   try {
//     // const result = await db.query("SELECT * FROM employee_attendance");
//     const result = await db.query(
//       "SELECT id, employee_id, date, start_time, end_time FROM employee_attendance WHERE employee_id = $1",
//       [employeeId]
//     );
//     const resData = result.rows.map((r) => ({
//       // employeeId: r.employee_id,
//       date: r.date,
//       startTime: r.start_time,
//       endTime: r.end_time,
//     }));
//     res.status(200).json(resData);
//   } catch (err) {
//     console.error("Error querying database", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// 新的路由

// app.post("/clock-in", async (req, res) => {
//   const { employeeId, currentDate, clockTime } = req.body;

//   // console.log(currentDate);

//   try {
//     const existingRecord = await db.query(
//       "SELECT * FROM employee_attendance WHERE employee_id = $1 AND date = $2",
//       [employeeId, currentDate]
//     );
//     // console.log("existingRecord", existingRecord.rows);
//     // console.log("checkResult", existingRecord.rows.length === 0);
//     if (existingRecord.rows.length === 0) {
//       await db.query(
//         "INSERT INTO employee_attendance (employee_id, date, start_time) VALUES ($1, $2, $3)",
//         [employeeId, currentDate, clockTime]
//       );
//     } else {
//       await db.query(
//         "UPDATE employee_attendance SET end_time = $1 WHERE employee_id = $2 AND date = $3",
//         [clockTime, employeeId, currentDate]
//       );
//     }

//     res.status(200).json({ message: "打卡成功" });
//   } catch (err) {
//     console.error("Error processing clock-in request", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(port, () => {
  // console.log(`測試測試 ${process.env.DB_PASSWORD}`);
  console.log(`測試測試 但哈哈 改過的`);
  console.log(`Server is running on port ${port}`);
});
