
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Section {
	title: string;
	content: string;
	isCollapsed: boolean;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ng-template ngFor let-section [ngForOf]="sections">

			<!--
				NOTE: A template variable (#sectionRef) is local to the current Template,
				which, in this case, is the ngFor template. That means that each
				iteration of the ngFor loop will get its own unique copy of #sectionRef.
			-->
			<section #sectionRef class="section">
				<header class="section__header">
					<a
						(click)="toggleSection( section, sectionRef )"
						class="section__toggle">
						{{ section.title }}
					</a>
				</header>
				<div
					*ngIf="( ! section.isCollapsed )"
					class="section__body">
					{{ section.content }}
					{{ "And more sweet copy over here. " | repeatString:1000 }}
				</div>
			</section>

		</ng-template>
	`
})
export class AppComponent {

	public sections: Section[];

	// I initialize the app component.
	constructor() {

		this.sections = [
			{ title: "Section 1 Title", content: "Section 1 copy.", isCollapsed: false },
			{ title: "Section 2 Title", content: "Section 2 copy.", isCollapsed: false },
			{ title: "Section 3 Title", content: "Section 3 copy.", isCollapsed: false },
			{ title: "Section 4 Title", content: "Section 4 copy.", isCollapsed: false },
			{ title: "Section 5 Title", content: "Section 5 copy.", isCollapsed: false },
			{ title: "Section 6 Title", content: "Section 6 copy.", isCollapsed: false },
			{ title: "Section 7 Title", content: "Section 7 copy.", isCollapsed: false },
			{ title: "Section 8 Title", content: "Section 8 copy.", isCollapsed: false },
			{ title: "Section 9 Title", content: "Section 9 copy.", isCollapsed: false },
			{ title: "Section 10 Title", content: "Section 10 copy.", isCollapsed: false }
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the given section's content body.
	public toggleSection(
		section: Section,
		sectionElement: HTMLElement
		) : void {

		section.isCollapsed = ! section.isCollapsed;

		// If we're collapsing the content of the given section, it may dramatically
		// change the page-offset for the user. As such, if the section is currently
		// located above the viewport, we want to SCROLL THE WINDOW UP to the top of
		// the section element such that the content below the collapsed element
		// remains visible to the user.
		if ( section.isCollapsed ) {

			var rect = sectionElement.getBoundingClientRect();

			// If the section element is ABOVE THE VIEWPORT, adjust the scroll.
			if ( rect.top < 0 ) {

				window.scrollBy( 0, ( rect.top - 4 ) );
				// NOTE: The (-4) is to adjust for the CSS styling of the page.

			}

		}

	}

}
