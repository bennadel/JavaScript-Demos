
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "board-item",
	changeDetection: ChangeDetectionStrategy.OnPush,
	inputs: [ "item" ],
	styleUrls: [ "./board-item.component.less" ],
	templateUrl: "./board-item.component.htm"
})
export class BoardItemComponent {
	// ...
}
