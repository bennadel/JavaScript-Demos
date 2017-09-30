
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// Import the application components and services.
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "create-project-view",
	styleUrls: [ "./create-project-view.component.less" ],
	templateUrl: "./create-project-view.component.htm"
})
export class CreateProjectViewComponent implements OnInit, OnDestroy {

	public form: {
		name: string;
	};
	public options: string[];
	public projectType: string;
	public selectedOption: string;

	private activatedRoute: ActivatedRoute;
	private keyboardShortcuts: KeyboardShortcuts;
	private paramMapSubscription: Subscription;
	private router: Router;
	private unlisten: Unlisten;

	// I initialize the create-project-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		keyboardShortcuts: KeyboardShortcuts,
		router: Router
		) {
		
		this.activatedRoute = activatedRoute;
		this.keyboardShortcuts = keyboardShortcuts;
		this.router = router;

		this.form = {
			name: ""
		};
		this.options = [];
		this.projectType = null;
		this.selectedOption = "";
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

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();
		( this.unlisten ) && this.unlisten();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.delay( 10 )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					this.projectType = ( paramMap.get( "projectType" ) || null );

					// When switching the project type, we need to reset the options.
					this.selectedOption = "";
					this.options = [];

					switch ( this.projectType ) {
						case "board":
							this.options = [ "Masonry", "Meticulous", "Grid" ];
						break;
						case "prototype":
							this.options = [ "Desktop (Web)", "iPad", "Android Tablet", "iPhone", "Android Phone", "Apple Watch", "Android Watch" ];
						break;
					}

				}
			)
		;

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


	public processForm() : void {

		switch ( this.projectType ) {
			case "board":
				var resource = "boards/1";
			break;
			case "freehand":
				var resource = "freehands/1";
			break;
			case "prototype":
				var resource = "prototypes/1";
			break;
		}

		this.router.navigate(
			[
				"/app",
				{
					outlets: {
						primary: resource,
						modal: null
					}
				}
			]
		);

	}


	public selectOption( option: string ) : void {

		this.selectedOption = option;

	}

}
