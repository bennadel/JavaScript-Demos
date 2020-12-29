
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[bnIntersectionObserverBList]"
})
export class IntersectionObserverBListDirective {

	private mapping: Map<Element, Function>;
	private observer: IntersectionObserver;

	// I initialize the intersection observer parent directive.
	constructor() {

		// As each observable child attaches itself to the parent observer, we need to
		// map Elements to Callbacks so that when an Element's intersection changes,
		// we'll know which callback to invoke. For this, we'll use an ES6 Map.
		this.mapping = new Map();

		this.observer = new IntersectionObserver(
			( entries: IntersectionObserverEntry[] ) => {

				for ( var entry of entries ) {

					var callback = this.mapping.get( entry.target );

					( callback && callback( entry.isIntersecting ) );

				}

			},
			{
				// This classifies the "intersection" as being a bit outside the
				// viewport. The intent here is give the elements a little time to react
				// to the change before the element is actually visible to the user.
				rootMargin: "300px 0px 300px 0px"
			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add the given Element for intersection observation. When the intersection status
	// changes, the given callback is invoked with the new status.
	public add( element: HTMLElement, callback: Function ) : void {

		this.mapping.set( element, callback );
		this.observer.observe( element );

	}


	// I get called once when the host element is being destroyed.
	public ngOnDestroy() : void {

		this.mapping.clear();
		this.observer.disconnect();

	}


	// I remove the given Element from intersection observation.
	public remove( element: HTMLElement ) : void {

		this.mapping.delete( element );
		this.observer.unobserve( element );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[bnIntersectionObserverB]",
	exportAs: "intersection"
})
export class IntersectionObserverBDirective {

	public isIntersecting: boolean;
	// These are just some human-friendly constants to make the HTML template a bit more
	// readable when being consumed as part of SWTCH/CASE statements.
	public IS_INTERSECTING: boolean = true;
	public IS_NOT_INTERSECTING: boolean = false;

	private elementRef: ElementRef;
	private parent: IntersectionObserverBListDirective;

	// I initialize the intersection observer directive.
	constructor(
		parent: IntersectionObserverBListDirective,
		elementRef: ElementRef
		) {

		this.parent = parent;
		this.elementRef = elementRef;

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

		this.parent.remove( this.elementRef.nativeElement );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// In this demo, instead of using an IntersectionObserver per Element, we're
		// going to use a shared observer in the parent element. However, we're still
		// going to use a CALLBACK style approach so that we're only reducing the number
		// of IntersectionObserver instances, not the number of Function calls.
		this.parent.add(
			this.elementRef.nativeElement,
			( isIntersecting: boolean ) => {

				this.isIntersecting = isIntersecting;

			}
		);

	}

}
