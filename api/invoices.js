export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const r = await fetch('https://api.whop.com/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHOP_APP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const text = await r.text();
    res.status(r.status).send(text ? JSON.parse(text) : {});
  } catch (e) {
    res.status(500).json({ error: e?.message || 'proxy failed' });
  }
}
