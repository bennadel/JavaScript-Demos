
// Import the core angular services.
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChange } from "@angular/core";
import { SimpleChanges } from "@angular/core";

interface InputChanges extends SimpleChanges {
	value?: SimpleChange;
}

@Component({
	moduleId: module.id,
	selector: "my-widget",
	inputs: [ "value" ],
	template:
	`
		<strong>Value</strong>: {{ value }}
	`
})
export class MyWidgetComponent implements OnChanges {
	
	public value: string;
	
	// I initialize the emoticon button component.
	constructor() {

		this.value = "";

	}

	// I get called whenever the bound inputs change (including the first binding).
	public ngOnChanges( changes: InputChanges ) : void {

		if ( changes.value && ! changes.value.isFirstChange() ) {

			console.log( 
				"Value change from",
				changes.value.previousValue,
				"to",
				changes.value.currentValue
			);

		}

	}

}
