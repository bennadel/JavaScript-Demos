
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<textarea 
			maxlength="140"
			(input)="percent = ( $event.target.value.length / 140 * 100 )"
		></textarea>

		<div class="indicators">
			<progress-indicator [percent]="percent"></progress-indicator>
			<progress-indicator [percent]="percent" color="magenta"></progress-indicator>
			<progress-indicator [percent]="percent" [style.color]="'orange'"></progress-indicator>
			<progress-indicator [percent]="percent" backgroundColor="#F0F0F0"></progress-indicator>
			<progress-indicator [percent]="percent" backgroundColor="none"></progress-indicator>
		</div>

		<progress-indicator 
			[percent]="percent"
			[style.width.px]="100"
			[style.height.px]="100">
		</progress-indicator>
	`
})
export class AppComponent {
	
	public percent: number = 0;

}
