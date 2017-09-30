
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "enterprise-demo-scheduled-view",
	styleUrls: [ "./enterprise-demo-scheduled-view.component.less" ],
	templateUrl: "./enterprise-demo-scheduled-view.component.htm"
})
export class EnterpriseDemoScheduledViewComponent implements OnInit, OnDestroy {

	private activatedRoute: ActivatedRoute;
	private keyboardShortcuts: KeyboardShortcuts;
	private router: Router;
	private unlisten: Unlisten;
	
	// I initialize the enterprise-demo-scheduled-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		keyboardShortcuts: KeyboardShortcuts,
		router: Router
		) {
		
		this.activatedRoute = activatedRoute;
		this.keyboardShortcuts = keyboardShortcuts;
		this.router = router;

		this.unlisten = null;
		
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I close the modal window.
	public closeModal() : void {

		this.router.navigate(
			[
				"/app",
				{
					outlets: {
						modal: null
					}
				}
			]
		);
		
	}


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.unlisten ) && this.unlisten();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

		this.unlisten = this.keyboardShortcuts.listen(
			{
				"Escape": ( event: KeyboardEvent ) : void => {

					this.closeModal();

				}
			},
			{
				priority: this.keyboardShortcuts.getPriority( "modal" ),
				inputs: true
			}
		);

	}

}
