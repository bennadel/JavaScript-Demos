
// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import range = require( "lodash/range" );

// Import the application components and services.
import { ElementScrollPercentage } from "./element-scroll-percentage";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="scroll-progress scroll-progress--fixed">
			<div class="scroll-progress__indicator" [style.width.%]="pageScroll">
				<br />
			</div>
		</div>

		<p *ngFor="let i of demoRange">
			Content goes here ...
		</p>

		<div class="inner">
			<div class="scroll-progress scroll-progress--absolute">
				<div class="scroll-progress__indicator" [style.width.%]="innerScroll">
					<br />
				</div>
			</div>

			<div
				(scrollPercentage)="recordInnerScroll( $event )"
				class="inner__content">

				<p *ngFor="let i of demoRange">
					Content goes here ...
				</p>

			</div>
		</div>

		<p *ngFor="let i of demoRange">
			Content goes here ...
		</p>
	`
})
export class AppComponent implements OnInit {

	public demoRange: number[];
	public innerScroll: number;
	public pageScroll: number;

	private elementScrollPercentage: ElementScrollPercentage;

	// I initialize the app-component.
	constructor( elementScrollPercentage: ElementScrollPercentage ) {

		this.elementScrollPercentage = elementScrollPercentage;

		this.demoRange = range( 15 );
		this.innerScroll = 0;
		this.pageScroll = 0;


	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.elementScrollPercentage
			.getScrollAsStream() // Defaults to Document if no Element supplied.
			.subscribe(
				( percent: number ) : void => {

					this.pageScroll = percent;

				}
			)
		;

	}


	// I record the element scroll percentage of the inner content area, applying it
	// to the inner status bar.
	public recordInnerScroll( percent: number ) : void {

		this.innerScroll = percent;

	}

}
