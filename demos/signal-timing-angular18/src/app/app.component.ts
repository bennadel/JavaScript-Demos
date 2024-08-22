
// Import vendor modules.
import { Component } from "@angular/core";
import { computed } from "@angular/core";
import { effect } from "@angular/core";
import { signal } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	styleUrl: "./app.component.less",
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public value1 = signal( 0 );
	public value2 = signal( 0 );
	public value3 = signal( 0 );
	public valueSum = computed(
		() => {

			console.log( "--> Computing new sum." );
			return ( this.value1() + this.value2() + this.value3() );

		}
	);
	public neverComputed = computed(
		() => {

			console.log( "Nothing ever calls me!" );
			return Math.random();

		}
	);

	/**
	* I initialize the component.
	*/
	constructor() {

		effect(
			() => {

				console.group( "Effect()" );
				console.log( "Sum was updated:", this.valueSum() );
				console.groupEnd();

			}
		);

	}

	// ---
	// LIFE-CYCLE METHODS.
	// ---

	/**
	* I get called once after the inputs have been bound for the first time.
	*/
	public ngOnInit() {

		console.log( "%cngOnInit() method.", "font-weight: bold" );
		this.cycle();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I cycle the value signals.
	*/
	public cycle() {

		console.log( "%ccycle() method.", "font-weight: bold" );

		console.group( "Updating Dependencies" );
		this.value1.set( this.randRange( 1, 10 ) );
		console.log( `Just updated value1 (${ this.value1() }).` );

		this.value2.set( this.randRange( 1, 10 ) );
		console.log( `Just updated value2 (${ this.value2() }).` );

		this.value3.set( this.randRange( 1, 10 ) );
		console.log( `Just updated value3 (${ this.value3() }).` );
		console.groupEnd();

		console.group( "Accessing Computed Value" );
		console.log( "PRE: About to log sum." );
		console.log( "Current sum:", this.valueSum() );
		console.log( "POST: Sum was just logged." );
		console.groupEnd();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I return a value in between the given min/max, inclusive.
	*/
	private randRange( min: number, max: number ) : number {

		return ( min + Math.floor( Math.random() * ( max - min + 1 ) ) );

	}

}
