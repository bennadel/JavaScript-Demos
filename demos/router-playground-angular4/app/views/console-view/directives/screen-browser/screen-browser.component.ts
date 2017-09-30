
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface FilteredScreen {
	item: Screen;
	tags: string[];
	column: number;
	isVisible: boolean;
}

interface Screen {
	id: number;
	name: string;
	filename: string;
}

@Component({
	selector: "screen-browser",
	inputs: [ "screens", "selectedScreen" ],
	outputs: [
		"closeEvent: close",
		"selectScreenEvent: selectScreen"
	],
	host: {
		"(window: keydown.Escape)": "close()"
	},
	styleUrls: [ "./screen-browser.component.less" ],
	templateUrl: "./screen-browser.component.htm"
})
export class ScreenBrowserComponent implements OnChanges {

	public closeEvent: EventEmitter<void>;
	public filteredScreens: FilteredScreen[];
	public filterText: string;
	public filterTextHasFocus: boolean;
	public screens: Screen[];
	public selectedScreen: Screen;
	public selectScreenEvent: EventEmitter<Screen>;

	// I initialize the screen-browser component.
	constructor() {

		this.closeEvent = new EventEmitter();
		this.filterText = "";
		this.filterTextHasFocus = false; // This is updated in the HTML itself (easier).
		this.filteredScreens = [];
		this.screens = [];
		this.selectedScreen = null;
		this.selectScreenEvent = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public close() : void {

		this.closeEvent.emit();

	}


	// I navigate to the first item in the filtered list.
	public handleEnter() : void {

		var filteredScreen = this.filteredScreens.find(
			( filteredScreen: FilteredScreen ) : boolean => {

				return( filteredScreen.isVisible );

			}
		);

		if ( filteredScreen ) {

			this.selectScreen( filteredScreen.item );

		}

	}


	public handleFilter() : void {

		var normalizedFilter = this.filterText.trim().toLowerCase();
		var visibleIndex = 0;

		this.filteredScreens.forEach(
			( filteredScreen: FilteredScreen, i: number ) : void => {

				filteredScreen.isVisible = false;

				if ( this.containsSubstring( filteredScreen.tags, normalizedFilter ) ) {

					filteredScreen.column = ( ( visibleIndex++ % 4 ) + 1 );
					filteredScreen.isVisible = true;

				}

			}
		);

	}


	public ngOnChanges( changes: SimpleChanges ) : void {

		this.filteredScreens = this.screens.map(
			( screen, index ) : FilteredScreen => {

				return({
					item: screen,
					tags: [
						screen.name.toLowerCase(),
						screen.filename.toLowerCase()
					],
					column: ( ( index % 4 ) + 1 ),
					isVisible: true
				});

			}
		);

	}


	public selectScreen( screen: Screen ) : void {

		this.selectScreenEvent.emit( screen );

	}

	// ---
	// PRIVATE METHODS.
	// ---

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
