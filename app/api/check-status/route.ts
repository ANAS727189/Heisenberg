import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const KESTRA_URL = process.env.KESTRA_HOST;

  const res = await fetch(`${KESTRA_URL}/api/v1/executions/${id}`);
  const data = await res.json();
  
  return NextResponse.json(data);
}