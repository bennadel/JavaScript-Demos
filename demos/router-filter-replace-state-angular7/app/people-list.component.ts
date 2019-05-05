
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { PeopleService } from "./people.service";
import { Person } from "./people.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Result {
	content: string;
	isVisible: boolean;
	person: Person;
}

@Component({
	selector: "my-people-list",
	styleUrls: [ "./people-list.component.less" ],
	template:
	`
		<h2>
			People List
		</h2>

		<div>
			<input
				type="text"
				name="filter"
				[(ngModel)]="form.filter"
				(ngModelChange)="applyFilter()"
				placeholder="Search..."
				autocomplete="off"
				autofocus
				class="filter"
			/>
		</div>

		<ul class="items">
			<li
				*ngFor="let result of results"
				class="items__item"
				[class.items__item--hidden]="( ! result.isVisible )">

				<a routerLink="/people/{{ result.person.id }}/detail">
					{{ result.person.name }}
				</a>

			</li>
		</ul>
	`
})
export class PeopleListComponent {
	
	public form: {
		filter: string;
	};
	public results: Result[];

	private activatedRoute: ActivatedRoute;
	private peopleService: PeopleService;
	private router: Router;

	// I initialize the people-list view component.
	constructor(
		activatedRoute: ActivatedRoute,
		peopleService: PeopleService,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.peopleService = peopleService;
		this.router = router;

		this.form = {
			filter: ( activatedRoute.snapshot.params.filter || "" )
		};
		this.results = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I apply the current filter to the view-model.
	// --
	// NOTE: This is getting called after every (input) / (ngModelChange) event on the
	// form filter.
	public applyFilter() : void {

		this.applyFilterToResults();
		this.applyFilterToRoute();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.peopleService.getPeople().then(
			( people ) => {

				this.results = people.map(
					( person ) => {

						return({
							content: person.name.toLowerCase(),
							isVisible: true,
							person: person
						});

					}
				);

				// Now that we have the initial results populated, let's apply any
				// filtering that was predefined by the route.
				this.applyFilterToResults();

			},
			( error ) => {

				console.warn( "Oh noes!" );
				console.error( error );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I apply the filter to the list of people, setting the "isVisible" flag based on
	// the content match of each result item.
	private applyFilterToResults() : void {

		var filter = this.form.filter.toLowerCase();

		for ( var result of this.results ) {

			result.isVisible = ( filter )
				? result.content.includes( filter )
				: true 
			;

		}

	}


	// I apply the filter to the route, persisting the current filter value to the
	// current route's parameters.
	private applyFilterToRoute() : void {

		this.router.navigate(
			[
				{
					filter: this.form.filter
				}
			],
			{
				relativeTo: this.activatedRoute,
				// NOTE: By using the replaceUrl option, we don't increase the Browser's
				// history depth with every filtering keystroke. This way, the List-View
				// remains a single item in the Browser's history, which allows the back
				// button to function much more naturally for the user.
				replaceUrl: true
			}
		);

		// In order to more clearly illustrate how the "replaceUrl" is affecting the
		// browser's history, let's all update the document title as well - this value
		// will show up in the back-button drop-down menu.
		document.title = `Search: ${ this.form.filter }`;

	}

}
