import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

app.get("/home", (req, res) => {
  res.send(`
    <h1 style="color: green;">
      Welcome to the Home Page
    </h1>
  `);
});
app.get("/about", (req, res) => {
  res.send("This is the about page of our Express application.");
});
app.get("/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const department = req.query.department;

  res.json({
    studentId: studentId,
    department: department || "Not specified"
  });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
