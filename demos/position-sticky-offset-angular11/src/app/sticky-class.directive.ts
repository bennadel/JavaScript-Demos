
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[stickyClass]",
	inputs: [ "stickyClass" ]
})
export class StickyClassDirective {

	public stickyClass!: string;

	private elementRef: ElementRef;
	private observer: IntersectionObserver | null;
	private zone: NgZone;

	// I initialize the sticky class directive.
	constructor(
		elementRef: ElementRef,
		zone: NgZone
		) {

		this.elementRef = elementRef;
		this.zone = zone;
		this.observer = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the host element is being destroyed.
	public ngOnDestroy() : void {

		this.observer?.disconnect();
		this.observer = null;

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Since the intersection events won't change any view-model (in this demo),
		// there's no need to trigger any change-detection digests. As such, we can bind
		// the interaction observer callback outside of the Angular Zone.
		this.zone.runOutsideAngular(
			() => {

				// By using threshold values of both 0 and 1, we will observe a change
				// when even 1px of the host element passes into the viewport as well as
				// when the entire element moves out of the viewport.
				this.observer = new IntersectionObserver(
					this.handleIntersection,
					{
						threshold: [ 0, 1 ]
					}
				);
				this.observer.observe( this.elementRef.nativeElement );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle changes in the observed intersections of the targets.
	private handleIntersection = ( entries: IntersectionObserverEntry[] ) => {

		for ( var entry of entries ) {

			// CAUTION: Since we know that the TOP specified in the "sticky"
			// configuration of our CSS class has a "-1px" value, then when the element's
			// rendering behavior switches from "static" to "sticky", the bounding client
			// rectangle will place the TOP of the element at ABOVE THE VIEWPORT (at
			// about -1px). As such, any time the top of the bounding client rectangle is
			// less than zero (while the BOTTOM is still visible), we can consider the
			// element to be "sticky" / "stuck".
			if (
				( entry.boundingClientRect.top < 0 ) &&
				( entry.boundingClientRect.bottom > 0 )
				) {

				this.elementRef.nativeElement.classList.add( this.stickyClass );

			} else {

				this.elementRef.nativeElement.classList.remove( this.stickyClass );

			}

		}

	};

}
