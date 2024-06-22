
/**
* I return a random float between 0 (inclusive) and 1 (exclusive) using the Math module.
*/
function randFloatWithMath() {

	return Math.random();

}

/**
* I return a random float between 0 (inclusive) and 1 (exclusive) using the Crypto module.
*/
function randFloatWithCrypto() {

	// This method works by filling the given array with random values of the given type.
	// In our case, we only need one random value, so we're going to pass in an array of
	// length 1.
	// --
	// Note: For better performance, we could cache the typed array and just keep passing
	// the same reference in (cuts performance in half). But, we're exploring the
	// randomness, not the performance.
	var [ randomInt ] = crypto.getRandomValues( new Uint32Array( 1 ) );
	var maxInt = 4294967295;

	// Unlike Math.random(), crypto is giving us an integer. To feed this back into the
	// same kind of math equation, we have to convert the integer into decimal so that we
	// can figure out where in our range our randomness leads us.
	return ( randomInt / ( maxInt + 1 ) );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

function Explore( algorithm ) {

	// Each instance of this Alpine.js component is assigned a different randomization
	// strategy for floats (0..1). Other than that, the component instances behave exactly
	// the same.
	var randFloat = ( algorithm === "math" )
		? randFloatWithMath
		: randFloatWithCrypto
	;

	return {
		duration: 0,
		// Public methods.
		init: init,
		// Private methods.
		fillCanvas: fillCanvas,
		fillList: fillList,
		randRange: randRange
	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I initialize the Alpine.js component.
	*/
	function init() {

		var startedAt = Date.now();

		this.fillCanvas();
		this.fillList();

		this.duration = ( Date.now() - startedAt );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I populate the canvas with random {X,Y} pixels.
	*/
	function fillCanvas() {

		var pixelCount = 200000;
		var canvas = this.$refs.canvas;
		var width = canvas.width;
		var height = canvas.height;

		var context = canvas.getContext( "2d" );
		context.fillStyle = "deeppink";

		for ( var i = 0 ; i < pixelCount ; i++ ) {

			var x = this.randRange( 0, width );
			var y = this.randRange( 0, height );

			// As we add more pixels, let's make the pixel colors increasingly opaque. I
			// was hoping that this might help show potential clustering of values.
			context.globalAlpha = ( i / pixelCount );
			context.fillRect( x, y, 1, 1 );

		}

	}

	/**
	* I populate the list with random 0-9 values.
	*/
	function fillList() {

		var list = this.$refs.list;
		var valueCount = 105;
		var values = [];

		for ( var i = 0 ; i < valueCount ; i++ ) {

			values.push( this.randRange( 0, 9 ) );

		}

		list.textContent = values.join( " " );

	}

	/**
	* I generate a random integer in between the given min and max, inclusive.
	*/
	function randRange( min, max ) {

		return ( min + Math.floor( randFloat() * ( max - min + 1 ) ) );

	}

}
