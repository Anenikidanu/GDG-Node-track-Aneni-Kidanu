import app from "./app.js";

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Bookstore API running on port ${PORT}`);
});
