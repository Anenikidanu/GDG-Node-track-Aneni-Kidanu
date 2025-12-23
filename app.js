const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/books", bookRoutes);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
