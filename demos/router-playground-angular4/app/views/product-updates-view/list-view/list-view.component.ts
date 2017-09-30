
// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ProductUpdate {
	id: number;
	message: string;
	staff: {
		name: string;
		initials: string;
	}
}

@Component({
	selector: "list-view",
	styleUrls: [ "./list-view.component.less" ],
	templateUrl: "./list-view.component.htm"
})
export class ListViewComponent {

	public isLoading: boolean;
	public updates: ProductUpdate[];

	private errorLogger: ErrorLogger;
	private partialService: PartialService;
	private router: Router;

	// I initialize the list-view component.
	constructor(
		errorLogger: ErrorLogger,
		partialSerivce: PartialService,
		router: Router
		) {

		this.errorLogger = errorLogger;
		this.partialService = partialSerivce;
		this.router = router;

		this.isLoading = true;
		this.updates = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public ngOnInit() : void {

		this.loadData();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData() : void {

		this.isLoading = true;
		this.partialService
			.get()
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.updates = partial.updates;

				}
			)
			.catch(
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									modal: "modal/error/could-not-load-product-updates",
									updates: null
								}
							}
						]
					);

				}
			)
		;

	}

}
