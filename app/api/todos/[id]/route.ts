import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

type Context = {
  params: Promise<{ id: string }>;
};

// PUT: Update a todo
export async function PUT(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const { title, completed } = await request.json();

    const result = await query(
      "UPDATE todos SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *",
      [title, completed, id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

// DELETE: Remove a todo
export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    const result = await query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
