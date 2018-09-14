
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "prototype-item",
	inputs: [ "item" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./prototype-item.component.less" ],
	templateUrl: "./prototype-item.component.htm"
})
export class PrototypeItemComponent {
	public item: any;
}
