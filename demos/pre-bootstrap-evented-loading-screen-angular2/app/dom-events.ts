
// Import the core angular services.
import { DOCUMENT } from "@angular/platform-browser";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";

@Injectable()
export class DOMEvents {

	private doc: Document;


	// I initialize the service.
	// --
	// NOTE: When I first tried to approach this problem, I was going to try and use the
	// core Renderer service; however, it appears that the Renderer cannot be injected
	// into a service object (throws error: No provider for Renderer!). As such, I am 
	// treating THIS class as the implementation of the DOM abstraction (so to speak),
	// which can be overridden on a per-environment basis.
	constructor( @Inject( DOCUMENT ) doc: any ) {

		this.doc = doc;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I trigger the given event on the document root.
	public triggerOnDocument( eventType: string ) : Event {

		return( this.triggerOnElement( this.doc, eventType ) );

	}


	// I trigger the given event configuration on the given element.
	public triggerOnElement(
		nativeElement: any,
		eventType: string,
		bubbles: boolean = true,
		cancelable: boolean = false
		) : Event {

		var customEvent = this.createEvent( eventType, bubbles, cancelable );

		nativeElement.dispatchEvent( customEvent );

		return( customEvent );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I create and return a custom event with the given configuration.
	private createEvent(
		eventType: string,
		bubbles: boolean,
		cancelable: boolean
		) : Event {

		// IE (shakes fist) uses some other kind of event initialization. As such, 
		// we'll default to trying the "normal" event generation and then fallback to
		// using the IE version. 
		try {

			var customEvent: any = new CustomEvent( 
				eventType,
				{
					bubbles: bubbles,
					cancelable: cancelable
				}
			);

		} catch ( error ) {

			var customEvent: any = this.doc.createEvent( "CustomEvent" );

			customEvent.initCustomEvent( eventType, bubbles, cancelable );

		}

		return( customEvent );

	}

}
