import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return new NextResponse(renderScript('error', 'No authorization code received'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(renderScript('error', 'GitHub OAuth not configured'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const tokenData = await tokenResponse.json() as { access_token?: string; error?: string };

    if (tokenData.error || !tokenData.access_token) {
      return new NextResponse(renderScript('error', tokenData.error || 'Token exchange failed'), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return new NextResponse(renderScript('success', tokenData.access_token), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch {
    return new NextResponse(renderScript('error', 'Failed to exchange token'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function renderScript(status: 'success' | 'error', content: string): string {
  const message =
    status === 'success'
      ? { token: content, provider: 'github' }
      : { error: content };

  return `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(message).replace(/'/g, "\\'")}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body>
</html>`;
}
