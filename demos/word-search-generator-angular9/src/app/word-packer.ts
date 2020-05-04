
export type LetterGrid = string[][];

interface Direction {
	rowIncrement: number;
	columnIncrement: number;
}

var EMPTY_LETTER = "";

// I pack words into a two-dimension letter-grid, randomizing the location and the
// orientation of the characters that compose the packed words.
export class WordPacker {

	private directions: Direction[];
	private letterGrid: LetterGrid;
	private height: number;
	private skippedWords: string[];
	private width: number;
	private words: string[];

	// I initialize the word packer with the given grid dimensions.
	constructor( width: number, height: number ) {

		this.width = width;
		this.height = height;
		this.words = [];
		this.skippedWords = [];

		this.letterGrid = this.initializeLetterGrid();

		// As we try to add words to the underlying letter-grid, we're going to try and
		// apply them in different directions. The following collection represents the
		// ROW and COLUMN increments for each direction that we are going to try.
		this.directions = [
			{ // North.
				rowIncrement: -1,
				columnIncrement: 0
			},
			{ // North-East.
				rowIncrement: -1,
				columnIncrement: 1
			},
			{ // East.
				rowIncrement: 0,
				columnIncrement: 1
			},
			{ // South-East.
				rowIncrement: 1,
				columnIncrement: 1
			},
			{ // South.
				rowIncrement: 1,
				columnIncrement: 0
			},
			{ // South-West.
				rowIncrement: 1,
				columnIncrement: -1
			},
			{ // West.
				rowIncrement: 0,
				columnIncrement: -1
			},
			{ // North-West.
				rowIncrement: -1,
				columnIncrement: -1
			}
		];

	}

	// ---
	// STATIC METHODS.
	// ---

	// I create a WordPacker for the given words using a grid with the given dimensions.
	// Returns the populated WordPacker instance.
	static createWordPacker(
		words: string[],
		width: number,
		height: number
		) : WordPacker {

		var packer = new WordPacker( width, height );

		// Sort the words with the longest values first. This will increase the chances
		// of us being able to add more words to the grid (since smaller words can act
		// more easily as "filler words", packing in the empty spaces).
		var sortedWords = words.slice().sort(
			( a, b ) => {

				return( b.length - a.length );

			}
		);

		for ( var word of sortedWords ) {

			packer.addWord( word );

		}

		// Fill in the rest of the empty spaces with random words.
		packer.finalize();

		return( packer );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add the given word to the packer. Returns a boolean indicating whether or not
	// the given word could be packed into the two-dimensional letter-grid.
	public addWord( word: string ) : boolean {

		var normalizedWord = word.toUpperCase();

		// If the given word can be wholly subsumed by one of the words that's already
		// been packed into the letter-grid, it should be skipped since including it
		// would lead to a confusing user experience (UX).
		if ( this.wordOverlapsCompletely( normalizedWord ) ) {

			console.warn( `Skipping [${ word }] because it overlaps completely with another word that's already been packed.` );

			this.skippedWords.push( word );
			return( false );

		}

		if ( this.tryToAddWord( normalizedWord ) ) {

			this.words.push( word );
			return( true );

		} else {

			console.warn( `Skipping [${ word }] because it could not fit into the current letter-grid.` );

			this.skippedWords.push( word );
			return( false );

		}

	}


	// I finalize the two-dimensional letter-grid, filling-in any remaining spaces with
	// random letters (A-Z).
	public finalize() : void {

		for ( var rowIndex = 0 ; rowIndex < this.height ; rowIndex++ ) {
			for ( var columnIndex = 0 ; columnIndex < this.width ; columnIndex++ ) {

				// If this grid-location is filled-in, move onto the next location.
				if ( this.letterGrid[ rowIndex ][ columnIndex ] ) {

					continue;

				}

				this.letterGrid[ rowIndex ][ columnIndex ] = this.randLetter();

			}
		}

	}


	// I return the two-dimensional letter-grid.
	public getLetterGrid() : LetterGrid {

		// In order to prevent our internal data-model from leaking out in a mutable
		// fashion (ie, such that our internal structure could be mutated by an external
		// context), we need to return a DEEP COPY of the letter grid.
		return( this.letterGrid.map( row => row.slice() ) );

	}


	// I return the words that could not be packed into the letter-grid.
	public getSkippedWords() : string[] {

		return( this.skippedWords.slice() );

	}


	// I return the words that were packed into the letter-grid.
	public getWords() : string[] {

		return( this.words.slice() );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I create an empty letter-grid for the current letter-packer.
	private initializeLetterGrid() : LetterGrid {

		var row: string[] = new Array( this.width )
			.fill( EMPTY_LETTER )
		;

		// The empty grid will use a row-first orientation (since this is easier to
		// render in the HTML markup).
		var emptyGrid = new Array( this.height )
			.fill( EMPTY_LETTER )
			.map(
				() => {

					return( row.slice() );

				}
			)
		;

		return( emptyGrid );

	}


	// I return a random letter between A-Z.
	private randLetter() : string {

		// The ASCII code for A-Z is 65-90. As such, we can generate a random letter by
		// picking random values in this range.
		// --
		// NOTE: We're adding +1 because the randomizer is not inclusive of the last
		// value. As such, we need to add +1 to get "Z" in the randomization.
		var valueBase = 65;
		var valueSpan = ( 90 - 65 + 1 );

		return( String.fromCharCode( valueBase + this.randRange( valueSpan ) ) );

	}


	// I return a random value between 0 (inclusive) and the given value (exclusive).
	private randRange( maxValue: number ) : number {

		return( Math.floor( Math.random() * maxValue ) );

	}


	// I shuffle the given array of values in place.
	private shuffle<T>( values: T[] ) : T[] {

		for ( var i = 0, length = values.length ; i < length ; i++ ) {

			var randomIndex = this.randRange( length );

			// Swap the values in the current index and the random index.
			var temp = values[ i ];
			values[ i ] = values[ randomIndex ];
			values[ randomIndex ] = temp;

		}

		return( values );

	}


	// I try to add the given letters in the given direction at the given location on the
	// letter-grid. Returns boolean indicating whether or not the letter-grid has been
	// updated with the letters.
	private tryToAddLettersInDirection(
		letters: string[],
		rowStart: number,
		columnStart: number,
		direction: Direction
		) : boolean {

		var rowIndex = rowStart;
		var columnIndex = columnStart;

		// Before we mutate the letter-grid, let's see if the collection of letters will
		// fit on the letter-grid using the given direction.
		for ( var letter of letters ) {

			// If the current location has gone off the grid, we've run out of room for
			// the letters in the given direction.
			if (
				( rowIndex < 0 ) ||
				( rowIndex >= this.height ) ||
				( columnIndex < 0 ) ||
				( columnIndex >= this.width )
				) {

				return( false );

			}

			// If the current location is already populated with a non-matching letter,
			// we've overlapped with an incompatible word.
			if (
				( this.letterGrid[ rowIndex ][ columnIndex ] !== EMPTY_LETTER ) &&
				( this.letterGrid[ rowIndex ][ columnIndex ] !== letter )
				) {

				return( false );

			}

			rowIndex += direction.rowIncrement;
			columnIndex += direction.columnIncrement;

		}

		// ASSERT: At this point, if we've made it this far, it means that all of the
		// letters will fit into the letter-grid using the given direction. At this
		// point, we can move ahead with applying the letters, MUTATING the letter-grid.
		// Move back to the starting location and add each letter in turn.
		rowIndex = rowStart;
		columnIndex = columnStart;

		for ( var letter of letters ) {

			this.letterGrid[ rowIndex ][ columnIndex ] = letter;

			rowIndex += direction.rowIncrement;
			columnIndex += direction.columnIncrement;

		}

		return( true );

	}


	// I try to add the given word to letter-grid. Returns a boolean indicating whether
	// or not the letter-grid has been updated with the given word.
	private tryToAddWord( word: string ) : boolean {

		var letters = word.split( "" );

		// To reduce the chances that every word is added in the same direction, we're
		// going to randomize the order of the directions that we're going try for this
		// word at the various locations on the letter-grid.
		this.shuffle( this.directions );

		// Randomly select the starting location on the letter-grid. From there, we will
		// begin a linear scan of the grid, looking for a fitting location for the
		// letters in the word.
		var rowIndex = this.randRange( this.height );
		var columnIndex = this.randRange( this.width );

		// Performing a liner scan on a two-dimensional grid is a little tricky as we
		// have to wrap the scan across rows and columns. We know that the MAX NUMBER of
		// locations is equal to the TOTAL AREA of the grid.
		var maxAttempts = ( this.width * this.height );

		for ( var attempt = 0 ; attempt < maxAttempts ; attempt++ ) {

			// At each grid-location, we're going to try fitting the word in every
			// direction, taking the first one that matches.
			for ( var direction of this.directions ) {

				if ( this.tryToAddLettersInDirection( letters, rowIndex, columnIndex, direction ) ) {

					return( true );

				}

			}

			// If the current grid location didn't have room for the letters, we have to
			// move onto the next "linear" location, performing a column-first scan.
			// --
			// CAUTION: Using PRE-INCREMENT operations here in order to increment the
			// indices BEFORE consuming them in the equality-comparison.
			if ( ++columnIndex === this.width ) {

				columnIndex = 0;

				if ( ++rowIndex === this.height ) {

					rowIndex = 0;

				}

			}

		}

		// If we made it this far, the word could not fit into any of the scanned
		// locations on the letter-grid.
		return( false );

	}


	// I determine if the given word can be subsumed by (or can subsume) one of the words
	// that's already been packed into the letter-grid (ex, "happy" can be wholly subsumed
	// by "unhappy"). We can't allow for fully-overlapping words as it would be confusing
	// for the consumer of the letter-grid.
	private wordOverlapsCompletely( word: string ) : boolean {

		// Get Upper-Case versions of our operands so that we don't have to worry about
		// differences in case.
		var normalizedWord = word.toUpperCase();
		var normaliezdPackedWords = this.words.map(
			( packedWord ) => {

				return( packedWord.toUpperCase() );

			}
		);

		for ( var normalizedPackedWord of normaliezdPackedWords ) {

			if (
				normalizedPackedWord.includes( normalizedWord ) ||
				normalizedWord.includes( normalizedPackedWord )
				) {

				return( true );

			}

		}

		return( false );

	}

}
