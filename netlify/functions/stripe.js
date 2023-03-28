const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.handler = async event => {
	//const product = JSON.parse(event.body);
	const lineItems = [
		{
			name: 'Donation',
			currency: 'USD',
			description: 'coffee money',
			images: 'https://via.placeholder.com/200x200',
			amount: `10`,
			quantity: 1
		}
	];

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: 'https://ng-stripe.netlify.app/success',
		cancel_url: 'https://ng-stripe.netlify.app/cancel',
		line_items: lineItems
	});

	return {
		statusCode: 200,
		body: JSON.stringify({
			sessionId: session.id,
			publishableKey: process.env.STRIPE_PUBLIC
		})
	};
};