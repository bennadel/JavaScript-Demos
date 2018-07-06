
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { PrimaryDetailViewComponent } from "./views/primary-detail-view.component";
import { PrimaryListViewComponent } from "./views/primary-list-view.component";
import { PrimaryViewComponent } from "./views/primary-view.component";
import { SecondaryDetailViewComponent } from "./views/secondary-detail-view.component";
import { SecondaryListViewComponent } from "./views/secondary-list-view.component";
import { SecondaryViewComponent } from "./views/secondary-view.component";
import { TertiaryDetailViewComponent } from "./views/tertiary-detail-view.component";
import { TertiaryListViewComponent } from "./views/tertiary-list-view.component";
import { TertiaryViewComponent } from "./views/tertiary-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	{
		path: "app",
		children: [
			{
				path: "primary",
				component: PrimaryViewComponent,
				children: [
					{
						path: "",
						pathMatch: "full",
						component: PrimaryListViewComponent
					},
					{
						path: "detail/:primaryID",
						component: PrimaryDetailViewComponent
					}
				]
			},
			{
				outlet: "secondary",
				path: "secondary",
				component: SecondaryViewComponent,
				children: [
					{
						path: "",
						pathMatch: "full",
						component: SecondaryListViewComponent
					},
					{
						path: "detail/:secondaryID",
						component: SecondaryDetailViewComponent
					}
				]
			},
			{
				outlet: "tertiary",
				path: "tertiary",
				component: TertiaryViewComponent,
				children: [
					{
						path: "",
						pathMatch: "full",
						component: TertiaryListViewComponent
					},
					{
						path: "detail/:tertiaryID",
						component: TertiaryDetailViewComponent
					}
				]
			}
		]
	},

	// Redirect from the root to the "/app" prefix (this makes other features, like 
	// secondary outlets easier to implement later on).
	{
		path: "",
		pathMatch: "full",
		redirectTo: "app"
	}
];

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			routes,
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true
			}
		)
	],
	declarations: [
		AppComponent,
		PrimaryDetailViewComponent,
		PrimaryListViewComponent,
		PrimaryViewComponent,
		SecondaryDetailViewComponent,
		SecondaryListViewComponent,
		SecondaryViewComponent,
		TertiaryDetailViewComponent,
		TertiaryListViewComponent,
		TertiaryViewComponent
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above.
		// --
		// {
		// 	provide: LocationStrategy,
		// 	useClass: HashLocationStrategy
		// }
	]
})
export class AppModule {
	// ...
}
