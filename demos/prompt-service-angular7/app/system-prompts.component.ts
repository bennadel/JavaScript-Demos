
// Import the core angular services.
import { Component } from "@angular/core";
import { NavigationStart as NavigationStartEvent } from "@angular/router";
import { Router } from "@angular/router";

// Import the application components and services.
import { ConfirmResult } from "./confirm.service";
import { ConfirmService } from "./confirm.service";
import { PromptResult } from "./prompt.service";
import { PromptService } from "./prompt.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-system-prompts",
	styleUrls: [ "./system-prompts.component.less" ],
	template:
	`
		<ng-template [ngIf]="confirmService.isPending()">

			<app-confirm
				[message]="confirmService.message"
				(value)="handleConfirm( $event )">
			</app-confirm>

		</ng-template>

		<ng-template [ngIf]="promptService.isPending()">

			<app-prompt
				[message]="promptService.message"
				[defaultValue]="promptService.defaultValue"
				(value)="handlePrompt( $event )">
			</app-prompt>

		</ng-template>
	`
})
export class SystemPromptsComponent {

	public confirmService: ConfirmService;
	public promptService: PromptService;

	private router: Router;

	// I initialize the system-prompts component.
	constructor(
		confirmService: ConfirmService,
		promptService: PromptService,
		router: Router
		) {

		this.confirmService = confirmService;
		this.promptService = promptService;
		this.router = router;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the value-emission from the confirm component.
	public handleConfirm( value: ConfirmResult ) : void {

		this.confirmService.resolve( value );

	}


	// I handle the value-emission from the prompt component.
	public handlePrompt( value: PromptResult ) : void {

		this.promptService.resolve( value );

	}


	// I get called after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// The default browser behavior (at least in Chrome) for things like alert(),
		// confirm(), and prompt(), is to cancel the prompt if the user navigates away
		// from the current view. As such, we want to mimic the same natural behavior by
		// closing any pending prompt when a Navigation event is detected.
		this.router.events.subscribe(
			( event ) => {

				if ( event instanceof NavigationStartEvent ) {

					this.handleNavigation();

				}

				// CAUTION: It may be tempting to try and block the Router with a
				// CanDeactivate guard that looks to see if a Confirm or Prompt is
				// pending. However, this will end up being a rabbit-hole as there is a
				// known bug - 2-years in the making - in which CanDeactivate guards
				// break the browser's history stack.
				// --
				// Read More: https://github.com/angular/angular/issues/13586

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle the NavigationStart event, closing any pending prompts (with default
	// rejection-oriented values).
	public handleNavigation() : void {

		if ( this.confirmService.isPending() ) {

			this.confirmService.resolveWithDefault();

		} else if ( this.promptService.isPending() ) {

			this.promptService.resolveWithDefault();

		}

	}

}
