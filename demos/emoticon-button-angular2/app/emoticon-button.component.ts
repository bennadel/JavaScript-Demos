
// Import the core angular services.
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChange } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// Animation-oriented imports.
import { animate } from "@angular/core";
import { AnimationTransitionEvent } from "@angular/core";
import { state } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";

interface InputChanges extends SimpleChanges {
	type?: SimpleChange;
	value?: SimpleChange;
}

// We have two different elements (next value and previous value) being animated in 
// unison. In order to keep both animations in sync, we'll define one timing value and
// then just reuse that in all of the animate() calls.
var valueAnimationTiming = "200ms ease-in-out";

@Component({
	moduleId: module.id,
	selector: "emoticon-button",
	inputs: [ "type", "value" ],
	animations: [
		trigger(
			"currentValue",
			[
				// Transition into view, from below.
				transition(
					"none => moving-up",
					[
						style({
							opacity: "0",
							transform: "translateY( 100% )"
						}),
						animate(
							valueAnimationTiming,
							style({
								opacity: "1",
								transform: "translateY( 0% )"
							})
						)
					]
				),
				// Transition into view, from above.
				transition(
					"none => moving-down",
					[
						style({
							opacity: "0",
							transform: "translateY( -100% )"
						}),
						animate(
							valueAnimationTiming,
							style({
								opacity: "1",
								transform: "translateY( 0% )"
							})
						)
					]
				)
			]
		),
		trigger(
			"previousValue",
			[
				// The actual DOM element for the previous value is only present during 
				// the animation itself (see ngIf in template). As such, it won't be 
				// transitioning from the "none" default state - it will be transitioning
				// into existence, from the "void" state.
				// --
				// Transition out of view, to above.
				transition(
					"void => moving-up",
					[
						style({
							opacity: "1",
							transform: "translateY( -100% )"
						}),
						animate(
							valueAnimationTiming,
							style({
								opacity: "0",
								transform: "translateY( -200% )"
							})
						)
					]
				),
				// Transition out of view, to below.
				transition(
					"void => moving-down",
					[
						style({
							opacity: "1",
							transform: "translateY( -100% )"
						}),
						animate(
							valueAnimationTiming,
							style({
								opacity: "0",
								transform: "translateY( 0% )"
							})
						)
					]
				)
			]
		)
	],
	styleUrls: [ "./emoticon-button.component.css" ],
	template:
	`
		<span class="emoticon emoticon--{{ type }}"></span>
		<span class="counter">
			
			<span
				[@currentValue]="valueState"
				(@currentValue.done)="handleAnimationDone( $event )"
				class="current-value">
				{{ value }}
			</span>
			
			<!-- 
				We only need to include the previous-value when we are animating the 
				increment / decrement. That means that the previous-value is never in
				the "none" state - it goes directly from "void" to an animation state.
			-->
			<span 
				*ngIf="( valueState !== 'none' )"
				[@previousValue]="valueState"
				class="previous-value">
				{{ previousValue }}
			</span>

		</span>
	`
})
export class EmoticonButtonComponent implements OnChanges {
	
	public previousValue: number;
	public type: string;
	public value: number;
	public valueState: string;


	// I initialize the emoticon button component.
	constructor() {

		this.previousValue = 0;
		this.type = "smile";
		this.value = 0;
		this.valueState = "none";

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle the animation "done" callback event.
	public handleAnimationDone( event: AnimationTransitionEvent ) : void {

		// CAUTION: If an animation transition is interrupted by a state-change, the 
		// "done" callback will be fired for the interrupted transition. In that case, 
		// the "toState" of the event will not match the "viewState" of the component. We
		// can use this fact to only "reset" the state when we have an expected outcome.
		if ( this.valueState !== "none" && ( this.valueState === event.toState ) ) {

			this.valueState = "none";

		}

	}


	// I get called whenever the bound inputs change (including the first binding).
	public ngOnChanges( changes: InputChanges ) : void {

		// After the value is initialized, subsequent changes to the value will be 
		// classified as "moving-up" or "moving-down" actions, which will be given 
		// some animation goodness.
		if ( changes.value && ! changes.value.isFirstChange() ) {

			this.previousValue = changes.value.previousValue;

			// Determine "direction" of value change for animation.
			this.valueState = ( changes.value.currentValue > changes.value.previousValue )
				? "moving-up" // Incrementing the value.
				: "moving-down" // Decrementing the value.
			;

		}

	}

}
