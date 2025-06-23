// Note: this depends on "palette" existing as an external module.
function Demo() {

	return {
		// Public properties.
		pixels: null,
		foregroundSwatch: palette.byName.LightSkyBlue,
		backgroundSwatch: palette.byName.Snow,

		// Private properties.
		canvasWidth: 0,
		canvasHeight: 0,
		isDrawing: false,
		palette: palette,

		// Life-Cycle methods.
		init,

		// Public methods.
		changeCanvasBackground,
		clearCanvas,
		enterPixel,
		handleDo,
		handleHashchange,
		pullCanvasCenter,
		pullCanvasDown,
		pullCanvasLeft,
		pullCanvasRight,
		pullCanvasUp,
		selectSwatch,
		startDrawing,
		stopDrawing,

		// Private methods.
		hashDecodeState,
		hashEncodeState,
		matrixNudge,
		matrixRead,
		matrixWrite,
		stateDecodeString,
		stateEncodeString,
	};

	// ---
	// LIFE-CYCLE METHODS.
	// ---

	/**
	* I initialize the alpine component.
	*/
	function init() {

		// Pull grid dimensions from the DOM.
		this.canvasWidth = ( +this.$el.dataset.width || 25 );
		this.canvasHeight = ( +this.$el.dataset.height || 25 );

		// Setup the pixel matrix: a linear set of pixels being rendered in two dimensions
		// within the user interface using CSS Grid.
		this.pixels = new Array( this.canvasWidth * this.canvasHeight )
			.fill( this.backgroundSwatch )
		;

		// If the current request is a link to an existing pixel configuration, pull it in
		// from the URL fragment.
		this.hashDecodeState();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I change any pixel with the current background color to be the new foreground color,
	* then use the new foreground color as the future background color. Basically, this
	* rotates the background color pixels only, leaving foreground color pixels in place.
	*/
	function changeCanvasBackground() {

		this.pixels = this.pixels.map(
			( swatch ) => {

				return ( swatch === this.backgroundSwatch )
					? this.foregroundSwatch
					: swatch
				;

			}
		);

		this.backgroundSwatch = this.foregroundSwatch;
		this.hashEncodeState();

	}


	/**
	* I completely reset the pixel matrix to use one solid color (the selected color).
	*/
	function clearCanvas() {

		this.backgroundSwatch = this.foregroundSwatch;
		this.pixels.fill( this.backgroundSwatch );
		this.hashEncodeState();

	}


	/**
	* I apply a swatch to the contextual pixel if this is a draw operation.
	*/
	function enterPixel( event, i ) {

		if ( ! this.isDrawing ) {

			return;

		}

		this.pixels[ i ] = event.altKey
			? this.backgroundSwatch
			: this.foregroundSwatch
		;

	}


	/**
	* I attempt to redo / undo a recent change using this history.
	*
	* Note: these are being handled with a single event handler since Alpine.js doesn't
	* limit key-bindings based on modifiers. As such, it's easier to just handle both
	* events in a single handler.
	*/
	function handleDo( event ) {

		// Since all pixel changes are persisted in the hash, we should be able to
		// navigate back / forward through all of the changes in the canvas. However, I'm
		// not keep track of whether or not the commands are available - I'm just blindly
		// invoke the history API and letting the hash play-out.
		event.preventDefault();

		// Redo.
		if ( event.shiftKey ) {

			history.go( 1 );

		// Undo.
		} else {

			history.go( -1 );

		}

	}


	/**
	* I handle the hash change, and push the URL data into the pixel state.
	*/
	function handleHashchange( event ) {

		this.hashDecodeState();

	}


	/**
	* I shift the foreground pixels to the center of the canvas.
	*/
	function pullCanvasCenter() {

		var MAX = 999999;
		var colMin = MAX;
		var rowMin = MAX;
		var colMax = -1;
		var rowMax = -1;
		var matrix = this.matrixRead();

		// Iterate over the pixels and try to identify the smallest bounding box around
		// the non-background swatch.
		matrix.forEach(
			( row, rowIndex ) => {

				row.forEach(
					( pixel, colIndex ) => {

						if ( pixel != this.backgroundSwatch ) {

							colMin = Math.min( colMin, colIndex );
							colMax = Math.max( colMax, colIndex );
							rowMin = Math.min( rowMin, rowIndex );
							rowMax = Math.max( rowMax, rowIndex );

						}

					}
				);

			}
		);

		// If we found no foreground pixel data, there's nothing else to do.
		if ( rowMin === MAX ) {

			return;

		}

		var boxWidth = ( colMax - colMin + 1 );
		var boxHeight = ( rowMax - rowMin + 1 );
		var deltaWidth = ( this.canvasWidth - boxWidth );
		var deltaHeight = ( this.canvasHeight - boxHeight );
		var targetX = Math.floor( deltaWidth / 2 );
		var targetY = Math.floor( deltaHeight / 2 );

		this.matrixWrite(
			this.matrixNudge(
				matrix,
				( targetX - colMin ), // Delta columns.
				( targetY - rowMin )  // Delta rows.
			)
		);
		this.hashEncodeState();

	}


	/**
	* I shift the foreground pixels down 1 row on the canvas.
	*/
	function pullCanvasDown() {

		this.matrixWrite(
			this.matrixNudge(
				this.matrixRead(),
				0, // Delta columns.
				1  // Delta rows.
			)
		);
		this.hashEncodeState();

	}


	/**
	* I shift the foreground pixels left 1 column on the canvas.
	*/
	function pullCanvasLeft() {

		this.matrixWrite(
			this.matrixNudge(
				this.matrixRead(),
				-1, // Delta columns.
				0   // Delta rows.
			)
		);
		this.hashEncodeState();

	}


	/**
	* I shift the foreground pixels up 1 row on the canvas.
	*/
	function pullCanvasUp() {

		this.matrixWrite(
			this.matrixNudge(
				this.matrixRead(),
				0, // Delta columns.
				-1 // Delta rows.
			)
		);
		this.hashEncodeState();

	}


	/**
	* I shift the foreground pixels right 1 column on the canvas.
	*/
	function pullCanvasRight() {

		this.matrixWrite(
			this.matrixNudge(
				this.matrixRead(),
				1, // Delta columns.
				0  // Delta rows.
			)
		);
		this.hashEncodeState();

	}


	/**
	* I set the given swatch as the foreground drawing color.
	*/
	function selectSwatch( swatch ) {

		this.foregroundSwatch = swatch;

	}


	/**
	* I start a drawing operation, filling in the contextual pixel.
	*/
	function startDrawing( event, i ) {

		// If the mouse event is modified, first sample the pixel for its swatch.
		if ( event.metaKey || event.ctrlKey ) {

			this.foregroundSwatch = this.pixels[ i ];

		}

		this.isDrawing = true;
		this.enterPixel( event, i );

	}


	/**
	* I stop a drawing operation and persist the current pixel state to the URL.
	*/
	function stopDrawing() {

		if ( ! this.isDrawing ) {

			return;

		}

		this.isDrawing = false;
		this.hashEncodeState();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I decode the canvas state from the URL fragment and use it to set the current pixel
	* and color state.
	*/
	function hashDecodeState() {

		var state = this.stateDecodeString( location.hash.slice( 1 ) );

		if ( ! state ) {

			return;

		}

		this.foregroundSwatch = state.foregroundSwatch;
		this.backgroundSwatch = state.backgroundSwatch;
		this.pixels = state.pixels;

	}


	/**
	* I encode the current canvas state into the URL fragment.
	*/
	function hashEncodeState() {

		history.pushState( null, null, `#${ this.stateEncodeString() }` );

	}


	/**
	* I nudge the given pixel 2D matrix by the given column and row deltas. New pixels use
	* the currently selected background swatch.
	*/
	function matrixNudge( matrix, colDelta, rowDelta ) {

		// Nudge left.
		for ( ; colDelta < 0 ; colDelta++ ) {

			for ( var row of matrix ) {

				row.shift();
				row.push( this.backgroundSwatch );

			}

		}

		// Nudge right.
		for ( ; colDelta > 0 ; colDelta-- ) {

			for ( var row of matrix ) {

				row.pop();
				row.unshift( this.backgroundSwatch );

			}

		}

		// Nudge up.
		for ( ; rowDelta < 0 ; rowDelta++ ) {

			matrix.shift();
			matrix.push( new Array( this.canvasWidth ).fill( this.backgroundSwatch ) );

		}

		// Nudge down.
		for ( ; rowDelta > 0 ; rowDelta-- ) {

			matrix.pop();
			matrix.unshift( new Array( this.canvasWidth ).fill( this.backgroundSwatch ) );

		}

		return matrix;

	}


	/**
	* I read the current linear pixel state into a 2D matrix.
	*/
	function matrixRead() {

		var matrix = [];

		for ( var i = 0 ; i < this.canvasHeight ; i++ ) {

			var rowOffset = ( i * this.canvasWidth );
			var rowEnd = ( rowOffset + this.canvasWidth );

			matrix.push( this.pixels.slice( rowOffset, rowEnd ) );

		}

		return matrix;

	}


	/**
	* I write the 2D matrix back into the current linear pixel state.
	*/
	function matrixWrite( matrix ) {

		this.pixels = matrix.flat();

	}


	/**
	* I parse the given string value back into a state object that contains the foreground
	* swatch, the background swatch, and the pixels.
	*/
	function stateDecodeString( value = "" ) {

		// Every part of the state is represented by either a single Base36 value; or, a
		// pair of Base36 values in a ":" delimited list.
		var matches = value
			.toLowerCase()
			.matchAll( /([a-z0-9]+)(:([a-z0-9]+))?/g )
			.toArray()
			.map(
				([ $0, $key, $2, $count ]) => {

					return {
						key: urlDecodeInt( $key ),
						count: urlDecodeInt( $count )
					};

				}
			)
		;

		// We know that the encoded state will be, at the very smallest, the foreground
		// swatch, the background swatch, and then a single run of a solid color.
		// Therefore, if we have less than 3 matches, the input is invalid.
		if ( matches.length < 3 ) {

			return null;

		}

		// Set up the core state object into which we will parse the input.
		var state = {
			// First two matches are always the selected swatches.
			foregroundSwatch: this.palette.byKey[ matches.shift().key ],
			backgroundSwatch: this.palette.byKey[ matches.shift().key ],
			pixels: new Array( this.pixels.length )
		};

		// Blank-out the canvas - we'll fill in pixels next.
		state.pixels.fill( state.backgroundSwatch );

		// As we iterate over the matches, we need to translate the runs into pixel
		// offsets. Will use "i" to keep track of the start offset of the next fill.
		var i = 0;

		for ( var match of matches ) {

			state.pixels.fill(
				this.palette.byKey[ match.key ],
				i,
				( i += match.count ) // Warning: incrementing AND consuming.
			);

		}

		return state;

	}


	/**
	* I encode the current pixel art state into a string representation.
	*/
	function stateEncodeString() {

		// The state will be encoded as a series of "runs". Meaning, each sequence of
		// pixels that used the same swatch will be condensed down into the swatch "key"
		// followed by the number of repeated pixels (`key`:`count`). If a swatch run is
		// only a single pixel, the count can be omitted and will be assumed to be one.
		// The first two runs implicitly represent the foreground and background swatches.
		var runs = [
			{
				key: this.foregroundSwatch.key,
				count: 1
			},
			{
				key: this.backgroundSwatch.key,
				count: 1
			}
		];
		var run = {};

		for ( var pixel of this.pixels ) {

			// Did we enter a new swatch run?
			if ( run.key !== pixel.key ) {

				run = {
					key: pixel.key,
					count: 0
				};
				runs.push( run );

			}

			run.count++;

		}

		// Map runs to a list of `key`:`count` pairs.
		return runs
			.map(
				( run ) => {

					// Single pixel runs will be assumed to be "1" during parsing. As
					// such, we can omit the count - keep the URL shorter.
					if ( run.count === 1 ) {

						return urlEncodeInt( run.key );

					}

					return `${ urlEncodeInt( run.key ) }:${ urlEncodeInt( run.count ) }`;

				}
			)
			.join( "," )
		;

	}


	/**
	* In order to create shorter URLs, we're encoding numbers using Base36. This decodes
	* the value back into an int.
	*/
	function urlDecodeInt( value = undefined ) {

		if ( value === undefined ) {

			return 1;

		}

		return parseInt( value, 36 );

	}


	/**
	* In order to create shorter URLs, we're encoding numbers using Base36. This encodes
	* the int value.
	*/
	function urlEncodeInt( value ) {

		return value.toString( 36 );

	}

}
