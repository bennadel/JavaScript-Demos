
// Import the core angular services.
import { ErrorHandler } from "@angular/core";
import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface CallbackFunction<T = any> {
	( event: T ): void;
}

interface NewableType<T> {
	new( ...args: any[] ): T;
}

@Injectable({
	providedIn: "root"
})
export class MessageBusService {

	private errorHandler: ErrorHandler;
	private eventStream: Subject<any>;

	// I initialize the message bus service.
	constructor( errorHandler: ErrorHandler ) {

		this.errorHandler = errorHandler;
		this.eventStream = new Subject();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I push the given event onto the message bus.
	public emit( event: any ) : void {

		this.eventStream.next( event );

	}


	// I create and return a new grouping of subscriptions on the message bus. This is
	// a convenience class that makes it easier to subscribe and unsubscribe to events
	// within a single, cohesive context (such as a component).
	public group() : MessageBusGroup {

		return( new MessageBusGroup( this ) );

	}


	// I subscribe to the message bus, but only invoke the callback when the event is
	// of the given newable type (ie, it's a Class definition, not an instance).
	// --
	// NOTE: The NewableType<T> will allow for Type inference.
	public on<T>(
		typeFilter: NewableType<T>,
		callback: CallbackFunction<T>,
		callbackContext: any = null
		) : Subscription {

		var subscription = this.eventStream
			.pipe(
				filter(
					( event: any ) : boolean => {

						return( event instanceof typeFilter );

					}
				)
			)
			.subscribe(
				( event: T ) : void => {

					try {

						callback.call( callbackContext, event );
						
					} catch ( error ) {

						this.errorHandler.handleError( error );

					}

				}
			)
		;

		return( subscription );

	}


	// I subscribe to all events on the message bus.
	public subscribe(
		callback: CallbackFunction,
		callbackContext: any = null
		) : Subscription {

		var subscription = this.eventStream.subscribe(
			( event: any ) : void => {

				try {

					callback.call( callbackContext, event );
					
				} catch ( error ) {

					this.errorHandler.handleError( error );

				}

			}
		);

		return( subscription );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I am a convenience class that keeps track of subscriptions within the group and can
// mass-unsubscribe from them as needed. Because of this tracking, the methods on this
// class return a reference to THIS class, instead of a Subscription, allowing for a 
// more fluent API.
export class MessageBusGroup {

	private messageBus: MessageBusService;
	private subscriptions: Subscription[];

	// I initialize the message bus group service.
	constructor( messageBus: MessageBusService ) {

		this.messageBus = messageBus;
		this.subscriptions = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I push the given event onto the message bus.
	public emit( event: any ) : MessageBusGroup {

		this.messageBus.emit( event );

		return( this );

	}


	// I subscribe to the message bus, but only invoke the callback when the event is
	// of the given newable type (ie, it's a Class definition, not an instance).
	public on<T>(
		typeFilter: NewableType<T>,
		callback: CallbackFunction<T>,
		callbackContext: any = null
		) : MessageBusGroup {

		this.subscriptions.push(
			this.messageBus.on( typeFilter, callback, callbackContext )
		);

		return( this );

	}


	// I subscribe to all events on the message bus.
	public subscribe(
		callback: CallbackFunction,
		callbackContext: any = null
		) : MessageBusGroup {

		this.subscriptions.push(
			this.messageBus.subscribe( callback, callbackContext )
		);

		return( this );

	}


	// I unsubscribe from all the current subscriptions.
	public unsubscribe() : MessageBusGroup {

		for ( var subscription of this.subscriptions ) {

			subscription.unsubscribe();

		}

		this.subscriptions = [];

		return( this );

	}

}
