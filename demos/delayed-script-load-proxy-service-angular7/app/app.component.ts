
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AnalyticsService } from "./analytics.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="doThis()">Do This</a>
			&mdash;
			<a (click)="doThat()">Do That</a>
		</p>
	`
})
export class AppComponent {

	private analyticsService: AnalyticsService;

	// I initialize the app component.
	constructor( analyticsService: AnalyticsService ) {

		this.analyticsService = analyticsService;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I execute an action (that we're going to track).
	public doThat() : void {

		this.analyticsService.track(
			"do.that",
			{
				now: Date.now()
			}
		);

	}


	// I execute an action (that we're going to track).
	public doThis() : void {

		this.analyticsService.track(
			"do.this",
			{
				now: Date.now()
			}
		);

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.analyticsService.identify(
			"bennadel",
			{
				group: "admin"
			}
		);

	}

}
