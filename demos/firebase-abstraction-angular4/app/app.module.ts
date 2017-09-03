
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { Provider } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { FirebaseMessageGateway } from "./gateways/firebase-message.gateway";
import { InMemoryMessageGateway } from "./gateways/in-memory-message.gateway";
import { MessageGateway } from "./gateways/message.gateway";
import { LocalStorageMessageGateway } from "./gateways/local-storage-message.gateway";

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		getGatewayImplementation() // Pick one of 3 implementations.
	]
})
export class AppModule {
	// ...
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I return the MessageGateway provider based on the LOCATION state.
// --
// NOTE: I had originally set this up to return just the useClass value. However, when
// I did that, TypeScript kept complaining that I was missing a useFactory property in
// my Provider. As such, I just moved the entire Provider configuration here.
function getGatewayImplementation() : Provider {

	switch ( window.location.search ) {
		case "?localstorage":
			return({
				provide: MessageGateway,
				useClass: LocalStorageMessageGateway
			});
		break;
		case "?firebase":
			return({
				provide: MessageGateway,
				useClass: FirebaseMessageGateway
			});
		break;
		default:
			return({
				provide: MessageGateway,
				useClass: InMemoryMessageGateway
			});
		break;
	}

	// NOTE: I need to use {"allowUnreachableCode": true} tsconfig setting so that the
	// compiler doesn't complain about unreachable code here.

}
