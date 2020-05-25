
// Import the core angular services.
import { Directive } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "form[valueChanges]",
	outputs: [ "valueChangeEvents: valueChanges" ]
})
export class FormValueChangesDirective {

	public valueChangeEvents: EventEmitter<any>;

	// I initialize the form value-changes directive. The goal of this directive is to
	// expose the (valueChanges) event on the underlying NgForm object such that it can
	// be subscribed-to in a template-driven form.
	constructor( form: NgForm ) {

		this.valueChangeEvents = new EventEmitter();

		if ( form.valueChanges ) {

			// CAUTION: I don't THINK that I need to worry about unsubscribing from this
			// Observable since they will both exist for the same life-cycles. But, I'm
			// not very good at RxJS, so I am not 100% sure on this.
			form.valueChanges.subscribe( this.valueChangeEvents );

		}

	}

}
