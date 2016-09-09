
// Import the core angular services.
import { animate } from "@angular/core";
import { Component } from "@angular/core";
import { state } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";

@Component({
	selector: "my-app",
	animations: [
		trigger(
			"boxAnimation",
			[
				// Even though the "void" state is not rendered, per-say, we can style
				// it. This way, when we transition to and from the "void" state, 
				// Angular will know what CSS properties to animate.
				state(
					"void", 
					style({
						borderRadius: 50,
						opacity: 0.0,
						transform: "rotate( 900deg )"
					})
				),

				// CAUTION: The non-void state needs to be styled for the Web Animations
				// API ** polyfill **. When running in Chrome, which has native support 
				// for the Web Animations API, you do NOT need this state() block. If you
				// attempt to omit this in Firefox, however, you get the following error:
				// --
				// Animation to or from an underlying value is not yet supported.
				// --
				state(
					"*",
					style({
						borderRadius: 4,
						opacity: 1.0,
						transform: "rotate( 0deg )"
					})
				),

				// Now, when we transition to and from the "void" state, we don't have
				// to provide additional styles - we only need to provide the relevant 
				// animation duration and timing functions.
				transition( 
					"void => * , * => void",
					[
						animate( "1000ms ease-in-out" )
					] 
				)
			] // End: boxAnimation.
		)
	],
	template:
	`
		<p>
			<a (click)="removeBox()">Remove Box</a>
		</p>

		<div class="container">
			<template [ngIf]="isShowingBox">

				<div @boxAnimation class="box">
					Box
				</div>

			</template>
		</div>
	`
})
export class AppComponent {

	public isShowingBox: boolean;


	// I initialize the component.
	constructor() {

		this.isShowingBox = true;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I remove the box from the view-rendering; then, several seconds later, add it
	// back so that it can be removed again.
	public removeBox() : void {

		this.isShowingBox = false;

		// In a few seconds, reset the view.
		setTimeout(
			() : void => {
		
				this.isShowingBox = true;
		
			},
			2000
		);
		
	}

}
   