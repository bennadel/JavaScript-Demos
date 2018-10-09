
var boardID = 0;
var boardItemID = 0;
var freehandID = 0;
var prototypeID = 0;
var screenID = 0;
var conversationID = 0;
var commentID = 0;
var userID = 0;
var productUpdateID = 0;


interface Board {
	id: number;
	name: string;
	isFavorite: boolean;
	items: BoardItem[];
	members: User[];
}

interface BoardItem {
	id: number;
	boardID: number;
	name: string;
	type: string;
	comments: BoardItemComment[];
}

interface BoardItemComment {
	id: number;
	boardItemID: number;
	content: string;
	user: User;
}

interface Prototype {
	id: number;
	name: string;
	isFavorite: boolean;
	screens: Screen[];
	members: User[];
}

interface Screen {
	id: number;
	prototypeID: number;
	name: string;
	filename: string;
	isArchived: boolean;
	conversations: ScreenConversation[];
}

interface ScreenConversation {
	id: number;
	screenID: number;
	label: string;
	comments: ScreenComment[];
}

interface ScreenComment {
	id: number;
	conversationID: number;
	content: string;
	user: User;
}

interface User {
	id: number;
	name: string;
	email: string;
	initials: string;
	avatarUrl: string;
}

interface Freehand {
	id: number;
	name: string;
	isFavorite: boolean;
}

interface ProductUpdate {
	id: number;
	message: string;
	staff: {
		name: string;
		initials: string;
	}
}

interface SampleData {
	users: User[],
	boards: Board[];
	prototypes: Prototype[];
	freehands: Freehand[];
	productUpdates: ProductUpdate[];
}

interface SampleDataIndex {
	boards: {
		[ id: string ]: Board;
	};
	boardItems: {
		[ id: string ]: BoardItem;	
	};
	boardItemComments: {
		[ id: string ]: BoardItemComment;	
	};
	prototypes: {
		[ id: string ]: Prototype;
	};
	screens: {
		[ id: string ]: Screen;
	};
	screenConversations: {
		[ id: string ]: ScreenConversation;
	};
	screenComments: {
		[ id: string ]: ScreenComment;
	};
	freehands: {
		[ id: string ]: Freehand;
	};
	users: {
		[ id: string ]: User;
	};
	productUpdates: {
		[ id: string ]: ProductUpdate;
	}
}

var users = {
	arnold: {
		id: ++userID,
		name: "Arnold Schwarzenegger",
		initials: "AS",
		email: "ben+arnold@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/a37e3b0bdecba37c4dd50639018598ca.jpg?s=150"
	},
	ben: {
		id: ++userID,
		name: "Ben Nadel",
		initials: "BN",
		email: "ben@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/f9bbc701ca6770ef482cc1e172344e25.jpg?s=150"
	},
	john: {
		id: ++userID,
		name: "John Connor",
		initials: "JC",
		email: "ben+john@bennadel.com",
		avatarUrl: ""
	},
	kim: {
		id: ++userID,
		name: "Kim Doro",
		initials: "KD",
		email: "ben+kim@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/5cbcec91c352ed84fa4ad6fc42fd2a05.jpg?s=150"
	},
	sarah: {
		id: ++userID,
		name: "Sarah O'Neill",
		initials: "SS",
		email: "ben+sarah@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/a65ac17d587bc4b2a0d4075fc8cb2938.jpg?s=150"
	},
	tricia: {
		id: ++userID,
		name: "Tricia Nakatomi",
		initials: "TN",
		email: "ben+tricia@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/e75d5660d83e33924a51b22cc1db0a91.jpg?s=150"
	},
	vin: {
		id: ++userID,
		name: "Vin Diesel",
		initials: "VD",
		email: "ben+vin@bennadel.com",
		avatarUrl: "http://www.gravatar.com/avatar/819dff3f1af4af9622eb6949f1356778.jpg?s=150"
	}
};

export var sampleData: SampleData = {
	users: [
		users.arnold,
		users.ben,
		users.john,
		users.kim,
		users.sarah,
		users.tricia,
		users.vin
	],
	boards: [
		{
			id: ++boardID,
			name: "Style And Branding Guide",
			isFavorite: true,
			members: [ users.arnold, users.ben, users.john, users.kim, users.sarah, users.tricia, users.vin ],
			items: [
				{
					id: ++boardItemID,
					boardID: boardID,
					name: "A Swatch",
					type: "Swatch",
					comments: [
						{
							id: ++commentID,
							boardItemID: boardItemID,
							content: "This is a comment....",
							user: users.ben
						}
					]
				},
				{
					id: ++boardItemID,
					boardID: boardID,
					name: "Another Swatch",
					type: "Swatch",
					comments: []
				},
				{
					id: ++boardItemID,
					boardID: boardID,
					name: "And one more Swatch",
					type: "Swatch",
					comments: []
				},
				{
					id: ++boardItemID,
					boardID: boardID,
					name: "Uno Mas",
					type: "Swatch",
					comments: []
				},
				{
					id: ++boardItemID,
					boardID: boardID,
					name: "Kablamo",
					type: "Swatch",
					comments: []
				}
			]
		},
		{
			id: ++boardID,
			name: "Mood Board",
			isFavorite: false,
			members: [ users.ben, users.kim, users.vin ],
			items: [
				{
					id: ++boardItemID,
					boardID: boardID,
					name: "A Swatch",
					type: "Swatch",
					comments: [
						{
							id: ++commentID,
							boardItemID: boardItemID,
							content: "This is a another board comment....",
							user: users.ben
						},
						{
							id: ++commentID,
							boardItemID: boardItemID,
							content: "And then this is a comment that is a bit longer and more inclusive of content that would require reading.",
							user: users.kim
						},
						{
							id: ++commentID,
							boardItemID: boardItemID,
							content: "That's a really good point.",
							user: users.ben
						}
					]
				}
			]
		},
		{
			id: ++boardID,
			name: "Reaction GIFs",
			isFavorite: false,
			members: [ users.arnold, users.ben, users.john, users.tricia ],
			items: []
		}
	],
	prototypes: [
		{
			id: ++prototypeID,
			name: "Public Site Redesign",
			isFavorite: true,
			members: [ users.arnold, users.ben, users.kim, users.sarah, users.tricia, users.vin ],
			screens: [
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Home Page",
					filename: "home_page.png",
					isArchived: false,
					conversations: [
						{
							id: ++conversationID,
							screenID: screenID,
							label: conversationID.toString(),
							comments: [
								{
									id: ++commentID,
									conversationID: conversationID,
									content: "This is a comment...",
									user: users.ben
								},
								{
									id: ++commentID,
									conversationID: conversationID,
									content: "This is a reply...",
									user: users.kim
								},
								{
									id: ++commentID,
									conversationID: conversationID,
									content: "This is a counter reply...",
									user: users.ben
								}
							]
						}
					]
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Home Page",
					filename: "home_page.png",
					isArchived: true,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "About Page",
					filename: "about_us_page.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Our Team",
					filename: "tema_page.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Our Team",
					filename: "tema_page.png",
					isArchived: true,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Contact Us",
					filename: "home_page.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Portfolio",
					filename: "portfolio_v3.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Case Study",
					filename: "case_study.png",
					isArchived: false,
					conversations: []
				}
			]
		},
		{
			id: ++prototypeID,
			name: "Mobile App v1",
			isFavorite: false,
			members: [ users.arnold, users.tricia, users.vin ],
			screens: [
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Login",
					filename: "login.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Login",
					filename: "login.png",
					isArchived: true,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Sign-Up",
					filename: "sign-up.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Home Screen",
					filename: "home.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Detail Screen",
					filename: "detail.png",
					isArchived: false,
					conversations: []
				}
			]
		},
		{
			id: ++prototypeID,
			name: "Mobile App v2.1",
			isFavorite: true,
			members: [ users.kim, users.sarah, users.tricia ],
			screens: [
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Login",
					filename: "login.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Sign-Up",
					filename: "sign-up.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Forgot Password",
					filename: "forgot-password.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Forgot Password",
					filename: "forgot-password.png",
					isArchived: true,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Reset Password",
					filename: "reset-password.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Reset Password",
					filename: "reset-password.png",
					isArchived: true,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Home Screen",
					filename: "home.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Detail Screen",
					filename: "detail.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Profile",
					filename: "profile.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Preferences",
					filename: "preferences.png",
					isArchived: false,
					conversations: []
				}
			]
		},
		{
			id: ++prototypeID,
			name: "Email Templates",
			isFavorite: false,
			members: [ users.ben ],
			screens: [
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Welcome to our App",
					filename: "welcome.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Welcome to our App",
					filename: "welcome.png",
					isArchived: true,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Please reset your password",
					filename: "password-reset.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Your password has been changed",
					filename: "pw-change-conf.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Achievement unlocked!",
					filename: "acheivement.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Contact us - thank you",
					filename: "contact-us__thank-you.png",
					isArchived: false,
					conversations: []
				},
				{
					id: ++screenID,
					prototypeID: prototypeID,
					name: "Sales lead - INTERNAL",
					filename: "sales_lead.png",
					isArchived: false,
					conversations: []
				}
			]
		},
		{
			id: ++prototypeID,
			name: "Placeholder",
			isFavorite: false,
			members: [ users.kim, users.vin ],
			screens: []
		}
	],
	freehands: [
		{
			id: ++freehandID,
			name: "System Architecture v1",
			isFavorite: false
		},
		{
			id: ++freehandID,
			name: "System Architecture v2",
			isFavorite: false
		},
		{
			id: ++freehandID,
			name: "Microservice Brainstorming",
			isFavorite: true
		}
	],
	productUpdates: [
		{
			id: ++productUpdateID,
			message: "Hello Ben,\n\nPardon the interruption, but we wanted you know that we will be undergoing emergency system maintenance on Friday, September 15th from 10:00 PM ET to Monday, September 18th at 7:00 AM ET.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nHope this message finds you well.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere porttitor erat, vel tincidunt nulla rutrum vitae. Donec tincidunt ligula lectus, vitae tempor orci interdum non. Nunc tincidunt ullamcorper arcu, ac volutpat metus mattis eu. Fusce eget quam laoreet, pretium tortor ultrices, iaculis justo. Nullam nec orci fringilla, interdum sem ac, maximus erat.",
			staff: {
				name: "Saxon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nHope this message finds you well.\n\nNam finibus lacus magna, eu tincidunt odio pellentesque in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis augue ligula. Praesent nisl mi, condimentum vel lacus ut, venenatis porttitor purus. Etiam id finibus metus, non imperdiet nunc.",
			staff: {
				name: "Lindsey",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Happy New Year!\n\nHope this message finds you well.\n\nUt fermentum elit elit, consectetur adipiscing elit. Nullam quis augue ligula. Praesent nisl mi, condimentum vel lacus ut, venenatis porttitor purus. Etiam id finibus metus, non imperdiet nunc.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Merry Christmas and happy holidays!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis augue ligula. Praesent nisl mi, condimentum vel lacus ut, venenatis porttitor purus. Etiam id finibus metus, non imperdiet nunc.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Happy Thanksgiving! Put down that pumpkin pie and listen up!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis augue ligula. Praesent nisl mi, condimentum vel lacus ut, venenatis porttitor purus. Etiam id finibus metus, non imperdiet nunc.",
			staff: {
				name: "Lindsey",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nHope this message finds you well.\n\nUt fermentum elit elit, consectetur adipiscing elit. Etiam posuere porttitor erat, vel tincidunt nulla rutrum vitae. Donec tincidunt ligula lectus, vitae tempor orci interdum non. Nunc tincidunt ullamcorper arcu, ac volutpat metus mattis eu. Fusce eget quam laoreet, pretium tortor ultrices, iaculis justo. Nullam nec orci fringilla, interdum sem ac, maximus erat.",
			staff: {
				name: "Saxon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hi Ben!\n\nLooks like your prototype is almost ready for prime time!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend erat et magna porttitor fringilla at non erat. Vestibulum libero purus, maximus non neque sed, bibendum blandit libero.",
			staff: {
				name: "Lindsey",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Happy Independece Day!\n\nHope this message finds you well!\n\nNulla et erat non metus pulvinar iaculis, consectetur adipiscing elit. Curabitur vulputate arcu neque, eget accumsan libero congue nec. Phasellus dictum convallis odio eu mollis. Duis interdum quam ut tortor porta ultrices. Maecenas hendrerit diam urna, eget fermentum sem scelerisque sit amet.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nWe have some amazing news!\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum interdum lectus at rutrum. Suspendisse potenti. Maecenas eu sapien sit amet nunc dapibus interdum sed vitae nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent porta pretium posuere. Aliquam et lorem egestas, bibendum leo a, mollis sapien. Suspendisse blandit ut urna nec vulputate. Sed porta viverra urna, facilisis convallis magna. Sed eu erat at eros cursus porttitor eget a risus. Fusce ac arcu vel mauris consectetur faucibus. Duis vitae dui bibendum, tempus risus ac, faucibus nibh. Nam at auctor nibh.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nFreehand has finally arrived - are you ready?\n\nPellentesque at libero elit, consectetur adipiscing elit. Suspendisse vulputate, neque vel gravida volutpat, lectus nisi venenatis ipsum, vitae facilisis ex ex nec massa. Aenean eu congue ante. Curabitur sollicitudin sem lorem, quis fermentum nunc pulvinar sed. Morbi viverra maximus lacus, ut luctus nisi porttitor at.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nWe are going to sunset LiveShare at the start of 2018.\n\nPraesent maximus urna eu ante iaculis, eget vulputate quam porttitor. Aliquam in turpis tincidunt, pulvinar eros eu, convallis elit. Donec convallis sem id velit viverra facilisis. Donec luctus euismod tellus eu rhoncus. Morbi erat tellus, elementum eu lectus in, aliquet sodales nisl. In id pretium turpis.",
			staff: {
				name: "Lindsey",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nWe have some really exciting announcements!\n\nVestibulum euismod eleifend sem, quis ultrices mi pellentesque congue. Curabitur vitae aliquet eros, vitae bibendum risus. Donec non metus ultricies, suscipit felis nec, fermentum massa. Phasellus condimentum sapien et ante ultrices laoreet. Etiam iaculis tempor faucibus. Nullam non odio ligula. Proin enim dolor, sollicitudin id arcu non, sollicitudin cursus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed aliquet rutrum est sed finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper nunc eu tincidunt lacinia.",
			staff: {
				name: "Brandon",
				initials: "IN"
			}
		},
		{
			id: ++productUpdateID,
			message: "Hello Ben!\n\nWe are pleased to announce that things are awesome!\n\nMorbi viverra porttitor nulla, sit amet cursus mi lobortis eu. Sed cursus turpis eu est maximus, vitae egestas tortor euismod. Nunc in leo nec neque hendrerit mollis. Maecenas egestas arcu eu libero ultrices, sed iaculis sem lacinia. Quisque condimentum felis eu tempor sagittis. Donec nec urna bibendum, ullamcorper felis in, interdum neque.",
			staff: {
				name: "Saxon",
				initials: "IN"
			}
		}
	]
};

// In order to make the sample data a bit easier to consume, let's create an ID-based 
// index for all the unique entities.
export var sampleDataIndex: SampleDataIndex = {
	boards: {},
	boardItems: {},
	boardItemComments: {},
	prototypes: {},
	screens: {},
	screenConversations: {},
	screenComments: {},
	freehands: {},
	users: {},
	productUpdates: {}
};

sampleData.boards.forEach(
	( board ) : void => {

		sampleDataIndex.boards[ board.id ] = board;

		board.items.forEach(
			( boardItem ) : void => {

				sampleDataIndex.boardItems[ boardItem.id ] = boardItem;

				boardItem.comments.forEach(
					( comment ) : void => {

						sampleDataIndex.boardItemComments[ comment.id ] = comment;

					}
				);

			}
		);

	}
);

sampleData.prototypes.forEach(
	( prototype ) : void => {

		sampleDataIndex.prototypes[ prototype.id ] = prototype;

		prototype.screens.forEach(
			( screen ) : void => {

				sampleDataIndex.screens[ screen.id ] = screen;

				screen.conversations.forEach(
					( conversation ) : void => {

						sampleDataIndex.screenConversations[ conversation.id ] = conversation;

						conversation.comments.forEach(
							( comment ) : void => {

								sampleDataIndex.screenComments[ comment.id ] = comment;

							}
						);

					}
				);

			}
		);

	}
);

sampleData.freehands.forEach(
	( freehand ) : void => {

		sampleDataIndex.freehands[ freehand.id ] = freehand;

	}
);

sampleData.users.forEach(
	( user ) : void => {

		sampleDataIndex.users[ user.id ] = user;

	}
);

sampleData.productUpdates.forEach(
	( productUpdate ) : void => {

		sampleDataIndex.productUpdates[ productUpdate.id ] = productUpdate;

	}
);
