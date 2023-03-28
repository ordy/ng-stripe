import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import items from '../assets/items.json'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	title = 'ng-stripe';
  testproduct = items[1];
  private response: any;

  constructor(private http: HttpClient){}

  async triggerCreateCheckout(eventProduct: any) {
    console.log(`object -> ${this.testproduct}`);
    this.response = await this.http
      .post('/.netlify/functions/stripe', eventProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).toPromise();
    this.openStripe(this.response);
  }

    openStripe = async (stripeParams: any) => {
    const stripe = await loadStripe(stripeParams.publishableKey);
    const { error } = await stripe!.redirectToCheckout({
      sessionId: stripeParams.sessionId,
    });
  };
}
