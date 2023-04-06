import Stripe from 'stripe';

exports.handler = async event => {
	const stripe = new Stripe(process.env.STRIPE_SECRET);
	const product = JSON.parse(event.body);
	const lineItems = [
		{
			name: product.name,
			currency: 'USD',
			description: product.description,
			images: [product.image],
			amount: `${product.price}00`,
			quantity: 1,
		},
	];
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: 'https://ng-stripe.netlify.app/success',
		cancel_url: 'https://ng-stripe.netlify.app/cancel',
		line_items: lineItems,
	});

	return {
		statusCode: 200,
		body: JSON.stringify({
			sessionId: session.id,
			publishableKey: process.env.STRIPE_PUBLIC,
		}),
	};
};
