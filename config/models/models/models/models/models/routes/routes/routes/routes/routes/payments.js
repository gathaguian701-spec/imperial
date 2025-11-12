// routes/payments.js
const express = require('express');
const router = express.Router();

/**
 * NOTE: This is a placeholder. Real M-Pesa STK Push requires:
 * - credentials (consumer key/secret)
 * - obtain OAuth token
 * - call /mpesa/stkpush endpoint with BusinessShortCode, password, Timestamp, Amount, PhoneNumber, CallbackURL
 * - handle callback (webhook) to confirm payment status
 */

// Example route that would initiate an STK push (server-to-server)
router.post('/stkpush', async (req, res) => {
  // Expect body: phone, amount, accountRef, description
  // TODO: implement using Safaricom API and env vars
  const { phone, amount } = req.body;
  if(!phone || !amount) return res.status(400).json({ error:'phone and amount required' });

  // For now return simulated response
  return res.json({ status: 'simulated', message: `STK Push simulated to ${phone} for ${amount}` });
});

// Webhook endpoint for M-Pesa callbacks
router.post('/callback', async (req, res) => {
  // Validate and store transaction details
  console.log('MPESA CALLBACK', req.body);
  res.json({ received: true });
});

module.exports = router;
