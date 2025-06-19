function Demo() {

	var grid = this.$el;

	return {
		init: $init,

		palette: palette,
		swatch: palette.swatches[ 5 ],
		canvasWidth: 24,
		canvasHeight: 24,
		isDrawing: false,

		fill,
		clear,
		setSwatch,
		startDrawing,
		stopDrawing,
		enterPixel,
		pullLeft,
		pullRight,
		pullUp,
		pullDown,

		fillPixel,
		clearPixel,
		getPixels,
		getColoredPixels,
		decodeCanvasFromHash,
		encodeCanvasInHash
	};

	function $init() {

		if ( location.hash.slice( 1 ).length ) {

			setTimeout(
				() => {
					this.decodeCanvasFromHash();
				},
				100
			);

		}

		window.addEventListener(
			"hashchange",
			() => {
				this.decodeCanvasFromHash();

			}
		);

	}

	function getPixels() {

		return this.$refs.grid.querySelectorAll( ".grid-pixel" );

	}

	function getColoredPixels() {

		return this.$refs.grid.querySelectorAll( ".grid-pixel[data-key]" );

	}

	function fill( swatch = this.swatch ) {

		for ( var node of this.getPixels() ) {

			this.fillPixel( node );

		}

		this.encodeCanvasInHash();

	}

	function fillPixel( node, swatch = this.swatch ) {

		node.style.backgroundColor = swatch.hex;
		node.dataset.key = swatch.key;

	}

	function clear() {

		for ( var node of this.getColoredPixels() ) {

			clearPixel( node );

		}

		this.encodeCanvasInHash();

	}

	function clearPixel( node ) {

		node.style = "";
		delete node.dataset.key;

	}


	function setSwatch( swatch ) {

		this.swatch = swatch;

	}

	function startDrawing( event ) {

		this.isDrawing = true;
		this.enterPixel( event );

	}

	function stopDrawing() {

		this.isDrawing = false;
		this.encodeCanvasInHash();

	}

	function enterPixel( event ) {

		if ( ! this.isDrawing ) {

			return;

		}

		if ( event.altKey ) {

			this.clearPixel( this.$el );

		} else {

			this.fillPixel( this.$el );

		}

	}

	function pullLeft() {

	}

	function pullRight() {

	}

	function pullUp() {

	}

	function pullDown() {

	}


	function decodeCanvasFromHash() {

		for ( var node of this.getPixels() ) {

			this.clearPixel( node );

		}

		var hash = location.hash.slice( 1 );
		var pixels = pixelsFromBase64( hash );
		var grid = this.$refs.grid;

		for ( var pixel of pixels ) {

			var node = grid.querySelector( `[data-x="${ pixel.x }"][data-y="${ pixel.y }"]` );

			this.fillPixel( node, palette.byKey[ pixel.key ] );

		}

	}

	function encodeCanvasInHash() {

		var pixels = Array
			.from( this.$refs.grid.querySelectorAll( "[data-key]" ) )
			.map(
				( node ) => {

					return {
						key: +node.dataset.key,
						x: +node.dataset.x,
						y: +node.dataset.y
					};

				}
			)
		;

		var nextHash = `#${ pixelsToBase64( pixels ) }`;

		if ( nextHash === location.hash ) {

			return;

		}

		history.pushState( null, null, nextHash );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* 
*/
function pixelsToBase64( pixelsArray ) {

	var bytes = new Uint8Array( pixelsArray.length * 3 );
	var i = 0;

	for ( var pixel of pixelsArray ) {

		bytes[ i++ ] = pixel.key;
		bytes[ i++ ] = pixel.x;
		bytes[ i++ ] = pixel.y;

	}

	return btoa( String.fromCharCode( ...bytes ) );

}

function pixelsFromBase64( pixelsString ) {

	var bytes = Uint8Array.from(
		atob( pixelsString ),
		( byte ) => {

			return byte.charCodeAt( 0 );

		}
	);
	var pixels = [];
	var i = 0;

	while ( i < bytes.length ) {

		pixels.push({
			key: bytes[ i++ ],
			x: bytes[ i++ ],
			y: bytes[ i++ ]
		});

	}

	return pixels;

}
