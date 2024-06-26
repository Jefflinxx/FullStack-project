import dotenv from "dotenv";
import pg from "pg";

// 載入 .env 檔案中的環境變數
dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// console.log(process.env.DB_USER);
console.log("HOST:", process.env.DB_HOST);
// console.log("5566!!");

// const pool = new pg.Pool({
//   user: "kdanmobile",
//   host: "localhost",
//   database: "ClockInSystemDB",
//   // password: "password",
//   port: 5432,
// });

pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS employee_attendance (
    id SERIAL PRIMARY KEY,
    employee_id INT,
    date DATE,
    start_time timestamp with time zone,
    end_time timestamp with time zone
  );
`
  )
  .then(() => {
    console.log("Table created");
  })
  .catch((err) => {
    console.error("Error creating table", err);
  });

export default pool;
