
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { MessageService } from "./message.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class AppReadyEvent {

	private hasBeenTriggered: boolean;
	private messageService: MessageService;

	// I initialize the app ready event service.
	constructor( messageService: MessageService ) {

		this.messageService = messageService;
		this.hasBeenTriggered = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I emit the "appready" event outside of the Angular application.
	public trigger() : void {

		if ( this.hasBeenTriggered ) {

			return;

		}

		this.hasBeenTriggered = true;
		this.messageService.send( "appready" );

	}

}
