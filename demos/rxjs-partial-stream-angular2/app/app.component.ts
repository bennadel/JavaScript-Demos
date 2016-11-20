
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { BusinessService } from "./business.service";

@Component({
	selector: "my-app",
	template:
	`
		<p>
			<a (click)="makeRequest()">Make Request</a>
			&nbsp;|&nbsp;
			<a (click)="unsubscribe()">Unsubscribe</a>
		</p>

		<p *ngIf="subscription">
			<em>Subscription to business service obtained...</em>
		</p>
	`
})
export class AppComponent {

	private businessService: BusinessService;
	private subscription: Subscription;


	// I initialize the component.
	constructor( businessService: BusinessService ) {
		
		this.businessService = businessService;
		this.subscription = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I make a request to the business service and store the result subscription.
	public makeRequest() : void {

		this.subscription = this.businessService
			.makeItSo()
			.subscribe(
				( response: string ) : void => {

					console.log( "Completed successfully!", response );

				},
				null, // On error.
				() : void => {

					// For the sake of the UI, nullify the subscription once the stream
					// has completed.
					this.subscription = null;

				}
			)
		;

	}


	// I unsubscribe from any pending result subscription.
	public unsubscribe() : void {

		if ( ! this.subscription ) {

			return;

		}

		console.warn( "Unsubscribed from cold stream." );
		
		this.subscription.unsubscribe();
		this.subscription = null;

	}

}
