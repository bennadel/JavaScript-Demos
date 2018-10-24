
// I am the base-class for all of the events that this application pushes onto the
// MessageQueue. The only guarantee that this class makes is a read-only Type.
abstract class Event {

	public readonly type: string;

}

// I am the sub-class / base-class for all of the payload-heavy events that this
// application pushes onto the MessageQueue. This class guarantees a payload with a
// given interface.
abstract class EventWithPayload<T> extends Event {

	public readonly payload: T;

	constructor( payload: T ) {
	
		super();
		this.payload = payload;

	}

}

// ----------------------------------------------------------------------------------- //
// Each of the following classes has both a STATIC and an INSTANCE [type] of the same
// value (the instance value is read from the static value). This allows you to use the
// instance type in a discriminating union while comparing it to the static type. In
// other words, you only have to import the one Event class to get access to both values.
// ----------------------------------------------------------------------------------- //

export interface EventTypeAPayload {
	foo: string;
}

export class EventTypeA extends EventWithPayload<EventTypeAPayload> {
	static readonly type = "EventTypeA";
	public readonly type = EventTypeA.type;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface EventTypeBPayload {
	bar: string;
}

export class EventTypeB extends EventWithPayload<EventTypeBPayload> {
	static readonly type = "EventTypeB";
	public readonly type = EventTypeB.type;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface EventTypeCPayload {
	baz: string;
}

export class EventTypeC extends EventWithPayload<EventTypeCPayload> {
	static readonly type = "EventTypeC";
	public readonly type = EventTypeC.type;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export class EventTypeD extends Event {
	static readonly type = "EventTypeD";
	public readonly type = EventTypeD.type;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// For convenience in our type annotations, we're going to export all of the Event 
// types as one type union. This way, our message bus event handler can use this type
// in its signature and then narrow down the type using a discriminating union.
export type EventTypes = 
	EventTypeA |
	EventTypeB |
	EventTypeC |
	EventTypeD
;
