
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-projects",
	styleUrls: [ "./projects.component.less" ],
	template:
	`
		<h2>
			Projects
		</h2>

		<ul>
			<li>
				<a routerLink="/app/projects/1">Project 1</a>
			</li>
			<li>
				<a routerLink="/app/projects/2">Project 2</a>
			</li>
			<li>
				<a routerLink="/app/projects/3">Project 3</a>
			</li>
		</ul>

		<router-outlet></router-outlet>
	`
})
export class ProjectsComponent {

	// ....

}
