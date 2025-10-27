import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import YooKassa from 'yookassa';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 8080);
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:3010';
const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY || '';

if (!YOOKASSA_SHOP_ID || !YOOKASSA_SECRET_KEY) {
  // eslint-disable-next-line no-console
  console.warn('[YooKassa] Missing YOOKASSA_SHOP_ID or YOOKASSA_SECRET_KEY env variables');
}

const yooClient = new YooKassa({
  shopId: YOOKASSA_SHOP_ID,
  secretKey: YOOKASSA_SECRET_KEY,
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, currency = 'RUB', description = 'Order payment', returnPath = '/payment/success', capture = true, metadata } = req.body || {};

    if (!amount || Number.isNaN(Number(amount))) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const payment = await yooClient.createPayment({
      amount: {
        value: Number(amount).toFixed(2),
        currency,
      },
      confirmation: {
        type: 'redirect',
        return_url: `${FRONTEND_BASE_URL}${returnPath}`,
      },
      capture,
      description,
      metadata,
    });

    const confirmationUrl = payment?.confirmation?.confirmation_url;
    return res.json({
      id: payment?.id,
      status: payment?.status,
      confirmation_url: confirmationUrl,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[YooKassa] create-payment error:', error);
    const message = error?.message || 'Unknown error';
    return res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});