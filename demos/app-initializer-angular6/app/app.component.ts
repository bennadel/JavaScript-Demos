
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { GeocodeService } from "./geocode.service";
import { IPLocation } from "./geocode.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<strong>
			Find IP Address:
		</strong>

		<input
			type="text"
			value="209.122.178.239"
			(keydown.Enter)="locate( $event.target.value )"
		/>

		<div *ngIf="results.length">
			<h3>
				Results:
			</h3>

			<ul>
				<li *ngFor="let result of results">
					<strong>{{ result.ip }}</strong>:
					{{ result.city }},
					{{ result.country }}
					( {{ result.latitude }} , {{ result.longitude }} )
				</li>
			</ul>
		</div>
	`
})
export class AppComponent {

	public results: IPLocation[];

	private geocodeService: GeocodeService;

	// I initialize the app component.
	constructor( geocodeService: GeocodeService ) {

		this.geocodeService = geocodeService;
		this.results = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I geolocate the given IP address and collect the result.
	public locate( ipAddress: string ) : void {

		this.geocodeService.locate( ipAddress ).then(
			( result ) => {

				this.results.unshift( result );

			},
			( error ) => {

				console.error( error );

			}
		);

	}

}
