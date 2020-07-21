
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Project {
	id: string;
	name: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<app-approach-one [projects]="projects"></app-approach-one>
		<app-approach-two [projects]="projects"></app-approach-two>
		<app-approach-three [projects]="projects"></app-approach-three>
	`
})
export class AppComponent {

	public projects: Project[] = [
		{ id: "p1", name: "My Groovy Project" },
		{ id: "p2", name: "Another Cool Project" },
		{ id: "p3", name: "Much Project, Such Wow" },
		{ id: "p4", name: "A Good Project" }
	];

}
