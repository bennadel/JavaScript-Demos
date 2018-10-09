
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	prototype: {
		id: number;
		name: string;
	};
	screen: {
		id: number;
		name: string;
		filename: string;
	};
	conversation: {
		id: number;
		label: string;
	};
	comments: {
		id: number;
		content: string;
		user: {
			id: number;
			name: string;
			initials: string;
			avatarUrl: string;
		};		
	}[];
}
	
@Injectable({
	providedIn: "root"
})
export class PartialService {

	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the conversation-oriented partial payload for the prototype conversation
	// view.
	public get( conversationID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var conversation = sampleDataIndex.screenConversations[ conversationID ];

				if ( ! conversation ) {

					throw( new Error( "NotFound" ) );

				}

				var screen = sampleDataIndex.screens[ conversation.screenID ];
				var prototype = sampleDataIndex.prototypes[ screen.prototypeID ];

				return({
					prototype: {
						id: prototype.id,
						name: prototype.name
					},
					screen: {
						id: screen.id,
						name: screen.name,
						filename: screen.filename
					},
					conversation: {
						id: conversation.id,
						label: conversation.label
					},
					comments: conversation.comments.map(
						( comment ) => {

							return({
								id: comment.id,
								content: comment.content,
								user: {
									id: comment.user.id,
									name: comment.user.name,
									initials: comment.user.initials,
									avatarUrl: comment.user.avatarUrl
								}
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}
