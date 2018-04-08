
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { MetricsService } from "./metrics/metrics.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="showBox()">Show Box</a> &nbsp;|&nbsp;
			<a (click)="hideBox()">Hide Box</a>
		</p>

		<div *ngIf="isShowingbox" class="box">

			Metrics will be recorded as this box is toggled.

		</div>
	`
})
export class AppComponent {

	public isShowingbox: boolean;

	private loadedAt: number;
	private firstClickAt: number | null;
	private metrics: MetricsService;
	
	// I initialize the app component.
	constructor( metrics: MetricsService ) {

		this.metrics = metrics;

		this.firstClickAt = null;
		this.isShowingbox = false;
		this.loadedAt = Date.now();

		// Record this user as a unique value in the "set" of users that have loaded the
		// application in this stats-collection window (4 = fake user ID).
		this.metrics.set({
			metric: "users",
			value: 4,
			tags: [ "app-load" ]
		});

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I hide the demo box.
	public hideBox() : void {

		// If the box is actually transitioning to being hidden, record the click.
		if ( this.isShowingbox ) {

			this.metrics.increment( "box.hide" );

		}

		this.isShowingbox = false;

	}


	// I show the demo box.
	public showBox() : void {

		// If the box is actually transitioning to being visible, record the click.
		if ( ! this.isShowingbox ) {

			this.metrics.increment( "box.show", 1 );

		}

		// If this is the first user-interaction, log it and record it.
		if ( ! this.firstClickAt ) {

			this.firstClickAt = ( Date.now() - this.loadedAt );
			this.metrics.timing( "interactions.first-click", this.firstClickAt );
		}

		this.isShowingbox = true;

	}

}
