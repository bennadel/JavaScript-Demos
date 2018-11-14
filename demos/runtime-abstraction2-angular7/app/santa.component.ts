
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// Import the application components and services.
import { ListType } from "./santa.runtime";
import { Person } from "./santa.runtime";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-santa",
	inputs: [
		"selectedListType",
		"niceCount",
		"naughtyCount",
		"people"
	],
	outputs: [
		"listTypeSelectEvents: listTypeSelect",
		"peopleAddEvents: peopleAdd",
		"peopleRemoveEvents: peopleRemove"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./santa.component.less" ],
	templateUrl: "./santa.component.htm"
})
export class SantaComponent implements OnChanges {

	// Inputs.
	public naughtyCount: number;
	public niceCount: number;
	public people: Person[];
	public selectedListType: ListType;

	// Outputs.
	public listTypeSelectEvents: EventEmitter<ListType>;
	public peopleAddEvents: EventEmitter<string>;
	public peopleRemoveEvents: EventEmitter<Person>;

	public intake: {
		name: string;
	};

	// I initialize the santa component.
	constructor() {

		this.naughtyCount = 0;
		this.niceCount = 0;
		this.people = [];
		this.selectedListType = "nice";
		
		this.listTypeSelectEvents = new EventEmitter();
		this.peopleAddEvents = new EventEmitter();
		this.peopleRemoveEvents = new EventEmitter();

		this.intake = {
			name: ""
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called every time the input bindings change.
	public ngOnChanges( changes: SimpleChanges ) : void {

		console.group( "SANTA COMPONENT INPUT CHANGES" );
		console.log( changes );
		console.groupEnd();

	}


	// I process the new person intake form for Santa's list.
	public processIntake() : void {

		if ( ! this.intake.name ) {

			return;

		}

		this.peopleAddEvents.emit( this.intake.name );
		this.intake.name = "";

	}


	// I remove the given person from Santa's lists.
	public removePerson( person: any ) : void {

		this.peopleRemoveEvents.emit( person );

	}


	// I show the given list of people.
	public showList( list: ListType ) : void {

		this.listTypeSelectEvents.emit( list );

	}

}
