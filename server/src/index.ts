import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Temp local data
let todos: Todo[] = [
  { id: 1, title: "Review javascript", completed: true },
  { id: 2, title: "Review React", completed: false },
  { id: 3, title: "Build TODO App", completed: false },
];

// REST API ENDPOINTS

// GET: Fetch all todos
app.get("/api/todos", (req: Request, res: Response) => {
  res.json(todos);
});

// POST: Create a new todo
app.post("/api/todos", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };

  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

// PUT: Update a todo
app.put("/api/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  return res.json(todo);
});

// DELETE: Remove a todo
app.delete("/api/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const [deletedTodo] = todos.splice(index, 1);
  return res.json(deletedTodo);
});

app.listen(PORT, () => {
  console.log(`TypeScript Server running on http://localhost:${PORT}`);
});
