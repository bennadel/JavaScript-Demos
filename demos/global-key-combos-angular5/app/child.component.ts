
// Import the core angular services.
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { Unlisten } from "./keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-child",
	styleUrls: [ "./child.component.less" ],
	template:
	`
		Use <code>Command+F</code> to show search.
		
		<ng-template [ngIf]="isShowingSearch">
			<br /><br />
			<strong>Search:</strong>
			<input type="text" placeholder="Search...." size="30" autofocus />
		</ng-template>
	`
})
export class ChildComponent implements OnInit, OnDestroy {

	public isShowingSearch: boolean;

	private keyboardShortcuts: KeyboardShortcuts;
	private unlisten: Unlisten;

	// I initialize the child component.
	constructor( keyboardShortcuts: KeyboardShortcuts ) {

		this.keyboardShortcuts = keyboardShortcuts;

		this.isShowingSearch = false;
		this.unlisten = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		( this.unlisten ) && this.unlisten();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.unlisten = this.keyboardShortcuts.listen(
			{
				"Command.F": ( event: KeyboardEvent ) : void => {

					console.log( "Handler[ 100 ]: Command.F" );
					this.isShowingSearch = true;

					// Since this is a native browser action, we want to cancel the 
					// default behavior and isolate it as a local action.
					event.preventDefault();

				}
			},
			{
				priority: 100, // NOTE: AppComponent was priority "0".

				// By default, this keyboard listener is going to be Terminal. However,
				// we know that something higher-up in the component tree will be 
				// listening for the Escape to close this view. As such, we'll let the
				// Escape key bubble-down through to a lower priority listener.
				terminalWhitelist: [ "Escape" ]
			}
		);

	}

}
