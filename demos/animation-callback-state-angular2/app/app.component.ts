
// Import the core angular services.
import { animate } from "@angular/core";
import { AnimationTransitionEvent } from "@angular/core";
import { Component } from "@angular/core";
import { state } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	animations: [
		trigger(
			"thing",
			[
				state(
					"none",
					style({
						backgroundColor: "white",
						color: "black"
					})
				),
				state(
					"red",
					style({
						backgroundColor: "red",
						color: "white"
					})
				),
				state(
					"blue",
					style({
						backgroundColor: "blue",
						color: "white"
					})
				),
				transition( "none => red", animate( "2000ms ease-in-out" ) ),
				transition( "red => blue", animate( "2000ms ease-in-out" ) )
			]
		)
	],
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<div
			[@thing]="thingState"
			(@thing.done)="handleDone( $event )"
			(click)="animateThing()"
			class="box">

			I am a thing!

		</div>
	`
})
export class AppComponent {
	
	public thingState: string;
	

	// I initialize the app component.
	constructor() {

		// Thing can be in the following states:
		// - none (default)
		// - red
		// - blue
		this.thingState = "none";		

	}


	// ---
	// PUBLIC METODS.
	// ---


	// I initiate a state transition for the Thing.
	public animateThing() : void {

		var previousState = this.thingState;

		// If the Thing is in a default state, animate to RED; however, if we are 
		// currently in the RED state, then animate over to the BLUE state.
		this.thingState = ( this.thingState === "none" )
			? "red" // none => red
			: "blue" // red => blue
		;

		console.log( "Initiating animation to state:", previousState, "=>", this.thingState );

	}


	// I get called when an animation has completed. Completion may be caused by an
	// animation reaching its end-state; or, it may be called because the state changed
	// in the middle of an active transition.
	public handleDone( event: AnimationTransitionEvent ) : void {

		console.group( "Done animating" );
		console.log( "From:", event.fromState );
		console.log( "To:", event.toState );
		console.log( "Actual State:", this.thingState );
		console.groupEnd();

		// If the animation was allowed to complete fully, then the event.toState should
		// match the actual state of the trigger (and the event.totalTime should be 
		// accurate). HOWEVER, if the current transition was interrupted, and the "done"
		// event is just a byproduct of that premature finish, then the event.toState 
		// will NOT MATCH the current state (and the event.totalTime will not be accurate).
		if ( ( this.thingState !== "none" ) && ( this.thingState === event.toState ) ) {

			this.thingState = "none";
			
		}

	}

}
