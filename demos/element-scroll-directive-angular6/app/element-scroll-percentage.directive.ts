
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Subscription } from "rxjs";

// Import the application components and services.
import { ElementScrollPercentage } from "./element-scroll-percentage";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[scrollPercentage]",
	outputs: [ "scrollPercentageEvent: scrollPercentage" ]
})
export class ElementScrollPercentageDirective implements OnInit, OnDestroy {

	public scrollPercentageEvent: EventEmitter<number>;

	private elementRef: ElementRef;
	private elementScrollPercentage: ElementScrollPercentage;
	private subscription: Subscription;

	// I initialize the element scroll percentage directive.
	constructor(
		elementRef: ElementRef,
		elementScrollPercentage: ElementScrollPercentage
		) {

		this.elementRef = elementRef;
		this.elementScrollPercentage = elementScrollPercentage;

		this.scrollPercentageEvent = new EventEmitter();
		this.subscription = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the directive is being unmounted.
	public ngOnDestroy() : void {

		( this.subscription ) && this.subscription.unsubscribe();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// The purpose of the directive is to act as the GLUE between the element scroll
		// service and the host element for this directive. Let's subscribe to the scroll
		// events and then pipe them into the output event for this directive.
		this.subscription = this.elementScrollPercentage
			.getScrollAsStream( this.elementRef.nativeElement )
			.subscribe(
				( percent: number ) : void => {

					this.scrollPercentageEvent.next( percent );

				}
			)
		;

	}

}
