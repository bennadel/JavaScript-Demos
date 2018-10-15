
// Import for side effects - we have to import this first so that the polyfills will
// be available for the rest of the code.
// --
// NOTE: I would normally include this as an Entry bundle; but, I couldn't get the
// HtmlWebpackPlugin to work properly if I did that (since I don't think it could
// implicitly determine the dependency order). In the future, I might be able to make
// this more dynamic (ie, use Webpack's import() syntax).
import "./main.polyfill";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Import the core angular services.
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// Import the root module for bootstrapping.
import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule( AppModule );
