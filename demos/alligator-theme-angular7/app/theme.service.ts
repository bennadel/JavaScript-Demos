
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// These are the CSS classes that are added to the HTML tag to indicate document theme.
// One of these will have already been written to the DOM at load time.
var LIGHT_THEME_CLASS = "theme--light";
var DARK_THEME_CLASS = "theme--dark";

export type Theme = "light" | "dark";

@Injectable({
	providedIn: "root"
})
export class ThemeService {

	private theme: Theme;

	// I initialize the theme service.
	constructor() {
		
		// By the time this service has been instantiated, the parent page had already
		// checked the local date/time and has written one of the CSS classes to the
		// document root. This is the only time we will READ the DOM as the "source of
		// truth". After the service has been initialized, the service properties will
		// become the source of truth and the DOM will be updated to reflect the service
		// state at truth.
		this.theme = document.documentElement.classList.contains( DARK_THEME_CLASS )
			? "dark"
			: "light"
		;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the currently active theme.
	public getTheme() : Theme {

		return( this.theme );

	}


	// I set the active theme.
	public setTheme( theme: Theme ) : void {

		this.theme = theme;
		this.writeThemeToDom();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I synchronize the DOM state with the service state for the theme.
	private writeThemeToDom() : void {

		var classList = document.documentElement.classList;

		classList.remove( DARK_THEME_CLASS );
		classList.remove( LIGHT_THEME_CLASS );

		( this.theme === "dark" )
			? classList.add( DARK_THEME_CLASS )
			: classList.add( LIGHT_THEME_CLASS )
		;

	}

}
