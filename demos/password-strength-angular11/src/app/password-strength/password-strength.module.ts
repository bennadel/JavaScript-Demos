
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
		// NOTE: We're providing the default implementation of the PasswordStrengthService
		// via the "useClass" semantics of the @Injectable() decorator.
	],
	declarations: [
		StrengthEventDirective,
		StrengthIndicatorComponent
	]
})
export class PasswordStrengthModule {
	// ...
}
