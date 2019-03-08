
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Person {
	type: "friend" | "foe";
	id: number;
	name: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h2>
			Friends &amp; Foes
		</h2>

		<p>
			<a (click)="cyclePeople()">Cycle people</a>
			&mdash;
			<a (click)="togglePeople()">Toggle people</a>
		</p>

		<ul *ngIf="isShowingPeople">
			<ng-template
				ngFor
				let-person let-index="index"
				[ngForOf]="people"
				[ngForTrackBy]="( [ 'type', 'id' ] | trackByProperty )">

				<li [mySpy]="person.name">
					{{ person.name }} - {{ person.type }}
				</li>

			</ng-template>
		</ul>
	`
})
export class AppComponent {
	
	public people: Person[];
	public isShowingPeople: boolean;

	// I initialize the app component.
	constructor() {

		this.people = this.generatePeople();
		this.isShowingPeople = true;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I re-create the collection of people, thereby breaking any "object identity"
	// references to the old view-model.
	public cyclePeople() : void {

		console.warn( "Cycling people collection." );
		this.people = this.generatePeople();

	}


	// I toggle the rendering of the people collection.
	public togglePeople() : void {

		console.warn( "Toggling people collection." );
		this.isShowingPeople = ! this.isShowingPeople;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return a new collection of people.
	private generatePeople() : Person[] {

		// Notice that this collection contains a mixture of two different sets of
		// people, each of which have their own set of unique ID (primary keys). As such,
		// we can't use "id" alone to define uniqueness - we have to use the combination
		// of "type" AND "id" to define uniqueness within the collection.
		return([
			{ type: "friend", id: 1, name: "Liz" },
			{ type: "friend", id: 2, name: "Steve" },
			{ type: "foe", id: 1, name: "Katrina" },
			{ type: "foe", id: 2, name: "Joe" }
		]);

	}

}
