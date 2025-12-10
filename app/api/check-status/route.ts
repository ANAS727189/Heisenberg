import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const KESTRA_HOST = process.env.KESTRA_HOST?.replace(/\/$/, "");

  // YOUR CREDENTIALS
  const username = "anas23khan083@gmail.com";
  const password = "anaskhan083@Khan";
  const authString = Buffer.from(`${username}:${password}`).toString('base64');

  const res = await fetch(`${KESTRA_HOST}/api/v1/executions/${id}`, {
      headers: {
          'Authorization': `Basic ${authString}`
      }
  });
  
  if (res.status === 401) {
      return NextResponse.json({ state: { current: "UNAUTHORIZED" } }, { status: 401 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}