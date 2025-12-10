import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetUrl } = body;
    const KESTRA_HOST = process.env.KESTRA_HOST?.replace(/\/$/, ""); // Remove trailing slash

    if (!KESTRA_HOST) return NextResponse.json({ error: "Missing KESTRA_HOST" }, { status: 500 });

    // 1. YOUR CREDENTIALS
    const credentials = {
      username: "anas23khan083@gmail.com", 
      password: "anaskhan083@Khan"
    };

    console.log("👉 1. Attempting Kestra Login...");

    // 2. LOGIN REQUEST (To get the Session Cookie)
    const loginRes = await fetch(`${KESTRA_HOST}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!loginRes.ok) {
      console.error("❌ Login Failed:", loginRes.status);
      return NextResponse.json({ error: "Kestra Login Failed" }, { status: 401 });
    }

    // 3. CAPTURE THE COOKIE
    // Kestra sends a 'JSESSIONID' or similar auth cookie
    const cookieHeader = loginRes.headers.get('set-cookie');
    
    if (!cookieHeader) {
      console.error("❌ No Cookie received!");
      return NextResponse.json({ error: "No Auth Cookie returned" }, { status: 401 });
    }
    console.log("✅ Login Success. Cookie obtained.");

    // 4. EXECUTE FLOW (Using the Cookie)
    const formData = new FormData();
    formData.append('target_url', targetUrl);

    console.log("👉 2. Triggering Attack Flow...");
    const attackRes = await fetch(`${KESTRA_HOST}/api/v1/executions/dev.hackathon/heisenberg_protocol`, {
      method: 'POST',
      headers: {
        'Cookie': cookieHeader, // <--- Pass the cookie here
      },
      body: formData,
    });

    if (!attackRes.ok) {
      const text = await attackRes.text();
      console.error("❌ Attack Trigger Failed:", text);
      return NextResponse.json({ error: text }, { status: attackRes.status });
    }

    const data = await attackRes.json();
    console.log("✅ Flow Started:", data.id);
    
    // Return the ID and the COOKIE (so the frontend can use it for polling too!)
    // We send the cookie back to the client encrypted inside our response if needed, 
    // but for now let's just return the ID.
    return NextResponse.json(data);

  } catch (e: any) {
    console.error("❌ Network Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}