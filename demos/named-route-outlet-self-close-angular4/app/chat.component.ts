
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "chat",
	styleUrls: [ "./chat.component.css" ],
	template: 
	`
		<h3>
			Chat Widget
		</h3>

		<p>
			<em>How can I help you?</em>
		</p>

		<h4>
			Self-Closing Functionality
		</h4>

		<p>
			<a [routerLink]="[ '../', { outlets: { chat: null } } ]">Close (via RouterLink)</a>
			&mdash; 
			<strong>Broken</strong>
			<em>(will appear to work, but will break on page-refresh)</em>.
		</p>

		<p>
			<a (click)="closeChatViaMe()">Close (via .navigate() using self)</a>
			&mdash; 
			<strong>Broken</strong>
			<em>(will appear to work, but will break on page-refresh)</em>.
		</p>

		<p>
			<a (click)="closeChatViaParent()">Close (via .navigate() using parent)</a>
		</p>
	`
})
export class ChatComponent {
	
	private activatedRoute: ActivatedRoute;
	private router: Router;

	// I initialize the chat view component.
	constructor( activatedRoute: ActivatedRoute, router: Router ) {

		this.activatedRoute = activatedRoute;
		this.router = router;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I attempt to close the chat by nullifying the secondary outlet using RELATIVE PATH
	// navigation commands.
	// --
	// CAUTION: This is BROKEN. This DOES NOT WORK.
	public closeChatViaMe() : void {

		this.router.navigate(
			[
				"../",
				{
					outlets: {
						chat: null
					}
				}
			],
			{
				relativeTo: this.activatedRoute
			}
		);

	}


	// I attempt to close the chat by nullifying the secondary outlet using the PARENT'S
	// ACTIVATED ROUTE.
	public closeChatViaParent() : void {

		this.router.navigate(
			[
				// NOTE: No relative-path navigation is required because we are accessing
				// the parent's "activatedRoute" instance. As such, this will be executed
				// as if we were doing this in the parent view component.
				{
					outlets: {
						chat: null
					}
				}
			],
			{
				relativeTo: this.activatedRoute.parent // <--- PARENT activated route.
			}
		);

	}

}
