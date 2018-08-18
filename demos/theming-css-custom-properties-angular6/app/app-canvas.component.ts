
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-canvas",
	styleUrls: [ "./app-canvas.component.less" ],
	template:
	`
		<div class="canvas">
			<textarea
				[value]=" 'Whose woods these are, I think I know...' "
				class="canvas__input input"
			></textarea>
			<ul class="canvas__syllables syllables">
				<li class="syllables__item">8</li>
			</ul>
		</div>
	`
})
export class AppCanvasComponent {
	// ....
}
