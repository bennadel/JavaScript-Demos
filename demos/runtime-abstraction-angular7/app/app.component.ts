
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs";

// Import the application components and services.
import { ListType } from "./santa.runtime";
import { Person } from "./santa.runtime";
import { SantaRuntime } from "./santa.runtime";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	public intake: {
		name: string;
	};
	public selectedListType: Observable<ListType>;
	public people: Observable<Person[]>;
	public niceCount: Observable<number>;
	public naughtyCount: Observable<number>;

	private santaRuntime: SantaRuntime;

	// I initialize the app component.
	constructor( santaRuntime: SantaRuntime ) {

		this.santaRuntime = santaRuntime;

		// The intake form only operates on local state. There's no need for this to be
		// a concern of the runtime (though, if this demo were more complicated, it is
		// possible that error-messages could be controlled by the runtime).
		this.intake = {
			name: ""
		};

		// Hook up the various runtime streams.
		this.selectedListType = this.santaRuntime.getSelectedListType();
		this.people = this.santaRuntime.getPeople();
		this.niceCount = this.santaRuntime.getNiceCount();
		this.naughtyCount = this.santaRuntime.getNaughtyCount();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		var hash = window.location.hash.slice( 1 ).toLowerCase();

		// If the window location (a VIEW CONCERN) is indicating a list selection, then
		// let's update the runtime to match the list selection.
		if ( ( hash === "nice" ) || ( hash === "naughty" ) ) {

			this.santaRuntime.selectList( hash );

		}

	}


	// I process the new person intake form for Santa's list.
	public processIntake() : void {

		if ( ! this.intake.name ) {

			return;

		}

		// NOTE: We don't have to pass in a list-type because the currently selected list
		// is already part of the runtime internal state. As such, we only have to pass
		// in the name of the person and the runtime will take care of the rest.
		this.santaRuntime.addPerson( this.intake.name );
		this.intake.name = "";

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
