import { NextRequest, NextResponse } from "next/server";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Mock reference to the same array
declare global {
  var sharedTodos: Todo[];
}

// Helper to access data
let todos = global.sharedTodos || [
  { id: 1, title: "Learn Next.js Backend", completed: true },
  { id: 2, title: "Build Route Handlers", completed: false },
];
global.sharedTodos = todos;

type RouteContext = {
  params: Promise<{ id: string }>;
};

// PUT: Update a todo
export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const { title, completed } = body;

  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  return NextResponse.json(todo, { status: 200 });
}

// DELETE: Remove a todo
export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const index = todos.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const [deletedTodo] = todos.splice(index, 1);
  return NextResponse.json(deletedTodo, { status: 200 });
}
