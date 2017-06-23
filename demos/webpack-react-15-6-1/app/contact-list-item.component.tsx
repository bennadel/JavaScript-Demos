
// Import the core React modules.
import React = require( "react" );

// Import the application modules.
import { Contact } from "./interfaces";

export interface OnDelete {
	( contact: Contact ) : void;
}

interface Props {
	contact: Contact;
	onDelete: OnDelete;
}

interface State {}

export class ContactListItemComponent extends React.Component<Props, State> {

	// ---
	// PUBLIC METHODS.
	// ---


	// I render the component.
	public render() : JSX.Element {

		return(
			<div title={ `Contact ID ${ this.props.contact.id }` } className="contact-list__item">
				<div className="contact-list__name">
					{ this.props.contact.name }
				</div>

				<div className="contact-list__actions">
					<a onClick={ this.handleClick } className="contact-list__action">Delete</a>
				</div>
			</div>
		);

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I handle the delete click.
	// --
	// CAUTION: Using an instance-property to define the function so that we don't lose 
	// the "this" context when the method reference is passed into the React element.
	private handleClick = ( event: React.MouseEvent<HTMLAnchorElement> ) : void => {

		this.props.onDelete( this.props.contact );

	}

}
