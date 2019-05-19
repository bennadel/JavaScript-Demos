
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AddFriendViewComponent } from "./add-friend-view.component";
import { AppComponent } from "./app.component";
import { FriendsViewComponent } from "./friends-view.component";
import { ModalViewComponent } from "./modal-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(
			[
				// Redirecting to keep all of the app under the "/app" prefix. This
				// helps deal with some routing issues with empty segments.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "app"
				},
				{
					path: "app",
					children: [
						{
							path: "friends",
							component: FriendsViewComponent
						},
						// Notice that the "add-friend" view is in the "modal" outlet.
						// This allows it (and most of your modals) to be shown to the
						// user regardless of what is in the primary outlet. This is what
						// makes Auxiliary Routes so freaking exciting!
						{
							path: "modal",
							outlet: "modal",
							component: ModalViewComponent,
							children: [
								{
									path: "add-friend",
									component: AddFriendViewComponent
								}
							]
						}
					]
				}
			],
			{
				// Tell the router to use the hash instead of HTML5 pushstate.
				useHash: true,

				// Enable the Angular 6+ router features for scrolling and anchors.
				scrollPositionRestoration: "enabled",
				anchorScrolling: "enabled",
				enableTracing: false
			}
		)
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above (which will be setting the
		// strategy provider for us).
		// --
		// {
		// 	provide: LocationStrategy,
		// 	useClass: HashLocationStrategy
		// }
	],
	declarations: [
		AddFriendViewComponent,
		AppComponent,
		FriendsViewComponent,
		ModalViewComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
