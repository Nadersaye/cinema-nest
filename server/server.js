require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5501', 'http://127.0.0.1:5501'],
}));

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Movie ${item.id}`,
                    },
                    unit_amount: item.price, // price in cents
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CANCEL_URL}/canceled.html`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
