
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-avatar",
	inputs: [ "initials", "src" ],
	host: {
		"[style.background-color]": "( src ? 'transparent' : null )"
	},
	templateUrl: "./avatar.component.htm",
	styleUrls: [ "./avatar.component.less" ]
})
export class AvatarComponent {

	public initials: string;
	public src: string;

	// I initialize the avatar component.
	constructor() {

		this.initials = "";
		this.src = "";

	}

}
