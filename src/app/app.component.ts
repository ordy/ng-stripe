import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import items from '../assets/items.json';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent {
	title = 'Stripe payment';
	testproduct = items[1];
	private response: any;
	private headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		.set('Access-Control-Allow-Origin', '*')
		.set('Access-Control-Allow-Credentials', 'true')
		.set('Access-Control-Allow-Methods', 'POST')
		.set('Access-Control-Allow-Headers', 'Content-Type')
		.set('Authorization', '*');

	constructor(private http: HttpClient) {}

	async triggerCreateCheckout(eventProduct: any) {
		console.log(`object -> ${this.testproduct}`);
		this.response = await this.http
			.post('/.netlify/functions/stripe', eventProduct, { headers: this.headers })
			.toPromise();
		this.openStripe(this.response);
	}

	openStripe = async (stripeParams: any) => {
		const stripe = await loadStripe(stripeParams.publishableKey);
		const { error } = await stripe!.redirectToCheckout({
			sessionId: stripeParams.sessionId,
		});
	};
}
