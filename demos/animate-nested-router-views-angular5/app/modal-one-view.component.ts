
// Import the core angular services.
import { animate } from "@angular/animations";
import { Component } from "@angular/core";
import { query } from "@angular/animations";
import { style } from "@angular/animations";
import { transition } from "@angular/animations";
import { trigger } from "@angular/animations";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "modal-one-view",
	// Bind an animation trigger to the router-outlet-injected view itself.
	// --
	// CAUTION: The animation trigger does not seem to get picked-up if it's just an
	// attribute. Meaning, it has to be a [property] assignment.
	host: {
		"[@modalOneView]": "true"
	},
	animations: [
		// Define animations for the ROUTABLE VIEW itself, which has a HOST BINDING for 
		// this animation trigger.
		trigger(
			"modalOneView",
			[
				transition(
					":enter",
					[
						// Since we're going to be animating the modal in from an off-
						// screen location, we want to disable any local overflow so that
						// we don't see the interim scrollbars.
						style({
							overflow: "hidden"
						}),
						// Animate the content container in from the left.
						// --
						// CAUTION: This query selector does not get the simulated 
						// encapsulation attribute selectors. This will go DEEP
						// through the descendant DOM tree if you're not careful.
						query(
							".content",
							[
								style({
									left: "-10%"
								}),
								animate(
									"1000ms ease-out",
									style({
										left: "*"
									})
								)
							]
						)

					]
				),
				transition(
					":leave",
					[
						// Since we're going to be animating the modal out to an off-
						// screen location, we want to disable any local overflow so that
						// we don't see the interim scrollbars.
						style({
							overflow: "hidden"
						}),
						// Animate the content container out to the left.
						// --
						// CAUTION: This query selector does not get the simulated 
						// encapsulation attribute selectors. This will go DEEP
						// through the descendant DOM tree if you're not careful.
						query(
							".content",
							[
								style({
									left: "*"
								}),
								animate(
									"1000ms ease-in",
									style({
										left: "-10%"
									})
								)
							]
						)

					]
				)
			]
		)
	],
	styleUrls: [ "./modal-one-view.component.less" ],
	template:
	`
		<div class="content">
			<h2>
				Modal One
			</h2>

			<p>
				Bruv, this modal is player, init?
			</p>

			<p>
				<a routerLink="/app/modal/two">Goto modal Two</a>
			</p>

			<p>
				or, <a routerLink="/">Close</a>
			</p>

			<p>
				<strong>NOTE</strong>: Refresh the page to see that animations
				are blocked on the nested view.
			</p>
		</div>
	`
})
export class ModalOneViewComponent {
	// ...
}
