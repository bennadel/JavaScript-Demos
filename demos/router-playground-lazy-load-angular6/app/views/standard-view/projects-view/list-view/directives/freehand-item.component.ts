
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "freehand-item",
	inputs: [ "item" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./freehand-item.component.less" ],
	templateUrl: "./freehand-item.component.htm"
})
export class FreehandItemComponent {
	public item: any;
}
