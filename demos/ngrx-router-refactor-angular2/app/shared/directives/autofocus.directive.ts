
// Import the core angular services.
import { AfterContentInit } from "@angular/core";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Renderer } from "@angular/core";

@Directive({
	selector: "input[autofocus],textarea[autofocus],select[autofocus]"
})
export class AutofocusDirective implements AfterContentInit, OnDestroy {

	private elementRef: ElementRef;
	private renderer: Renderer;
	private timer: number;


	// I initialize the directive.
	constructor( elementRef: ElementRef, renderer: Renderer ) {

		this.elementRef = elementRef;
		this.renderer = renderer;
		this.timer = null;

	}


	// ----
	// PUBLIC METHODS.
	// ----


	// I get called once after the component's content has been mounted.
	public ngAfterContentInit() : void {

		// If this is on the same page with routing activity, then it appears we need to
		// give the page a little time to "settle" before we try to steal the focus. I am
		// not sure why this is necessary.
		this.timer = setTimeout(
			() => {
				this.renderer.invokeElementMethod( this.elementRef.nativeElement, "focus" );
			},
			50
		);

	}


	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		clearTimeout( this.timer );

	}

}
