
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

// Import the application components and services.
import { PeopleService } from "./people.service";
import { Person } from "./people.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-people-detail",
	styleUrls: [ "./people-detail.component.less" ],
	template:
	`
		<h2>
			People Detail
		</h2>

		<div *ngIf="person">

			<dl class="details">
				<dt class="details__label">ID</dt>
				<dd class="details__value">{{ person.id }}</dd>

				<dt class="details__label">Name</dt>
				<dd class="details__value">{{ person.name }}</dd>

				<dt class="details__label">Email</dt>
				<dd class="details__value">{{ person.email }}</dd>
			</dl>

		</div>
	`
})
export class PeopleDetailComponent {

	public person: Person | null;
	
	private activatedRoute: ActivatedRoute;
	private peopleService: PeopleService;

	// I initialize the people-detail view component.
	constructor(
		activatedRoute: ActivatedRoute,
		peopleService: PeopleService
		) {

		this.activatedRoute = activatedRoute;
		this.peopleService = peopleService;

		this.person = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		var id = this.activatedRoute.snapshot.params.personID;

		this.peopleService.getPerson( id ).then(
			( person ) => {

				this.person = person;
				// In order to make it more clear how the "replaceUrl" in the search view
				// is affecting the browser's history, let's all update the document
				// title - this value will show up in the back-button drop-down menu.
				document.title = `Person: ${ person.name }`;

			},
			( error ) => {

				console.warn( "Oh noes!" );
				console.error( error );

			}
		);

	}

}
