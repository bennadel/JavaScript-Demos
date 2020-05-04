
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { LetterGrid } from "./word-packer";
import { WordPacker } from "./word-packer";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public letterGrid: LetterGrid | null;
	public inputWords: string;

	// I initialize the app component.
	constructor() {

		this.letterGrid = null;
		this.inputWords = this.getInitialInput();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I generate a new Word Search using the given input value.
	public generateSearch( rawValue: string ) : void {

		this.inputWords = rawValue.trim();

		var words = this.inputWords.split( /[\r\n]/g );
		// The .createWordPacker() call is a STATIC method that will instantiate the
		// WordPacker class for us and then pipe each word into the packer, attempting
		// to sort the list for optimal results.
		var wordPacker = WordPacker.createWordPacker(
			words,
			20, // Width of the letter-grid in characters.
			16 // Height of the letter-grid in characters.
		);

		// Once the WordPacker has packed all the words into a letter-grid, let's
		// extract the letter-grid so that we can render it.
		this.letterGrid = wordPacker.getLetterGrid();

		// When the WordPacker is packing words, not all of the words will be able to fit
		// into the underlying letter-grid. Let's log out both the words that made the
		// cut and the words that were omitted.
		this.logWords(
			wordPacker.getWords(),
			wordPacker.getSkippedWords()
		);

		// Persist words to the location so that this list can be shared with others
		// via the URL.
		window.location.hash = words.join( "," );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I get an initial value for the list of words.
	private getInitialInput() : string {

		// If the hash has a value, we're going to assume it's a persisted list of words
		// that we want to use as our source of truth.
		if ( window.location.hash.length ) {

			var words = window.location.hash.slice( 1 ).split( "," );

		} else {

			var words = [
				"Arguments", "Array", "Async", "Await", "Bubble", "Capture", "Catch",
				"Class", "Closure", "Const", "Continue", "Debugger", "Event", "Export",
				"Extends", "Finally", "Function", "Generator", "Handler", "History",
				"Hoisting", "Implements", "Import", "Interface", "Java", "JavaScript",
				"JSON", "Let", "Location", "Null", "Object", "Observer", "Package", "Parse",
				"Private", "Protected", "Public", "Serialize", "Static", "Stringify",
				"Switch", "Throw", "Trigger", "Try", "Undefined", "Yield"
			];

		}

		return( words.join( "\n" ) );

	}


	// I log the word search values to the console.
	private logWords( words: string[], skippedWords: string[] ) : void {

		if ( words.length ) {

			console.group( "%cWords in the Word Search", "color: green ;" );
			console.log( words.join( ", " ) );
			console.groupEnd();

		}

		if ( skippedWords.length ) {

			console.group( "%cWords that did not get packed in the Word Search", "color: red ;" );
			console.log( skippedWords.join( ", " ) );
			console.groupEnd();

		}

	}

}
