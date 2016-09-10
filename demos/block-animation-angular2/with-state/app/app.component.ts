
// Import the core angular services.
import { animate } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";
import { state } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";

@Component({
	selector: "my-app",
	animations: [
		// Notice that we are setting up an animation for the Box, but not for the
		// container. In this demo, the container doesn't have any animation; but,
		// it is still added and removed from the view as well (along with its Box
		// descendant element).
		trigger(
			"boxAnimation",
			[
				state(
					"void", 
					style({
						borderRadius: 50,
						opacity: 0.0,
						transform: "rotate( 900deg )"
					})
				),

				// Notice that we are explicitly using an "active" state rather than
				// the catch-all, non-void "*" state from the previous demo.
				state(
					"active",
					style({
						borderRadius: 4,
						opacity: 1.0,
						transform: "rotate( 0deg )"
					})
				),

				// Notice that we are only animating transitions to and from the "active"
				// state - we are no longer using the "*" as an animated state.
				transition( 
					"void => active , active => void",
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
			<a (click)="toggleContainer()">Toggle Container</a>
			&mdash;
			<a (click)="toggleBox()">Toggle Box</a>
		</p>

		<div *ngIf="isShowingContainer" class="container">

			<div *ngIf="isShowingBox" [@boxAnimation]="boxAnimationState" class="box">
				Box
			</div>

		</div>
	`
})
export class AppComponent {

	public boxAnimationState: string;
	public isShowingBox: boolean;
	public isShowingContainer: boolean;

	private changeDetectionRef: ChangeDetectorRef;


	// I initialize the component.
	constructor( changeDetectionRef: ChangeDetectorRef ) {

		this.changeDetectionRef = changeDetectionRef;
		this.isShowingBox = true;
		this.isShowingContainer = true;

		// In this version of the demo, we are going to take steps to counteract the 
		// BUGGY BEHAVIOR with initial and nested animations. To prevent the initial 
		// rendering from animation, we'll put the animation state in a "blocked" state.
		// Then, we'll configure our animation meta-data to use an "active" state rather 
		// than the catch-all non-void "*" state (see component meta-data above).
		this.boxAnimationState = "blocked";

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I add or remove the box from the view, depending on the current rendering.
	public toggleBox() : void {

		this.isShowingBox = ! this.isShowingBox;

	}


	// I add or remove the container from the view, depending on the current rendering.
	public toggleContainer() : void {

		this.isShowingContainer = ! this.isShowingContainer;

		// If we are showing the Container then it means we are implicitly showing the
		// Box as well. As such, we have to take some special steps to make sure we don't
		// get the BUGGY nested animations.
		if ( this.isShowingContainer ) {

			// First, put the Box into a "blocked" state. This will prevent it from 
			// animating since none of the animation meta-data deals with this state.
			this.boxAnimationState = "blocked";

			// Now, we tell Angular to run the change-detection. Since the 
			// "isShowingContainer" view-model has changed, this will cause the Container
			// to be rendered. The box will also be rendered; however, since it is in a 
			// "blocked" state, it will NOT BE animated.
			this.changeDetectionRef.detectChanges();

			// Once the Container and the box have been rendered, we can put the box 
			// into the active state so that it can be animated on subsequent view-
			// model changes.
			this.boxAnimationState = "active";

		}

	}

}
   