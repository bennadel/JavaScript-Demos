
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { Expando } from "./expando";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Callback {
	(): void;
}

interface CallbackIndex {
	[key: number]: Callback;
}

@Injectable({
	providedIn: "root"
})
export class ViewportIntersectionService {
	
	private callbackIndex: CallbackIndex;
	private expando: Expando;
	private observer: IntersectionObserver | null;

	// I initialize the viewport intersection service.
	constructor( expando: Expando ) {

		this.callbackIndex = Object.create( null );
		this.expando = expando;
		this.observer = null;

		// If the IntersectionObserver API is available in this browser (is not supported
		// in IE11), then let's instantiate a single instance of it that we will use
		// across the entire application.
		if ( window.IntersectionObserver ) {

			// CAUTION: The IntersectionObserver appears to be wired-up inside the
			// Angular NgZone. Which means, when the intersection callbacks get fired, a
			// change-detection is triggered. This is likely unnecessary processing. I
			// tried to get this hooked-up OUTSIDE the NgZone; but, I couldn't seem to
			// get it working.
			this.observer = new IntersectionObserver(
				( entries ) => {

					this.handleEntries( entries );

				}
			);

		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I track the given element for intersection with the browser's viewport. The
	// callback is invoked the FIRST TIME the element intersects with the viewport. The
	// callback is ONLY INVOKED ONCE and the target is automatically removed from the
	// service afterwards.
	public addTarget( target: Element, callback: Callback ) : void {

		// If the IntersectionObserver API isn't supported, invoke the callback
		// immediately so that we don't have to track the callback internally.
		if ( ! this.observer ) {

			this.safelyInvokeCallback( callback );
			return;

		}

		this.setCallback( target, callback );
		this.observer.observe( target );

	}


	// I remove the given target from the service tracking. 
	public removeTarget( target: Element ) : void {

		// If the IntersectionObserver API isn't supported, there's nothing to do
		// since we aren't tracking any of the callbacks internally.
		if ( ! this.observer ) {

			return;

		}

		this.unsetCallback( target );
		this.observer.unobserve( target );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle changes to the viewport-element intersections.
	private handleEntries( entries: IntersectionObserverEntry[] ) : void {

		// NOTE: This check isn't necessary - this method will never get called if the
		// IntersectionObserver API isn't available. However, I'm including it here so
		// that TypeScript doesn't complain below. I could have used the "definitely 
		// defined assertion"; but, the other methods have this check, so I'm just
		// throwing it in here for consistency.
		if ( ! this.observer ) {

			return;

		}

		for ( var i = 0, length = entries.length ; i < length ; i++ ) {

			var entry = entries[ i ];
			var target = entry.target;

			// The moment that the target element overlaps with the viewport, we are
			// going to invoke the callback and remove the target from the service. This
			// way, each element should only be handled ONCE in its life-time.
			if ( entry.isIntersecting ) {

				this.safelyInvokeCallback( this.unsetCallback( target ) );
				this.observer.unobserve( target );

			}

		}

	}


	// I invoke the given callback, safely logging any errors.
	private safelyInvokeCallback( callback: Callback ) : void {

		try {

			callback();

		} catch ( error ) {

			// TODO: This should really be handled via an injected Logger. But, for the
			// sake of simplicity, I'm just using the browser's native logger.
			console.error( error );

		}

	}


	// I map the callback to the given target element, and store the callback for later
	// execution (once the element enters the viewport).
	private setCallback( target: Element, callback: Callback ) : void {

		// The Expando service injects a unique ID into the Element / DOM which we can
		// then use as the unique look-up in our callback index.
		var expandoID = this.expando.add( target );

		this.callbackIndex[ expandoID ] = callback;

	}


	// I break the association between the given target element and the cached callback,
	// returning the cached callback to the calling context.
	private unsetCallback( target: Element ) : Callback {

		// Remember, the Expando service injected a unique ID into the DOM. When we ask
		// the Expando service to remove that injected ID, it returns it. We can now use
		// that ID to look-up the cached callback.
		var expandoID = this.expando.remove( target );

		var callback = this.callbackIndex[ expandoID ];
		delete( this.callbackIndex[ expandoID ] );

		return( callback );

	}

}
