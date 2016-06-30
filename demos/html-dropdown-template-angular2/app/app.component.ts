
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { HtmlDropdownComponent } from "./html-dropdown.component";

interface Friend {
	id: number;
	name: string;
	avatar: string;
}

@Component({
	selector: "my-app",
	directives: [ HtmlDropdownComponent ],

	// I our view, notice that we are providing a TemplateRef as a child element of the
	// HtmlDropdownComponent. The dropdown component will query for this template and 
	// then use it to render both the option items as well as the root item.
	template:
	`
		<p>
			<strong>Best Friend</strong>: {{ bestFriend?.name || "None selected" }}
			&mdash;
			<a (click)="clearSelection()">Clear selection</a>
		</p>

		<html-dropdown 
			[items]="friends" 
			[(value)]="bestFriend" 
			placeholder="Select Friend">

			<template let-friend="item">
				<img [src]="( './img/' + friend.avatar )" />
				<span class="name">
					{{ friend.name }}
				</span>
			</template>

		</html-dropdown>
	`
})
export class AppComponent {

	// I hold the friend that is selected as the best friend.
	public bestFriend: Friend;

	// I hold the collection of friends.
	public friends: Friend[];


	// I initialize the component.
	constructor() {

		this.bestFriend = null;
		this.friends = [
			{
				id: 1,
				name: "Joanna",
				avatar: "joanna-avatar.jpg"
			},
			{
				id: 2,
				name: "Kim",
				avatar: "kim-avatar.jpg"
			},
			{
				id: 3,
				name: "Sarah",
				avatar: "sarah-avatar.jpg"
			},
			{
				id: 4,
				name: "Tricia",
				avatar: "tricia-avatar.jpg"
			}
		];

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I clear the best-friend selection.
	public clearSelection() : void {

		this.bestFriend = null;

	}

}