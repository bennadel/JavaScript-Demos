
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "bn-toggle-list",
	inputs: [ "value" ],
	outputs: [ "valueChangeEvents: valueChange" ],
	styleUrls: [ "./toggle-list.component.less" ],
	template:
	`
		<ng-content></ng-content>
	`
})
export class ToggleListComponent {

	public value: any;
	public valueChangeEvents: EventEmitter<any>;

	constructor() {

		this.value = null;
		this.valueChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public selectValue( newValue: any ) : void {

		this.valueChangeEvents.emit( newValue );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "bn-toggle-list-item",
	inputs: [ "value" ],
	host: {
		"(click)": "handleClick()",
		"[class.selected]": "( toggleList.value === value )"
	},
	styleUrls: [ "./toggle-list-item.component.less" ],
	template:
	`
		<ng-content></ng-content>
	`
})
export class ToggleListItemComponent {

	public toggleList: ToggleListComponent;
	public value: any;

	constructor( toggleList: ToggleListComponent ) {

		this.toggleList = toggleList;

		this.value = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public handleClick() : void {

		this.toggleList.selectValue( this.value );

	}

}
