import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify Vercel cron request
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/posts/scheduled`, {
      method: 'POST',
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Cron job failed' },
      { status: 500 }
    );
  }
}
