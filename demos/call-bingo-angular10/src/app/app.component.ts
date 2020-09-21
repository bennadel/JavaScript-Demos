
// Import the core angular services.
import { Component } from "@angular/core";
import html2canvas from "html2canvas";

// Import the application components and services.
import { Utilities } from "./utilities";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type Mode = "edit" | "play";

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public mode: Mode;
	public phrases: string[];
	public screenshotUrl: string;

	// I initialize the app component.
	constructor() {

		this.mode = "play";
		this.screenshotUrl = "";

		// Since coming up with phrases was not the "goal" of this code kata, I borrowed
		// the phrases from this blog post on Vault.com about Zoom Bingo:
		// --
		// https://www.vault.com/blogs/coronavirus/zoom-call-bingo-with-cards-for-your-next-meeting
		this.phrases = [
			"Pet photobomb",
			"Awkward silence",
			"House plant in background",
			"Obviously texting off screen",
			"Dog barking",
			"Someone walks in on meeting",
			"Hey guys, I have another call",
			"Someone forgets to unmute",
			"Two people talk at the same time",
			"Let's take that offline",
			"Taking the meeting in bed",
			"Someone has a 'Hard Stop'",
			"Kids yelling in background",
			"Can't turn off 'fun' background",
			"Let's circle back to that",
			"Firetruck / Ambulance siren",
			"Action figures / toys in background",
			"Robot voice",
			"Turns off camera halfway through",
			"Only every other word comes through",
			"Echo",
			"Can everyone seen my screen?",
			"Weird background on share screen",
			"Out of dresscode"
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I apply the new phrases from the edit-form.
	public applyNewPhrases( newPhrases: string[] ) : void {

		this.phrases = newPhrases;
		this.mode = "play";
		this.savePhrasesToUrl();

	}


	// I switch the user over to the given experience.
	public gotoMode( newMode: Mode ) : void {

		this.mode = newMode;

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// If the URL has been copy-pasted to other individuals, the URL will contain the
		// phrase definitions for the current game. In such a situation, we have to use
		// the URL to override the current game state.
		// --
		// NOTE: We're not going to bother registering the "hashchange" event-listener
		// since it is NOT LIKELY that a user will manually change the hash - instead,
		// they are much more likely to just copy-paste a URL into a new browser-tab.
		this.applyHash( window.location.hash.slice( 1 ) );

	}


	// EXPERIMENTAL: I try to take a screenshot of the current bingo-board using the
	// html2canvas library.
	public takeScreenshot() : void {

		// The html2canvas library, at the time of this writing, is having trouble
		// generating canvas images if the window is scrolled down. To "fix" this, we
		// need to scroll the user back to the top before we initiate the screenshot.
		// --
		// Read more: https://github.com/niklasvh/html2canvas/issues/1878
		window.scrollTo( 0, 0 );

		var element = document.querySelector( "app-bingo-board" ) as HTMLElement;

		// Generate the screenshot using html2canvas.
		var promise = html2canvas(
			element,
			{
				logging: false,
				// CAUTION: These dimensions match the explicit height/width being
				// applied internally on the app-bingo-board component when the
				// html2canvas class is injected. Which means, these values have to be
				// kept in sync with another part of the code.
				width: 1200,
				height: 900,
				// The onclone callback gives us access to the cloned DOCUMENT before the
				// screenshot is generated. This gives us the ability to make edits to
				// the DOM that won't affect the original page content. In this case, I
				// am applying a special CSS class that allows me to set a fixed-size for
				// the bingo-board in order to get the screenshot to prevent clipping.
				onclone: ( doc ) => {

					doc.querySelector( "app-bingo-board" )!.classList.add( "html2canvas" );

				}
			}
		);

		promise
			.then(
				( canvas ) => {

					// Once the screenshot has been generated (as a canvas element), we
					// can grab the PNG data URI which we can then use to render an IMG
					// tag in the app.
					this.screenshotUrl = canvas.toDataURL();

					// Once the change-detection has had time to reconcile the View with
					// the View-model, our screenshot should be rendered on the page.
					// Let's try to scroll the user down to the IMG.
					setTimeout(
						() => {

							document.querySelector( ".screenshot" )!.scrollIntoView({
								block: "start",
								behavior: "smooth"
							});

						},
						100
					);

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

	// ---
	// PRIVATE METHODS.
	// ---

	// I apply the given hash to the current game state.
	private applyHash( base64Value: string ) : void {

		// If the hash is empty, then update the hash to reflect the current state of
		// the bingo board. This way, the user will be setup to copy-paste the current
		// URL over to other participants.
		if ( ! base64Value ) {

			this.savePhrasesToUrl();
			return;

		}

		try {

			this.phrases = Utilities.base64UrlDecode( base64Value )
				.split( /&/g )
				.map(
					( rawPhrase ) => {

						return( decodeURIComponent( rawPhrase ) );

					}
				)
				.filter(
					( phrase ) => {

						return( !! phrase );

					}
				)
			;

		} catch ( error ) {

			console.group( "Error decoding URL" );
			console.error( error );
			console.groupEnd();

		}

	}


	// I update the URL hash to reflect the current phrases configuration. This allows
	// the bingo game to be copy-pasted to other participants.
	private savePhrasesToUrl() : void {

		var encodedPhrases = this.phrases
			.map(
				( phrase ) => {

					return( encodeURIComponent( phrase ) );

				}
			)
			.join( "&" )
		;

		window.location.hash = Utilities.base64UrlEncode( encodedPhrases );

	}

}
