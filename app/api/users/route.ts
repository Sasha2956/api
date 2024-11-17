import { NextResponse } from "next/server";

export async function GET() {
    const users = [
        {
            id: 1,
            name: "Marina",
            age: 12
        },
        {
            id: 1,
            name: "Sasha",
            age: 9
        },
    ]

    return NextResponse.json(users)
} 