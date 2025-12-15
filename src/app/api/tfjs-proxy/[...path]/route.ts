import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    
    // Determine the base URL based on the path
    let targetUrl: string;
    
    if (path.includes('tfhub.dev')) {
      // Already includes full URL
      targetUrl = `https://${path}`;
    } else if (path.includes('kaggle.com')) {
      // Kaggle URL
      targetUrl = `https://${path}`;
    } else {
      // Assume TensorFlow Hub path
      targetUrl = `https://tfhub.dev/tensorflow/tfjs-model/${path}`;
    }
    
    // Add query parameters from original request
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    if (queryString) {
      targetUrl += `?${queryString}`;
    }

    // Fetch from the target URL
    const response = await fetch(targetUrl, {
      headers: {
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return new NextResponse(`Proxy error: ${response.statusText}`, {
        status: response.status,
      });
    }

    // Get the content type and body
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const buffer = await response.arrayBuffer();

    // Return the proxied response with appropriate headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy error', { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

