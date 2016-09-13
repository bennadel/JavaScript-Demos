
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
				// When transitioning to and from a given state, we can SOMETIMES use 
				// the "*" to leverage whatever the existing runtime value is (or should 
				// be) for the given property. Support for this depends on the browser. 
				// For example, in Chrome, we can use borderRadius:"*"; but, in Firefox, 
				// it will throw the error:
				// --
				// Animation to or from an underlying value is not yet supported.
				// --
				// Both Chrome and Firefox support width:"*" and height:"*".
				transition(
					"void => *",
					[
						style({
							height: 0,
							width: 0
						}),
						animate(
							"1000ms ease-in-out",
							style({
								height: "*",
								width: "*"
							})
						)
					]
				),
				transition(
					"* => void",
					[
						style({
							borderRadius: "*",
							height: "*",
							width: "*"
						}),
						animate(
							"1000ms ease-in-out",
							style({
								borderRadius: 0,
								height: 0,
								width: 0
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
			<a (click)="toggleBox()">Toggle Box</a>
		</p>

		<div *ngIf="isShowingBox" @boxAnimation class="box">
			<br />
		</div>
	`
})
export class AppComponent {

	public isShowingBox: boolean;


	// I initialize the component.
	constructor() {

		this.isShowingBox = false;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I show or hide the box depending on the current state.
	public toggleBox() : void {

		this.isShowingBox = ! this.isShowingBox;

	}

}
   