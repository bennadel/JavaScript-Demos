
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Folder {
	uid: string;
	name: string;
	folders: Folder[];
	files: File[];
}

export interface File {
	uid: string;
	name: string;
}

@Component({
	selector: "my-folder",
	inputs: [
		"expandedFolders",
		"folder"
	],
	outputs: [
		"toggleFolderEvents: toggleFolder"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./folder.component.less" ],
	templateUrl: "./folder.component.htm"
})
export class FolderComponent {

	public expandedFolders!: string[];
	public folder!: Folder;
	public isExpanded: boolean;
	public toggleFolderEvents: EventEmitter<Folder>;
	
	// I initialize the folder component.
	constructor() {

		this.isExpanded = false;
		this.toggleFolderEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when any of the inputs bindings change.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// When either the folder or the list of expanded folders changes, let's check
		// to see if the current folder's expanded status has changed.
		this.isExpanded = ( this.expandedFolders.indexOf( this.folder.uid ) !== -1 );

	}


	// I emit a toggle event for the given folder.
	// --
	// CAUTION: This method may be invoked due to a local toggle action; or, as part of
	// the bubbling-up of a toggle action in a nested folder. In order to follow a one-
	// way data-flow, all toggle requests are bubbled-up instead of being applied
	// directly to the local view-state.
	public toggleFolder( target: Folder ) : void {

		this.toggleFolderEvents.emit( target );

	}

}
