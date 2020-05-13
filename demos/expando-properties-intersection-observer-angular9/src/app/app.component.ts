
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
			<a (click)="toggle()">Toggle Images</a>
		</p>

		<ng-template [ngIf]="isShowingImages">

			<!--
				NOTE: In the following IMG tag, we're NOT SETTING the SRC attribute.
				Instead, we're using the [appViewportIntersectionSrc] directive to defer
				the loading of the [src] attribute until after the IMG tag intersects
				with the browser's viewport.
			-->
			<p *ngFor="let imageSource of imageSources">
				<img
					[appViewportIntersectionSrc]="imageSource"
					width="400"
					height="400"
					(load)="logImageLoad( imageSource )"
				/>
			</p>

		</ng-template>
	`
})
export class AppComponent {

	public imageSources: string[];
	public isShowingImages: boolean;

	// I initialize the app component.
	constructor() {

		// NOTE: As we generate the image source values, we're making them unique per
		// page-load so that the demo will always load new images even if the browser's
		// cache is enabled. This way, we get to see the network activity.
		this.imageSources = new Array( 50 )
			.fill( Date.now() )
			.map(
				( tickcount, i ) => {

					return( `./assets/schitts-creek.gif?tickcount=${ tickcount }&i=--${ i }` );
				}
			)
		;
		this.isShowingImages = true;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I log the loading of the given image [src] property.
	public logImageLoad( imageSource: string ) : void {

		console.log(
			`%cImage loaded: %c${ imageSource }`,
			"color: red ; font-weight: bold ;",
			"color: black ; font-weight: normal ;"
		);

	}


	// I toggle the rendering of the Images (so that we can make sure the ngOnDestroy
	// event is working property in our viewport-intersection-src directive).
	public toggle() : void {

		this.isShowingImages = ! this.isShowingImages;

	}

}
