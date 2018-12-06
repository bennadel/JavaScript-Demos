
// Import the core angular services.
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";
import { OnInit } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-widget",
	inputs: [ "value" ],
	styleUrls: [ "./widget.component.less" ],
	template:
	`
		I am a widget <strong *ngIf="value">with a value</strong>
	`
})
export class WidgetComponent implements OnInit, OnChanges {

	// This is the INPUT property.
	public value: any = null;

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called after input bindings have been changed.
	// --
	// CAUTION: If the calling context DOES NOT PROVIDE ANY INPUT BINDINGS, then this
	// event-handler will not be called (even if the component meta-data states that this
	// component has input properties).
	public ngOnChanges( changes: SimpleChanges ) : void {

		console.log( "Widget ngOnChanges event-handler." );

	}


	// I get called after the input bindings have been checked for the first time.
	public ngOnInit() : void {

		console.log( "Widget ngOnInit event-handler." );

	}

}
