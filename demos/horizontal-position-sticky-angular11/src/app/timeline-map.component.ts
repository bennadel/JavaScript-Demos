/**
* CAUTION: This Component isn't "pretty" - I just wanted to get it to a WORK. It's not
* the point of the demo. As such, I didn't want to put too much time into getting it to
* be elegant. Please do not look at this component for any best practices.
*/

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Import the core angular services.
import { Component } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Timeline {
	tracks: Track[];
}

interface Track {
	segments: Segment[];
}

interface Segment {
	durationInPercent: number;
	offsetInPercent: number;
}

@Component({
	selector: "bn-timeline-map",
	inputs: [ "timeline" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./timeline-map.component.less" ],
	templateUrl: "./timeline-map.component.html"
})
export class TimelineMapComponent {

	public timeline: Timeline;

	private documentHeight: number;
	private documentWidth: number;
	private hostClientRect: DOMRect | null;
	private elementRef: ElementRef;
	private positionElement!: HTMLElement;
	private windowWidth: number;
	private windowHeight: number;
	private zone: NgZone;

	// I initialize the timeline-map component.
	constructor(
		elementRef: ElementRef,
		zone: NgZone
		) {

		this.elementRef = elementRef;
		this.zone = zone;

		this.documentHeight = 0;
		this.documentWidth = 0;
		this.windowWidth = 0;
		this.windowHeight = 0;
		this.hostClientRect = null;
		this.timeline = {
			tracks: []
		};

	}
	
	// ---
	// PUBLIC METHODS.
	// ---

	public ngAfterViewInit() : void {

		// In order to not worry about the padding between the host element and the
		// timelines, we're going to use the inner wrapper element for our bounding box.
		this.hostClientRect = this.elementRef.nativeElement
			.querySelector( ".timeline" ) !
			.getBoundingClientRect() !
		;

		this.positionElement = this.elementRef
			.nativeElement
			.querySelector( ".position" ) !
		;

		this.setDimensions();
		this.updatePosition();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Since we're not actually changing any view-models within our event bindings
		// (we're just changing the window scroll offsets), we can bind them outside of
		// the Angular Zone. This way, we don't trigger any change-detection digests.
		this.zone.runOutsideAngular(
			() => {

				this.elementRef.nativeElement.addEventListener( "mousedown", this.handleMousedown );

				// NOTE: Using passive:true so we don't bog down the main thread as much.
				window.addEventListener( "scroll", this.handleScroll, { passive: true } );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I constrain the given value to the given max / min edges.
	private clamp( value: number, minValue: number, maxValue: number ) : number {

		return( Math.min( Math.max( value, minValue ), maxValue ) );

	}


	// I handle the mousedown event on the host.
	private handleMousedown = ( event: MouseEvent ) : void => {

		event.preventDefault();

		window.addEventListener( "mousemove", this.handleMousemove );
		window.addEventListener( "mouseup", this.handleMouseup );

		// At the start the map interaction, we need to know the size of the full
		// document content and the window. This way, we can translate map-local
		// locations into window-scroll offsets.
		this.setDimensions();		

		window.scrollTo(
			this.mapToScrollX( event.clientX ),
			this.mapToScrollY( event.clientY )
		);

	};


	// I handle the mousemove event on the host.
	private handleMousemove = ( event: MouseEvent ) : void => {

		window.scrollTo(
			this.mapToScrollX( event.clientX ),
			this.mapToScrollY( event.clientY )
		);

	};


	// I handle the mouseup event on the window.
	private handleMouseup = ( event: MouseEvent ) : void => {

		window.removeEventListener( "mousemove", this.handleMousemove );
		window.removeEventListener( "mouseup", this.handleMouseup );

	};


	// I handle the scroll event on the window.
	private handleScroll = ( event: Event ) : void => {

		this.updatePosition();

	}


	// I map the given clientX value into a scroll-offset for the window.
	private mapToScrollX( clientX: number ) : number {

		// NOTE: This will never evaluate to TRUE; however, TypeScript thinks it's
		// possible. So, I am adding this guard statement to calm the compiler.
		if ( ! this.hostClientRect ) {

			return( 0 );

		}

		var clampedClientX = this.clamp(
			clientX,
			this.hostClientRect.left,
			( this.hostClientRect.left + this.hostClientRect.width )
		);
		var localX = ( clampedClientX - this.hostClientRect.left );
		var percentX = ( localX / this.hostClientRect.width );

		return( ( this.documentWidth * percentX ) - ( this.windowWidth / 2 ) );

	}


	// I map the given clientY value into a scroll-offset for the window.
	private mapToScrollY( clientY: number ) : number {

		// NOTE: This will never evaluate to TRUE; however, TypeScript thinks it's
		// possible. So, I am adding this guard statement to calm the compiler.
		if ( ! this.hostClientRect ) {

			return( 0 );

		}

		var clampedClientY = this.clamp(
			clientY,
			this.hostClientRect.top,
			( this.hostClientRect.top + this.hostClientRect.height )
		);
		var localY = ( clampedClientY - this.hostClientRect.top );
		var percentY = ( localY / this.hostClientRect.height );
 
		return( ( this.documentHeight * percentY ) - ( this.windowHeight / 2 ) );

	}


	// I take a snapshot of the window / document dimensions for future calculations.
	private setDimensions() : void {

		// NOTE: https://javascript.info/size-and-scroll-window
		this.documentWidth = Math.max(
			document.body.scrollWidth, document.documentElement.scrollWidth,
			document.body.offsetWidth, document.documentElement.offsetWidth,
			document.body.clientWidth, document.documentElement.clientWidth
		);
		this.documentHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
		this.windowWidth = document.documentElement.clientWidth;
		this.windowHeight = document.documentElement.clientHeight;

	}


	// I update the size and location of the "position" indicator based on the current
	// scroll (relative to the map).
	private updatePosition() : void {

		if ( ! this.hostClientRect || ! this.positionElement ) {

			return;

		}

		var positionWidth = Math.min(
			( this.windowWidth / this.documentWidth * this.hostClientRect.width ),
			this.hostClientRect.width
		);
		var positionHeight = Math.min(
			( this.windowHeight / this.documentHeight * this.hostClientRect.height ),
			this.hostClientRect.height
		);

		// NOTE: We're doing this in a hacky way, as opposed to driving it with a
		// view-model, so as not worry about triggering a high-volume of change-
		// detection digests. This should be much better for performance.
		this.positionElement.style.width = ( positionWidth + "px" );
		this.positionElement.style.height = ( positionHeight + "px" );
		this.positionElement.style.left = ( ( window.scrollX / ( this.documentWidth - this.windowWidth ) * ( this.hostClientRect.width - positionWidth ) ) + "px" );
		this.positionElement.style.top = ( ( window.scrollY / ( this.documentHeight - this.windowHeight ) * ( this.hostClientRect.height - positionHeight ) ) + "px" );

	}

}
