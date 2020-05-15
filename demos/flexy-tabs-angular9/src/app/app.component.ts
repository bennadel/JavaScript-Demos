
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Tab {
	name: string;
	isLocked: boolean;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ul class="tabs">
			<li
				*ngFor="let tab of tabs"
				[title]="tab.name"
				class="tab"
				[class.tab--locked]="tab.isLocked"
				(click)="toggleLock( tab )">
				{{ tab.name }}
			</li>
		</ul>

		<p class="new-tab">
			<input
				#newTab
				type="text"
				autofocus
				(keydown.Meta.Enter)="addTab( newTab )"
				(keydown.Enter)="addTab( newTab )"
			/>
			<button (click)="addTab( newTab )">
				Add Tab
			</button>
		</p>
	`
})
export class AppComponent {

	public tabs: Tab[];

	// I initialize the app component.
	constructor() {

		this.tabs = [
			{ name: "Home", isLocked: false },
			{ name: "Favorites", isLocked: false },
			{ name: "ToDos", isLocked: false },
			{ name: "Articles To Read", isLocked: false },
			{ name: "Random Thoughts", isLocked: false }
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new tab to the tab-list.
	public addTab( input: HTMLInputElement ) : void {

		var name = input.value.trim();

		if ( name ) {

			this.tabs.push({
				name: input.value,
				isLocked: false
			});

			input.value = "";

		}

	}


	// I toggle the locking of the tab (ie, whether or not it can shrink).
	public toggleLock( tab: Tab ) : void {

		tab.isLocked = ! tab.isLocked;

	}

}
