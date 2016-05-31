
// Import the core angular services.
import { EventEmitter } from "@angular/core";

// I provide the base functionality for all layers.
export class AbstractLayerComponent {

	// I am the event stream for "close" events.
	public closeEvent: EventEmitter;

	// I determine if the sub-layer (contained within this layer) is open.
	public isSubLayerOpen: boolean ;


	// I initialize the component.
	constructor() {

		this.closeEvent = new EventEmitter<any>();
		this.isSubLayerOpen = false;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I close the sub-layer (contained within this layer).
	public closeSubLayer() : void {

		this.isSubLayerOpen = false;

	}


	// I emit the close event for this layer.
	public emitCloseEvent() : void {

		this.closeEvent.next();

	}


	// I open the sub-layer (contained within this layer).
	public openSubLayer() : void {

		this.isSubLayerOpen = true;

	}


	// I print the name of the current layer.
	public printLayerName() : void {

		throw( new Error( "Method not implemented" ) );

	}
	
}