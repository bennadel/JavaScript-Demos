
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ItemListComponent } from "./item-list.component";

export interface IFriend {
	id: number;
	name: string;
};

@Component({
	selector: "my-app",
	directives: [ ItemListComponent ],

	// In the following view, we're defining a TemplateRef and then passing it into the
	// <item-list> component. Notice, however, that the template is making references to
	// both local-view values (ie, let-X) as well as lexically-bound values to the root
	// component (ie, this.bestFriend) and the component template (ie, #bffMessage). Even
	// when the TemplateRef gets passed out-of-scope, it can still reference the 
	// lexically-bound values from whence it was defined.
	template:
	`
		<input #bffMessage type="hidden" value="Woot - BFF!" />

		<template #friendTemplate let-friend>

			<li>
				{{ friend.name }}

				<template [ngIf]="( friend.id === bestFriend.id )">
					&mdash; <strong>{{ bffMessage.value }}</strong>
				</template>
			</li>

		</template>

		<item-list 
			[items]="friends" 
			[template]="friendTemplate">
		</item-list>
	`
})
export class AppComponent {

	// I hold the best friend (which is a reference to an item in the collection).
	public bestFriend: IFriend;

	// I hold the collection of friends to render.
	public friends: IFriend[];


	// I initialize the component.
	constructor() {

		this.friends = [ "Sarah", "Kim", "Tricia", "Lisa", "Joanna" ].map(
			function iterator( name: string, index: number ) : IFriend {

				return({
					id: index,
					name: name
				});

			}
		);

		this.bestFriend = this.friends[ 1 ];

	}

}
