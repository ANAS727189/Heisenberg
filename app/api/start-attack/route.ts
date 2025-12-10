import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetUrl } = body;

    const KESTRA_HOST = process.env.KESTRA_HOST;
    
    // YOUR CREDENTIALS
    // In production, put these in .env (KESTRA_USER, KESTRA_PASSWORD)
    const username = "anas23khan083@gmail.com";
    const password = "anaskhan083@Khan";
    
    // Create the Basic Auth Header: "Basic base64(user:pass)"
    const authString = Buffer.from(`${username}:${password}`).toString('base64');

    if (!KESTRA_HOST) {
      return NextResponse.json({ error: "KESTRA_HOST env var is missing" }, { status: 500 });
    }

    const formData = new FormData();
    formData.append('target_url', targetUrl);

    // Note: Removed trailing slash from HOST if it exists to avoid double slash
    const cleanHost = KESTRA_HOST.replace(/\/$/, "");
    const kestraUrl = `${cleanHost}/api/v1/executions/dev.hackathon/heisenberg_protocol`;

    console.log("👉 Fetching:", kestraUrl);

    const response = await fetch(kestraUrl, {
      method: 'POST',
      headers: {
        // 🟢 THIS IS THE FIX: Send the credentials
        'Authorization': `Basic ${authString}`
        // Do NOT set Content-Type for FormData, fetch does it automatically
      },
      body: formData,
    });

    console.log("👉 Kestra Status:", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Kestra Error:", errorText);
        return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (e: any) {
    console.error("❌ Network Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}