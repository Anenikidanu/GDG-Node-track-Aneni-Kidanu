import express from "express";

const app = express();

app.get("/home", (req, res) => {
  res.send('<h1 style="color: green;">Welcome to the Home Page</h1>');
});

app.get("/about", (req, res) => {
  res.send("This is the About Page");
});

app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { department } = req.query;

  res.json({
    studentId,
    department: department || "Not provided"
  });
});

app.listen(3001, () => {
  console.log("Task 2 running on port 3001");
});
