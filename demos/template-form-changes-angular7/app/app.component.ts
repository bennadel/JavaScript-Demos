
// Import the core angular services.
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

// Import the application components and services.
import { ReactiveBridgeEvent } from "./form-event-bridge.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// NOTE: We could have used a ViewQuery() to get the "#ngForm" ref / NgForm directive
// instance injected into the app-component constructor. This would have given us access
// to ngForm.control - the underlying FormGroup. But, for the sake of the demo, I am
// looking to access the FormGroup events via event-bindings in the template. That's
// where the "reactive bridge" directive comes into play.
@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {
	
	public form: {
		pet: {
			name: string;
		};
	};

	// I initialize the app component.
	constructor() {

		this.form = {
			pet: {
				name: "Lucy"
			}
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public handleFormStatusChange( event: ReactiveBridgeEvent ) : void {

		console.group( "form - reactiveBridge - (statusChange)" );
		console.log( event );
		console.groupEnd();

	}

	public handleFormValueChange( event: ReactiveBridgeEvent ) : void {

		console.group( "form - reactiveBridge - (valueChange)" );
		console.log( event );
		console.groupEnd();

	}

	// NOTE: This isn't part of the reactive-bridge. This is just the normal "change"
	// functionality of the NgModel directive.
	public handleModelChange( event: string ) : void {

		console.group( "ngModel(ngModelChange)" );
		console.log( event );
		console.groupEnd();

	}

	public handleModelGroupStatusChange( event: ReactiveBridgeEvent ) : void {

		console.group( "ngModelGroup - reactiveBridge - (statusChange)" );
		console.log( event );
		console.groupEnd();

	}

	public handleModelGroupValueChange( event: ReactiveBridgeEvent ) : void {

		console.group( "ngModelGroup - reactiveBridge - (valueChange)" );
		console.log( event );
		console.groupEnd();

	}

	public handleModelStatusChange( event: ReactiveBridgeEvent ) : void {

		console.group( "ngModel - reactiveBridge - (statusChange)" );
		console.log( event );
		console.groupEnd();

	}

	public handleModelValueChange( event: ReactiveBridgeEvent ) : void {

		console.group( "ngModel - reactiveBridge - (valueChange)" );
		console.log( event );
		console.groupEnd();

	}

	// NOTE: This isn't part of the reactive-bridge. This is just the normal submit
	// functionality of the NgForm directive.
	public handleSubmit( event: NgForm ) : void {

		console.group( "ngForm(submit)" );
		console.log( event );
		console.log( JSON.stringify( this.form, null, 4 ) );
		console.groupEnd();

	}

}
