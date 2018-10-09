
var WINDOW_SELECTOR = "__window__";
var NG_ENCAPSULATION_PATTERN = /^_ng(host|content)\b/i;

export type Target = Window | Element;

// I provide a unified interface for dealing with scroll offsets across different types
// of targets (elements vs. windows).
export class DomUtils {

	// I determine if the target at the given selector exists in the active DOM.
	public exists( selector: string ) : boolean {

		return( !! this.select( selector ) );

	}


	// I get the scroll-top of the given target in the active DOM.
	public getScrollTop( target: Target ) : number {

		if ( target instanceof Window ) {

			return( window.scrollY );

		} else {

			return( target.scrollTop );

		}

	}


	// I return the CSS selector for the given target.
	// --
	// NOTE: The generated selector is intended to be consumed by this class only - 
	// it may not produce a valid CSS selector.
	public getSelector( target: Target ) : string {

		// NOTE: I am breaking this apart because TypeScript was having trouble dealing
		// with type-guard. I believe this is part of this bug:
		// --
		// https://github.com/Microsoft/TypeScript/issues/7271#issuecomment-360123191
		if ( target instanceof Window ) {

			return( WINDOW_SELECTOR );

		} else {

			return( this.getSelectorForElement( target ) );

		}

	}


	// I get the scrollable target for the given "scroll" event.
	// --
	// NOTE: If you want to ignore (ie, not reinstate the scroll) of a particular type
	// of DOM element, return NULL from this method.
	public getTargetFromScrollEvent( event: Event ) : Target | null {

		var node = event.target;

		if ( node instanceof HTMLDocument ) {

			return( window );

		} else if ( node instanceof Element ) {

			return( node );

		}

		return( null );

	}


	// I attempt to scroll the given target to the given scrollTop and return the 
	// resultant value presented by the target.
	public scrollTo( target: Target, scrollTop: number ) : number {

		if ( target instanceof Window ) {

			target.scrollTo( 0, scrollTop );

			return( target.scrollY );

		} else if ( target instanceof Element ) {

			target.scrollTop = scrollTop;

			return( target.scrollTop );

		}

	}


	// I return the target accessible at the given CSS selector.
	public select( selector: string ) : Target | null {

		if ( selector === WINDOW_SELECTOR ) {

			return( window );

		} else {

			return( document.querySelector( selector ) );

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I generate a CSS selector for the given target.
	private getSelectorForElement( target: Element ) : string {

		var selectors: string[] = [];

		var current = <Node>target;

		while ( current && ( current.nodeName !== "BODY" ) ) {

			var selector = current.nodeName.toLowerCase();

			for ( var attribute of Array.from( ( <Element>current ).attributes ) ) {

				if ( attribute.name.search( NG_ENCAPSULATION_PATTERN ) === 0 ) {

					selector += `[${ attribute.name }]`;

				}

			}

			selectors.unshift( selector );

			current = current.parentNode;

		}

		return( selectors.join( " > " ) );

	}


	// I check to see if the given node is the root scrollable node - meaning, the node
	// that is associated with the BODY scroll event.
	private isRootScrollableNode( node: Node ) : boolean {

		return( node instanceof HTMLDocument );

	}

}
