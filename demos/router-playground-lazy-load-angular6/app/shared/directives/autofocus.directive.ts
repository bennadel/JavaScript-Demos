
// Import the core angular services.
import { AfterContentInit } from "@angular/core";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { OnDestroy } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "input[autofocus], select[autofocus], textarea[autofocus]"
})
export class AutofocusDirective implements AfterContentInit, OnDestroy {

	private elementRef: ElementRef;
	private timer: number;

	// I initialize the autofocus directive.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;
		this.timer = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the contents have been fully initialized.
	public ngAfterContentInit() : void {

		// NOTE: Using "window." in order to clear-up TypeScript error.
		this.timer = window.setTimeout(
			() : void => {

				var element = this.elementRef.nativeElement;
				element.focus();
				element.select();
				
			},
			50
		);

	}


	// I get called once when the directive is being unmounted.
	public ngOnDestroy() : void {

		clearTimeout( this.timer );

	}

}
