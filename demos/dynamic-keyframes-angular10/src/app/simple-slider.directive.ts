
// Import the core angular services.
import { Directive } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: Animation names / key-frames cannot be scoped to a component. As such, each
// animation name must be globally-unique to the rendered page. We're going to use an
// incrementing key to make sure all simple-slider animations are uniquely named.
var incrementingID = 0;

interface SlideshowConfig {
	count: number ;
	pause: number;
	transition: number;
}

@Directive({
	selector: "[simpleSlider]",
	inputs: [ "config: simpleSlider" ],
	host: {
		"[attr.data-simple-slider-id]": "id",
		"[class.simple-slider-directive]": "true"
	}
})
export class SimpleSliderDirective {

	public config!: SlideshowConfig;
	public id: string;

	private styleElement: HTMLStyleElement | null;

	// I initialize the child component.
	constructor() {

		this.id = `simple-slider-${ ++incrementingID }`;
		this.styleElement = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		// CAUTION: The ngOnInit() is NOT ALWAYS CALLED prior to the host being
		// destroyed. As such, we have to check to see if our style-element was
		// ever created.
		if ( this.styleElement ) {

			document.head.removeChild( this.styleElement );

		}

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Technically, the inputs can be bound more than once. However, for the sake of
		// simplicity, we're going to check the inputs just once and then use them to
		// generate static key-frames for our animation.
		var count = this.config.count;
		var pause = this.config.pause; // In milliseconds.
		var transition = this.config.transition; // In milliseconds.

		// The key-frames within an animation are defined as percentages, not times. As
		// such, we have to calculate the total time so that we can then figure out what
		// percentage of the total time each slide and transition will account for.
		var total = ( ( count * pause ) + ( count * transition ) );
		var percentPause = ( pause / total * 100 );
		var percentTransition = ( transition / total * 100 );

		// Now that we have the timings translated into percentages, we have to build-up
		// the key-frame definitions.
		var keyframes: string[] = [];

		for ( var i = 0 ; i < count ; i++ ) {

			// For each key-frame, the FROM and TO will represent the starting and ending
			// percentage of each slide. Then, the difference between each subsequent
			// key-frame percentage will account for the transition timing between slides.
			var from = ( ( percentPause * i ) + ( percentTransition * i ) );
			var to = ( from + percentPause );
			// Each key-frame will move the contents left by 100% of the container width
			// (since each slide is assumed to take up 100% of the container dimensions).
			var offset = ( i * -100 );

			keyframes.push(
				`
					${ from }% , ${ to }% {
						transform: translateX( ${ offset }% ) ;
					}
				`
			);

		}

		// Create a Style Tag with the dynamic key-frames as the tag-content. We're going
		// to target the current element based on the CLASS NAME and the DATA attribute
		// that has been configured in the Host() bindings.
		this.styleElement = document.createElement( "style" );
		this.styleElement.type = "text/css";
		this.styleElement.textContent =
		`
			@keyframes ${ this.id }-keyframes {
				${ keyframes.join( "" ) }
			}

			.simple-slider-directive[ data-simple-slider-id = '${ this.id }' ] {
				animation-duration: ${ total }ms ;
				animation-iteration-count: infinite ;
				animation-name: ${ this.id }-keyframes ;
			}
		`;

		document.head.appendChild( this.styleElement );

	}

}
