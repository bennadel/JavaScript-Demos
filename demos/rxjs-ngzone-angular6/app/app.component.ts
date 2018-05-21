
// Import the core angular services.
import { Component } from "@angular/core";
import { fromEvent } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { OnInit } from "@angular/core";
import { throttleTime } from "rxjs/operators";

// By default, RxJS doesn't propagate the correct Zone through its observables. This
// import will attempt to patch the RxJS methods (in a way that I don't really
// understand), thereby allowing RxJS to be runnable outside of the Angular zone while
// the subscriber callback can still run inside the Angular zone.
// --
// CAUTION: At the time of this writing, using this patch file requires you to use the
// "rxjs-compat" module since this zone-patch references the RxJS observable methods and
// operators using the pre-v6 file paths.
// --
// NOTE: I'm only including this file in the app-component for the demo. You'd probably
// want to include this in your polyfill file or your app-module?
import "zone.js/dist/zone-patch-rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface MousePosition {
	viewport: MousePoint;
	document: MousePoint;
}

interface MousePoint {
	x: number;
	y: number;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Mouse Position:
		</p>

		<ul *ngIf="position">
			<li>
				<strong>Viewport:</strong>
				( {{ position.viewport.x }} , {{ position.viewport.y }} )
			</li>
			<li>
				<strong>Document:</strong>
				( {{ position.document.x }} , {{ position.document.y }} )
			</li>
		</ul>
	`
})
export class AppComponent implements OnInit {

	public position: MousePosition;

	private zone: NgZone;

	// I initialize the app-component.
	constructor( zone: NgZone ) {

		this.position = null;
		this.zone = zone;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when Angular performs a change-detection digest.
	public ngDoCheck() : void {

		console.log( "ngDoCheck() :", Date.now() );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.getMousePosition().subscribe(
			( mousePosition ) : void => {

				// NOTE: Angular will automatically run change-detection after this
				// callback is invoked, applying the updated position to the template,
				// thanks to the zone-patch.
				this.position = mousePosition;

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I get the current mouse position as an observable stream.
	private getMousePosition() : Observable<MousePosition> {

		// Because we are using the throttle() operators, we want to bind the RxJS source
		// outside of the Angular Zone. This way, every mouse-movement doesn't trigger a
		// change-detection digest. We only care about change-detection when we know the
		// view-model may actually change, which is inside the subscriber callback.
		var outsideStream = this.zone.runOutsideAngular(
			() => {

				var stream = fromEvent( document, "mousemove" ).pipe(
					// While the mouse-events are being triggered continuously on the
					// document (while the user is mousing-around), we only want to let
					// one event through every few seconds.
					throttleTime( 2000 ),
					map(
						( event: MouseEvent ) : MousePosition => {

							return({
								viewport: {
									x: event.clientX,
									y: event.clientY
								},
								document: {
									x: event.pageX,
									y: event.pageY
								}
							});

						}
					)
				);

				return( stream );

			}
		);

		return( outsideStream );

	}

}
