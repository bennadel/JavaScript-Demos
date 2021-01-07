
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { DefaultPasswordStrengthServiceImplementation } from "./password-strength.service";
import { PasswordStrengthService } from "./password-strength.service";
import { Strength } from "./password-strength.service";
import { StrengthEventDirective } from "./strength-event.directive";
import { StrengthIndicatorComponent } from "./strength-indicator.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export { PasswordStrengthService };
export { Strength };
// NOTE: These don't really need to be exported for this particular demo. However, if a
// component in the parent directive were to implement a View-Child query (for example)
// that attempted to reference one of these directives, the consuming code may need to
// use these exported values as the "Type" of said query results.
export { StrengthEventDirective };
export { StrengthIndicatorComponent };

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		StrengthEventDirective,
		StrengthIndicatorComponent
	],
	providers: [
		// Out-of-the-box, the PasswordStrengthModule is going to provide a simple,
		// length-based strength calculator. But, this provider can be overridden by the
		// parent application using the "PasswordStrengthService" dependency-injection
		// token.
		{
			provide: PasswordStrengthService,
			useClass: DefaultPasswordStrengthServiceImplementation
		}
	],
	declarations: [
		StrengthEventDirective,
		StrengthIndicatorComponent
	]
})
export class PasswordStrengthModule {
	// ...
}
