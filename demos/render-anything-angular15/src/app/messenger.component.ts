
// Import core Angular modules.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NgZone } from "@angular/core";

// Import application modules.
import { Messenger } from "./messenger";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-messenger",
	standalone: true,
	inputs: [ "name" ],
	template: ""
})
export class MessengerComponent {

	public name: string;

	private messenger: Messenger;
	private zone: NgZone;

	/**
	* I initialize the messenger wrapper with the given host element. This component is a
	* light-weight wrapper that connects the Angular runtime to the underlying messenger
	* instance.
	*/
	constructor(
		elementRef: ElementRef,
		zone: NgZone
		) {

		this.zone = zone;
		this.name = "";

		// Since the Messenger class might use methods (such as addEventListener()) that
		// are monkey-patched by Zone.js, we want to make sure to construct the Messenger
		// instance outside of the Angular zone. This way, when it performs actions
		// internally, it won't trigger unnecessary change detection cycles in Angular.
		this.messenger = this.zone.runOutsideAngular(
			() => {

				return( new Messenger( elementRef.nativeElement ) );

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I push name changes in Angular down into the Messenger instance.
	*/
	public ngOnChanges() : void {

		this.messenger.renderMessage( this.name );

	}

}
