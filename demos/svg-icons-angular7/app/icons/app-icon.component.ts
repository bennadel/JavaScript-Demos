
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";

// Import the application components and services.
import { UniqueIDService } from "./unique-id.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I define the collection of SVG icons that are pulled into this sprite (via Webpack
// svg-sprite-loader). I like having them listed here individually so that icons can be
// explicitly included or excluded from the build without having to remove the SVG files
// from the actual file-system. This feels more maintainable.
import "./svg/chevron-circle-left.svg";
import "./svg/chevron-circle-right.svg";
import "./svg/chevron-down.svg";
import "./svg/chevron-left.svg";
import "./svg/chevron-right.svg";
import "./svg/chevron-up.svg";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: I have no experience with ARIA configurations. I have tried my best to apply
// what I read in the following post; however, please do not view the ARIA implementation
// in this Icon component as "correct". I am not sure how the "app-icon" wrapper affects
// the implementation details. My approach was to treat the "app-icon" like the IMG and
// then "hide" the SVG itself from the device.
// --
// Read More: https://www.24a11y.com/2018/accessible-svg-icons-with-inline-sprites/

@Component({
	selector: "app-icon",
	inputs: [ "type", "title" ],
	host: {
		"[attr.title]": "ariaTitle",
		"[attr.aria-hidden]": "ariaHidden",
		"[attr.aria-labelledby]": "ariaLabelledBy",
		"role": "img"
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./app-icon.component.less" ],
	template:
	`
		<svg aria-hidden="true" focusable="false">
			<title *ngIf="ariaTitle" [attr.id]="ariaLabelledBy">
				{{ ariaTitle }}
			</title>

			<use [attr.xlink:href]="( '#app-icon-' + type )" />
		</svg>
	`
})
export class AppIconComponent implements OnChanges {
	
	public ariaHidden: true | null;
	public ariaLabelledBy: string | null;
	public ariaTitle: string | null;
	public title!: string;
	public type!: string;

	private uniqueIDService: UniqueIDService;

	// I initialize the app-icon component.
	constructor( uniqueIDService: UniqueIDService ) {

		this.uniqueIDService = uniqueIDService;

		this.ariaHidden = true;
		this.ariaLabelledBy = null;
		this.ariaTitle = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when the input binding are updated.
	public ngOnChanges() : void {

		if ( this.title ) {

			// If a title was provided, it means that this icon is more than just a
			// decorative element. As such, let's try to make it more accessible to
			// screen-readers.
			this.ariaHidden = null;
			this.ariaLabelledBy = ( this.ariaLabelledBy || this.uniqueIDService.next() );
			this.ariaTitle = this.title;

		} else {

			// If there is no title, we want to hide this icon from screen-readers.
			this.ariaHidden = true;
			this.ariaLabelledBy = null;
			this.ariaTitle = null;

		}

	}

}
