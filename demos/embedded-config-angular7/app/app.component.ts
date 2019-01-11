
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AppConfig } from "./app.config";
import { Company } from "./app.config";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h2>
			Dynamic Company Configuration
		</h2>

		<ul>
			<li>
				<strong>ID:</strong> {{ company.id }}
			</li>
			<li>
				<strong>Name:</strong> {{ company.name }}
			</li>
			<li>
				<strong>Establised:</strong> {{ company.established }}
			</li>
		</ul>
	`
})
export class AppComponent {

	public company: Company;

	// I initialize the app component.
	constructor( config: AppConfig ) {

		console.group( "App Component Constructor" );
		console.log( "App Config" );
		console.log( config );
		console.groupEnd();

		this.company = config.company;

	}

}
