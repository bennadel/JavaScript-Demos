
// Import the core angular services.
import { ControlValueAccessor } from "@angular/forms";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var noop = () => {
	// ...
};

@Directive({
	selector: "input[type=text][ngModel][ngModelSuggestions]",
	inputs: [
		"suggestions: ngModelSuggestions"
	],
	host: {
		"(blur)": "handleBlur( $event )",
		"(input)": "handleInput( $event )",
		"(keydown)": "handleKeydown( $event )",
		"(mousedown)": "handleMousedown( $event )"
	},
	// By overriding the NG_VALUE_ACCESSOR dependency-injection token at this level of
	// the component tree / hierarchical injectors, we are effectively replacing the
	// DefaultValueAccessor for THIS INPUT ELEMENT CONTEXT. As such, when Angular looks
	// for a ControlValueAccessor implementation in the local dependency-injection
	// container, it will only find this one.
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: NgModelSuggestionsDirective,
			multi: true
			// NOTE: I _believe_ that because I am using Ahead-of-Time (AoT) compiling in
			// this demo, I don't need to use the forwardRef() wrapper to reference the
			// Class that hasn't been defined yet.
		}
	]
})
export class NgModelSuggestionsDirective implements ControlValueAccessor {

	public suggestions: string[];

	private activeSuggestion: string | null;
	private elementRef: ElementRef;
	private onChangeCallback: Function;
	private onTouchedCallback: Function;
	private value: string;

	// I initialize the ng-model-suggestions value accessor and directive.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;

		// CAUTION: These will be called by Angular when rendering the View.
		this.onChangeCallback = noop;
		this.onTouchedCallback = noop;

		this.activeSuggestion = null;
		this.suggestions = [];

		// Normally, the Control Value Accessor just acts as a conduit for the underlying
		// Input element. However, in this case, since we are going to be adding extra
		// text-data to the Input, we need to store an internal "value" here as the
		// source of truth for what the NgModel value contains.
		this.value = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the blur event on the Input element.
	public handleBlur( event: Event ) : void {

		this.clearActiveSuggestion();
		this.onTouchedCallback();

	}


	// I handle the input event on the Input element.
	public handleInput( event: KeyboardEvent ) : void {

		var previousValue = this.value;
		var newValue = this.elementRef.nativeElement.value;
		var selectionStart = this.elementRef.nativeElement.selectionStart;

		// In order to create a more intuitive user experience, we're only going to
		// suggest text if the user appears to be "continuing" the previous value.
		// Meaning, they are actively typing a single cohesive value. This will prevent
		// us from trying to suggest something while the user is hitting BACKSAPCE, which
		// creates a confusing experience.
		if ( newValue.startsWith( previousValue ) ) {

			// Similar to the constraint above, we only want to suggest text if the
			// user's cursor is at the end of the text value. Again, we're trying to
			// cater to a "continuation" of the previous value.
			if ( selectionStart === newValue.length ) {

				if ( this.activeSuggestion = this.getFirstMatchingSuggestion( newValue ) ) {

					// NOTE: We are using only the ending portion of the suggestion,
					// rather than applying the suggestion in its entirety, so that we
					// don't override the key-casing of the existing user-provided text.
					var suggestionSuffix = this.activeSuggestion.slice( selectionStart );

					// NOTE: We are changing the value of the INPUT ELEMENT; however, we
					// are NOT CHANGING the "source of truth" value that we have stored
					// in the class.
					this.elementRef.nativeElement.value = ( newValue + suggestionSuffix );

					// After we update the Input element, we want to select the portion
					// of the text that makes up the suggestion. This way, as the user
					// continues to type, the selected text will naturally be removed.
					this.elementRef.nativeElement.selectionStart = selectionStart;
					this.elementRef.nativeElement.selectionEnd = this.activeSuggestion.length;

				}

			}

		}

		this.onChangeCallback( this.value = newValue );

	}


	// I handle the keydown event on the Input element.
	public handleKeydown( event: KeyboardEvent ) : void {

		// If there's no active suggestion being applied to the Input element, then we
		// don't care about any key-events. We can handle any subsequent (input) events
		// that are triggered by text-changes.
		if ( ! this.activeSuggestion ) {

			return;

		}

		// If the key event represents an acceptance of the active suggestion, commit the
		// suggestion to the current value and emit the change.
		if ( this.isAcceptSuggestionEvent( event ) ) {

			event.preventDefault();

			// Save the Input value back into our internal "source of truth" value.
			this.value = this.elementRef.nativeElement.value;
			this.elementRef.nativeElement.selectionStart = this.value.length;
			this.elementRef.nativeElement.selectionEnd = this.value.length;
			this.activeSuggestion = null;

			this.onChangeCallback( this.value );

		// Any other key should remove the active suggestion entirely.
		} else {

			this.clearActiveSuggestion();

		}

	}


	// I handle the mousedown event on the Input element.
	public handleMousedown( event: Event ) : void {

		// A mouse-action may alter the "selection" within the current Input element. As
		// such, let's remove any active suggestion so that we don't accidentally commit
		// it to the Input value.
		this.clearActiveSuggestion();

	}


	// I register the callback to be invoked when the value of the text Input element has
	// been changed by the user.
	public registerOnChange( callback: Function ) : void {

		this.onChangeCallback = callback;

	}


	// I register the callback to be invoked when the text Input element has been
	// "touched" by the user.
	public registerOnTouched( callback: Function ) : void {

		this.onTouchedCallback = callback;

	}


	// I set the disabled property of the text Input element.
	public setDisabledState( isDisabled: boolean ) : void {

		this.elementRef.nativeElement.disabled = isDisabled;

	}


	// I set the value property of the text Input element.
	public writeValue( value: string ) : void {

		// NOTE: This normalization step is copied from the default Accessory, which
		// seems to be protecting against null values.
		var normalizedValue = ( value || "" );

		if ( this.value !== normalizedValue ) {

			this.value = this.elementRef.nativeElement.value = normalizedValue;
			this.activeSuggestion = null;

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I remove any active suggestion from the Input element.
	private clearActiveSuggestion() : void {

		if ( this.activeSuggestion ) {

			this.activeSuggestion = null;
			this.elementRef.nativeElement.value = this.value;

		}

	}


	// I get the first matching suggestion for the given prefix.
	private getFirstMatchingSuggestion( prefix: string ) : string | null {

		var normalizedPrefix = prefix.toLowerCase();

		for ( var suggestion of this.suggestions ) {

			// Skip over any suggestions that don't have enough content to matter.
			if ( suggestion.length <= normalizedPrefix.length ) {

				continue;

			}

			if ( suggestion.toLowerCase().startsWith( normalizedPrefix ) ) {

				return( suggestion );

			}

		}

		// If we made it this far, no suggestions matched the given prefix.
		return( null );

	}


	// I determine if the given keyboard event represents a desire by the user to
	// accept the currently active suggestion.
	private isAcceptSuggestionEvent( event: KeyboardEvent ) : boolean {

		return(
			( event.key === "Tab" ) ||
			( event.key === "ArrowRight" ) || 
			( event.key === "ArrowDown" )
		);

	}

}
