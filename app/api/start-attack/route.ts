import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetUrl } = body;

    const KESTRA_HOST = process.env.KESTRA_HOST;
    
    // Debug Log 1: Check Environment Variable
    console.log("👉 KESTRA_HOST:", KESTRA_HOST);

    if (!KESTRA_HOST) {
      return NextResponse.json({ error: "KESTRA_HOST env var is missing" }, { status: 500 });
    }

    const formData = new FormData();
    formData.append('target_url', targetUrl);

    // Debug Log 2: Check URL construction
    const kestraUrl = `${KESTRA_HOST}/api/v1/executions/dev.hackathon/heisenberg_protocol`;
    console.log("👉 Fetching:", kestraUrl);

    const response = await fetch(kestraUrl, {
      method: 'POST',
      body: formData,
    });

    // Debug Log 3: Check Response Status
    console.log("👉 Kestra Status:", response.status, response.statusText);

    if (!response.ok) {
        // Log the text response (it might be an HTML error page from Github)
        const errorText = await response.text();
        console.error("❌ Kestra Error Body:", errorText);
        return NextResponse.json({ error: `Kestra returned ${response.status}: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("✅ Kestra Success:", data);
    return NextResponse.json(data);

  } catch (e: any) {
    console.error("❌ Network Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}