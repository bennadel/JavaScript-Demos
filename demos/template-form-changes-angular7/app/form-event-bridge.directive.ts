
// Import the core angular services.
import { AbstractControl } from "@angular/forms";
import { AbstractControlDirective } from "@angular/forms";
import { Directive } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgModel } from "@angular/forms";
import { NgModelGroup } from "@angular/forms";
import { Optional } from "@angular/core";
import { Self } from "@angular/core";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface ReactiveBridgeEvent {
	type: "statusChange" | "valueChange";
	target: AbstractControl;
	currentValue: any;
	previousValue: any | undefined;
}

@Directive({
	selector: "form[reactiveBridge],[ngModelGroup][reactiveBridge],[ngModel][reactiveBridge]",
	outputs: [
		"statusChangeEvents: statusChange",
		"valueChangeEvents: valueChange"
	],
	exportAs: "reactiveBridge"
})
export class ReactiveBridgeDirective {

	public statusChangeEvents: EventEmitter<ReactiveBridgeEvent>;
	public valueChangeEvents: EventEmitter<ReactiveBridgeEvent>;

	private control: AbstractControl | null;
	private controlDirective: AbstractControlDirective;
	private isDestroyed: boolean;
	private previousStatus: any | undefined;
	private previousValue: any | undefined;
	private subscriptions: Subscription[];

	// I initialize the reactive-bridge directive.
	// --
	// NOTE: Since this directive can be applied to three different types of elements,
	// we're going to injected all three in the SELF scope and just use whichever one
	// is defined.
	constructor(
		@Self() @Optional() ngForm: NgForm,
		@Self() @Optional() ngModelGroup: NgModelGroup,
		@Self() @Optional() ngModel: NgModel
		) {

		this.controlDirective = ( ngForm || ngModelGroup || ngModel ) !;

		this.control = null;
		this.isDestroyed = false;
		this.previousStatus = undefined;
		this.previousValue = undefined;
		this.statusChangeEvents = new EventEmitter();
		this.subscriptions = [];
		this.valueChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when the directive is being destroyed.
	public ngOnDestroy() : void {

		this.isDestroyed = true;

		for ( var subscription of this.subscriptions ) {

			subscription.unsubscribe();

		}

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Since the NgForm and NgModel directives create internal controls as part of
		// their initialization, the underlying control will be available immediately.
		if ( this.controlDirective.control ) {

			this.control = this.controlDirective.control;
			this.setupSubscriptions();
			return;

		}

		// If we made it this far, we're dealing with the NgModelGroup. Unlike the other
		// form directives, this one has to register itself with the form asynchronously
		// for reasons that I cannot fully understand when reading the Angular source
		// code. That said, it seems that deferring the initialization with a Promise
		// aligns with the workflow that the NgModelGroup directive is using internally.
		// --
		// NOTE: If we tried to initialize all three types of directives inside the same
		// Promise-based workflow, the NgModelGroup wouldn't fire on form-load. I have
		// no idea why. I assume it is a weird race-condition somewhere.
		Promise.resolve().then(
			() => {

				// If the Promise resolves after the directive is destroyed, skip the
				// subscriptions configuration.
				if ( this.isDestroyed ) {

					return;

				}

				this.control = this.controlDirective.control;
				this.setupSubscriptions();

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I setup the subscriptions on the underlying control's Reactive streams so that we
	// can power the EventEmitters on the bridge.
	private setupSubscriptions() : void {

		this.subscriptions.push(
			this.control.statusChanges.subscribe(
				( event ) => {

					this.statusChangeEvents.emit({
						type: "statusChange",
						target: this.control,
						previousValue: this.previousStatus,
						currentValue: event
					});

					this.previousStatus = event;

				}
			),
			this.control.valueChanges.subscribe(
				( event ) => {

					this.valueChangeEvents.emit({
						type: "valueChange",
						target: this.control,
						previousValue: this.previousValue,
						currentValue: event
					});

					this.previousValue = event;

				}
			)
		);

	}

}
