
// Import vendor modules.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { computed } from "@angular/core";
import { signal } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Entry {
	value: boolean;
}

@Component({
	selector: "app-root",
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrl: "./app.component.less",
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public entries = signal( this.buildEntries( 100 ) );
	// These COUNT aggregates are computed values that react to the changes in the entries
	// collection. Only, they require setting a new entries reference - mutating the array
	// directly will NOT trigger re-computing.
	public falseCount = computed( () => this.computeCount( false ) );
	public trueCount = computed( () => this.computeCount( true ) );

	// ---
	// LIFE-CYCLE METHODS.
	// ---

	/**
	* I get called once after the inputs have been bound for the first time.
	*/
	public ngOnInit() {

		// Every second, we're going to randomly flip one of the values deep within the
		// entries. However, since this component uses OnPush change detection, the
		// setTimeout() won't trigger change detection and no reconciliation will happen.
		setInterval(
			() => {

				var index = Math.floor( this.entries().length * Math.random() );

				this.entries()[ index ].value = true;

				console.log( "Flipping index:", index );

			},
			1000
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I perform a shallow copy of the entries collection (updating the Signal reference).
	*/
	public shallowCopy() {

		this.entries.update( entries => entries.slice() );

	}

	/**
	* I set the given entry to false.
	*/
	public toggle( index: number ) {

		// Note: We are mutating the array directly without changing the Signal reference.
		// As such, this won't trigger any downstream computing of other Signals; but,
		// since this method was triggered via a user interaction within the component, it
		// will trigger change detection.
		this.entries()[ index ].value = true;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I build the initial entries collection of the given size, all values set to false.
	*/
	private buildEntries( count: number ) : Entry[] {

		var results = new Array( count );

		for ( var i = 0 ; i < count ; i++ ) {

			results[ i ] = {
				value: false
			};

		}

		return results;

	}

	/**
	* I compute the number of entries with the given value.
	*/
	private computeCount( target: boolean ) : number {

		return this.entries()
			.filter( entry => ( entry.value === target ) )
			.length
		;

	}

}
