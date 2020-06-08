
// Import the core angular services.
import { Component } from "@angular/core";
import { ContentChildren } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { forwardRef } from "@angular/core";
import { QueryList } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type OptionsGroupType = "selected" | "unselected";

@Component({
	selector: "ds-select",
	outputs: [
		"selectEvents: select",
		"unselectEvents: unselect"
	],
	styleUrls: [ "./ds-select.component.less" ],
	templateUrl: "./ds-select.component.html"
})
export class DSSelectComponent {

	public selectEvents: EventEmitter<any[]>;
	public unselectEvents: EventEmitter<any[]>;

	// CAUTION: I'm using the DEFINITE ASSIGNMENT ASSERTION here because the
	// ngAfterViewInit() will throw an error if the following properties have not yet
	// been registered by lower-level components (ds-options).
	private unselectedOptionsGroup!: DSOptionsGroupComponent;
	private selectedOptionsGroup!: DSOptionsGroupComponent;

	// I initialize the dual-select select component.
	constructor() {

		this.selectEvents = new EventEmitter();
		this.unselectEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the view has been initialized.
	public ngAfterViewInit() : void {

		if ( ! this.unselectedOptionsGroup || ! this.selectedOptionsGroup ) {

			throw( new Error( "You must provide both an 'unselected' and a 'selected' options group." ) );

		}

	}


	// I emit an event to move the pending values from Unselected options-group to the
	// Selected options-group.
	public addToSelected() : void {

		var values = this.unselectedOptionsGroup.getPendingValues();

		if ( values.length ) {

			this.unselectedOptionsGroup.clearPending();
			this.selectEvents.emit( values );

		}

	}


	// I emit an event to move the given option from the given options-group to the other
	// options-group.
	public moveOption( optionsGroup: DSOptionsGroupComponent, option: DSOptionComponent ) : void {

		var eventEmitter = ( optionsGroup.type === "selected" )
			? this.unselectEvents
			: this.selectEvents
		;
		var eventValue = [ option.value ];

		optionsGroup.clearPending();
		eventEmitter.emit( eventValue );

	}


	// I emit an event to move the pending values from Selected options-group to the
	// Unselected options-group.
	public removeFromSelected() : void {

		var values = this.selectedOptionsGroup.getPendingValues();

		if ( values.length ) {

			this.selectedOptionsGroup.clearPending();
			this.unselectEvents.emit( values );

		}

	}


	// I register the given options-group with the current select.
	public registerOptionsGroup( optionsGroup: DSOptionsGroupComponent ) : void {

		if ( optionsGroup.type === "unselected" ) {

			this.unselectedOptionsGroup = optionsGroup;

		} else {

			this.selectedOptionsGroup = optionsGroup;

		}

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "ds-options",
	inputs: [ "type" ],
	host: {
		"role": "list"
	},
	queries: {
		// CAUTION: Since the DS-OPTIONS component is a flexible container for content,
		// we have to use the "descendants" option. This way, we can locate DS-OPTION
		// instances that may be wrapped inside additional, decorative HTML.
		options: new ContentChildren(
			forwardRef( () => DSOptionComponent ),
			{
				descendants: true
			}
		)
	},
	styleUrls: [ "./ds-options.component.less" ],
	template:
	`
		<ng-content></ng-content>
	`
})
export class DSOptionsGroupComponent {

	public options!: QueryList<DSOptionComponent>;
	public type!: OptionsGroupType;

	private lastPendingIndex: number | null;
	private select: DSSelectComponent;

	// I initialize the dual-select options-group component.
	constructor( select : DSSelectComponent ) {

		this.select = select;
		this.lastPendingIndex = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I clear any pending-item settings.
	public clearPending() : void {

		for ( var option of this.options ) {

			option.isPending = false;

		}

		this.lastPendingIndex = null;

	}


	// I get the collection of values associated with pending options in this group.
	public getPendingValues() : any[] {

		var values = this.options
			.filter( option => option.isPending )
			.map( option => option.value )
		;

		return( values );

	}


	// I move the given option to the other options-group list.
	public moveOption( option: DSOptionComponent ) : void {

		this.select.moveOption( this, option );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		if (
			( this.type !== "unselected" ) &&
			( this.type !== "selected" )
			) {

			throw( new Error( `ds-options group must be 'unselected' or 'selected'. The value of [${ this.type }] is not supported.` ) );

		}

		this.select.registerOptionsGroup( this );

	}


	// I toggle the pending state of the given option (and possibly all of the options
	// between the given one and the last one that was toggled).
	public toggleOption( option: DSOptionComponent, isMultiToggle: boolean ) : void {

		// Options is a QueryList iterator, which is "array like"; but, doesn't have all
		// of the Array methods we would like to use in the toggle operation. As such,
		// let's convert the QueryList to an Array for the scope of this function.
		var optionsArray = this.options.toArray();
		var index = optionsArray.indexOf( option );

		if ( index === -1 ) {

			return;

		}

		var isPending = option.isPending = ! option.isPending;

		// If this is a multi-toggle action, set all the sibling options to the same
		// pending setting.
		if ( isMultiToggle && ( this.lastPendingIndex !== null ) ) {

			// Get the loop-boundaries for the multi-toggle (and make sure we don't go
			// beyond the scope of the current options).
			var minIndex = Math.min( Math.min( index, this.lastPendingIndex ), ( optionsArray.length - 1 ) );
			var maxIndex = Math.min( Math.max( index, this.lastPendingIndex ), ( optionsArray.length - 1 ) );

			for ( var i = minIndex ; i <= maxIndex ; i++ ) {

				optionsArray[ i ].isPending = isPending;

			}

		}

		this.lastPendingIndex = index;

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "ds-option",
	inputs: [ "value" ],
	host: {
		"role": "listitem",
		"(click)": "toggle( $event )",
		"(dblclick)": "move()",
		"[class.pending]": "isPending"
	},
	styleUrls: [ "./ds-option.component.less" ],
	template:
	`
		<ng-content></ng-content>
	`
})
export class DSOptionComponent {

	public isPending: boolean;
	public value: any;

	private optionsGroup: DSOptionsGroupComponent;

	// I initialize the dual-select option component.
	constructor( optionsGroup: DSOptionsGroupComponent ) {

		this.optionsGroup = optionsGroup;
		this.isPending = false;
		this.value = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I move the option to the "other" option group.
	public move() : void {

		this.optionsGroup.moveOption( this );

	}


	// I toggle the pending state.
	public toggle( event: MouseEvent ) : void {

		this.optionsGroup.toggleOption( this, event.shiftKey );

	}

}
