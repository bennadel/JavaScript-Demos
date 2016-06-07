
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { DynamicRepeaterComponent } from "./dynamic-repeater.component";

@Component({
	selector: "my-app",
	directives: [ DynamicRepeaterComponent ],

	// In this view, we're passing a dynamic TemplateRef to the DynamicRepeater 
	// component. We're not passing it in like a property; rather, we're "tagging" it 
	// with the "#itemRenderer" handle. Then, the DynamicRepeater is going to query its 
	// content (via ContentChild) for the template reference. When this TemplateRef is
	// "stamped out", it will make several local view variables available:
	// --
	// * index
	// * item
	// --
	// Here, you can see that the template is hooking into those variables using the
	// "let" syntax, ex. "let-color=item". 
	template:
	`
		<dynamic-repeater [items]="colors">

			<template #itemRenderer let-color="item" let-index="index">
				
				<div title="Item {{ index }}" class="swatch" [style.backgroundColor]="color.hex">
					<br />
				</div>

				<div class="name">
					{{ color.name }}
				</div>

			</template>

		</dynamic-repeater>
	`
})
export class AppComponent {

	// I hold the collection of colors that will be rendered by the DynamicRepeater.
	public colors: any[];


	// I initialize the component.
	constructor() {

		this.colors = [
			{
				hex: "#E50000",
				name: "Red"
			},
			{
				hex: "#FF028D",
				name: "Hot Pink"
			},
			{
				hex: "#FF81C0",
				name: "Pink"
			},
			{
				hex: "#FFD1DF",
				name: "Light Pink"
			},
			{
				hex: "#FFB07C",
				name: "Peach"
			},
			{
				hex: "#FF796C",
				name: "Salmon"
			}
		];

	}

}