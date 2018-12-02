
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// This component supports both ONE-WAY and TWO-WAY data-binding. The TWO-WAY data-
// bindings is facilitated by the "tags" and "tagsChange" output events. These events
// allow for the "box of bananas" template syntax.
@Component({
	selector: "bn-tags",
	inputs: [ "tags" ],
	outputs: [
		"tagAddEvents: add",
		"tagRemoveEvents: remove",
		"tagsChangeEvents: tagsChange"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./tags.component.less" ],
	template:
	`
		<label (click)="input.focus()">
			<span *ngFor="let tag of tags ; let index = index" class="tag">
				<span class="tag__name">
					{{ tag }}
				</span>
				<a (click)="removeTagAtIndex( index )" class="tag__delete">
					⌫
				</a>
			</span>

			<!-- NOTE: Input uses NgModel for component-local TWO-WAY DATA-BINDING. -->
			<input
				#input
				type="text"
				name="newTagName"
				[(ngModel)]="newTagName"
				(keydown.Enter)="processNewTag( $event )"
			/>
		</label>
	`
})
export class TagsComponent implements OnChanges {

	public newTagName: string;
	public tagAddEvents: EventEmitter<string>;
	public tagRemoveEvents: EventEmitter<number>;
	public tags: string[];
	public tagsChangeEvents: EventEmitter<string[]>;

	// I initialize the tags component.
	constructor() {

		this.newTagName = "";
		this.tagAddEvents = new EventEmitter();
		this.tagRemoveEvents = new EventEmitter();
		this.tags = [];
		this.tagsChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called after input bindings have been changed.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// This component requires "tags" to exist. If it doesn't exist, the component
		// functionality will be fundamentally broken.
		if ( ! this.tags ) {

			throw( new Error( "Required input [tags] not provided." ) );

		}

	}


	// I process the new tag name.
	public processNewTag( event: KeyboardEvent ) : void {

		// Since this may be inside of a Form, we want to prevent the default behavior
		// of the key-event so as to not accidentally submit the parent form.
		event.preventDefault();

		if ( this.newTagName ) {

			// Emit new tag name for one-way data flow.
			this.tagAddEvents.emit( this.newTagName );

			// Emit NEW ARRAY with applied change for TWO-WAY data-binding.
			this.tagsChangeEvents.emit( this.tags.concat( this.newTagName ) );

			// Reset the form field.
			this.newTagName = "";

		}

	}


	// I process the removal of the tag at the given index.
	public removeTagAtIndex( index: number ) : void {

		// Emit new tag index for one-way data flow.
		this.tagRemoveEvents.emit( index );

		// Emit NEW ARRAY with applied change for TWO-WAY data-binding.
		this.tagsChangeEvents.emit([
			...this.tags.slice( 0, index ),
			...this.tags.slice( index + 1 )
		]);

	}

}
