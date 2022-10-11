
// Import core Angular modules.
import { Route } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* NOTE ABOUT IMPORT(): While the native import() function is capable of loading a dynamic
* path, all import paths within our Angular application must be static. This is because
* Webpack performs a static analysis of the import() calls at BUILD TIME and therefore
* cannot consume paths that are defined at RUNTIME. The Angular documentation also states
* that the loadChilren() call must use a FAT-ARROW function; however, this is not true.
* The loadChildren() call can use a normal Function as long as it returns the result of a
* static import() call. I suspect that the Fat-Arrow constraint in the documentation is
* more about making the line of code LOOK as if it were an inline call instead of deferred
* call.
* 
* See GitHub: https://github.com/webpack/webpack/issues/6680
*/
export var ROUTES: Route[] = [
	{
		path: "admin",
		loadChildren: () => getRoutes( import( "./admin-view/admin-view.routes" ) )
	}
];

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* I provide a method that simplifies the lazy-loading of routes from the given path.
*/
export async function getRoutes(
	routesPromise: Promise<any>,
	routesKey: string = "ROUTES"
	 ) : Promise<Route[]> {

	var mod = await routesPromise;

	return( mod[ routesKey ] );

}
