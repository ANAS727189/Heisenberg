import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 1. Capture repo from frontend
    const { targetUrl, repo } = body; 
    
    const KESTRA_HOST = process.env.KESTRA_HOST?.replace(/\/$/, "");
    const WEBHOOK_KEY = "my-secret-hackathon-key";
    
    // 2. Construct Webhook URL
    const webhookUrl = `${KESTRA_HOST}/api/v1/executions/webhook/dev.hackathon/heisenberg_protocol/${WEBHOOK_KEY}`;

    console.log("👉 Triggering Webhook:", webhookUrl);
    console.log("👉 Payload:", { target_url: targetUrl, repo_name: repo });

    // 3. Send to Kestra (Passing both Target and Repo)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          target_url: targetUrl,
          repo_name: repo 
      })
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("❌ Webhook Failed:", text);
        return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    console.log("✅ Webhook Success:", data.id);
    return NextResponse.json(data);

  } catch (e: any) {
    console.error("❌ Network Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}