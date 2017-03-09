
// Import the core angular services.
import { Directive } from "@angular/core";
import { EventEmitter } from "@angular/core";

// Import the application components and services.
import { ClipboardService } from "./clipboard.service";

// This directive acts as a simple glue layer between the given [clipboard] property 
// and the underlying ClipboardService. Upon the (click) event, the [clipboard] value 
// will be copied to the ClipboardService and a (clipboardCopy) event will be emitted.
@Directive({
	selector: "[clipboard]",
	inputs: [ "value: clipboard" ],
	outputs: [
		"copyEvent: clipboardCopy", 
		"errorEvent: clipboardError" 
	],
	host: {
		"(click)": "copyToClipboard()"
	}
})
export class ClipboardDirective {
	
	public copyEvent: EventEmitter<string>;
	public errorEvent: EventEmitter<Error>;
	public value: string;

	private clipboardService: ClipboardService;


	// I initialize the clipboard directive.
	constructor( clipboardService: ClipboardService ) {

		this.clipboardService = clipboardService;
		this.copyEvent = new EventEmitter();
		this.errorEvent = new EventEmitter();
		this.value = "";
		
	}


	// ---
	// PUBLIC METODS.
	// ---


	// I copy the value-input to the Clipboard. Emits success or error event.
	public copyToClipboard() : void {

		this.clipboardService
			.copy( this.value )
			.then( 
				( value: string ) : void => {

					this.copyEvent.emit( value );

				}
			)
			.catch(
				( error: Error ) : void => {

					this.errorEvent.emit( error );

				}
			)
		;

	}

}
