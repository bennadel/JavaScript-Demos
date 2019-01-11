
export interface Company {
	id: number;
	name: string;
	established: number;
}

// NOTE: Using name "AppConfig" for "Declaration Merging".
export interface AppConfig {
	company: Company;
	version: string;
}

// NOTE: Using name "AppConfig" for "Declaration Merging".
export abstract class AppConfig {
	// By creating an Abstract Class that has the same name as an Interface, we get to
	// leverage "Declaration Merging" in TypeScript. This tells TypeScript to assume
	// that this "AppConfig" class will implement the "AppConfig" interface without
	// having to actually implement the interface in the class definition. This gives us
	// some wiggle-room to use a dynamic, runtime implementation while still getting the
	// benefits of type-safety.
	// --
	// AND, we get to use the Abstract Class as a dependency-injection token since it
	// represents a "Type" within our application.
}
