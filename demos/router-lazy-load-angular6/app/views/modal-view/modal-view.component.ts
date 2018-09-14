
// Import the core angular services.
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { DomUtils } from "~/app/shared/services/dom-utils";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "modal-view",
	styleUrls: [ "./modal-view.component.less" ],
	templateUrl: "./modal-view.component.htm"
})
export class ModalViewComponent implements OnInit, OnDestroy {

	private domUtils: DomUtils;

	// I initialize the modal-view component.
	constructor( domUtils: DomUtils ) {
		
		this.domUtils = domUtils;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		// When we close the modal window, we can allow any overflow of the HTML page to
		// show; this will re-enable the natural scrollbars on the main page.
		this.domUtils.showHtmlOverflow();

	}


	// I get called once when the component it about to be mounted.
	public ngOnInit() : void {

		// When we open a modal window, it will have it's own scrollbar. In order to not
		// show two scrollbars doubled-up on the side of the screen, we have to make sure
		// that the HTML page doesn't show a scrollbar for the main body.
		this.domUtils.hideHtmlOverflow();

	}

}
