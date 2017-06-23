
// Import the core React modules.
import React = require( "react" );
import _ = require( "lodash" );

// Import the application modules.
import { AddContactFormComponent } from "./add-contact-form.component";
import { Contact } from "./interfaces";
import { ContactListComponent } from "./contact-list.component";

interface Props {}

interface State {
	contacts: Contact[];
}

export class AppComponent extends React.Component<Props, State> {

	// I initialize the app component.
	constructor() {

		super();

		this.state = {
			contacts: [
				{ id: 1, name: "Kim" },
				{ id: 2, name: "Sarah" },
				{ id: 3, name: "Joanna" },
				{ id: 4, name: "Libby" }
			]
		};

	}


	// ---
	// PUBLIC METHODS.
	// ---
	

	// I render the component.
	public render() : JSX.Element {

		return(
			<div>
				<h2>
					You Have { this.state.contacts.length || "No" } Contacts
				</h2>

				<ContactListComponent
					contacts={ this.state.contacts }
					onDelete={ this.handleDelete }>
				</ContactListComponent>

				<AddContactFormComponent onSubmit={ this.handleAdd } />
			</div>
		);

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I get the next available ID from the given collection of contacts.
	private getNextID( contacts: Contact[] ) : number {

		if ( contacts.length ) {

			return( _.maxBy( contacts, "id" ).id + 1 );

		} else {

			return( 1 );

		}

	}


	// I handle name emitted from the form component, adding a new contact.
	// --
	// CAUTION: Using an instance-property to define the function so that we don't lose
	// the "this" context when the method reference is passed into the React element.
	private handleAdd = ( name: string ) : void => {

		// NOTE: Since the next state is based on the previous state, we need to use the
		// callback-style invocation so that we can handle asynchronous state updates.
		this.setState(
			( state: State, props: Props ) : Partial<State> => {

				return({
					contacts: [
						...state.contacts, 
						{
							id: this.getNextID( state.contacts ),
							name: name
						}
					]
				});

			}
		);

	}


	// I handle the delete event emitted from the contact list, removing a contact.
	// --
	// CAUTION: Using an instance-property to define the function so that we don't lose
	// the "this" context when the method reference is passed into the React element.
	private handleDelete = ( contact: Contact ) : void => {
		
		// NOTE: Since the next state is based on the previous state, we need to use the
		// callback-style invocation so that we can handle asynchronous state updates.
		this.setState(
			( state: State, props: Props ) : Partial<State> => {

				return({
					contacts: _.without( state.contacts, contact )
				});

			}
		);
		
	}

}
