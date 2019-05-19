
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "modal-view",
	host: {
		"(click)": "handleClick( $event )"
	},
	styleUrls: [ "./modal-view.component.less" ],
	template:
	`
		<div class="container">
			<router-outlet></router-outlet>
		</div>
	`
})
export class ModalViewComponent {

	private elementRef: ElementRef;
	private router: Router;

	// I initialize the modal-view component.
	constructor(
		elementRef: ElementRef,
		router: Router
		) {

		this.elementRef = elementRef;
		this.router = router;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I close the modal window view.
	public closeModal() : void {

		this.router.navigate(
			[
				"/app",
				{
					outlets: {
						modal: null
					}
				}
			]
		);

	}

	
	// I handle a click on the modal-view.
	public handleClick( event: MouseEvent ) : void {

		// If the user clicked directly on the modal backdrop, let's treat that as a
		// desire to close the modal window - empty the auxiliary route.
		if ( event.target === this.elementRef.nativeElement ) {

			this.closeModal();

		}

	}

}
