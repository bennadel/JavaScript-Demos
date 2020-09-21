
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// Import the application components and services.
import { Utilities } from "./utilities";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I define the minimum number of spaces that there can be on the bingo board. If an
// insufficient number of phrases are passed-in, the rest of the spaces will be padded
// with the filler phrase.
var MIN_LENGTH = 25;
var FILLER_PHRASE = "(Free Space)";

interface SelectedIndices {
	[ key: string ]: boolean;
}

@Component({
	selector: "app-bingo-board",
	inputs: [ "phrases" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./bingo-board.component.less" ],
	templateUrl: "./bingo-board.component.html"
})
export class BingoBoardComponent {

	public phrases: string[];
	public selectedIndices: SelectedIndices;
	public spaces: string[];

	// I initialize the bingo-board component.
	constructor() {

		this.phrases = [];
		this.selectedIndices = Object.create( null );
		this.spaces = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when any of the input bindings have been updated.
	public ngOnChanges() : void {

		this.selectedIndices = Object.create( null );
		this.spaces = this.selectRandomPhrases();

	}


	// I toggle the space at the given index.
	public toggleIndex( index: number ) : void {

		this.selectedIndices[ index ] = ! this.selectedIndices[ index ];

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I select a randomly-sorted assortment of phrases for the board.
	private selectRandomPhrases() : string[] {

		var selectedPhrases = this.phrases.slice();

		while ( selectedPhrases.length < MIN_LENGTH ) {

			selectedPhrases.push( FILLER_PHRASE );

		}

		return( Utilities.arrayShuffle( selectedPhrases ).slice( 0, MIN_LENGTH ) );

	}

}
