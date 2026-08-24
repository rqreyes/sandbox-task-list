import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET: Fetch all todos
export async function GET() {
  try {
    const result = await query("SELECT * FROM todos ORDER BY id ASC");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// POST: Create a new todo
export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    const result = await query(
      "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *",
      [title, false]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
