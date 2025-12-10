import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const KESTRA_HOST = process.env.KESTRA_HOST;
  
  // YOUR CREDENTIALS
  const username = "anas23khan083@gmail.com";
  const password = "anaskhan083@Khan";
  const authString = Buffer.from(`${username}:${password}`).toString('base64');
  
  const cleanHost = KESTRA_HOST?.replace(/\/$/, "");

  const res = await fetch(`${cleanHost}/api/v1/executions/${id}`, {
      headers: {
          'Authorization': `Basic ${authString}`
      }
  });
  
  const data = await res.json();
  return NextResponse.json(data);
}