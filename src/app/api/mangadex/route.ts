import { NextRequest, NextResponse } from 'next/server';

const MANGADEX_API_URL = 'https://api.mangadex.org';

/**
 * Proxy handler for MangaDex API requests
 * This avoids CORS issues by proxying requests through our own domain
 */
export async function GET(request: NextRequest) {
  try {
    // Get the path and query parameters from the request
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '';
    
    // Remove the path parameter from the search params to forward the rest
    const forwardParams = new URLSearchParams(searchParams);
    forwardParams.delete('path');
    
    // Construct the MangaDex API URL
    const url = `${MANGADEX_API_URL}${path}${forwardParams.toString() ? `?${forwardParams.toString()}` : ''}`;
    
    console.log(`Proxying request to: ${url}`);
    
    // Forward the request to MangaDex API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the response with appropriate headers
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from MangaDex API' },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests to the proxy
 */
export async function POST(request: NextRequest) {
  try {
    // Get the path from the request
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '';
    
    // Get the request body
    const body = await request.json();
    
    // Construct the MangaDex API URL
    const url = `${MANGADEX_API_URL}${path}`;
    
    // Forward the request to MangaDex API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to post data to MangaDex API' },
      { status: 500 }
    );
  }
}
