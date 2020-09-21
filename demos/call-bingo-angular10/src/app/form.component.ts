
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface PhraseOption {
	id: number;
	name: string;
	value: string;
}

@Component({
	selector: "app-form",
	inputs: [ "phrases" ],
	outputs: [ "phrasesChangeEvents: phrasesChange" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./form.component.less" ],
	templateUrl: "./form.component.html"
})
export class FormComponent {

	public options: PhraseOption[];
	public phrases: string[];
	public phrasesChangeEvents: EventEmitter<string[]>;

	// I initialize the form component.
	constructor() {

		this.options = [];
		this.phrases = [];
		this.phrasesChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add an empty option to the input list.
	public addOption() : void {

		var nextID = this.options.length;

		this.options.push({
			id: nextID,
			name: `phrase_${ nextID }`,
			value: ""
		});

	}


	// I add a number of empty options to the input list.
	public addOptions() : void {

		for ( var i = 0 ; i < 5 ; i++ ) {

			this.addOption();

		}

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.options = this.phrases.map(
			( phrase, index ) => {

				return({
					id: index,
					name: `phrase_${ index }`,
					value: phrase
				});

			}
		);

		// Let's encourage the creation of at least 25-phrases. The user doesn't need to
		// include all of them - phrases will be padded if an insufficient number is
		// provided. But, it would be best if 25+ were defined.
		while ( this.options.length < 25 ) {

			this.addOption();

		}

	}


	// I process the form, emitting a new collection of phrases to be used in the game.
	public processForm() : void {

		var newPhrases = this.options
			.map(
				( option ) => {

					return( option.value.trim() );

				}
			)
			.filter(
				( phrase ) => {

					return( !! phrase );

				}
			)
		;

		this.phrasesChangeEvents.emit( newPhrases );

	}

}
