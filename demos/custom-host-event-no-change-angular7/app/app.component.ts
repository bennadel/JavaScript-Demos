
// Import the core angular services.
import { Component } from "@angular/core";
import { DoCheck } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="buttons">

			<button (click)="logClick( $event )">
				Click
			</button>

			<button (click.noChangeDetection)="logClick( $event )">
				Click (no Change-Detection)
			</button>

		</div>

		<p (hesitate)="logHesitation()">
			Do you want to click me?
		</p>
	`
})
export class AppComponent implements DoCheck {

	// I log the DOM-click event.
	public logClick( event: MouseEvent ) : void {

		console.log( "Button was clicked", event );

	}


	// I log the synthesized hesitation event.
	public logHesitation() : void {

		console.log( "User hesitated to act!" );

	}


	// I get called whenever a change-detection digest has been triggered.
	public ngDoCheck() : void {

		console.log( "ngDoCheck() - Change-detection triggered." );

	}

}
