
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application services.
import { AccountService } from "./account.service";
import { AppReadyEvent } from "./app-ready-event";
import { IAccount } from "./account.service";

@Component({
	selector: "my-app",
	template:
	`
		<template [ngIf]="account">

			<h3>
				Welcome {{ account.name }}.
			</h3>

			<p>
				I hope youre having a beautiful day!
			</p>

		</template>
	`
})
export class AppComponent {

	public account: IAccount;


	// I initialize the component.
	constructor( accountService: AccountService, appReadyEvent: AppReadyEvent ) {

		this.account = null;

		// At this point, the application has "loaded" in so much as the assets have 
		// loaded; but, the we're not going to consider the application "ready" until
		// the core "data" has loaded. As such, we won't trigger the "appready" event
		// until the account has been loaded.
		accountService.getAccount().subscribe(
			( account ) => {

				this.account = account;

				// Now that the core data has loaded, let's trigger the event that the
				// pre-bootstrap loading screen is listening for. This will initiate 
				// the teardown of the loading screen.
				appReadyEvent.trigger();

			}
		);

	}

}
