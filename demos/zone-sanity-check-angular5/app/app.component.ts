
// Import the core angular services.
import { Component } from "@angular/core";
import { DoCheck } from "@angular/core";
import { ElementRef } from "@angular/core";
import { OnInit } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="removeMousedown()">Remove mousedown</a>.
			<a (click)="setupMousedown()">Add mousedown</a>.<br />
			<br />

			<em>You can click around to trigger console logging...</em>
		</p>
	`
})
export class AppComponent implements DoCheck, OnInit {

	private element: Element;
	private zone: NgZone;

	// I initialize the app-component.
	constructor( elementRef: ElementRef, zone: NgZone ) {

		this.element = elementRef.nativeElement;
		this.zone = zone;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when the directive needs to be dirty-checked. In other words, this
	// method will give us insight into how often change-detection is triggered in the
	// Angular application.
	public ngDoCheck() : void {

		console.log( "ngDoCheck() - Change detection running." );

	}


	// I get called after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.setupMousedown();

	}


	// I remove the mousedown event-handler. 
	// --
	// NOTE: Because this is getting called from the VIEW BINDINGS, it is being called
	// from WITHIN the Angular Zone. As such, it will lead to change-detection.
	public removeMousedown() : void {

		// TEST: Here, I'm looking to sanity check the idea that an event handler that
		// was bound OUTSIDE of the Angular Zone can be removed from WITHIN the Angular
		// Zone.
		this.element.removeEventListener( "mousedown", this.handleMousedown, false );

	}


	// I setup the mousedown event-handler.
	// --
	// NOTE: Because this is getting called from the VIEW BINDINGS and ngOnInit(), it
	// is being called from WITHIN the Angular Zone. As such, it will lead to change-
	// detection.
	public setupMousedown() : void {

		// TEST: Here, I'm setting up the mousedown event binding OUTSIDE of the Angular
		// Zone. As such, the "mousedown" event should NOT lead to change-detection.
		this.zone.runOutsideAngular(
			() : void => {

				this.element.addEventListener( "mousedown", this.handleMousedown, false );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle mousedown events.
	private handleMousedown = ( event: MouseEvent ) : void => {

		console.log( "mousedown" );
		// TEST: The current method is running OUTSIDE of the Angular Zone. As such, I'm
		// testing to see if subsequent event bindings, configured OUTSIDE of the Angular
		// Zone, will continue to operate OUTSIDE of the Angular Zone.
		this.element.addEventListener( "mouseup", this.handleMouseup, false );

	}


	// I handle mouseup events.
	private handleMouseup = ( event: MouseEvent ) : void => {

		console.log( "mouseup" );

		this.element.removeEventListener( "mouseup", this.handleMouseup, false );
		// TEST: If the current event handler is running outside of the Angular Zone
		// (something we're actively testing), this checks to see if a timer that is
		// initiated here will also operate OUTSIDE of the Angular Zone.
		setTimeout(
			() : void => {

				console.log( "timer" );

			},
			100
		);

	}

}
