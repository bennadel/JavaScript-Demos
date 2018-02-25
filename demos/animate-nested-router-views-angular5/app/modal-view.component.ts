
// Import the core angular services.
import { animateChild } from "@angular/animations";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { query } from "@angular/animations";
import { Router } from "@angular/router";
import { transition } from "@angular/animations";
import { trigger } from "@angular/animations";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "modal-view",
	// Bind an animation trigger to the router-outlet-injected view itself.
	host: {
		"[@modalView]": "navigationCount"
	},
	animations: [
		trigger(
			"modalView",
			[
				// If this modal-view is rendered as part of a page refresh, we don't 
				// want to include any animations - animations are for mental modal; and,
				// if this is the initial page load, there can be no meaningful mental 
				// model portrayed for the user and the modal window. As such, we need to
				// denote the modal-view has having a "transition" so that the nested 
				// view transitions will be inherently blocked.
				transition( "void => 0", [] ),

				// While we don't want a transition on page-refresh, we certainly do want
				// the animations to play when the modal-view is opened or closed during
				// the normal control flow of the application. As such, for the :enter
				// :leave transitions, we want to query for the router-outlet component
				// and ask its animations to run (if it has any).
				transition(
					":enter, :leave",
					[
						// As the modal-view enters or leaves, we want to allow any of
						// nested view animations to execute.
						// --
						// CAUTION: This query selector does not get the simulated 
						// encapsulation attribute selectors. This will go DEEP through
						// the descendant DOM tree if you're not careful. As such, we 
						// MUST USE the "limit" property to prevent deeper matches from
						// being exercised.
						query(
							"@*",
							animateChild(),
							{
								limit: 1,
								optional: true
							}
						)
					]
				),

				// By default, we want to block all nested animations (and then 
				// selectively re-enable them using the transitions above). As such, we
				// have to define a generic no-op transition from every state to every
				// other state. This transition will inherently block the transitions
				// contained within any nested views.
				transition( "* <=> *", [] )
			]
		)
	],
	styleUrls: [ "./modal-view.component.less" ],
	template:
	`
		<router-outlet (activate)="handleActivate()"></router-outlet>
	`
})
export class ModalViewComponent implements OnInit, OnDestroy {

	public navigationCount: number;

	// I initialize the modal-view component.
	constructor( router: Router ) {

		// If the router has NOT YET BEEN NAVIGATED, it means that this rendering is the
		// initial loading of the application. As such, we do not want to animate the
		// modal window. By changing the value here, we can pin-point the first load in
		// the animation trigger state transition.
		// --
		// NOTE: Ideally, this kind of logic would just be on the APP COMPONENT; but,
		// for some reason, I cannot get a transition on the app component to block
		// animations that are nested in the view-tree.
		this.navigationCount = router.navigated
			? 0
			: -1 // First navigation will transition ( -1 => 0 )
		;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the activation event of every new view that's mounted inside the modal-
	// view's router-outlet.
	public handleActivate() : void {

		// When transitioning from one modal window to another, we need to have the top-
		// level modal-view's animation run such that it blocks the views in the nested
		// modal instances. In order to do that, we need to have a state-transition. And,
		// in order to force a state-transition, we're just going to increment a value
		// every time the sub-view changes.
		this.navigationCount++;

	}


	// I get called once when the input is being unmounted.
	public ngOnDestroy() : void {

		// Allow the normal scrollbars to show on the document viewport.
		document.documentElement.style.overflow = "auto";
		document.body.style.overflow = "auto";

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Hide the scrollbars on the document viewport while the modal window is
		// open. This will prevent scrolling in the modal layout from causing unwanted
		// scrolling in the main document viewport.
		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

	}

}
