
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { EventTypeA } from "./message-bus-events";
import { EventTypeB } from "./message-bus-events";
import { EventTypeC } from "./message-bus-events";
import { EventTypeD } from "./message-bus-events";
import { EventTypes } from "./message-bus-events";
import { MessageBusGroup } from "./message-bus";
import { MessageBusService } from "./message-bus";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<button (click)="sendMessages()">
			Send Messages ( view in Console )
		</button>

		<button (click)="subscribeToMessages()">
			Subscribe To Messages
		</button>

		<button (click)="unsubscribeFromMessages()">
			Unsubscribe From Messages
		</button>
	`
})
export class AppComponent {

	private messageBusGroup: MessageBusGroup;

	// I initialize the app component.
	constructor( messageBus: MessageBusService ) {

		// Let's create a GROUP for this message bus. The GROUP keeps track of all the
		// subscriptions that we make within this context. As such, it allows us to
		// unsubscribe from all the events with a single method.
		this.messageBusGroup = messageBus.group();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I put several messages onto the message bus.
	public sendMessages() : void {

		// NOTE: Since the message bus is SYNCHRONOUS, we know that any thing logged
		// during the .emit() calls will be logged inside of our grouping.
		console.group( "Events" );
		this.messageBusGroup.emit( new EventTypeA({ foo: "foo" }) );
		this.messageBusGroup.emit( new EventTypeB({ bar: "bar" }) );
		this.messageBusGroup.emit( new EventTypeC({ baz: "bazzzy" }) );
		this.messageBusGroup.emit( new EventTypeD() );
		console.groupEnd();

	}


	// I subscribe to events on the message bus.
	public subscribeToMessages() {

		console.warn( "Subscribed to events!" );

		// Subscribe to all events on the message bus.
		this.messageBusGroup.subscribe(
			( event: EventTypes ) : void => {

				// Try navigating the discriminating union using the [type] property.
				switch ( event.type ) {
					case EventTypeA.type:

						console.log( "Event-A happened [type]:", event.payload.foo );

					break;
					case EventTypeB.type:

						console.log( "Event-B happened [type]:", event.payload.bar );

					break;
					case EventTypeD.type:

						console.log( "Event-D happened [type]: (no payload)" );

					break;
				}

				// Try navigating the discriminating union using the instance type.
				if ( event instanceof EventTypeA ) {

					console.log( "Event-A happened [instanceof]:", event.payload.foo );

				} else if ( event instanceof EventTypeB ) {

					console.log( "Event-B happened [instanceof]:", event.payload.bar );

				}

			}
		);

		// Subscribe to a specific event. Since we know our callback will only be
		// invoked for a specific event type, there will be automatic type inference
		// and we don't have to explicitly type the event arguments (magic!).
		this.messageBusGroup.on(
			EventTypeC,
			( event ) : void => {

				console.log( "Event-C happened [on]:", event.payload.baz );

			}
		);

		// Subscribe to a specific of event, but execute the callback in the given
		// context.
		// --
		// CAUTION: This won't have automatic type inference (as above) since the class
		// method can be called by anything (not just the message bus). As such, no
		// implicit type guarantee can be made by the compiler.
		this.messageBusGroup.on( EventTypeC, this.handleC, this );

	}


	// I unsubscribe from all of the events being tracked by the group.
	public unsubscribeFromMessages() {

		console.warn( "Unsubscribed from events!" );
		// NOTE: Because we are using a message bus GROUP, this will automatically 
		// unsubscribe from all of the events that this component is listening to.
		this.messageBusGroup.unsubscribe();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I'm just here to demonstrate the .on( Type, callback, CONTEXT ) signature.
	private handleC( event: EventTypeC ) : void {

		console.log( "Event-C happened [on(this)]:", event.payload.baz, ( this instanceof AppComponent ) );

	}

}
