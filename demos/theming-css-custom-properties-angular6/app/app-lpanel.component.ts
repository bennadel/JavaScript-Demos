
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-lpanel",
	styleUrls: [ "./app-lpanel.component.less" ],
	template:
	`
		<h3 class="title">
			Rhyme Finder
		</h3>

		<form action="javascript:void(0)" class="search">
			<input type="text" class="search__input" />
			<button type="button" class="search__submit">
				Search
			</button>
		</form>

		<div class="results">
			Some search results ....
		</div>
	`
})
export class AppLPanelComponent {
	// ....
}
