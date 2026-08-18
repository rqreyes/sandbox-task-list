import { NextRequest, NextResponse } from "next/server";

// Define the Todo type
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// In-memory array (mock database)
let todos: Todo[] = [
  { id: 1, title: "Learn Next.js Backend", completed: true },
  { id: 2, title: "Build Route Handlers", completed: false },
];

// GET: Fetch all todos
export async function GET() {
  return NextResponse.json(todos, { status: 200 });
}

// POST: Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
