
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export type Tag = string;
export type Tags = Tag[];

@Component({
	selector: "tags-input-lite",
	inputs: [ "tags" ],
	outputs: [
		"tagsChangeEvents: tagsChange"
	],
	template:
	`
		<ng-content></ng-content>
	`
})
export class TagsInputCoreComponent {

	public tags: Tags;
	public tagsChangeEvents: EventEmitter<Tags>;

	// I initialize the tags-input core component.
	constructor() {

		this.tags = [];
		this.tagsChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I emit a new collection of tags with the given tag appended to the end of the
	// collection (duplicate tags are ignored - using a CASE SENSITIVE comparison).
	public addTag( tag: Tag ) : void {

		tag = tag.trim();

		if ( ! tag || this.hasTag( tag ) ) {

			return;

		}

		this.tagsChangeEvents.emit( this.tags.concat( tag ) );

	}


	// I check to see if the given tag already exists in the current collection (using
	// a CASE SENSITIVE comparison).
	public hasTag( tag: Tag ) : boolean {

		return( this.tags.indexOf( tag ) !== -1 );

	}


	// I emit a new collection of tags with the given tag removed from the collection
	// (using a CASE SENSITIVE filter).
	public removeTag( tag: Tag ) : void {

		if ( this.hasTag( tag ) ) {

			this.tagsChangeEvents.emit( this.filterOut( this.tags, tag ) );

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I filter the given tag out of the given tags collection.
	private filterOut( tags: Tags, tag: Tag ) : Tags {

		var filteredTags = tags.filter(
			( currentTag ) => {

				return( currentTag !== tag );

			}
		);

		return( filteredTags );

	}

}
