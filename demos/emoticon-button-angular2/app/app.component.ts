
// Import the core angular services.
import { Component } from "@angular/core";

interface Reaction {
	type: string;
	value: number;
	includesUser: boolean;
}

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<template ngFor let-reaction [ngForOf]="reactions">

			<emoticon-button 
				[type]="reaction.type"
				[value]="reaction.value"
				(click)="handleClick( reaction )">
			</emoticon-button>	

		</template>

		<p>
			<a (click)="setRandomValues()">Set random values</a>.
		</p>
	`
})
export class AppComponent {
	
	public reactions: Reaction[];
	

	// I initialize the app component.
	constructor() {

		this.reactions = [
			{
				type: "smile",
				value: 3,
				includesUser: true
			},
			{
				type: "simple_smile",
				value: 14,
				includesUser: false
			},
			{
				type: "disappointed",
				value: 99,
				includesUser: false
			},
			{
				type: "slightly_smiling_face",
				value: 100,
				includesUser: true
			},
			{
				type: "wink",
				value: 999,
				includesUser: false
			},
			{
				type: "neutral_face",
				value: 9,
				includesUser: false
			},
			{
				type: "stuck_out_tongue",
				value: 11,
				includesUser: false
			},
			{
				type: "confused",
				value: 21,
				includesUser: true
			},
			{
				type: "thumbsup",
				value: 1,
				includesUser: true
			}
		];

	}


	// ---
	// PUBLIC METODS.
	// ---


	// I handle the emoticon button click associated with the given reaction.
	public handleClick( reaction: Reaction ) : void {

		// A user can only consume a given reaction once. If the user has not yet 
		// consumed a reaction, we can increment the value; but, if the user has
		// already consumed a reaction, a subsequent click will be treated as an
		// decrement and their association to the reaction will be removed.
		if ( reaction.includesUser ) {

			reaction.value--;
			reaction.includesUser = false;

		} else {

			reaction.value++;
			reaction.includesUser = true;

		}

	}


	// I assign a random value to each reaction.
	public setRandomValues() : void {

		this.reactions.forEach(
			( reaction: Reaction ) : void => {

				reaction.value = Math.floor( Math.random() * 100 );

			}
		);

	}

}
