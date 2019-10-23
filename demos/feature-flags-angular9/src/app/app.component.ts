
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AppConfig } from "./app-config.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<!--
			NOTE: Feature flags are NOTHING MORE than indicators of whether or not some
			logic branch in the application should be used. DON'T OVERTHINK IT. You don't
			need special directives that "handle the feature flag" for you. Angular
			already has structural directives that do just that: manage logic branching.
			In thise case, I'm just using the *ngIf directive to show or hide markup
			based on the user's feature flag settings.
		-->

		<ng-template [ngIf]="isShowingFeatureA">
			<p>
				Woot! You have <strong>Feature-A</strong>!
			</p>
		</ng-template>

		<ng-template [ngIf]="isShowingFeatureB">
			<p>
				Noice! You have <strong>Feature-B</strong>!
			</p>
		</ng-template>

		<ng-template [ngIf]="isShowingFeatureC">
			<p>
				Sweet! You have <strong>Feature-C</strong>!
			</p>
		</ng-template>
	`
})
export class AppComponent {

	public isShowingFeatureA: boolean;
	public isShowingFeatureB: boolean;
	public isShowingFeatureC: boolean;

	// I initialize the app component.
	constructor( appConfig: AppConfig ) {

		// Once the app has been initialized, the AppConfig instance will contain all of
		// the feature flags for this user. At this point, it's as simple as checking the
		// values and seeing if they are turned On or Off.
		this.isShowingFeatureA = appConfig.featureFlags[ "feature-a" ];
		this.isShowingFeatureB = appConfig.featureFlags[ "feature-b" ];
		this.isShowingFeatureC = appConfig.featureFlags[ "feature-c" ];

	}

}
