
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

// NOTE: Loading RxJS operators for SIDE-EFFECTS only.
import "rxjs/add/observable/of";


// I provide the root component of the application.
@Component({
	selector: "my-app",
	template: 
	`
		From Observable: {{ someNumericProp }}
	`
})
export class AppComponent {

	// Notice that we are explicitly declaring this property as a number. As such, the
	// TypeScript transpiler should warn us when / if we try to store a non-numeric 
	// value into this property.
	public someNumericProp: number;


	// I initialize the component.
	constructor() {

		this.someNumericProp = 0;

		this.testControl();
		this.testA();
		this.testB();
		this.testC();
		this.testD();

		// Logging out the current object so we can see what is on the instance
		// and what is on the prototype.
		console.log( this );

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// In this "control" test, I'm using my older (and favorite) approach where I would
	// have to use the .bind() operator in order to ensure that the subscribe callback 
	// had access to the appropriate THIS scope. HOWEVER, we have to be careful because 
	// using the .bind() method BREAKS ALL TYPE-SAFETY CHECKS.
	public testControl() : void {

		Observable
			.of<number>( 1 )
			.subscribe( handleSubscribe.bind( this ) ) // <-- Using .bind( this )
		;

		function handleSubscribe( value: number ) : void {

			this.someNumericProp = "value"; // <-- Type incompatibility.

		}

	}


	// In this test, we're maintaining proper type-checking by using the fat-arrow 
	// syntax. However, in order to do that, we've switched over to an inline function
	// expression, which I don't love.
	// --
	// NOTE: The fat-arrow keeps the proper THIS reference while allowing type-checking.
	public testA() : void {

		Observable
			.of<number>( 1 )
			.subscribe(
				( value: number ) : void => {

					this.someNumericProp = "value"; // <-- Type incompatibility.

				}
			)
		;

	}


	// In this test, we're keeping the fat-arrow function syntax; however, rather than 
	// using an inline function expression, we're moving to a variable assignment. But,
	// since VARIABLE ASSIGNMENTS AREN'T HOISTED, we have to assign the fat-arrow 
	// function before we use it. Which is ghetto fabulous. 
	// --
	// NOTE: The fat-arrow keeps the proper THIS reference while allowing type-checking.
	public testB() : void {

		var handleSubscribe = ( value: number ) : void => {

			this.someNumericProp = "value"; // <-- Type incompatibility.

		};

		Observable
			.of<number>( 1 )
			.subscribe( handleSubscribe )
		;

	}


	// In this test, we're creating and consuming an INSTANCE METHOD that was defined
	// using the fat-arrow syntax. Unfortunately, to use this approach, the subscribe
	// handler is relatively far away from the method that is consuming it.
	public testC() : void {

		Observable
			.of<number>( 1 )
			.subscribe( this.testC_handleSubscribe )
		;

	}

	// CAUTION: Since this is a property assignment, NOT a function declaration, this
	// function is being set on the INSTANCE and NOT ON THE PROTOTYPE.
	// --
	// NOTE: The fat-arrow keeps the proper THIS reference while allowing type-checking.
	public testC_handleSubscribe = ( value: number ) : void => {

		this.someNumericProp = "value"; // <-- Type incompatibility.

	}


	// IN this test, I'm going back to my older (and preferred style) in which the 
	// callback is defined below its usage (and hoisted). However, rather than using
	// the .bind() method, we're using a closed-over "self" reference to maintain a 
	// proper, type-safe reference to the THIS scope.
	public testD() : void {
		
		var self = this;

		Observable
			.of<number>( 1 )
			.subscribe( handleSubscribe )
		;

		function handleSubscribe( value: number ) : void {

			self.someNumericProp = "value"; // <-- Type incompatibility.

		}

	}

}
