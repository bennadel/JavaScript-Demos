document.addEventListener(
	"alpine:init",
	function setupAlpineBindings() {

		Alpine.directive( "meta-enter", MetaEnterDirective );

	}
);

function MetaEnterDirective( element, metadata, framework ) {

	init();

	// ---
	// PUBLIC METHODS.
	// ---

	function init() {

		framework.cleanup( destroy );
		element.addEventListener( "keydown", handleKeydown );

	}

	function destroy() {

		element.removeEventListener( "keydown", handleKeydown );

	}

	function handleKeydown( event ) {

		if (
			( event.key === "Enter" ) &&
			( event.metaKey || event.ctrlKey )
			) {

			event.preventDefault();
			// Evaluate the expression "submitEntry( $refs.submitButton )" in the
			// context of the DOM, which will evaluate it in the context of the
			// current x-data binding (ie, the FormController).
			framework.evaluate( metadata.expression );

		}

	}

}