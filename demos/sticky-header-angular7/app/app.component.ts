
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Section {
	id: string;
	title: string;
	isCollapsed: boolean;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	public sections: Section[];

	// I initialize the app component.
	constructor() {

		this.sections = [
			{ id: "section-1", title: "Section One", isCollapsed: false },
			{ id: "section-2", title: "Section Two", isCollapsed: false },
			{ id: "section-3", title: "Section Three", isCollapsed: false },
			{ id: "section-4", title: "Section Four", isCollapsed: false },
			{ id: "section-5", title: "Section Five", isCollapsed: false },
			{ id: "section-6", title: "Section Six", isCollapsed: false },
			{ id: "section-7", title: "Section Seven", isCollapsed: false },
			{ id: "section-8", title: "Section Eight", isCollapsed: false },
			{ id: "section-9", title: "Section Nine", isCollapsed: false },
			{ id: "section-10", title: "Section Ten", isCollapsed: false }
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the display of the section body.
	public toggleSection( section: Section ) : void {

		section.isCollapsed = ! section.isCollapsed;

	}

}
