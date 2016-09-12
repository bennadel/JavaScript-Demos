
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
		// Notice that with the container, we are defining the Void and Non-Void states
		// and then defining a transition time between the two. This is exactly the same
		// thing we are doing with the boxOne animation as well.
		trigger(
			"containerAnimation",
			[
				state(
					"void",
					style({
						borderRadius: 150
					})
				),
				state(
					"*",
					style({
						borderRadius: 5
					})
				),
				transition(
					"void => * , * => void",
					animate( "1000ms ease-in-out" )
				)
			]
		),

		// As the container is rendered, Box One will come up from the bottom. Notice 
		// that we are defining the animation in the same way that we are defining the
		// container animation - void state, non-void state, and then transition timing.
		trigger(
			"boxOneAnimation",
			[
				state(
					"void",
					style({
						top: "100%",
						opacity: 0.0,
						transform: "rotate( 1000deg )"
					})
				),
				state(
					"*",
					style({
						top: "50%",
						opacity: 1.0,
						transform: "rotate( 0deg )"
					})
				),
				transition(
					"void => * , * => void",
					animate( "1000ms ease-in-out" )
				)
			]
		),

		// As the container is rendered, Box Two will come down from the top. For this
		// box, we are attempting to define that animation styling as part of each 
		// transition configuration (rather than relying on state-based styles).
		// --
		// NOTE: I'm using a different format here in an attempt to see if the mode of
		// configuration is in some way adding to the asymmetric support for animation.
		trigger(
			"boxTwoAnimation",
			[
				transition(
					"void => *",
					[
						style({
							top: "-10%",
							opacity: 0.0,
							transform: "rotate( 1000deg )"
						}),
						animate(
							"1000ms ease-in-out",
							style({
								top: "50%",
								opacity: 1.0,
								transform: "rotate( 0deg )"
							})
						)
					]
				),
				transition(
					"* => void",
					[
						style({
							top: "50%",
							opacity: 1.0,
							transform: "rotate( 0deg )"
						}),
						animate(
							"1000ms ease-in-out",
							style({
								top: "-10%",
								opacity: 0.0,
								transform: "rotate( 1000deg )"
							})
						)
					]
				)
			]
		)
	],
	template:
	`
		<p>
			<a (click)="toggleContainer()">Toggle Container</a>
			&mdash;
			<a (click)="toggleBoxes()">Toggle Boxes</a>
		</p>

		<div *ngIf="isShowingContainer" @containerAnimation class="container">
			
			<div *ngIf="isShowingBoxes" @boxOneAnimation class="box-one">
				Box One
			</div>
			
			<div *ngIf="isShowingBoxes" @boxTwoAnimation class="box-two">
				Box Two
			</div>

		</div>
	`
})
export class AppComponent {

	public isShowingBoxes: boolean;
	public isShowingContainer: boolean;


	// I initialize the component.
	constructor() {

		this.isShowingBoxes = true;
		this.isShowingContainer = false;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I show or hide the boxes depending on the current state.
	public toggleBoxes() : void {

		this.isShowingBoxes = ! this.isShowingBoxes;

	}


	// I show or hide the container depending on the current state.
	public toggleContainer() : void {

		this.isShowingContainer = ! this.isShowingContainer;

		// If we're toggling the container into view, show the boxes as well.
		if ( this.isShowingContainer ) {

			this.isShowingBoxes = true;

		}

	}

}
   