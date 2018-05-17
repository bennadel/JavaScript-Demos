
// Import the core angular services.
import { fromEvent } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type Target = Document | Element;

@Injectable({
	providedIn: "root"
})
export class ElementScrollPercentage {

	// I initialize the element scroll percentage service.
	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the current scroll percentage (0,100) of the given DOM node.
	public getScroll( node: Target = document ) : number {

		var currentScroll = this.getCurrentScroll( node );
		var maxScroll = this.getMaxScroll( node );

		// Ensure that the percentage falls strictly within (0,1).
		var percent = ( currentScroll / Math.max( maxScroll, 1 ) );
		percent = Math.max( percent, 0 );
		percent = Math.min( percent, 1 );

		// Return the percentage in a more human-consumable format.
		return( percent * 100 );

	}


	// I return the current scroll percentage (0,100) of the given DOM node as a STREAM.
	// --
	// NOTE: The resultant STREAM is a COLD stream, which means that it won't actually
	// subscribe to the underlying DOM events unless something in the calling context
	// subscribes to the COLD stream.
	public getScrollAsStream( node: Target = document ) : Observable<number> {

		if ( node instanceof Document ) {

			// When we watch the DOCUMENT, we need to pull the scroll event from the
			// WINDOW, but then check the scroll offsets of the DOCUMENT.
			var stream = fromEvent( window, "scroll" ).pipe(
				map(
					( event: UIEvent ) : number => {

						return( this.getScroll( document ) );

					}
				)
			);

		} else {

			// When we watch an ELEMENT node, we can pull the scroll event and the scroll
			// offsets from the same ELEMENT node (unlike the Document version).
			var stream = fromEvent( node, "scroll" ).pipe(
				map(
					( event: UIEvent ) : number => {

						return( this.getScroll( node ) );

					}
				)
			);

		}

		return( stream );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return the current scroll offset (in pixels) of the given DOM node.
	private getCurrentScroll( node: Target ) : number {

		if ( node instanceof Document ) {

			return( window.pageYOffset );

		} else {

			return( node.scrollTop );

		}

	}


	// I return the maximum scroll offset (in pixels) of the given DOM node.
	private getMaxScroll( node: Target ) : number {

		// When we want to get the available scroll height of the DOCUMENT, things get
		// a little peculiar from a cross-browser consistency standpoint. As such, when
		// dealing with the Document node, we have to look in a few different places.
		// --
		// READ MORE: https://javascript.info/size-and-scroll-window
		if ( node instanceof Document ) {

			var scrollHeight = Math.max(
				node.body.scrollHeight,
				node.body.offsetHeight,
				node.body.clientHeight,
				node.documentElement.scrollHeight,
				node.documentElement.offsetHeight,
				node.documentElement.clientHeight
			);

			var clientHeight = node.documentElement.clientHeight;

			return( scrollHeight - clientHeight );

		} else {

			return( node.scrollHeight - node.clientHeight );
			
		}
		
	}

}
