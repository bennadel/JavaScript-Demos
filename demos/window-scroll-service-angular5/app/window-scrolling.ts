
export class WindowScrolling {

	private styleTag: HTMLStyleElement;
	
	// I initialize the window-scrolling service.
	// --
	// CAUTION: This service makes direct references to the global DOCUMENT object. 
	// Theoretically, the Renderer2 service should be able to provide an API that would
	// allow me to side-step direct DOM-references. However, the Renderer2 service cannot
	// be injected directly into another Service - only into a Directive. As such, I'm 
	// just dropping all the pretenses and I'm using the document directly.
	constructor() {

		// Rather than directly overwriting the style of the BODY tag (which is dicey),
		// we're going to inject a STYLE element that overrides the scroll behavior. This
		// way we can add and remove the style in order to toggle the behavior.
		this.styleTag = this.buildStyleElement();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I disable the scrolling feature on the main viewport.
	public disable() : void {

		document.body.appendChild( this.styleTag );

	}


	// I re-enable the scrolling feature on the main viewport. 
	public enable() : void {

		document.body.removeChild( this.styleTag );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I build and return a Style element that will prevent scrolling on the body.
	private buildStyleElement() : HTMLStyleElement {

		var style = document.createElement( "style" );

		style.type = "text/css";
		style.setAttribute( "data-debug", "Injected by WindowScrolling service." );
		style.textContent = `
			body {
				overflow: hidden !important ;
			}
		`;

		return( style );

	}

}
