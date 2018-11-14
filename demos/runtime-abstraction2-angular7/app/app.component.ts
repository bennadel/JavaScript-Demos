
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { ListType } from "./santa.runtime";
import { Person } from "./santa.runtime";
import { SantaRuntime } from "./santa.runtime";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template: `
		<my-santa
			[selectedListType]="( selectedListType | async )"
			[niceCount]="( niceCount | async )"
			[naughtyCount]="( naughtyCount | async )"
			[people]="( people | async )"
			(listTypeSelect)="showList( $event )"
			(peopleAdd)="addPerson( $event )"
			(peopleRemove)="removePerson( $event )">
		</my-santa>
	`
})
export class AppComponent implements OnInit {

	public naughtyCount: Observable<number>;
	public niceCount: Observable<number>;
	public people: Observable<Person[]>;
	public selectedListType: Observable<ListType>;

	private santaRuntime: SantaRuntime;

	// I initialize the app component.
	constructor( santaRuntime: SantaRuntime ) {

		this.santaRuntime = santaRuntime;

		// Hook up the various runtime streams - these will act as the input bindings
		// for our santa "presentation" component.
		this.selectedListType = this.santaRuntime.getSelectedListType();
		this.people = this.santaRuntime.getPeople();
		this.niceCount = this.santaRuntime.getNiceCount();
		this.naughtyCount = this.santaRuntime.getNaughtyCount();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I create a new person with the given name and add them to the selected list.
	public addPerson( name: string ) : void {

		this.santaRuntime.addPerson( name );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		var hash = window.location.hash.slice( 1 ).toLowerCase();

		// If the window location (a VIEW CONCERN) is indicating a list selection, then
		// let's update the runtime to match the list selection.
		if ( ( hash === "nice" ) || ( hash === "naughty" ) ) {

			this.santaRuntime.selectList( hash );

		}

	}


	// I remove the given person from Santa's lists.
	public removePerson( person: any ) : void {

		this.santaRuntime.removePerson( person.id );

	}


	// I show the given list of people.
	public showList( list: ListType ) : void {

		// Update the location hash (a VIEW CONCERN) so that we start on the selected
		// list if the browser is refreshed.
		window.location.hash = list;

		this.santaRuntime.selectList( list );

	}

}
