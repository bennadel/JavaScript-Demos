
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-stopwatch",
	styleUrls: [ "./stopwatch.component.less" ],
	template:
	`
		<div #divRef class="content">
			<div class="tick">
				<strong>Tick</strong>: {{ tickCount }}
			</div>
			<div class="controls">
				<a (click)="start()">Start Timer</a>
				&mdash;
				<a (click)="stop()">Stop Timer</a>
			</div>
		</div>
	`
})
export class StopwatchComponent {

	@ViewChild( "divRef" )
	// CAUTION: Normally I would NOT BE USING a property annotation to define a Query - I
	// prefer to use the Component.queries metadata (and keep all my metadata at the top
	// of the compnoent in one place where they are easily consumable). However, said
	// approach does not appear to work in this version of Angular (9.0.0-rc.2) when the
	// Ivy renderer is enabled.
	public divRef!: ElementRef;

	public tickCount: number;
	public timer: any;

	// I initialize the stopwatch component.
	constructor() {

		this.tickCount = 0;
		this.timer = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the component's view and its child views have been
	// initialized.
	public ngAfterViewInit() : void {

		// EXPERIMENT: Now that the view is initialized, all of the bindings and event-
		// handlers have been wired-up. As such, it is safe to move portions of the DOM
		// branch around in the DOM tree without breaking these connections. In this
		// case, we're going to move the DIV reference out of the Angular app and into
		// the root of the DOCUMENT BODY.
		// --
		// NOTE: While this movement serves no purpose in this context, this could be
		// useful in situations where an Element needs to be above the rest of the app
		// such as in a Drag-n-Drop action, Toast, Modal, Pop-Over, etc.
		document.body.appendChild( this.divRef.nativeElement );

	}


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		// There's a chance that the component has been destroyed before its view was
		// initialized (such as if a Child guard redirected the router). As such, let's
		// make sure we have a valid reference to our View element before we try to
		// clean up the document.
		if ( this.divRef ) {

			document.body.removeChild( this.divRef.nativeElement );

		}

		this.stop();

	}


	// I start the stopwatch timer.
	public start() : void {

		// If the timer is already running, ignore this request - it is redundant.
		if ( this.timer ) {

			return;

		}

		this.timer = window.setInterval(
			() => {

				this.tickCount = Date.now();

			},
			123
		);

	}


	// I stop the stopwatch timer.
	public stop() : void {

		window.clearInterval( this.timer );
		this.timer = null;

	}

}
