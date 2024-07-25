
// Import vendor modules.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class WindowTitle {

	/**
	* I get the current window title.
	*/
	public get() : string {

		return document.title;

	}

	/**
	* I set the given window title.
	*/
	public set( title: string ) {

		document.title = title;

	}

}
