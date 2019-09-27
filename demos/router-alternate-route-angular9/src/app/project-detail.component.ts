
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-project-detail",
	styleUrls: [ "./project-detail.component.less" ],
	template:
	`
		<h3>
			Project Detail
		</h3>

		<p>
			Currently viewing project: <strong>{{ projectID }}</strong>.
		</p>
	`
})
export class ProjectDetailComponent {

	public projectID: string;

	private activatedRoute: ActivatedRoute;

	// I initialize the project detail.
	constructor( activatedRoute: ActivatedRoute ) {

		this.activatedRoute = activatedRoute;
		this.projectID = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.activatedRoute.params.subscribe(
			( params ) => {

				this.projectID = params.projectID;

			}
		);

	}

}
