
// Import the core angular services.
import { animate } from "@angular/animations";
import { Component } from "@angular/core";
import { style } from "@angular/animations";
import { transition } from "@angular/animations";
import { trigger } from "@angular/animations";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	animations: [
		trigger(
			"friend",
			[
				transition(
					":enter",
					[
						style({
							opacity: 0,
							transform: "translateX( 300px )"
						}),
						animate(
							1000,
							style({
								opacity: 1,
								transform: "translateX( 0px )"
							})
						)
					]
				)
			]
		),
		// By default, the "parent" animation in a nested-animation context will take
		// precedence, blocking the child animation. As such, if we want to block a 
		// given animation, we simply have to create a no-op (No Operation) transition
		// above it in the DOM (Document Object Model). In this case, by defining a no-op
		// ":enter" transition on the UL element, we block the INITIAL ":enter"
		// transitions of the LI elements contained within it. But, ONLY WHEN THE UL IS
		// TRANSITION (ie, being ":enter"d). Once the parent UL is mounted, subsequent 
		// LI ":enter" animations are allowed to run.
		trigger(
			"blockInitialRenderAnimation",
			[
				transition( ":enter", [] )
			]
		)
	],
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<form (submit)="$event.preventDefault(); processForm()">
			<input #input type="text" [value]="form.name" (input)="form.name = input.value" />
			<button type="submit">Add Friend</button>
		</form>

		<p>
			<a (click)="toggleLists()">Toggle Lists of Friends</a>
		</p>

		<div *ngIf="isShowingLists">

			<h2>
				With Initial Animation Blocking
			</h2>

			<ul @blockInitialRenderAnimation>
				<li *ngFor="let friend of friends" @friend>
					{{ friend }}
				</li>
			</ul>

		</div>

		<div *ngIf="isShowingLists">

			<h2>
				Without Initial Animation Blocking
			</h2>

			<ul>
				<li *ngFor="let friend of friends" @friend>
					{{ friend }}
				</li>
			</ul>

		</div>
	`
})
export class AppComponent {
	
	public form: {
		name: string;
	};
	public friends: string[];
	public isShowingLists: boolean;

	// I initialize the app component.
	constructor() {

		this.form = {
			name: ""
		};
		this.friends = [ "Sarah", "Kim", "Tricia" ];
		this.isShowingLists = true;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I process the new friend form.
	public processForm() : void {

		if ( this.form.name ) {

			this.friends.push( this.form.name );
			this.form.name = "";

		}

	}


	// I toggle the visibility of the friend lists.
	public toggleLists() : void {

		this.isShowingLists = ! this.isShowingLists;

	}

}
