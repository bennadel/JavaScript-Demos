
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-scroll-on-mouseenter2",
	host: {
		"[class.is-scrollable]": "isScrollable",
		"(mouseenter)": "enable()",
		"(mouseleave)": "disable()"
	},
	styles: [
		`
			:host {
				display: block ;
				overflow: hidden ;
			}
			.wrapper {
				width: calc( 100% - 16px ) ;
			}

			:host( .is-scrollable ) {
				overflow: auto ;
				overscroll-behavior: contain ;
			}
		`
	],
	template:
	`
		<div class="wrapper" [style.width.px]="wrapperWidth">
			<ng-content></ng-content>
		</div>
	`
})
export class ScrollOnMouseenter2Component {
	
	public isScrollable: boolean;
	public wrapperWidth: number | null;

	private elementRef: ElementRef;

	// I initialize the scroll-on-mouseenter component.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;

		this.isScrollable = false;
		this.wrapperWidth = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I disable scrolling on the host component.
	public disable() : void {

		this.isScrollable = false;
		// NOTE: By setting the CSS property to NULL, the browser will REMOVE the inline
		// style from the wrapper, allowing the stylesheet properties to take precedence.
		this.wrapperWidth = null;

	}


	// I enable scrolling on the host component.
	public enable() : void {

		this.isScrollable = true;
		// At this point (while the host element is still deactivated - our view-model
		// has not yet been reconciled with the component template), the width of the
		// wrapper is "calc( 100% - 16px )". When we activate the host element, the
		// scrollbars MAY OR MAY NOT APPEAR (depending on the user's MacOS settings). As
		// such, we have to switch from a calculated width to an EXACT WIDTH in order to
		// prevent the content from jumping. To do this, we're going to set an INLINE
		// style width that is equal to the current calc()-based width.
		this.wrapperWidth = this.elementRef.nativeElement
			.childNodes[ 0 ]
			.clientWidth
		;

	}

}
