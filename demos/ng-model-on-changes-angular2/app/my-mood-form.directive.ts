declare var module : { id: string };

// Import the core angular services.
import { ControlValueAccessor } from "@angular/forms";
import { Directive } from "@angular/core";
import { forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

// Import the application services.
import { MyMoodComponent } from "./my-mood.component";

// I provide the ControlValueAccessor implementation for the MyMood component.
// --
// WHY BREAK THE VALUE ACCESSOR OUT INTO A DIFFERENT DIRECTIVE?
// This is a good question with a simple answer: it allows the MyMood component to be
// used with or without the FormsModule module. If the MyMood component implemented its 
// own value-accessor, then you would have to include the FormsModule along with the 
// MyMood component, even if the application wasn't actually using forms at all. Not only
// does this make the usage more flexible, it creates a cleaner separation of concerns.
@Directive({
	selector: "my-mood[ngModel]", // Notice [ngModel] selector.
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(
				function() {

					return( MyMoodFormDirective );

				}
			),
			multi: true
		}
	],
	host: {
		"(valueChange)": "handleValueChange( $event )"
	}
})
export class MyMoodFormDirective implements ControlValueAccessor {

	private onChangeCallback: any;
	private onTouchedCallback: any;
	private target: MyMoodComponent;


	// I initialize the directive.
	constructor( target: MyMoodComponent ) {

		this.target = target;
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle valueChange events emitted from the underlying DOM component.
	public handleValueChange( newValue: number ) : void {

		// With a Control Value Accessor, the whole intent is to synchronize the view-
		// model with the state of the DOM (Document Object Model). However, in this 
		// case, since the "DOM" is actual another Angular component, we need to tell 
		// the underlying component to render the new value. This way, the target DOM
		// will by synchronized with the change we are about to emit.
		// --
		// NOTE: This violates the one-way data flow; but, that's an expectation of the
		// ngModel directive usage.
		this.writeValue( newValue );

		// Synchronize the value from the DOM up into the view-model.
		this.onChangeCallback( newValue );

	}


	// I register the ngModel onChange callback.
	public registerOnChange( callback: any ) : void {

		this.onChangeCallback = callback;

	}


	// I register the ngModel onTouched callback.
	public registerOnTouched( callback: any ) : void {

		this.onTouchedCallback = callback;

	}


	// I write view-model values to the underlying DOM (synchronizing the value from 
	// the view-model down into the DOM).
	public writeValue( value: any ) : void {

		// Store the new value back into the MyMood component.
		this.target.value = value;

		// ------------------------------------------------------- //
		// ---- BRIDGING THE ANGULAR 2.0.0. FUNCTIONALITY GAP ---- //
		// ------------------------------------------------------- //

		// At this point, Angular's ngModel implementation leaves things unfinished.
		// Specifically, it doesn't:
		// 
		// - Run change-detection (needed for the OnPush change detection strategy).
		// - Run the ngOnChanges() life-cycle hook.
		// 
		// You can bridge this gap yourself by manually running change-detection and
		// invoking the ngOnChanges() life-cycle hook. The change-detection is easy;
		// but, the ngOnChanges is not easy because the "isFirstChange()" implementation
		// uses a non-exported value, "UNINITIALIZED", which we would have to hack to 
		// get it working.
		// 
		// Read more: https://www.bennadel.com/blog/3092-creating-an-abstract-value-accessor-for-ngmodel-in-angular-2-beta-17.htm

	}

}
