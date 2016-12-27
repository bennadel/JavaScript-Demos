
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

@Component({
	selector: "info-box",
	inputs: [ "avatarUrl", "name", "title" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			:host {
				border: 1px solid #CCCCCC ;
				border-radius: 4px 4px 4px 4px ;
				box-sizing: border-box ;
				display: table ;
				margin: 0px 0px 0px 0px ;
				min-width: 100px ;
				padding: 20px 27px 20px 27px ;
				text-align: center ;
			}

			.avatar {
				display: block ;
				border-radius: 50% ;
				height: 75px ;
				margin: 0px auto 0px auto ;
				width: 75px ;
			}

			.name {
				font-size: 22px ;
				line-height: 24px ;
				margin: 18px 0px 5px 0px ;
			}

			.title {
				color: #999999 ;
				font-size: 16px ;
				line-height: 18px ;
			}

			/* -- variations - host class targeting. -- */

			/*
			:host( .mini ) {
				margin: 10px 0px 10px 0px ;
			}
			*/

			:host( .mini ) .name,
			:host( .mini ) .title {
				display: none ;
			}

			/* -- variations - parent / ancestor (ex, <body>) class targeting. -- */

			:host-context( .blocky ),
			:host-context( .blocky ) .avatar {
				border-radius: 0px 0px 0px 0px ;
			}

			/* -- variations - media query targeting. -- */

			@media screen and ( max-width: 600px ) {
				:host {
					border: none ;
					height: 75px ;
					min-width: 75px ;
					padding: 0px 0px 0px 0px ;
					width: 75px ;
				}

				.name,
				.title {
					display: none ;
				}			
			}
		`
	],
	template:
	`
		<img [src]="avatarUrl" class="avatar" />

		<div class="name">
			{{ name }}
		</div>

		<div class="title">
			{{ title }}
		</div>
	`
})
export class InfoBoxComponent {

	public avatarUrl: string;
	public name: string;
	public title: string;


	// I initialize the component.
	constructor() {

		this.avatarUrl = "";
		this.name = "";
		this.title = "";

	}

}
