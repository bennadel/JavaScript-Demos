
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import html2canvas from "html2canvas";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface GeneratedMeme {
	id: number;
	url: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div id="meme-element" class="meme">
			<img src="assets/this-is-fine.png" class="meme__image" />

			<div [contentEditable]="true" class="meme__caption">
				Users keep asking for new features.
				We keep focusing on our Linting rules.
			</div>
		</div>

		<p class="copyright">
			"This is Fine" dog orginally
			<a href="https://gunshowcomic.com/648">published by K.C. Green</a>.
		</p>

		<button (click)="generateMeme()" class="generate">
			Generate Meme
		</button>

		<ng-template [ngIf]="memes.length">

			<hr />

			<h2 #generatedMemes>
				Generated Meme Images
			</h2>

			<p *ngFor="let meme of memes">
				<img
					[src]="meme.url"
					(load)="scrollIntoView( generatedMemes )"
				/>
			</p>

		</ng-template>
	`
})
export class AppComponent {

	public memes: GeneratedMeme[];

	private elementRef: ElementRef;

	// I initialize the app component.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;
		this.memes = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I use html2canvas to generate a PNG of the current meme configuration. The
	// generated images is appended to the view.
	public generateMeme() : void {

		// The html2canvas library, at the time of this writing, is having trouble
		// generating canvas images if the window is scrolled down. To "fix" this, we
		// need to scroll the user back to the top before we initiate the screenshot.
		// --
		// Read more: https://github.com/niklasvh/html2canvas/issues/1878
		window.scrollTo( 0, 0 );

		var target = this.elementRef.nativeElement.querySelector( "#meme-element" );

		// Generate the screenshot using html2canvas.
		var promise = html2canvas(
			target,
			{
				logging: false,
				// The onclone callback gives us access to the cloned DOCUMENT before the
				// screenshot is generated. This gives us the ability to make edits to
				// the DOM that won't affect the original page content. In this case, I
				// am applying a special CSS class that allows me to tweak the padding
				// around the text.
				onclone: ( doc ) => {

					doc.querySelector( "#meme-element" )!.classList.add( "html2canvas" );

				}
			}
		);

		promise
			.then(
				( canvas ) => {

					// Once the screenshot has been generated (as a canvas element), we
					// can grab the PNG data URI which we can then use to render an IMG
					// tag in the app.
					this.memes.unshift({
						id: Date.now(),
						url: canvas.toDataURL()
					});

				}
			)
			.catch(
				( error ) => {

					console.warn( "An error occurred." );
					console.error( error );

				}
			)
		;

	}


	// I scroll the given HTML element into view, using smooth scrolling if available.
	public scrollIntoView( element: HTMLElement ) : void {

		// NOTE: The "options" are not available in all browsers.
		try {

			element.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});

		} catch ( error ) {

			element.scrollIntoView();

		}

	}

}
