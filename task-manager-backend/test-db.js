const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost", // Ensure this matches your MySQL server's host
    user: "root", // Your MySQL username
    password: "123456789", // Your MySQL password
    database: "task_manager", // Ensure the database exists
    port: 3306, // Default MySQL port
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
    } else {
        console.log("Connected to MySQL!");
    }
    connection.end();
});
