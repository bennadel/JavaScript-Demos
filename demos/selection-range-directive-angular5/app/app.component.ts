
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TextSelectEvent } from "./text-select.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface SelectionRectangle {
	left: number;
	top: number;
	width: number;
	height: number;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div>
			<p *ngFor="let i of [ 1, 2, 3 ]">
				This is some text before the active selection zone.
			</p>
		</div>

		<div (textSelect)="renderRectangles( $event )" class="container">

			<p *ngFor="let i of [ 1, 2, 3, 4, 5, 6 ]">
				Do I still Love you? Absolutely. There is not a doubt in my mind. Through
				all my mind, my ego&hellip; I was always faithful in my Love for you.
				That I made you doubt it, that is the great mistake of a Life full of
				mistakes. The truth doesn't set us free, Robin. I can tell you I Love you
				as many times as you can stand to hear it and all that does, the only
				thing, is remind us&hellip; that Love is not enough. Not even close.
			</p>

			<!--
				The host rectangle has to be contained WITHIN the element that has the
				[textSelect] directive because the rectangle will be absolutely
				positioned relative to said element.
			-->
			<div
				*ngIf="hostRectangle"
				class="indicator"
				[style.left.px]="hostRectangle.left"
				[style.top.px]="hostRectangle.top"
				[style.width.px]="hostRectangle.width"
				[style.height.px]="0">

				<div class="indicator__cta">
					<!--
						NOTE: Because we DON'T WANT the selected text to get deselected
						when we click on the call-to-action, we have to PREVENT THE 
						DEFAULT BEHAVIOR and STOP PROPAGATION on some of the events. The
						byproduct of this is that the (click) event won't fire. As such,
						we then have to consume the click-intent by way of the (mouseup)
						event.
					-->
					<a
						(mousedown)="$event.preventDefault()"
						(mouseup)="$event.stopPropagation(); shareSelection()"
						class="indicator__cta-link">
						Share With Friends
					</a>
				</div>

			</div>

		</div>

		<div>
			<p *ngFor="let i of [ 1, 2, 3 ]">
				This is some text after the active selection zone.
			</p>
		</div>
	`
})
export class AppComponent {

	public hostRectangle: SelectionRectangle | null;

	private selectedText: string;

	// I initialize the app-component.
	constructor() {

		this.hostRectangle = null;
		this.selectedText = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I render the rectangles emitted by the [textSelect] directive.
	public renderRectangles( event: TextSelectEvent ) : void {

		console.group( "Text Select Event" );
		console.log( "Text:", event.text );
		console.log( "Viewport Rectangle:", event.viewportRectangle );
		console.log( "Host Rectangle:", event.hostRectangle );
		console.groupEnd();

		// If a new selection has been created, the viewport and host rectangles will
		// exist. Or, if a selection is being removed, the rectangles will be null.
		if ( event.hostRectangle ) {

			this.hostRectangle = event.hostRectangle;
			this.selectedText = event.text;

		} else {

			this.hostRectangle = null;
			this.selectedText = "";

		}

	}


	// I share the selected text with friends :)
	public shareSelection() : void {

		console.group( "Shared Text" );
		console.log( this.selectedText );
		console.groupEnd();
		
		// Now that we've shared the text, let's clear the current selection.
		document.getSelection().removeAllRanges();
		// CAUTION: In modern browsers, the above call triggers a "selectionchange"
		// event, which implicitly calls our renderRectangles() callback. However,
		// in IE, the above call doesn't appear to trigger the "selectionchange"
		// event. As such, we need to remove the host rectangle explicitly.
		this.hostRectangle = null;
		this.selectedText = "";

	}

}
