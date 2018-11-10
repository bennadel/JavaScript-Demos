
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template: `
		<div *ngIf="( valueStream | async ) as value">
			{{ value }}
		</div>

		<div *ngIf="( valueStream | async ) ; $implicit as value">
			{{ value }}
		</div>

		<div *ngIf="( valueStream | async ) ; let value = $implicit">
			{{ value }}
		</div>

		<ng-template [ngIf]="( valueStream | async )" let-value>
			<div>
				{{ value }}
			</div>
		</ng-template>

		<ng-template [ngIf]="( valueStream | async )" let-value="$implicit">
			<div>
				{{ value }}
			</div>
		</ng-template>
	`
})
export class AppComponent {

	public valueStream: Observable<string>;

	// I initialize the app component.
	constructor() {

		this.valueStream = of( "woot !" );

	}

}
