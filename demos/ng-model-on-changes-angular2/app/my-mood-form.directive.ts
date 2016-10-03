declare var module : { id: string };

// Import the core angular services.
import { ControlValueAccessor } from "@angular/forms";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

// Import the application services.
import { MyMoodComponent } from "./my-mood.component";

@Directive({
	selector: "my-mood[ngModel]",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useClass: forwardRef(
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
	constructor( target: MyMoodComponent, e:ElementRef ) {

		console.log( ".... instantiate", e.nativeElement );
		this.target = target;
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	public handleValueChange( newValue: number ) : void {

		this.target.value = newValue;
console.log( this );
		this.onChangeCallback( newValue );

	}


	public registerOnChange( callback: any ) : void {
console.log( "register callback", callback );
		this.onChangeCallback = callback;

	}


	public registerOnTouched( callback: any ) : void {

		this.onTouchedCallback = callback;

	}


	public writeValue( value: any ) : void {

		this.target.value = value;

	}

}
