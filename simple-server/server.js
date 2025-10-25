const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "This is a simple server!" });
});

app.listen(port, () => {
  console.log(`This simple server is now running on http://localhost:${port}`);
});
