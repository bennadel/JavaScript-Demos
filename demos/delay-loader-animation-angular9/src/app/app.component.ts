
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Toggle Container with delay:
			<a (click)="toggle( 0 )" class="toggle">0ms</a>,
			<a (click)="toggle( 300 )" class="toggle">300ms</a>,
			<a (click)="toggle( 500 )" class="toggle">500ms</a>,
			<a (click)="toggle( 1000 )" class="toggle">1,000ms</a>
		</p>

		<section *ngIf="isShowingContainer">

			<!--
				The [delay] property determines the number of MS to wait before the
				loading indicator is renderered. By pushing this logic into the loader,
				it keeps the calling logic simple and binary (ie, show / don't show). The
				underlying THEORY here is that the precense of the loading indicator can
				increase the perceived delay when the latency is relatively low.
			-->
			<app-loader
				*ngIf="isLoading"
				[delay]="delay"
				class="loader">
			</app-loader>

			<div *ngIf="( ! isLoading )">
				From the corner of the gym where the BIG men train,<br />
				Through a cloud of chalk and the midst of pain<br />
				Where the big iron rides high and threatens lives,<br />
				Where the noise is made with big forty-fives,<br />
				A deep voice bellowed as he wrapped his knees,<br />
				A very big man with legs like trees.<br />
				Laughing as he snatched another plate from the stack<br />
				Chalking his hands and monstrous back,<br />
				said, "Boy, stop lying and don't say you've forgotten,<br />
				The trouble with you is you ain't been SQUATTIN'."<br />
				&mdash;DALE CLARK, 1983
			</div>

		</section>
	`
})
export class AppComponent {

	public delay: number;
	public isLoading: boolean;
	public isShowingContainer: boolean;

	// I initialize the app component.
	constructor() {

		this.delay = 0;
		this.isLoading = false;
		this.isShowingContainer = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the visibility of the data container, which triggers a "network" request
	// using the given delay for the loading indicator.
	public toggle( newDelay: number ) : void {

		this.delay = newDelay;

		// Toggle the container closed.
		if ( this.isShowingContainer ) {

			this.isShowingContainer = false;
			this.isLoading = false;

		// Toggle the container opened.
		} else {

			this.isShowingContainer = true;
			this.isLoading = true;

			this.getData().then(
				() => {

					this.isLoading = false;

				}
			);

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I simulate a network request with a random amount of latency.
	private getData( maxLatency: number = 1000 ) : Promise<void> {

		var promise = new Promise<void>(
			( resolve ) => {

				var latency = Math.floor( Math.random() * maxLatency );

				console.log( "Data Fetch Latency:", latency, "ms" );
				setTimeout( resolve, latency );
				
			}
		);

		return( promise );

	}

}
