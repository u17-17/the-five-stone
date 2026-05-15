const DEFAULT_NOTIFY_TO = 's2898656752@gmail.com';
const DEFAULT_FROM = 'The Fifth Stone <hello@fifth-stone.cn>';

function sendJson(res, statusCode, payload) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(statusCode).json(payload);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

async function sendSignupNotification({ email, source, userAgent, referer }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO || DEFAULT_NOTIFY_TO;
  const from = process.env.NEWSLETTER_FROM || DEFAULT_FROM;
  const submittedAt = new Date().toISOString();

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f1f1f">
      <h2 style="margin:0 0 16px">New Fifth Stone signup</h2>
      <p>A visitor joined The Fifth Stone circle.</p>
      <table style="border-collapse:collapse;margin-top:16px">
        <tr>
          <td style="padding:6px 12px 6px 0;font-weight:700">Email</td>
          <td style="padding:6px 0">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px 6px 0;font-weight:700">Source</td>
          <td style="padding:6px 0">${escapeHtml(source || 'homepage_signup')}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px 6px 0;font-weight:700">Submitted</td>
          <td style="padding:6px 0">${escapeHtml(submittedAt)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px 6px 0;font-weight:700">Page</td>
          <td style="padding:6px 0">${escapeHtml(referer || 'Unknown')}</td>
        </tr>
      </table>
      <p style="margin-top:18px;color:#666;font-size:13px">
        User agent: ${escapeHtml(userAgent || 'Unknown')}
      </p>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [notifyTo],
      subject: `New Fifth Stone signup: ${email}`,
      html,
      reply_to: email,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend failed: ${response.status} ${text}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const source = typeof body.source === 'string' ? body.source.trim() : 'homepage_signup';

    if (!isValidEmail(email) || email.length > 254) {
      return sendJson(res, 400, { error: 'Please enter a valid email address.' });
    }

    await sendSignupNotification({
      email,
      source,
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer,
    });

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Newsletter signup failed', error);
    return sendJson(res, 500, { error: 'Unable to join right now. Please try again later.' });
  }
}
