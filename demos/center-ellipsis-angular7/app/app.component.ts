
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h2>
			User-Provided Project Names
		</h2>

		<p *ngFor="let projectName of projects" class="item">

			<app-smart-shrink
				[text]="projectName">
			</app-smart-shrink>

		</p>
	`
})
export class AppComponent {
	
	public projects: string[];

	// I initialize the app component.
	constructor() {

		this.projects = [
			"This is a really long project name over here",
			"I am also quite long in my own right, not to be outdone",
			"This is my long long long long project name",
			"I am short",
			"I am tiny",
			"I am the craziest project name that you have ever seen in your whole life - no one does this!"
		];

	}

}
