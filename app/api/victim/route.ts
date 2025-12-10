import { NextResponse } from 'next/server';

// This variable simulates "Server Health"
let isServerAlive = true;

export async function GET(request: Request) {
  if (!isServerAlive) {
    return new NextResponse("Service Unavailable: Database Connection Lost", { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // THE BUG: If query is "chaos", the server "crashes"
  if (query === 'chaos') {
    isServerAlive = false;
    // Reset server after 30 seconds so you can test again
    setTimeout(() => { isServerAlive = true; }, 30000);
    return new NextResponse("CRITICAL FAILURE: SYSTEM CRASHED", { status: 500 });
  }

  return NextResponse.json({ status: "Alive", message: "Welcome to the API" });
}