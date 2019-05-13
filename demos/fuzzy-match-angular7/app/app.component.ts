
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { FuzzyMatcher } from "./fuzzy-matcher";
import { FuzzySegment } from "./fuzzy-matcher";
import { primates } from "./primates";
import { Species } from "./primates";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface FilterMatch {
	score: number;
	value: Species;
	segments: FuzzySegment[];
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<input
			type="text"
			name="filter"
			[(ngModel)]="form.filter"
			(ngModelChange)="applyFilter()"
			placeholder="Search primates...."
			autofocus
			class="filter"
		/>

		<ul *ngIf="matches.length">
			<li *ngFor="let match of matches" class="match">

				<span
					*ngFor="let segment of match.segments"
					class="match__segment"
					[class.match__segment--on]="segment.isMatch"
					>{{ segment.value }}</span>

			</li>
		</ul>
	`
})
export class AppComponent {
	
	public form: {
		filter: string;
	};
	public matches: FilterMatch[];

	private fuzzyMatcher: FuzzyMatcher;

	// I initialize the app component.
	constructor( fuzzyMatcher: FuzzyMatcher ) {

		this.fuzzyMatcher = fuzzyMatcher;

		this.form = {
			filter: ""
		};
		this.matches = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I apply the current filter to the collection of primates, generate a set of fuzzy
	// matches.
	public applyFilter() : void {

		// If there is no filter, then hide the list entirely. We only want to show
		// matches when we have something to match on.
		if ( ! this.form.filter ) {

			this.matches = [];
			return;

		}

		this.matches = primates
			// First, we want to take the updated form input and use it to SCORE the
			// collection of values. This phase will have to evaluate the entire set of
			// values; but, will only do the minimal amount of work needed to calculate a
			// scope. Then, we'll be able to use that score to narrow down and format the
			// set of values that we end-up showing to the user.
			.map(
				( primate ) => {

					return({
						value: primate,
						score: this.fuzzyMatcher.scoreValue( primate.name, this.form.filter )
					});

				}
			)
			// Now that the entire set of values has been scored, let's sort them from
			// highest to lowest.
			.sort(
				( a, b ) => {

					return( 
						( ( a.score > b.score ) && -1 ) || // Move item up.
						( ( a.score < b.score ) && 1 ) || // Move item down.
						0
					);

				}
			)
			// For the sake of the demo, we only want to show the top-scoring matches.
			// Slice off the top of the scored values.
			.slice( 0, 20 )
			// At this point, we've narrowed down the set of values to the ones we want
			// to show to the user. Now, we can go back and create a data-structure that
			// can be more easily rendered (but takes more processing).
			.map(
				( scoredValue ) => {

					return({
						score: scoredValue.score,
						value: scoredValue.value,
						segments: this.fuzzyMatcher.parseValue( scoredValue.value.name, this.form.filter )
					});

				}
			)
		;

	}

}
