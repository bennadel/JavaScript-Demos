
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Project } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-approach-two",
	inputs: [ "projects" ],
	styleUrls: [ "./approach-two.component.less" ],
	template:
	`
		<h2>
			Inline Editing Approach
		</h2>

		<ul>
			<li
				*ngFor="let project of projects"
				[ngSwitch]="( project === selectedProject )">

				<div *ngSwitchCase="true" class="editor">

					<input
						type="text"
						name="value"
						autofocus
						[(ngModel)]="pendingValue"
						(keydown.Enter)="processChanges()"
						(keydown.Meta.Enter)="processChanges()"
						(keydown.Escape)="cancel()"
					/>

					<button (click)="processChanges()">
						Save
					</button>

					<a
						(click)="cancel()"
						(keydown.Enter)="cancel()"
						tabindex="0">
						Cancel
					</a>

				</div>

				<div *ngSwitchCase="false" (click)="edit( project )">

					{{ project.name }}

				</div>

			</li>
		</ul>
	`
})
export class ApproachTwoComponent {

	public pendingValue: string;
	public projects!: Project[];
	public selectedProject: Project | null;

	// I initialize the approach-two component.
	constructor() {

		this.pendingValue = "";
		this.selectedProject = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I cancel editing of the selected project.
	public cancel() : void {

		this.selectedProject = null;

	}


	// I enable editing of the given project.
	public edit( project: Project ) : void {

		this.pendingValue = project.name;
		this.selectedProject = project;

	}


	// I process changes to the selected project's name.
	public processChanges() : void {

		if ( this.pendingValue !== this.selectedProject!.name ) {

			// CAUTION: Normally, I would emit some sort of "rename" event to the calling
			// context. But, for the sake of simplicity, I'm just mutating the project
			// directly since having several sibling components that both edit project
			// names is incidental and not the focus of this exploration.
			this.selectedProject!.name = this.pendingValue;

		}

		this.selectedProject = null;

	}

}
