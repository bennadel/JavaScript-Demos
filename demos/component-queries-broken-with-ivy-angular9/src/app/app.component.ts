
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	queries: {
		divRefOne: new ViewChild( "divRef" )
	},
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div #divRef>
			As you wish.....
		</div>
	`
})
export class AppComponent {

	// Injected via @Component.queries.
	public divRefOne!: ElementRef;

	@ViewChild( "divRef" )
	public divRefTwo!: ElementRef;

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after view bindings have been initialized.
	public ngAfterViewInit() : void {

		console.group( "DivRefOne : @Component( .queries )" );
		console.log( this.divRefOne );
		console.groupEnd();

		console.group( "DivRefTwo : @ViewChild()" );
		console.log( this.divRefTwo );
		console.groupEnd();

	}

}
