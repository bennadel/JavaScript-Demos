
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { RetainScrollPolyfillModule } from "./retain-scroll-polyfill/retain-scroll-polyfill.module";
import { SecondaryDetailViewComponent } from "./views/secondary-detail-view.component";
import { SecondaryListViewComponent } from "./views/secondary-list-view.component";
import { SecondaryViewComponent } from "./views/secondary-view.component";
import { SectionAViewComponent } from "./views/section-a-view.component";
import { SectionBViewComponent } from "./views/section-b-view.component";
import { SectionCTab1ViewComponent } from "./views/section-c-tab-1-view.component";
import { SectionCTab2ViewComponent } from "./views/section-c-tab-2-view.component";
import { SectionCViewComponent } from "./views/section-c-view.component";
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
				path: "main",
				children: [
					{
						path: "section-a",
						component: SectionAViewComponent
					},
					{
						path: "section-b",
						component: SectionBViewComponent
					},
					{
						path: "section-c",
						component: SectionCViewComponent,
						children: [
							{
								path: "tab-1",
								component: SectionCTab1ViewComponent
							},
							{
								path: "tab-2",
								component: SectionCTab2ViewComponent
							}
						]
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
						path: "detail",
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
						path: "detail",
						component: TertiaryDetailViewComponent
					}
				]
			}
		]
	},

	// Redirect from the root to the "/app" prefix (this makes other features, like 
	// secondary outlets) easier to implement later on.
	{
		path: "",
		pathMatch: "full",
		redirectTo: "app"
	}
];

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RetainScrollPolyfillModule.forRoot({
			// Tell the polyfill how long to poll the document after a route change in
			// order to look for elements that need to be restored to a previous offset.
			pollDuration: 3000,
			pollCadence: 50
		}),
		RouterModule.forRoot(
			routes,
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true,
				enableTracing: false
			}
		)
	],
	declarations: [
		AppComponent,
		SecondaryDetailViewComponent,
		SecondaryListViewComponent,
		SecondaryViewComponent,
		SectionAViewComponent,
		SectionBViewComponent,
		SectionCTab1ViewComponent,
		SectionCTab2ViewComponent,
		SectionCViewComponent,
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
