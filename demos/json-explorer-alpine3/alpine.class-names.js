document.addEventListener(
	"alpine:init",
	function setupAlpineBindings() {

		Alpine.directive( "cx", ClassNamesDirective );

	}
);

function ClassNamesDirective( element, metadata, framework ) {

	// The value is the token that comes after the ":" in the markup. For example,
	// in the attribute "x-cx:foo", the value is "foo". This holds the class name
	// that we want add / remove in the DOM.
	var className = metadata.value;

	// In order to respond to changes in the state over time, we have to create a
	// reactive expression that will be called when its dependencies change. In
	// order to avoid re-compiling the expression over and over, let's compile it
	// once as a getter that we can call later.
	var getState = framework.evaluateLater( metadata.expression );

	// Then, we can define a callback to be invoked immediately; and then
	// subsequently whenever the attribute expression changes.
	framework.effect( handleEffect );

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I get called once when the expression is compiled and then subsequently
	* whenever the expression changes.
	*/
	function handleEffect() {

		getState( applyState );

	}

	/**
	* I apply the evaluated expression state to the current element.
	*/
	function applyState( isTruthy ) {

		if ( isTruthy ) {

			element.classList.add( className );

		} else {

			element.classList.remove( className );

		}

	}

}