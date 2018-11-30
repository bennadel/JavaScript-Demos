
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div (click)="handleContainer( $event )">
			
			<div class="child">
				Use nothing.
			</div>
			
			<div
				(click)="handleChild( $event, false )"
				(click)="handleSibling( $event )"
				class="child">
				Use "return false" to prevent default.
			</div>
			
			<div
				(click)="handleChild( $event, true )"
				(click)="handleSibling( $event )"
				class="child">
				Use "event.preventDefault()" to prevent default.
			</div>

		</div>
	`
})
export class AppComponent {

	// I log the click event at the container level (one level up in the DOM).
	public handleContainer( event: MouseEvent ) : void {

		console.group( "Container" );
		console.log( "event.returnValue:", event.returnValue );
		console.log( "event.defaultPrevented:", event.defaultPrevented );
		console.groupEnd();

	}


	// I am the first click-handler - I prevent the default behavior using two
	// different approaches.
	public handleChild( event: MouseEvent, explicit: boolean ) : false | void {

		if ( explicit ) {

			console.group( "First Click Handler In handleChild()" );
			console.warn( "Using event.preventDefault() to prevent default." );
			console.groupEnd();

			// Prevent default using explicit event method.
			event.preventDefault();

		} else {

			console.group( "First Click Handler In handleChild()" );
			console.warn( "Using return( false ) to prevent default." );

			// Prevent default using the implicit understanding that returning "false"
			// from a host-binding will automatically prevent the default behavior on
			// the associated event object.
			console.groupEnd();
			return( false );

		}

	}


	// I am the second click-handler on the child element. I am a sibling to the handler
	// that is preventing the default click-event behavior.
	public handleSibling( event: MouseEvent ) : void {

		console.group( "Sibling" );
		console.log( "event.returnValue:", event.returnValue );
		console.log( "event.defaultPrevented:", event.defaultPrevented );
		console.groupEnd();

	}

}
