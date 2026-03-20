const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/exchange-token', async (req, res) => {
  try {
    const { code, redirect_uri } = req.body;
    const form = new URLSearchParams({
      client_id:     process.env.APP_ID,
      client_secret: process.env.APP_SECRET,
      grant_type:    'authorization_code',
      redirect_uri,
      code
    });
    const r = await fetch(
      'https://api.instagram.com/oauth/access_token',
      { method: 'POST', body: form }
    );
    res.json(await r.json());
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3001,
  () => console.log('Backend ready'));

// package.json deps: express, cors
