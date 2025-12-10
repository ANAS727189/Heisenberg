import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetUrl } = body;
    const KESTRA_HOST = process.env.KESTRA_HOST?.replace(/\/$/, "");

    // 🔑 THE SECRET KEY defined in your YAML
    const WEBHOOK_KEY = "my-secret-hackathon-key";

    // NEW URL PATTERN: /api/v1/executions/webhook/{namespace}/{flowId}/{key}
    const webhookUrl = `${KESTRA_HOST}/api/v1/executions/webhook/dev.hackathon/heisenberg_protocol/${WEBHOOK_KEY}`;

    console.log("👉 Triggering Webhook:", webhookUrl);

    // Send data as JSON (Webhooks prefer JSON)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_url: targetUrl }) // Keys must match 'inputs' in YAML
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("❌ Webhook Failed:", text);
        return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    console.log("✅ Webhook Success:", data);
    return NextResponse.json(data);

  } catch (e: any) {
    console.error("❌ Network Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}