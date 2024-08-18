
// Import vendor modules.
import { afterNextRender } from "@angular/core";
import { inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Injector } from "@angular/core";
import { runInInjectionContext } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Destroyables {
	[ key: string ]: VoidFunction;
}

@Injectable()
export class ViewHelper {

	private destroyables: Destroyables = Object.create( null );
	// This is the injector associated with the host component.
	private injector = inject( Injector );

	/**
	* I handle the service construction.
	*/
	constructor() {

		console.log( "View Helper Construction." );

	}

	// ---
	// LIFE-CYCLE METHODS.
	// ---

	/**
	* I get called once when this SERVICE is being destroyed; which, in this case, since
	* the service is being provided as a view-specific injectable, is when the associated
	* component (and its injector) are being destroyed. This gives us a chance to clean-up
	* and view-specific helpers.
	*/
	public ngOnDestroy() {

		console.group( "View Helper Destruction." );

		for ( var [ name, destroy ] of Object.entries( this.destroyables ) ) {

			console.log( name );
			destroy();

		}

		console.groupEnd();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I clear and then set the timer with the given name.
	*/
	public resetTimeout(
		name: string,
		operator: Function,
		delay: number
		) : VoidFunction {

		this.destroyables[ name ]?.call( null );

		var timeoutID = setTimeout( operator, delay );

		// Store the callback to clear this timer in ngOnDestroy().
		return this.destroyables[ name ] = () => {

			clearTimeout( timeoutID );

		};

	}


	/**
	* I run the given callback after the next view-model reconciliation.
	*/
	public tick( callback: VoidFunction ) : VoidFunction {

		var afterRenderRef = runInInjectionContext(
			this.injector,
			() => {

				return afterNextRender( callback );

			}
		);

		// Store the callback to clear this render-timer in ngOnDestroy().
		return this.destroyables[ "tick:afterRenderRef" ] = () => {

			afterRenderRef.destroy();

		};

	}

}
