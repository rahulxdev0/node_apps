const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/posts", (req, res) => {
    console.log(req.body)
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`☑️ Server running on http://localhost:${PORT}`);
});
