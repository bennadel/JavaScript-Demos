
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";

// Import the application components and services.
import { Expando } from "./expando";
import { ViewportIntersectionService } from "./viewport-intersection.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[appViewportIntersectionSrc]",
	inputs: [ "appViewportIntersectionSrc" ]
})
export class ViewportIntersectionSrcDirective {
	
	// NOTE: Using the "Definite Assignment Assertion" to tell TypeScript that this INPUT
	// property will be assigned by the time we go to reference it (even though we don't
	// have an explicit assignment in the constructor).
	public appViewportIntersectionSrc!: string;

	private elementRef: ElementRef;
	private hasSrcBeenSet: boolean;
	private viewportIntersectionService: ViewportIntersectionService;

	// I initialize the viewport intersection src directive.
	constructor(
		elementRef: ElementRef,
		viewportIntersectionService: ViewportIntersectionService
		) {

		this.elementRef = elementRef;
		this.viewportIntersectionService = viewportIntersectionService;

		this.hasSrcBeenSet = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the host element is being unmounted.
	// --
	// CAUTION: Depending on the application architecture, the "destroy" method can be
	// called before the "init" method ever gets called.
	public ngOnDestroy() {

		if ( ! this.hasSrcBeenSet ) {

			this.viewportIntersectionService.removeTarget( this.elementRef.nativeElement );

		}

	}


	// I get called once after the inputs have been found for the first time.
	public ngOnInit() : void {

		// Using the core ViewportIntersectionService, we're going to defer the setting
		// of the [src] attribute until the Host Element intersects with the browser's
		// viewport.
		this.viewportIntersectionService.addTarget(
			this.elementRef.nativeElement,
			() => {

				this.elementRef.nativeElement
					.setAttribute( "src", this.appViewportIntersectionSrc )
				;
				// Flag that the [src] property has been set so that we don't bother
				// trying to detach the host element from the viewport-intersection
				// service during the destroy handler.
				this.hasSrcBeenSet = true;

			}
		);

	}

}
