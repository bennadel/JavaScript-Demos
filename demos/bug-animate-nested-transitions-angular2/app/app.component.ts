
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
		// The container doesn't technically have any animation; but, it feels "weird" to
		// try an animate the nested elements without also having a transition on the 
		// actually-dynamic container element.
		// --
		// NOTE: The animations work all the same without this container-animation; this 
		// is here for my own peace of mind.
		trigger(
			"containerAnimation",
			[
				transition(
					"void => * , * => void",
					animate( "1000ms" )
				)
			]
		),

		// As the container is swapped-in, Box A will come in from the bottom.
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

		// As the container is swapped-in, Box B will come in from the top.
		trigger(
			"boxTwoAnimation",
			[
				state(
					"void",
					style({
						top: "-10%",
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
		)
	],
	template:
	`
		<p>
			<a (click)="showContainer( 'a' )">Show Container A</a>
			&mdash;
			<a (click)="showContainer( 'b' )">Show Container B</a>
		</p>

		<div [ngSwitch]="activeContainer" class="viewport">

			<div *ngSwitchCase=" 'a' " @containerAnimation class="container">
				<div class="label">
					Container A
				</div>
				<div @boxOneAnimation class="box-one">
					Box One
				</div>
				<div @boxTwoAnimation class="box-two">
					Box Two
				</div>
			</div>

			<div *ngSwitchCase=" 'b' " @containerAnimation class="container">
				<div class="label">
					Container B
				</div>
				<div @boxOneAnimation class="box-one">
					Box One
				</div>
				<div @boxTwoAnimation class="box-two">
					Box Two
				</div>
			</div>

		</div>
	`
})
export class AppComponent {

	public activeContainer: string;


	// I initialize the component.
	constructor() {

		this.activeContainer = "a";

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I show the given container.
	public showContainer( container: string ) : void {

		this.activeContainer = container;

	}

}
   