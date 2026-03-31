// netlify/functions/gemini.js
export default async (request, context) => {
  const url = new URL(request.url);
  
  // 1. 自动剥离前缀，拼接 Google API 真实地址
  // 比如你访问 /gemini/v1beta/... 会转发到 Google 的 /v1beta/...
  const apiPath = url.pathname.replace('/.netlify/functions/gemini', '');
  const targetUrl = `https://generativelanguage.googleapis.com${apiPath}${url.search}`;

  // 2. 从你之前在 Netlify 后台填写的环境变量里取 Key
  const apiKey = process.env.GOOGLE_API_KEY;

  const modifiedHeaders = new Headers(request.headers);
  modifiedHeaders.set('x-goog-api-key', apiKey);
  modifiedHeaders.delete('host'); // 必须删除，否则 Google 会拒绝连接

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: modifiedHeaders,
      body: request.body,
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
