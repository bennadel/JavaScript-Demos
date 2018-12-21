
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div>
			<button (hesitate)="showMessage()" [duration]="1000" (click)="hideMessage()">
				Buy It $29.99
			</button>

			<span *ngIf="isShowingMessage">
				<strong>Come on!</strong> Buy it already!
			</span>
		</div>
	`
})
export class AppComponent {

	public isShowingMessage: boolean;

	// I initialize the app component.
	constructor() {

		this.isShowingMessage = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I hide the peer-pressure message.
	public hideMessage() : void {

		this.isShowingMessage = false;

	}


	// I get called when a change-detection cycle has been triggered.
	// --
	// NOTE: We are binding to this life-cycle method so that we can demonstrate that
	// the event-handlers bound inside of the (hesitate) directive are not causing any 
	// unnecessary change-detection cycles until the (hesitate) event is triggered.
	public ngDoCheck() : void {

		console.log( "ngDoCheck() - Change detection triggered." );

	}


	// I show the peer-pressure message.
	public showMessage() {

		this.isShowingMessage = true;

	}

}
