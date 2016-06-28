
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";


// The following components are exactly the same in terms of the internal 
// functionality. The ONLY DIFFERENCE between the two is that they have different 
// meta-data. Specifically, the former uses the Default change detection strategy
// while the latter uses the OnPush change detection strategy. The goal here is to
// see how, if at all, the change detection strategy affects the changeDetectorRef.


// Using Default change detection strategy.
@Component({
	selector: "my-label",
	inputs: [ "value" ],
	changeDetection: ChangeDetectionStrategy.Default,
	template:
	`
		<strong>Label</strong>: {{ value }}
	`
})
export class MyLabelComponent implements OnChanges {

	// I hold the value of the label.
	public value: string;


	// I initialize the component.
	constructor( changeDetectorRef: ChangeDetectorRef ) {

		// When the component is initialized, we want to immediately detach the
		// change detector so that the component's view will not be updated.
		changeDetectorRef.detach();

	}

	
	// ---
	// PUBLIC METHODS.
	// ---


	// I handle changes to any of the bound inputs.
	public ngOnChanges( changes: any ) : void {

		console.log( "Inputs changed:", Object.keys( changes ) );

	}

}


// Using OnPush change detection strategy.
@Component({
	selector: "my-push-label",
	inputs: [ "value" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
	`
		<strong>Label</strong>: {{ value }}
	`
})
export class MyPushLabelComponent implements OnChanges {

	// I hold the value of the label.
	public value: string;


	// I initialize the component.
	constructor( changeDetectorRef: ChangeDetectorRef ) {

		// When the component is initialized, we want to immediately detach the
		// change detector so that the component's view will not be updated.
		// --
		// CAUTION: This version does not work as you MIGHT EXPECT!
		changeDetectorRef.detach();

	}

	
	// ---
	// PUBLIC METHODS.
	// ---


	// I handle changes to any of the bound inputs.
	public ngOnChanges( changes: any ) : void {

		console.log( "Inputs changed:", Object.keys( changes ) );

	}

}
