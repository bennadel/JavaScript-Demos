
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<bn-contact [contact]="contact"></bn-contact>
	`
})
export class AppComponent {

	public contact = {
		id: 1,
		name: "Kimmie Doro",
		email: "ben+kim@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/5cbcec91c352ed84fa4ad6fc42fd2a05.jpg?s=150",
		startedAt: Date.now()
	};

}
