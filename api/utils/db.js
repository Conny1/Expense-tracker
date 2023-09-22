import mysql from "mysql";

console.log(
  process.env.DB_HOST,
  process.env.DB_PASSWORD,
  process.env.DB_USER,
  process.env.PRT
);

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mbuya",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
