
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Account } from "./api.service";
import { ApiService } from "./api.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ng-template [ngIf]="( ! account )">

			<p>
				<em>Loading....</em>
			</p>

		</ng-template>

		<ng-template [ngIf]="account">

			<h2>
				Welcome {{ account.name }}
			</h2>

			<p>
				I'm Johnny Cab - where can I take you tonight?
			</p>

		</ng-template>
	`
})
export class AppComponent {

	public account: Account | null;

	private apiService: ApiService;

	// I initialize the app component.
	constructor( apiService: ApiService ) {

		this.apiService = apiService;
		this.account = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.apiService.getAccount().subscribe(
			( account ) => {

				console.group( "Account Response" );
				console.log( account );
				console.groupEnd();

				this.account = account;

			}
		);

	}

}
