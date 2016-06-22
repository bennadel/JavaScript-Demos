
// Import the core angular services.
import { ChangeDetectorRef } from "@angular/core";
import { Directive } from "@angular/core";
import { Inject } from "@angular/core";
import { Self } from "@angular/core";

@Directive({
	selector: "[testChangeDetector]"
})
export class TestChangeDetectorDirective {

	// I initialize the directive.
	constructor( 
		@Self() changeDetectorRef: ChangeDetectorRef, 
		@Self() @Inject( "ProviderTest" ) providerTest: string 
		) {

		console.group( "TestChangeDetector Directive" );
		console.log( changeDetectorRef );
		console.log( providerTest );
		console.groupEnd();

	}

}
