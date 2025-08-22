export async function createPayment({ amount, currency = 'RUB', description = 'Order payment', returnPath = '/payment/success', capture = true, metadata } = {}) {
  const response = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, description, returnPath, capture, metadata }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error || `Payment create failed (${response.status})`);
  }
  return response.json();
}