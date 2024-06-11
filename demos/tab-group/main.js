
function tabGroup() {

	var host = this.$el;

	// Return the public API of the component scope.
	return {
		moveTabIndexToButton: moveTabIndexToButton,
		moveToNextButton: moveToNextButton,
		moveToPrevButton: moveToPrevButton
	};

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I move the active tabIndex (0) to the target button. This way, when the user clicks
	* a button, this becomes the button that can also be activated via the Tab key.
	*/
	function moveTabIndexToButton( event ) {

		var targetButton = event.target.closest( "button" );

		// Since we're using event-delegation on the host, it's possible that the click
		// event isn't targeting a button. In that case, ignore the event.
		if ( ! targetButton ) {

			return;

		}

		for ( var button of getAllButtons() ) {

			button.tabIndex = -1;

		}

		targetButton.tabIndex = 0;

	}

	/**
	* I move the focus and active tabIndex (0) to the next button in the set of buttons
	* contained within the host element.
	*/
	function moveToNextButton( event ) {

		// Prevent any default browser behaviors (such as scrolling the viewport).
		event.preventDefault();

		// Note: Technically, we're using event-delegation for the arrow keys. However,
		// since no other elements (other than our demo buttons) can be focused within the
		// host element, we can be confident that this was triggered by a button.
		var targetButton = event.target.closest( "button" );
		var allButtons = getAllButtons();
		var currentIndex = allButtons.indexOf( targetButton );
		// Get the NEXT button; or, loop around to the front of the collection.
		var futureButton = (
			allButtons[ currentIndex + 1 ] ||
			allButtons[ 0 ]
		);

		targetButton.tabIndex = -1;
		futureButton.tabIndex = 0;
		futureButton.focus();

	}

	/**
	* I move the focus and active tabIndex (0) to the previous button in the set of
	* buttons contained within the host element.
	*/
	function moveToPrevButton( event ) {

		// Prevent any default browser behaviors (such as scrolling the viewport).
		event.preventDefault();

		// Note: Technically, we're using event-delegation for the arrow keys. However,
		// since no other elements (other than our demo buttons) can be focused within the
		// host element, we can be confident that this was triggered by a button.
		var targetButton = event.target.closest( "button" );
		var allButtons = getAllButtons();
		var currentIndex = allButtons.indexOf( targetButton );
		// Get the PREVIOUS button; or, loop around to the back of the collection.
		var futureButton = (
			allButtons[ currentIndex - 1 ] ||
			allButtons[ allButtons.length - 1 ]
		);

		targetButton.tabIndex = -1;
		futureButton.tabIndex = 0;
		futureButton.focus();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I get all the buttons in the host element (as a proper array).
	*/
	function getAllButtons() {

		return Array.from( host.querySelectorAll( "button" ) );

	}

}
