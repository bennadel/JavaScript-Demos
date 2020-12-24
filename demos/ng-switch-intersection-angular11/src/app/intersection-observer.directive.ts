
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[bnIntersectionObserver]",
	exportAs: "intersection"
})
export class IntersectionObserverDirective {

	public isIntersecting: boolean;
	// These are just some human-friendly constants to make the HTML template a bit more
	// readable when being consumed as part of SWTCH/CASE statements.
	public IS_INTERSECTING: boolean = true;
	public IS_NOT_INTERSECTING: boolean = false;

	private elementRef: ElementRef;
	private observer: IntersectionObserver | null;

	// I initialize the intersection observer directive.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;
		this.observer = null;

		// By default, we're going to assume that the host element is NOT intersecting.
		// Then, we'll use the IntersectionObserver to asynchronously check for changes
		// in viewport visibility.
		this.isIntersecting = false;

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

		this.observer = new IntersectionObserver(
			( entries: IntersectionObserverEntry[] ) => {

				// CAUTION: Since we know that we have a 1:1 Observer to Target, we can
				// safely assume that the entries array only has one item.
				this.isIntersecting = entries[ 0 ].isIntersecting;

			},
			{
				// This classifies the "intersection" as being a bit outside the
				// viewport. The intent here is give the elements a little time to react
				// to the change before the element is actually visible to the user.
				rootMargin: "300px 0px 300px 0px"
			}
		);
		this.observer.observe( this.elementRef.nativeElement );

	}

}
