// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// Import the application components and services.
import { IScreen } from "~/shared/services/index";

interface IFilteredScreen {
	screen: IScreen;
	tags: string[];
	column: number;
	visible: boolean;
}

@Component({
	moduleId: __moduleName,
	selector: "bn-screen-browser",
	inputs: [ "screens", "selectedScreen" ],
	outputs: [ "screenSelect", "close" ],
	templateUrl: "./screen-browser.component.htm",
	styleUrls: [ "./screen-browser.component.css" ]
})
export class ScreenBrowserComponent implements OnChanges {

	public close: EventEmitter<void>;
	public filter: string;
	public filteredScreens: IFilteredScreen[];
	public screens: IScreen[];
	public screenSelect: EventEmitter<IScreen>;
	public selectedScreen: IScreen;

	
	// I initialize the component.
	constructor() {

		this.close = new EventEmitter<void>();
		this.filter = "";
		this.filteredScreens = [];
		this.screens = [];
		this.screenSelect = new EventEmitter<IScreen>();
		this.selectedScreen = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle the enter key on the filter - this will navigate to the first visible
	// screen in the list.
	public handleEnter() : void {

		if ( ! this.filter ) {

			return;

		}

		var firstVisible = this.filteredScreens.find(
			( filteredScreen: IFilteredScreen ) : boolean => {

				return( filteredScreen.visible );

			}
		);

		if ( firstVisible ) {

			this.selectScreen( firstVisible.screen );

		}

	}


	// I handle updates to the filter input. 
	public handleFilter() : void {

		this.applyFilter();

	}


	// I get called when the component inputs change, or are bound for the first time.
	public ngOnChanges( changes: SimpleChanges ) : void {

		if ( changes[ "screens" ] ) {

			this.filteredScreens = this.screens.map(
				( screen: IScreen ) : IFilteredScreen => {

					return({
						screen: screen,
						tags: [ screen.name.toLowerCase(), screen.filename.toLowerCase() ],
						visible: false,
						column: 0
					});

				}
			);

			this.applyFilter();

		}

	}


	// I emit the "screenSelect" event for the given screen.
	public selectScreen( screen: IScreen ) : void {

		this.screenSelect.next( screen );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I apply the current filter to the collection of filtered screens.
	private applyFilter() : void {

		var normalizedFilter = this.filter.toLowerCase();
		var visibleIndex = 0;

		this.filteredScreens.forEach(
			( filteredScreen: IFilteredScreen, i: number ) : void => {

				filteredScreen.visible = false;

				if ( this.containsSubstring( filteredScreen.tags, normalizedFilter ) ) {

					filteredScreen.column = ( ( visibleIndex++ % 4 ) + 1 );
					filteredScreen.visible = true;

				}

			}
		);

	}


	// I determine if the collection of values contains the given input as a substring.
	private containsSubstring( values: string[], input: string ) : boolean {

		for ( var value of values ) {

			if ( value.includes( input ) ) {
				
				return( true );

			}

		}

		return( false );

	}

}
