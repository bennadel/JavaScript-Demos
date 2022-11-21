
/**
* I DO NOT KNOW ANYTHING ABOUT THE ANGULAR APPLICATION. I am just a class that renders
* some stuff to the given DOM Element when told to do some things. I don't know who or
* what tells me to do those things. I have complete freedom to be me!
*/
export class Messenger {

	private element: HTMLElement;

	/**
	* I initialize the messenger for the given DOM element.
	*/
	constructor( element: HTMLElement ) {

		this.element = element;
		this.element.style.display = "block";
		this.element.addEventListener( "mouseenter", this.handleMouseenter );
		this.element.addEventListener( "mouseleave", this.handleMouseleave );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I update the rendered message using the given name.
	*/
	public renderMessage( name: string ) : void {

		this.element.textContent = `Hello ${ name }, how goes it?`;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I update the rendering of the message on mouse-enter.
	*/
	private handleMouseenter = ( event: MouseEvent ) : void => {

		this.element.style.fontWeight = "bolder";
		this.element.style.backgroundColor = "yellow";

	}


	/**
	* I update the rendering of the message on mouse-leave.
	*/
	private handleMouseleave = ( event: MouseEvent ) : void => {

		this.element.style.fontWeight = "normal";
		this.element.style.backgroundColor = "transparent";

	}

}
