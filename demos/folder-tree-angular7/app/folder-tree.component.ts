
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

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
	selector: "my-folder-tree",
	inputs: [
		"expandedFolders",
		"rootFolder"
	],
	outputs: [
		"toggleFolderEvents: toggleFolder"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./folder-tree.component.less" ],
	template:
	`
		<my-folder
			[folder]="rootFolder"
			[expandedFolders]="expandedFolders"
			(toggleFolder)="toggleFolder( $event )">
		</my-folder>
	`
})
export class FolderTreeComponent {

	public expandedFolders!: string[];
	public rootFolder!: Folder;
	public toggleFolderEvents: EventEmitter<Folder>;

	// I initialize the folder-tree component.
	constructor() {

		this.toggleFolderEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I emit a toggle event for the given folder.
	public toggleFolder( target: Folder ) : void {

		this.toggleFolderEvents.emit ( target );

	}

}
