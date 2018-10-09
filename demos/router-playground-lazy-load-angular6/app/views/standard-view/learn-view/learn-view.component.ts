
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Tutorial {
	name: string;
}

interface Tutorials {
	[ key: string ]: Tutorial[];
}

interface FAQ {
	name: string ;
}

@Component({
	selector: "learn-view",
	styleUrls: [ "./learn-view.component.less" ],
	templateUrl: "./learn-view.component.htm"
})
export class LearnViewComponent {

	public faqs: FAQ[];
	public tutorials: Tutorials;

	// I initialize the list-view component.
	constructor() {

		this.tutorials = {
			invision101: [
				{ name: "Prototype Basics" },
				{ name: "Interactive Prototypes" },
				{ name: "Design Feedback & Collaboration" }
			],
			workflowTips: [
				{ name: "Managing Projects in Workflow" },
				{ name: "Using Overlay Screens" },
				{ name: "Creating a Board" },
				{ name: "Using GIFs for Custom Interactions" },
				{ name: "Using Transparent Navigation" },
				{ name: "Using LiveShare" },
				{ name: "Creating Fixed Elements" },
				{ name: "Replacing Screens" },
				{ name: "Changing Device Skins" },
				{ name: "Sharing Selections of Screens" },
				{ name: "Organizing Prototypes" },
				{ name: "Working With Retina Sized Images" }
			]
		};

		this.faqs = [
			{name: "Which plan is right for me?" },
			{name: "Can I create wireframes using InVision?" },
			{name: "Can I conduct user testing with InVision?" },
			{name: "How do I set up my Team?" },
			{name: "How can I password protect my prototype?" },
			{name: "How do I determine the right screen size?" },
			{name: "How do I export a prototype to a PDF or Zip file?" },
			{name: "What is Craft by InVision LABS?" }
		];
		
	}

}
