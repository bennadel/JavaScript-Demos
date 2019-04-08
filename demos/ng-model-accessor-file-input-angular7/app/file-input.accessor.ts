
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
	selector: "input[type=file][ngModel][observeFiles]",
	host: {
		"(blur)": "onTouchedCallback()",
		"(change)": "handleChange( $event.target.files )"
	},

	// By overriding the NG_VALUE_ACCESSOR dependency-injection token at this level of
	// the component tree / hierarchical injectors, we are effectively replacing the
	// DefaultValueAccessor for this Input Element context. As such, when Angular looks
	// for a ControlValueAccessor implementation in the local dependency-injection
	// container, it will only find this one - the one that looks at the "FileList"
	// property, not the "value" property.
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FileInputValueAccessor,
			multi: true
			// NOTE: I _believe_ that because I am using Ahead-of-Time (AoT) compiling in
			// this demo, I don't need to use the forwardRef() wrapper to reference the
			// Class that hasn't been defined yet.
		}
	]
})
export class FileInputValueAccessor implements ControlValueAccessor {

	private elementRef: ElementRef;
	private onChangeCallback: Function;
	private onTouchedCallback: Function;

	// I initialize the file-input value accessor service.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;

		// CAUTION: These will be called by Angular when rendering the View.
		this.onChangeCallback = noop;
		this.onTouchedCallback = noop;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle changes to the file input element value made by the user. Instead of
	// pushing the "value," I push the underlying File or File[] references to the
	// calling context.
	public handleChange( files: FileList ) : void {

		// If the input is set to allow MULTIPLE files, then always push an ARRAY of
		// files through to the calling context (even if it is empty).
		// --
		// NOTE: We are using Array.from() in order to create a proper Array from the
		// Array-like FileList collection.
		if ( this.elementRef.nativeElement.multiple ) {

			this.onChangeCallback( Array.from( files ) );

		// If the input is set to allow only a SINGLE file, then let's only push the
		// first file in the collection (or NULL if no file is available).
		} else {

			this.onChangeCallback( files.length ? files[ 0 ] : null );

		}

	}


	// I register the callback to be invoked when the value of the file input element
	// has been changed by the user.
	public registerOnChange( callback: Function ) : void {

		this.onChangeCallback = callback;

	}


	// I register the callback to be invoked when the file input element has been
	// "touched" by the user.
	public registerOnTouched( callback: Function ) : void {

		this.onTouchedCallback = callback;

	}


	// I set the disabled property of the file input element.
	public setDisabledState( isDisabled: boolean ) : void {

		this.elementRef.nativeElement.disabled = isDisabled;

	}


	// I set the value property of the file input element.
	// --
	// CAUTION: Only a limited set of values can be used on file inputs.
	public writeValue( value: any ) : void {

		if ( value instanceof FileList ) {

			this.elementRef.nativeElement.files = value;

		} else if ( Array.isArray( value ) && ! value.length ) {

			this.elementRef.nativeElement.files = null;

		} else if ( value === null ) {

			this.elementRef.nativeElement.files = null;

		} else {

			// Since we cannot manually construct a FileList instance, we have to ignore
			// any attempt to push a non-FileList instance into the input.
			if ( console && console.warn && console.log ) {

				console.warn( "Ignoring attempt to assign non-FileList to input[type=file]." );
				console.log( "Value:", value );

			}

		}

	}

}
