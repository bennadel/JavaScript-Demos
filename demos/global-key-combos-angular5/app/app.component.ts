
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
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Use <code>Command+F</code> to open the child view.
			Use <code>Esc</code> to close the child view.
		</p>

		<my-child *ngIf="isShowingChildView"></my-child>
		
		<p>
			<strong>Note</strong>: The key-commands do not work when the child Input
			is focused. This is because the default setting is to ignore events that
			originate from a form element.
		</p>
	`
})
export class AppComponent implements OnInit, OnDestroy {

	public isShowingChildView: boolean;

	private keyboardShortcuts: KeyboardShortcuts;
	private unlisten: Unlisten;

	// I initialize the app component.
	constructor( keyboardShortcuts: KeyboardShortcuts ) {

		this.keyboardShortcuts = keyboardShortcuts;

		this.isShowingChildView = false;
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

					console.log( "Handler[ 0 ]: Command.F" );
					this.isShowingChildView = true;

					// Since this is a native browser action, we want to cancel the 
					// default behavior and isolate it as a local action.
					event.preventDefault();

				},
				"Escape": ( event: KeyboardEvent ) : void => {

					console.log( "Handler[ 0 ]: Escape" );
					this.isShowingChildView = false;

				}
			},
			{
				priority: 0
			}
		);

	}

}
