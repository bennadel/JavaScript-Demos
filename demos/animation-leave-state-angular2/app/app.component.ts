
// Import the core angular services.
import { animate } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";

@Component({
	selector: "my-app",
	animations: [
		trigger(
			"boxAnimation",
			[
				// In this collection of transitions, the initiate state of the animation 
				// is determined by the boxState expression that is being driven by the 
				// user interaction.
				transition(
					"withOpacity => void",
					[
						style({
							opacity: 1.0
						}),
						animate(
							"1000ms ease-in",
							style({
								opacity: 0.0
							})
						)
					]
				),
				transition(
					"withRotation => void",
					[
						style({
							opacity: 1.0,
							transform: "rotate( 0deg )"
						}),
						animate(
							"1000ms ease-in",
							style({
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
		<ul>
			<li>
				<a (click)="removeBox( 'withOpacity' )">Remove w/ Opacity</a>
			</li>
			<li>
				<a (click)="removeBox( 'withOpacity', true )">Remove w/ Opacity + ChangeDetection</a>
			</li>
			<li>
				<a (click)="removeBox( 'withRotation', true )">Remove w/ Rotation + ChangeDetection</a>
			</li>
		</ul>

		<div class="container">
			<template [ngIf]="isShowingBox">

				<div [@boxAnimation]="boxState" class="box">
					Box
				</div>

			</template>
		</div>
	`
})
export class AppComponent {

	public boxState: string;
	public isShowingBox: boolean;

	private changeDetectorRef: ChangeDetectorRef;


	// I initialize the component.
	constructor( changeDetectorRef: ChangeDetectorRef ) {

		this.changeDetectorRef = changeDetectorRef;
		
		this.boxState = "none";
		this.isShowingBox = true;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I remove the box by first putting the box animation into the given state and then
	// updating the flag that removes the box from the view. The `runChangeDetection` 
	// argument determines whether or not a change-detection is run in between these 
	// two steps.
	public removeBox( fromState: string, runChangeDetection: boolean = false ) : void {

		console.group( "removeBox()" );
		console.log( "Setting state to:", fromState );

		// STEP 1: Set animation state.
		// ---
		// Set the state that will determine which animation transition will take place
		// when the box is removed from the view ( boxState => void ).
		this.boxState = fromState;

		// STEP 2: Run change detection.
		// ---
		// Run change-detection if requested. Doing this will apply the boxState change
		// BEFORE we try to remove the box from the view.
		if ( runChangeDetection ) {

			console.log( "Running change-detection." );

			this.changeDetectorRef.detectChanges();

		}

		// STEP 3: Remove box.
		// ---
		// Remove the box from the view.
		this.isShowingBox = false;

		console.groupEnd();


		// In a few seconds, reset the demo.
		setTimeout( 
			() => {

				this.isShowingBox = true;
				this.boxState = "none";

			},
			( 2 * 1000 )
		);

	}

}
   