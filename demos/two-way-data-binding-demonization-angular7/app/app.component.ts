
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h3>
			Using Two-Way Data Binding
		</h3>

		<bn-tags [(tags)]="tagsA"></bn-tags>

		<h3>
			Using One-Way Data Flow
		</h3>

		<bn-tags
			[tags]="tagsB"
			(add)="addTagToB( $event )"
			(remove)="removeFromB( $event )">
		</bn-tags>
	`
})
export class AppComponent {

	public tagsA: string[];
	public tagsB: string[];

	// I initialize the app component.
	constructor() {

		this.tagsA = [ "awesome", "cool" ];
		this.tagsB = [ "bad", "lazy" ];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the "add" event being emitted from the tags component for TagsB.
	public addTagToB( newTagName: string ) : void {

		this.tagsB = this.tagsB.concat( newTagName );

	}


	// I handle the "remove" event being emitted from the tags component for TagsB.
	public removeFromB( index: number ) : void {

		this.tagsB = [
			...this.tagsB.slice( 0, index ),
			...this.tagsB.slice( index + 1 )
		];

	}

}
