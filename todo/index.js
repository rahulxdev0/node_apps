import express from "express";
const app = express();
const PORT = 8000;
import cors from "cors";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/posts", (req, res) => {
  console.log(req.body);
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

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const todoId = Number(id); // convert string param to number

  const index = todos.findIndex((item) => item.id === todoId);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  // remove todo from array
  todos.splice(index, 1);

  return res.status(200).json({ message: "Todo deleted successfully", todos });
});

app.listen(PORT, () => {
  console.log(`☑️ Server running on http://localhost:${PORT}`);
});
