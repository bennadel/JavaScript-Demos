
// Import the core React modules.
import React = require( "react" );

export interface OnSubmit {
	( name: string ) : void;
}

interface Props {
	onSubmit: OnSubmit;
}

interface State {
	name: string;
}

export class AddContactFormComponent extends React.Component<Props, State> {

	private input: HTMLInputElement;


	// I initialize the add contact form component.
	constructor( props: Props ) {

		super( props );

		this.state = {
			name: ""
		};

		this.input = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once the component has been mounted on the DOM (and the Element
	// references have been made available).
	public componentDidMount() : void {

		this.input.focus();

	}


	// I render the component.
	public render() : JSX.Element {

		return(
			<div className="add-contact">

				<h3 className="add-contact__title">
					Add New Contact
				</h3>

				<form onSubmit={ this.handleSubmit } className="add-contact__form">
					
					<input 
						type="text"
						ref={ this.handleInputRef }
						value={ this.state.name }
						onChange={ this.handleValue }
						placeholder="Jane Doe..."
						className="add-contact__input">
					</input>

					<button 
						type="submit"
						className="add-contact__button"
						disabled={ ! this.state.name }>
						Add Contact
					</button>

				</form>

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
	private handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) : void => {

		// Stop the native form submission behavior.
		event.preventDefault();

		if ( this.state.name ) {

			this.props.onSubmit( this.state.name );
			this.setState({
				name: ""
			});

		}

	}


	// I handle the exposure of the input element on the DOM.
	// --
	// CAUTION: Using an instance-property to define the function so that we don't lose 
	// the "this" context when the method reference is passed into the React element.
	private handleInputRef = ( element: HTMLInputElement ) : void => {

		this.input = element;

	}


	// I handle the one-way data flow change to the form input.
	private handleValue = ( event: React.FormEvent<HTMLInputElement> ) : void => {

		// CAUTION: I need to cast the React.FormEvent<HTMLInputElement> event type to
		// be an ANY since the native EventTarget interface doesn't appear to support 
		// "value" (on target) at this time. So, by casting to ANY, I am essentially 
		// side-stepping type-safety in order to access the input value.
		this.setState({
			name: ( event as any ).target.value
		})

	}

}
