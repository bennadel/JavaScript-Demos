
// Import the core React modules.
// --
// CAUTION: DO NOT REMOVE - Even though this doesn't appear to be referenced, it will be
// referenced in the transpiled code (which creates React.createElement() expressions).
import React = require( "react" );

// Import the application modules.
import { Contact } from "./interfaces";
import { ContactListItemComponent } from "./contact-list-item.component";
import { OnDelete } from "./contact-list-item.component";

// Since the calling context may need to know the callback interface, let's re-export the
// OnDelete interface (it's not truly needed for this demo, but I think this may make 
// sense as a general rule).
export { OnDelete };

interface Props {
	contacts: Contact[];
	onDelete: OnDelete;
}

// NOTE: We are using a Function instead of a Class here because this is a stateless 
// component that doesn't need to expose any additional methods. As such, we can provide
// what is essential just the render() method. The props are still type-checked against
// the Props {} interface.
export function ContactListComponent( props: Props ) : JSX.Element {

	var contactListItemNodes = props.contacts.map(
		( contact: Contact ) : JSX.Element => {

			return(
				<ContactListItemComponent
					key={ contact.id } 
					contact={ contact } 
					onDelete={ props.onDelete }>
				</ContactListItemComponent>
			);

		}
	);

	return(
		<div className="contact-list">
			{ contactListItemNodes }
		</div>
	);

}
