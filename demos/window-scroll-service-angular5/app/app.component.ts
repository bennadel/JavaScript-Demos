
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { WindowScrolling } from "./window-scrolling";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="toggleModal()" class="open">Open Modal Window</a>
		</p>

		<div *ngIf="isShowingModal" class="modal">
			<div class="modal__content">

				This is a modal &mdash; <a (click)="toggleModal()">Close the modal</a>

			</div>
		</div>

		<p *ngFor="let i of offsets">
			This is paragraph 1-{{ i }}.
		</p>

		<p>
			<a (click)="toggleModal()" class="open">Open Modal Window</a>
		</p>

		<p *ngFor="let i of offsets">
			This is paragraph 2-{{ i }}.
		</p>

		<p>
			<a (click)="toggleModal()" class="open">Open Modal Window</a>
		</p>		
	`
})
export class AppComponent {

	public isShowingModal: boolean;
	public offsets: number[];

	private windowScrolling: WindowScrolling;
	
	// I initialize the app component.
	constructor( windowScrolling: WindowScrolling ) {

		this.windowScrolling = windowScrolling;
		this.offsets = this.range( 1, 20 );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I open or close the modal window.
	public toggleModal() : void {

		// When we open the modal window, we want to prevent scrolling on the main 
		// document. This way, if the user can scroll within the modal window, the
		// scroll will never bleed into the body context.
		if ( this.isShowingModal = ! this.isShowingModal ) {

			this.windowScrolling.disable();

		} else {

			this.windowScrolling.enable();

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I build an increasing range for the given numbers, inclusive.
	private range( from: number, to: number ) : number[] {

		var values = [];

		for ( var i = from ; i <= to ; i++ ) {

			values.push( i );

		}

		return( values );

	}

}
