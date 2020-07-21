
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Project } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-approach-one",
	inputs: [ "projects" ],
	styleUrls: [ "./approach-one.component.less" ],
	template:
	`
		<h2>
			Encapsulated Editing Approach
		</h2>

		<ul>
			<li *ngFor="let project of projects">

				<app-editable
					[value]="project.name"
					(valueChange)="saveProjectName( project, $event )">
				</app-editable>

			</li>
		</ul>
	`
})
export class ApproachOneComponent {

	public projects!: Project[];

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the rename event, persisting the new value to the given project.
	public saveProjectName( project: Project, newName: string ) : void {

		// CAUTION: Normally, I would emit some sort of "rename" event to the calling
		// context. But, for the sake of simplicity, I'm just mutating the project
		// directly since having several sibling components that both edit project names
		// is incidental and not the focus of this exploration.
		project.name = newName;

	}

}
