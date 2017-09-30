
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { WindowScroller } from "./window-scroller";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[id], a[name]",
	inputs: [ "id", "name" ]
})
export class FragmentTargetDirective implements OnInit, OnDestroy {
	
	public id: string;
	public name: string;

	private activatedRoute: ActivatedRoute;
	private elementRef: ElementRef;
	private fragmentSubscription: Subscription;
	private windowScroller: WindowScroller;

	// I initialize the fragment-target directive.
	constructor(
		activatedRoute: ActivatedRoute,
		elementRef: ElementRef,
		windowScroller: WindowScroller
		) {

		this.activatedRoute = activatedRoute;
		this.elementRef = elementRef;
		this.windowScroller = windowScroller;

		this.id = null;
		this.fragmentSubscription = null;
		this.name = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the directive is being destroyed.
	public ngOnDestroy() : void {

		( this.fragmentSubscription ) && this.fragmentSubscription.unsubscribe();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.fragmentSubscription = this.activatedRoute.fragment.subscribe(
			( fragment: string ) : void => {

				if ( ! fragment ) {

					return;

				}

				if (
					( fragment !== this.id ) &&
					( fragment !== this.name )
					) {

					return;

				}

				this.windowScroller.scrollIntoView( this.elementRef );
				
			}
		);

	}

}
