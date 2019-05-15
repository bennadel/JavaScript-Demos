
// Import the core angular services.
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// Import the root module for bootstrapping.
import { AppModule } from "./app.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// NOTE: This ENV value is being provided by Webpack's DefinePlugin. It is populated
// on the mode in which the webpack-cli was invoked.
if ( process.env.NODE_ENV === "production" ) {

	enableProdMode();

}

platformBrowserDynamic().bootstrapModule( AppModule );
