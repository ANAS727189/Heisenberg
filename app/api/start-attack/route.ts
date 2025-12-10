import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { targetUrl } = body;

  const KESTRA_URL = process.env.KESTRA_HOST; 
  // e.g. "https://solid-waffle-9r4.github.dev"
  
  // Create FormData for Kestra Inputs
  const formData = new FormData();
  formData.append('target_url', targetUrl);

  // EXECUTE FLOW
  const response = await fetch(`${KESTRA_URL}/api/v1/executions/dev.hackathon/heisenberg_protocol`, {
    method: 'POST',
    // ⚠️ CRITICAL CHANGE: Do NOT set 'Content-Type': 'multipart/form-data' manually!
    // Let fetch handle the boundary automatically.
    body: formData, 
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}