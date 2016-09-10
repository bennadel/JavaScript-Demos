
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
				state(
					"*",
					style({
						borderRadius: 4,
						opacity: 1.0,
						transform: "rotate( 0deg )"
					})
				),
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
			<a (click)="toggleContainer()">Toggle Container</a>
			&mdash;
			<a (click)="toggleBox()">Toggle Box</a>
		</p>

		<div *ngIf="isShowingContainer" class="container">

			<div *ngIf="isShowingBox" @boxAnimation class="box">
				Box
			</div>

		</div>
	`
})
export class AppComponent {

	public isShowingBox: boolean;
	public isShowingContainer: boolean;


	// I initialize the component.
	constructor() {

		this.isShowingBox = true;
		this.isShowingContainer = true;

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

	}

}
   