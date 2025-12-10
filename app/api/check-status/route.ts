import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const KESTRA_HOST = process.env.KESTRA_HOST?.replace(/\/$/, "");

  // 1. Login again to get a fresh cookie (Simplest way for now)
  const loginRes = await fetch(`${KESTRA_HOST}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          username: "anas23khan083@gmail.com", 
          password: "anaskhan083@Khan"
      })
  });
  const cookieHeader = loginRes.headers.get('set-cookie') || "";

  // 2. Fetch Status
  const res = await fetch(`${KESTRA_HOST}/api/v1/executions/${id}`, {
      headers: { 'Cookie': cookieHeader }
  });
  
  const data = await res.json();
  return NextResponse.json(data);
}