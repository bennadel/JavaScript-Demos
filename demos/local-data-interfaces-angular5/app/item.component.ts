
// Import the core angular services.
import { Component } from "@angular/core";

// NOTE: I could have just imported the Item interface from the AppComponent; or, from
// some other centralized "interfaces" TypeScript file. But, that makes this component
// dependent on external things. Instead, I am going to define a local Item interface
// below. This decouples this component from the AppComponent; inverts the coupling; 
// and, provides local documentation for what kind of data this class is expecting to
// receive as inputs.
// --
// CAUTION: This does remove some of the type-safety at the Angular component boundary
// since component input properties are not validated (currently). 
// --
// import { Item } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Item {
	id: number;
	name: string;
	// Notice that this version of "Item" DOES NOT DEFINE the "size" or "createdAt"
	// properties (as defined in the AppComponent). That's because this component 
	// doesn't care about them and doesn't need to know about them. Locally, I am only
	// defining the relevant properties as documentation.
}

@Component({
	selector: "my-item",
	inputs: [ "item" ],
	host: {
		"[title]": "( 'Item ID: ' + item.id + '.' )"
	},
	styleUrls: [ "./item.component.less" ],
	template:
	`
		Hello, I am item {{ item.name }}.
	`
})
export class ItemComponent {
	
	public item: Item;

}
