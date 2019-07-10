
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// These are the "normal" sort methods that I might code if I was implementing the
// comparison operator manually. These are the "control" operators in this experiment.

function normal( a: string, b: string ) : number {

	if ( a === b ) {

		return( 0 );

	}

	return( ( a < b ) ? -1 : 1 );

}

function normalNoCase( a: string, b: string ) : number {

	return( normal( a.toUpperCase(), b.toUpperCase() ) );

}

function invertedNormal( a: string, b: string ) : number {

	return( -normal( a, b ) );

}

function invertedNormalNoCase( a: string, b: string ) : number {

	return( -normalNoCase( a, b ) );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// These are the sort methods that are powered by String.prototype.localeCompare(). The
// .localeCompare() method is generally supported, but has extended options that are less
// generally supported. These are the "experimental" operators in this experiment.

function compare( a: string, b: string ) : number {

	// Not all browsers support the extended options for localeCompare(). As such, let's
	// wrap the extended version in a try/catch and just fall-back to using the simple
	// version. In this case, we're going to use the "numeric" option, which gets the
	// browser to treat embedded numbers AS NUMBERS, which allows for a more "natural
	// sort" behavior.
	try {

		return( a.localeCompare( b, undefined, { numeric: true } ) );

	} catch ( error ) {

		console.warn( "Extended localeCompare() not supported in this browser." );
		return( a.localeCompare( b ) );

	}

}

function compareNoCase( a: string, b: string ) : number {

	return( compare( a.toUpperCase(), b.toUpperCase() ) );

}

function invertedCompare( a: string, b: string ) : number {

	return( -compare( a, b ) );

}

function invertedCompareNoCase( a: string, b: string ) : number {

	return( -compareNoCase( a, b ) );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p class="options">
			<strong>Normal Sort:</strong>
			<a (click)="handleNormalSort( 'asc', false )">ASC</a>
			<a (click)="handleNormalSort( 'asc', true )">ASC No Case</a>
			<a (click)="handleNormalSort( 'desc', false )">DESC</a>
			<a (click)="handleNormalSort( 'desc', true )">DESC No Case</a>
		</p>

		<p class="options">
			<strong>LocaleCompare Sort:</strong>
			<a (click)="handleLocaleCompareSort( 'asc', false )">ASC</a>
			<a (click)="handleLocaleCompareSort( 'asc', true )">ASC No Case</a>
			<a (click)="handleLocaleCompareSort( 'desc', false )">DESC</a>
			<a (click)="handleLocaleCompareSort( 'desc', true )">DESC No Case</a>
		</p>

		<ul>
			<li *ngFor="let value of values">
				{{ value }}
			</li>
		</ul>
	`
})
export class AppComponent {

	public values: string[];

	// I initialize the app component.
	constructor() {

		// NOTE: Part of the value-add of the localeCompare() method is that it can
		// handle non-English ASCII values more naturally. However, since I don't know
		// any of the rules around non-English ASCII, I am only testing English ASCII.
		// This way, I'll be able to interpret the results more easily.
		this.values = [
			// Test case-based sorting for English ASCII.
			"a", "A", "z", "Z",

			// Test embedded number sorting for English ASCII.
			"0", "9", "30", "30.5", "30.30", "500",
			"Item 0", "Item 9", "Item 30 a", "Item 30.5 a", "Item 30.30 a", "Item 500"
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I apply one of the localeCompare() sort operators.
	public handleLocaleCompareSort( direction: "asc" | "desc", caseInsensitive: boolean ) : void {

		if ( direction === "asc" ) {

			var operator = caseInsensitive
				? compareNoCase
				: compare
			;

		} else {

			var operator = caseInsensitive
				? invertedCompareNoCase
				: invertedCompare
			;

		}

		this.values.sort( operator );

	}


	// I apply one of the "control case" sort operators.
	public handleNormalSort( direction: "asc" | "desc", caseInsensitive: boolean ) : void {

		if ( direction === "asc" ) {

			var operator = caseInsensitive
				? normalNoCase
				: normal
			;

		} else {

			var operator = caseInsensitive
				? invertedNormalNoCase
				: invertedNormal
			;

		}

		this.values.sort( operator );

	}

}
