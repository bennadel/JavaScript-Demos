
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { LazyViewport } from "./lazy-viewport.ts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[lazyViewport]",
	inputs: [ "offset: lazyViewportOffset" ],

	// The primary role of this directive is to override the default LazyViewport 
	// instance at this point in the component tree. This way, any lazy-directives
	// that are descendants of this element will receive this instance when using
	// dependency-injection.
	providers: [
		{
			provide: LazyViewport,
			useClass: LazyViewport
		}
	]
})
export class LazyViewportDirective implements OnInit, OnDestroy {

	public offset: number;

	private elementRef: ElementRef;
	private lazyViewport: LazyViewport;

	// I initialize the lazy-viewport directive.
	constructor(
		elementRef: ElementRef,
		lazyViewport: LazyViewport
		) {

		this.elementRef = elementRef;
		this.lazyViewport = lazyViewport;
		this.offset = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the directive is being destroyed.
	public ngOnDestroy() : void {

		this.lazyViewport.teardown();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Ensure that the offset value is numeric when we go to initialize the viewport.
		if ( isNaN( +this.offset ) ) {

			console.warn( new Error( `[lazyViewportOffset] must be a number. Currently defined as [${ this.offset }].` ) );
			this.offset = 0;

		}

		// Now that this LazyViewport directive has overridden the instance of 
		// LazyViewport in the dependency-injection tree, we have to initialize it 
		// to use the current element as the observer root.
		this.lazyViewport.setup( this.elementRef.nativeElement, +this.offset );

	}

}
