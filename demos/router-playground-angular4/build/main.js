webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var common_1 = __webpack_require__(30);
var forms_1 = __webpack_require__(314);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
// Import the application components and services.
var autofocus_directive_1 = __webpack_require__(317);
var avatar_component_1 = __webpack_require__(318);
var fragment_polyfill_module_1 = __webpack_require__(108);
var loading_indicator_component_1 = __webpack_require__(321);
var retain_scroll_polyfill_module_1 = __webpack_require__(109);
var show_block_directive_1 = __webpack_require__(324);
var trap_scroll_directive_1 = __webpack_require__(325);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var sharedModules = [
    common_1.CommonModule,
    fragment_polyfill_module_1.FragmentPolyfillModule,
    forms_1.FormsModule,
    retain_scroll_polyfill_module_1.RetainScrollPolyfillModule,
    router_1.RouterModule
];
var sharedDeclarations = [
    autofocus_directive_1.AutofocusDirective,
    avatar_component_1.AvatarComponent,
    loading_indicator_component_1.LoadingIndicatorComponent,
    show_block_directive_1.ShowBlockDirective,
    trap_scroll_directive_1.TrapScrollDirective
];
// The goal of the SharedModule is to organize declarations and other modules that will
// be imported into other modules (for rendering). This module should NOT contain any
// service providers (those are in the CoreModule).
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            exports: sharedDeclarations.concat(sharedModules),
            declarations: sharedDeclarations.slice()
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var boardID = 0;
var boardItemID = 0;
var freehandID = 0;
var prototypeID = 0;
var screenID = 0;
var conversationID = 0;
var commentID = 0;
var userID = 0;
var productUpdateID = 0;
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
exports.sampleData = {
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
            members: [users.arnold, users.ben, users.john, users.kim, users.sarah, users.tricia, users.vin],
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
            members: [users.ben, users.kim, users.vin],
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
            members: [users.arnold, users.ben, users.john, users.tricia],
            items: []
        }
    ],
    prototypes: [
        {
            id: ++prototypeID,
            name: "Public Site Redesign",
            isFavorite: true,
            members: [users.arnold, users.ben, users.kim, users.sarah, users.tricia, users.vin],
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
            members: [users.arnold, users.tricia, users.vin],
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
            members: [users.kim, users.sarah, users.tricia],
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
            members: [users.ben],
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
            members: [users.kim, users.vin],
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
exports.sampleDataIndex = {
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
exports.sampleData.boards.forEach(function (board) {
    exports.sampleDataIndex.boards[board.id] = board;
    board.items.forEach(function (boardItem) {
        exports.sampleDataIndex.boardItems[boardItem.id] = boardItem;
        boardItem.comments.forEach(function (comment) {
            exports.sampleDataIndex.boardItemComments[comment.id] = comment;
        });
    });
});
exports.sampleData.prototypes.forEach(function (prototype) {
    exports.sampleDataIndex.prototypes[prototype.id] = prototype;
    prototype.screens.forEach(function (screen) {
        exports.sampleDataIndex.screens[screen.id] = screen;
        screen.conversations.forEach(function (conversation) {
            exports.sampleDataIndex.screenConversations[conversation.id] = conversation;
            conversation.comments.forEach(function (comment) {
                exports.sampleDataIndex.screenComments[comment.id] = comment;
            });
        });
    });
});
exports.sampleData.freehands.forEach(function (freehand) {
    exports.sampleDataIndex.freehands[freehand.id] = freehand;
});
exports.sampleData.users.forEach(function (user) {
    exports.sampleDataIndex.users[user.id] = user;
});
exports.sampleData.productUpdates.forEach(function (productUpdate) {
    exports.sampleDataIndex.productUpdates[productUpdate.id] = productUpdate;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorLogger = /** @class */ (function () {
    function ErrorLogger() {
        // ....
    }
    // ---
    // PUBLIC METHODS.
    // ---
    ErrorLogger.prototype.log = function (error, message) {
        if (message === void 0) { message = ""; }
        console.group("Error Logger");
        if (message) {
            console.warn(message);
        }
        console.error(error);
        console.groupEnd();
    };
    return ErrorLogger;
}());
exports.ErrorLogger = ErrorLogger;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var PartialHelper = /** @class */ (function () {
    function PartialHelper() {
    }
    // I create and return a promise that will eventually resolve with result of the 
    // operator. The goal here is to simulate network latency while using local data.
    // This is just for demonstration purposes.
    PartialHelper.simulateNetworkLatency = function (operator, delay) {
        if (delay === void 0) { delay = 0; }
        // When we invoke the operator() method, we want to do this in the Promise 
        // constructor in order to ensure any errors result in a rejected promise.
        var promise = new Promise(function (resolve, reject) {
            var payload = operator();
            setTimeout(function () {
                resolve(payload);
            }, (delay || lodash_extended_1._.random(100, 750)));
        });
        return (promise);
    };
    return PartialHelper;
}());
exports.PartialHelper = PartialHelper;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// Map to normalized keys across different browser implementations.
// --
// https://github.com/angular/angular/blob/5.0.5/packages/platform-browser/src/browser/browser_adapter.ts#L25-L42
var KEY_MAP = {
    "\b": "Backspace",
    "\t": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    "Del": "Delete",
    "Esc": "Escape",
    "Left": "ArrowLeft",
    "Right": "ArrowRight",
    "Up": "ArrowUp",
    "Down": "ArrowDown",
    "Menu": "ContextMenu",
    "Scroll": "ScrollLock",
    "Win": "OS",
    " ": "Space",
    ".": "Dot"
};
// NOTE: These will only be applied after the key has been lower-cased. As such, both the
// alias and the final value (in this mapping) should also be lower-case.
var KEY_ALIAS = {
    command: "meta",
    ctrl: "control",
    del: "delete",
    down: "arrowdown",
    esc: "escape",
    left: "arrowleft",
    right: "arrowright",
    up: "arrowup"
};
var KeyboardShortcuts = /** @class */ (function () {
    // I initialize the keyboard shortcuts service.
    function KeyboardShortcuts(zone) {
        var _this = this;
        // I handle the keyboard events for the root handler (and delegate to the listeners).
        this.handleKeyboardEvent = function (event) {
            var key = _this.getKeyFromEvent(event);
            var isInputEvent = _this.isEventFromInput(event);
            var handler;
            // Iterate over the listeners in DESCENDING priority order.
            for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (handler = listener.bindings[key]) {
                    // Execute handler if this is NOT an input event that we need to ignore.
                    if (!isInputEvent || listener.inputs) {
                        // Right now, we're executing outside of the NgZone. As such, we 
                        // have to re-enter the NgZone so that we can hook back into change-
                        // detection. Plus, this will also catch errors and propagate them 
                        // through application properly.
                        var result = _this.zone.runGuarded(function () {
                            return (handler(event));
                        });
                        // If the handler returned an explicit False, we're going to treat 
                        // this listener as Terminal, regardless of the original settings.
                        if (result === false) {
                            return;
                            // If the handler returned an explicit True, we're going to treat
                            // this listener as NOT Terminal, regardless of the original settings.
                        }
                        else if (result === true) {
                            continue;
                        }
                    }
                    // If this listener is terminal for matches, stop propagation.
                    if (listener.terminal === "match") {
                        return;
                    }
                }
                // If this listener is terminal for all events, stop propagation (unless the
                // event is white-listed for propagation).
                if ((listener.terminal === true) && !listener.terminalWhitelist[key]) {
                    return;
                }
            } // END: For-loop.
        };
        this.zone = zone;
        this.listeners = [];
        this.namedPriorities = Object.create(null);
        this.normalizedKeys = Object.create(null);
        // Since we're going to create a root event-handler for the keydown event, we're
        // gonna do this outside of the NgZone. This way, we're not constantly triggering
        // change-detection for every key event - we'll only re-enter the Angular Zone 
        // when we have an event that is actually being consumed by one of our components.
        this.zone.runOutsideAngular(function () {
            window.addEventListener("keydown", _this.handleKeyboardEvent);
        });
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the priority for the given label.
    KeyboardShortcuts.prototype.getPriority = function (name) {
        if (this.namedPriorities[name] === undefined) {
            throw (new Error("Missing named priority."));
        }
        return (this.namedPriorities[name]);
    };
    // I configure key-event listener at the given priority. Returns a Function that can
    // be used to unbind the listener.
    KeyboardShortcuts.prototype.listen = function (bindings, options) {
        var _this = this;
        var listener = this.addListener({
            priority: options.priority,
            terminal: this.normalizeTerminal(options.terminal),
            terminalWhitelist: this.normalizeTerminalWhitelist(options.terminalWhitelist),
            inputs: this.normalizeInputs(options.inputs),
            bindings: this.normalizeBindings(bindings)
        });
        var unlisten = function () {
            _this.removeListener(listener);
        };
        return (unlisten);
    };
    // I set the priority for the given label. Returns self.
    KeyboardShortcuts.prototype.setPriority = function (name, priority) {
        this.namedPriorities[name] = priority;
        return (this);
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I add the listener to the internal collection in DESCENDING priority order.
    KeyboardShortcuts.prototype.addListener = function (listener) {
        this.listeners.push(listener);
        this.listeners.sort(function (a, b) {
            // We want to sort the listeners in DESCENDING priority order so that the 
            // higher-priority items are at the start of the collection - this will 
            // make it easier to loop over later (highest priority first).
            if (a.priority < b.priority) {
                return (1);
            }
            else if (a.priority > b.priority) {
                return (-1);
            }
            else {
                return (0);
            }
        });
        return (listener);
    };
    // I get the normalized event-key from the given event.
    // --
    // CAUTION: Most of this logic is taken from the core KeyEventsPlugin code but,
    // with some of the logic removed. This is simplified for the demo.
    KeyboardShortcuts.prototype.getKeyFromEvent = function (event) {
        var key = (event.key || event["keyIdentifier"] || "Unidentified");
        if (key.startsWith("U+")) {
            key = String.fromCharCode(parseInt(key.slice(2), 16));
        }
        var parts = [KEY_MAP[key] || key];
        if (event.altKey)
            parts.push("Alt");
        if (event.ctrlKey)
            parts.push("Control");
        if (event.metaKey)
            parts.push("Meta");
        if (event.shiftKey)
            parts.push("Shift");
        return (this.normalizeKey(parts.join(".")));
    };
    // I determine if the given event originated from a form input element.
    KeyboardShortcuts.prototype.isEventFromInput = function (event) {
        if (event.target instanceof Node) {
            switch (event.target.nodeName) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    return (true);
                    // @ts-ignore: TS7027: Unreachable code detected.
                    break;
                default:
                    return (false);
                    // @ts-ignore: TS7027: Unreachable code detected.
                    break;
            }
        }
        return (false);
    };
    // I return a bindings collection in which the keys of the given bindings have been
    // normalized into a predictable format.
    KeyboardShortcuts.prototype.normalizeBindings = function (bindings) {
        var normalized = Object.create(null);
        for (var key in bindings) {
            normalized[this.normalizeKey(key)] = bindings[key];
        }
        return (normalized);
    };
    // I normalize the inputs option.
    KeyboardShortcuts.prototype.normalizeInputs = function (inputs) {
        if (inputs === undefined) {
            return (false);
        }
        return (inputs);
    };
    // I return the given key in a normalized, predictable format.
    KeyboardShortcuts.prototype.normalizeKey = function (key) {
        if (!this.normalizedKeys[key]) {
            this.normalizedKeys[key] = key
                .toLowerCase()
                .split(".")
                .map(function (segment) {
                return (KEY_ALIAS[segment] || segment);
            })
                .sort()
                .join(".");
        }
        return (this.normalizedKeys[key]);
    };
    // I normalize the terminal option.
    KeyboardShortcuts.prototype.normalizeTerminal = function (terminal) {
        if (terminal === undefined) {
            return (true);
        }
        return (terminal);
    };
    // I normalize the terminalWhitelist option.
    KeyboardShortcuts.prototype.normalizeTerminalWhitelist = function (keys) {
        var normalized = Object.create(null);
        if (keys) {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                normalized[this.normalizeKey(key)] = true;
            }
        }
        return (normalized);
    };
    // I remove the given listener from the internal collection.
    KeyboardShortcuts.prototype.removeListener = function (listenerToRemove) {
        this.listeners = this.listeners.filter(function (listener) {
            return (listener !== listenerToRemove);
        });
    };
    KeyboardShortcuts = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.NgZone])
    ], KeyboardShortcuts);
    return KeyboardShortcuts;
}());
exports.KeyboardShortcuts = KeyboardShortcuts;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Session = /** @class */ (function () {
    // I initialize the session object.
    function Session() {
        this.user = null;
    }
    Session.prototype.isForUser = function (partialUser) {
        if (!this.user) {
            return (false);
        }
        if (typeof (partialUser) === "number") {
            return (this.user.id === partialUser);
        }
        else {
            return (this.user.id === partialUser.id);
        }
    };
    // I set the currently logged-in user.
    Session.prototype.setUser = function (user) {
        this.user = user;
    };
    return Session;
}());
exports.Session = Session;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var find = __webpack_require__(79);
var flatten = __webpack_require__(99);
var indexOf = __webpack_require__(101);
var last = __webpack_require__(102);
var random = __webpack_require__(103);
var sortBy = __webpack_require__(105);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// Package and export the individual lodash functions as a local / extended version of 
// lodash. This way, you don't have to have little function names floating around in
// your code. It also makes it quite clear which functions are actually being used (and
// will need to be echoed in your "vendor" module).
exports._ = {
    find: find,
    flatten: flatten,
    indexOf: indexOf,
    last: last,
    random: random,
    sortBy: sortBy,
    sortByCaseInsensitive: sortByCaseInsensitive
};
// I proxy the sortBy() function, lower-casing the given item property.
function sortByCaseInsensitive(collection, property) {
    var newCollection = sortBy(collection, function (item) {
        return (item[property].toLowerCase());
    });
    return (newCollection);
}


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(115);
var ConsoleViewComponent = /** @class */ (function () {
    // I initialize the console-view component.
    function ConsoleViewComponent(activatedRoute, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.isShowingScreenBrowser = true;
        this.isShowingStatusMenu = false;
        this.isShowingToolbar = true;
        this.prototype = null;
        this.screen = null;
        this.selectedMode = "preview";
        this.selectedPrototypeID = null;
        this.selectedScreenID = null;
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called once when the component is being unmounted.
    ConsoleViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    // I get called once when the component is being mounted.
    ConsoleViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            var prototypeID = +paramMap.get("prototypeID");
            var screenID = +paramMap.get("screenID");
            if (_this.selectedPrototypeID !== prototypeID) {
                _this.loadPrototype(prototypeID);
            }
            else if (_this.selectedScreenID !== screenID) {
                _this.loadScreen(screenID);
            }
            // Anytime the route changes, let's hide the widgetry.
            _this.isShowingStatusMenu = false;
            _this.isShowingScreenBrowser = false;
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "P": function (event) {
                _this.gotoMode("preview");
            },
            "B": function (event) {
                _this.gotoMode("build");
            },
            "C": function (event) {
                _this.gotoMode("comment");
            },
            "I": function (event) {
                _this.gotoMode("inspect");
            },
            "H": function (event) {
                _this.gotoMode("history");
            },
            "ArrowLeft": function (event) {
                _this.gotoRelativeScreen("previous");
            },
            "ArrowRight": function (event) {
                _this.gotoRelativeScreen("next");
            },
            "Meta.F": function (event) {
                // If the toolbar isn't showing, then ignore screen browser request.
                // It wasn't designed to render without the toolbar.
                if (!_this.isShowingToolbar) {
                    return;
                }
                _this.toggleScreenBrowser();
                // Since this is the browser's native "Find" command, we want to 
                // prevent the default behavior so we can override it.
                event.preventDefault();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("console")
        });
    };
    ConsoleViewComponent.prototype.gotoMode = function (mode) {
        // This operation depends on the loaded data. As such, if we are still loading 
        // the console data, ignore the request.
        if (this.isLoading) {
            return;
        }
        this.selectedMode = mode;
        // Even though we close this when the navigation happens, we should close it here
        // as well in case the current mode is the given mode. In such a case, there will 
        // be no navigation and therefore no navigation event.
        this.isShowingScreenBrowser = false;
        // The toolbar can only be hidden in Preview mode. As such, bring it back for all
        // other modes.
        if (this.selectedMode !== "preview") {
            this.isShowingToolbar = true;
        }
        this.router.navigateByUrl("/app/console/prototypes/" + this.prototype.id + "/screens/" + this.screen.id + "/" + this.selectedMode);
    };
    ConsoleViewComponent.prototype.gotoRelativeScreen = function (direction) {
        // This operation depends on the loaded data. As such, if we are still loading 
        // the console data, ignore the request.
        if (this.isLoading) {
            return;
        }
        var index = lodash_extended_1._.indexOf(this.screens, this.screen);
        switch (direction) {
            case "previous":
                if (--index < 0) {
                    index = (this.screens.length - 1);
                }
                break;
            case "next":
                if (++index >= this.screens.length) {
                    index = 0;
                }
                break;
        }
        var mode = this.getSelectedMode();
        this.router.navigateByUrl("/app/console/prototypes/" + this.prototype.id + "/screens/" + this.screens[index].id + "/" + mode);
    };
    ConsoleViewComponent.prototype.gotoScreen = function (screen) {
        // Even though we close this when the navigation happens, we should close it here
        // as well in case the current screen is the selected screen. In such a case, 
        // there will be no navigation and therefore no navigation event.
        this.isShowingScreenBrowser = false;
        this.selectedMode = this.getSelectedMode();
        this.router.navigateByUrl("/app/console/prototypes/" + this.prototype.id + "/screens/" + screen.id + "/" + this.selectedMode);
    };
    ConsoleViewComponent.prototype.hideStatusMenu = function () {
        this.isShowingStatusMenu = false;
    };
    ConsoleViewComponent.prototype.showStatusMenu = function () {
        this.isShowingStatusMenu = true;
    };
    ConsoleViewComponent.prototype.toggleScreenBrowser = function () {
        this.isShowingScreenBrowser = !this.isShowingScreenBrowser;
        this.isShowingStatusMenu = false;
    };
    ConsoleViewComponent.prototype.toggleStatusMenu = function () {
        this.isShowingStatusMenu = !this.isShowingStatusMenu;
    };
    ConsoleViewComponent.prototype.toggleToolbar = function () {
        this.isShowingToolbar = !this.isShowingToolbar;
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ConsoleViewComponent.prototype.getSelectedMode = function () {
        var firstChild = this.activatedRoute.snapshot.firstChild;
        if (firstChild) {
            return (firstChild.url[0].path);
        }
        else {
            console.warn("No mode detected, returning default [preview].");
            return ("preview");
        }
    };
    ConsoleViewComponent.prototype.loadPrototype = function (prototypeID) {
        var _this = this;
        this.selectedPrototypeID = prototypeID;
        this.isLoading = true;
        this.partialService
            .get(prototypeID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.prototype = partial.prototype;
            _this.screens = partial.screens;
            _this.loadScreen(+_this.activatedRoute.snapshot.params.screenID);
        }, function (error) {
            _this.errorLogger.log(error);
            var primary = "prototypes/" + _this.selectedPrototypeID;
            var secondary = (error.message === "EmptyPrototype")
                ? "modal/error/cannot-build-empty-prototype"
                : "modal/error/could-not-load-prototype";
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: primary,
                        modal: secondary
                    }
                }
            ]);
        });
    };
    ConsoleViewComponent.prototype.loadScreen = function (screenID) {
        // If we're currently loading the prototype, then skip the screen - we'll get
        // the screen after the prototype finishes loading.
        if (this.isLoading) {
            return;
        }
        this.selectedScreenID = screenID;
        this.selectedMode = this.getSelectedMode();
        this.screen = lodash_extended_1._.find(this.screens, {
            id: this.selectedScreenID
        });
        if (!this.screen) {
            // NOTE: We're putting the view back into a loading state since the "screen"
            // object will be undefined at this point - we don't want the UI trying to
            // reference it while the navigation is taking place.
            this.isLoading = true;
            // NOTE: We are redirecting back to the prototype detail rather than trying
            // to fall back to a more meaningful screen selection since there is a bug in 
            // Angular that doesn't allow a redirect to the same route-path if not all of
            // the router-outlets have been rendered (which is likely).
            this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: "prototypes/" + this.selectedPrototypeID,
                        modal: "modal/error/could-not-load-screen"
                    }
                }
            ]);
        }
    };
    // ---
    // STATIC METHODS.
    // ---
    ConsoleViewComponent.reducers = {
        hideScreenBrowser: function (state) {
            return (state);
        }
    };
    ConsoleViewComponent = __decorate([
        core_1.Component({
            selector: "console-view",
            styles: [__webpack_require__(329)],
            template: __webpack_require__(330)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], ConsoleViewComponent);
    return ConsoleViewComponent;
}());
exports.ConsoleViewComponent = ConsoleViewComponent;


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

module.exports = ".m-standard-header {\n  background-color: #1F2532 ;\n  display: block ;\n  position: relative ;\n}\n.m-standard-header__container {\n  margin: 0px auto 0px auto ;\n  padding: 25px 0px 48px 0px ;\n  position: relative ;\n  width: 1170px ;\n}\n.m-standard-header__container--with-nav {\n  padding-bottom: 0px ;\n}\n.m-standard-header__logo {\n  border-right: 1px solid #2C3242 ;\n  color: #FFFFFF ;\n  cursor: pointer ;\n  font-size: 30px ;\n  font-weight: 600 ;\n  height: 36px ;\n  line-height: 36px ;\n  outline: 0px ;\n  padding-right: 20px ;\n  position: absolute ;\n  left: -84px;\n  text-align: center ;\n  top: 25px ;\n  width: 40px ;\n}\n.m-standard-header__title {\n  color: #FFFFFF ;\n  font-size: 32px ;\n  font-weight: 300 ;\n  line-height: 36px ;\n  margin: 0px 0px 0px 0px ;\n}\n.m-standard-header__nav {\n  margin-left: -20px;\n  margin-top: 30px ;\n}\n.m-standard-header__nav:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n}\n.m-standard-header__nav-item {\n  color: #898F9A ;\n  float: left ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  letter-spacing: 0.8px ;\n  margin-right: 10px ;\n  padding: 10px 20px 18px 20px ;\n  position: relative ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  transition: color 100ms ease ;\n  -moz-transition: color 100ms ease ;\n  -webkit-transition: color 100ms ease ;\n}\n.m-standard-header__nav-item:hover {\n  color: #ACB1BE ;\n}\n.m-standard-header__nav-item--on {\n  color: #F9F9FB ;\n}\n.m-standard-header__nav-item--on:after {\n  background-color: #FF3366 ;\n  bottom: 0px ;\n  content: \"\";\n  height: 2px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n.m-standard-header__nav-item--on:hover {\n  color: #F9F9FB ;\n}\n.m-standard-body {\n  display: block ;\n}\n.m-standard-body__container {\n  margin: 0px auto 0px auto ;\n  padding-top: 50px ;\n  position: relative ;\n  width: 1170px ;\n}\n"

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var platform_browser_1 = __webpack_require__(15);
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DomUtils = /** @class */ (function () {
    // I initialize the DOM Utils service.
    function DomUtils(doc) {
        this.doc = doc;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    DomUtils.prototype.hideHtmlOverflow = function () {
        this.doc.querySelector("html").style.overflow = "hidden";
    };
    DomUtils.prototype.showHtmlOverflow = function () {
        this.doc.querySelector("html").style.overflow = "";
    };
    DomUtils = __decorate([
        core_2.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], DomUtils);
    return DomUtils;
}());
exports.DomUtils = DomUtils;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
exports.WINDOW_SCROLLER_OPTIONS = new core_2.InjectionToken("[Fragment Polyfill] WindowScroller.Options");
// I provide the dependency-injection token for the window-scroller so that it can be
// more easily injected into the FragmentTarget directive. This allows other developers
// to provide an override that implements this Type without have to deal with the silly
// @Inject() decorator.
var WindowScroller = /** @class */ (function () {
    function WindowScroller() {
    }
    return WindowScroller;
}());
exports.WindowScroller = WindowScroller;
// I provide an implementation for scrolling a given Element Reference into view. By
// default, it uses the native .scrollIntoView() method; but, it can be overridden to 
// use something like a jQuery plug-in, or other custom implementation.
var NativeWindowScroller = /** @class */ (function () {
    // I initialize the window scroller implementation.
    function NativeWindowScroller(options) {
        this.behavior = (options.smooth ? "smooth" : "auto");
        this.timer = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I scroll the given ElementRef into the client's viewport.
    NativeWindowScroller.prototype.scrollIntoView = function (elementRef) {
        var _this = this;
        // NOTE: There is an odd race-condition that I cannot figure out. The initial
        // scrollToView() will not work when the BROWSER IS REFRESHED. It will work if
        // the page is opened in a new tab; it only fails on refresh (WAT?!). To fix this
        // peculiarity, I'm putting the first scroll operation behind a timer. The rest
        // of the scroll operations will initiate synchronously.
        if (this.timer) {
            this.doScroll(elementRef);
        }
        else {
            this.timer = setTimeout(function () {
                _this.doScroll(elementRef);
            }, 0);
        }
    };
    // ---
    // PRIVATE METHOD.
    // ---
    // I perform the scrolling of the viewport.
    NativeWindowScroller.prototype.doScroll = function (elementRef) {
        elementRef.nativeElement.scrollIntoView({
            behavior: this.behavior,
            block: "start"
        });
    };
    NativeWindowScroller = __decorate([
        __param(0, core_1.Inject(exports.WINDOW_SCROLLER_OPTIONS)),
        __metadata("design:paramtypes", [Object])
    ], NativeWindowScroller);
    return NativeWindowScroller;
}());
exports.NativeWindowScroller = NativeWindowScroller;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(124);
var ShareBoardViewComponent = /** @class */ (function () {
    // I initialize the share-board-view component.
    function ShareBoardViewComponent(activatedRoute, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.board = null;
        this.isLoading = true;
        this.shareUrl = "https://invis.io/boards/Ze8jD3k77c";
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    ShareBoardViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    ShareBoardViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    ShareBoardViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ShareBoardViewComponent.prototype.loadData = function (boardID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(boardID)
            .then(function (partial) {
            _this.board = partial.board;
            _this.isLoading = false;
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-board"
                    }
                }
            ]);
        });
    };
    ShareBoardViewComponent = __decorate([
        core_1.Component({
            selector: "share-board-view",
            host: {
                "(directclick)": "closeModal()"
            },
            styles: [__webpack_require__(405)],
            template: __webpack_require__(406)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], ShareBoardViewComponent);
    return ShareBoardViewComponent;
}());
exports.ShareBoardViewComponent = ShareBoardViewComponent;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(125);
var SharePrototypeViewComponent = /** @class */ (function () {
    // I initialize the share-prototype-view component.
    function SharePrototypeViewComponent(activatedRoute, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.prototype = null;
        this.shareUrl = "https://invis.io/Ze8jD3k77c";
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    SharePrototypeViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    SharePrototypeViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    SharePrototypeViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    SharePrototypeViewComponent.prototype.loadData = function (prototypeID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(prototypeID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.prototype = partial.prototype;
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-prototype"
                    }
                }
            ]);
        });
    };
    SharePrototypeViewComponent = __decorate([
        core_1.Component({
            selector: "share-prototype-view",
            host: {
                "(directclick)": "closeModal()"
            },
            styles: [__webpack_require__(417)],
            template: __webpack_require__(418)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], SharePrototypeViewComponent);
    return SharePrototypeViewComponent;
}());
exports.SharePrototypeViewComponent = SharePrototypeViewComponent;


/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WINDOW_SELECTOR = "__window__";
var NG_ENCAPSULATION_PATTERN = /^_ng(host|content)\b/i;
// I provide a unified interface for dealing with scroll offsets across different types
// of targets (elements vs. windows).
var DomUtils = /** @class */ (function () {
    function DomUtils() {
    }
    // I determine if the target at the given selector exists in the active DOM.
    DomUtils.prototype.exists = function (selector) {
        return (!!this.select(selector));
    };
    // I get the scroll-top of the given target in the active DOM.
    DomUtils.prototype.getScrollTop = function (target) {
        if (target instanceof Window) {
            return (window.scrollY);
        }
        else {
            return (target.scrollTop);
        }
    };
    // I return the CSS selector for the given target.
    // --
    // NOTE: The generated selector is intended to be consumed by this class only - 
    // it may not produce a valid CSS selector.
    DomUtils.prototype.getSelector = function (target) {
        // NOTE: I am breaking this apart because TypeScript was having trouble dealing
        // with type-guard. I believe this is part of this bug:
        // --
        // https://github.com/Microsoft/TypeScript/issues/7271#issuecomment-360123191
        if (target instanceof Window) {
            return (WINDOW_SELECTOR);
        }
        else {
            return (this.getSelectorForElement(target));
        }
    };
    // I get the scrollable target for the given "scroll" event.
    // --
    // NOTE: If you want to ignore (ie, not reinstate the scroll) of a particular type
    // of DOM element, return NULL from this method.
    DomUtils.prototype.getTargetFromScrollEvent = function (event) {
        var node = event.target;
        if (node instanceof HTMLDocument) {
            return (window);
        }
        else if (node instanceof Element) {
            return (node);
        }
        return (null);
    };
    // I attempt to scroll the given target to the given scrollTop and return the 
    // resultant value presented by the target.
    DomUtils.prototype.scrollTo = function (target, scrollTop) {
        if (target instanceof Window) {
            target.scrollTo(0, scrollTop);
            return (target.scrollY);
        }
        else if (target instanceof Element) {
            target.scrollTop = scrollTop;
            return (target.scrollTop);
        }
    };
    // I return the target accessible at the given CSS selector.
    DomUtils.prototype.select = function (selector) {
        if (selector === WINDOW_SELECTOR) {
            return (window);
        }
        else {
            return (document.querySelector(selector));
        }
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I generate a CSS selector for the given target.
    DomUtils.prototype.getSelectorForElement = function (target) {
        var selectors = [];
        var current = target;
        while (current && (current.nodeName !== "BODY")) {
            var selector = current.nodeName.toLowerCase();
            for (var _i = 0, _a = Array.from(current.attributes); _i < _a.length; _i++) {
                var attribute = _a[_i];
                if (attribute.name.search(NG_ENCAPSULATION_PATTERN) === 0) {
                    selector += "[" + attribute.name + "]";
                }
            }
            selectors.unshift(selector);
            current = current.parentNode;
        }
        return (selectors.join(" > "));
    };
    // I check to see if the given node is the root scrollable node - meaning, the node
    // that is associated with the BODY scroll event.
    DomUtils.prototype.isRootScrollableNode = function (node) {
        return (node instanceof HTMLDocument);
    };
    return DomUtils;
}());
exports.DomUtils = DomUtils;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(126);
var UserProjectsViewComponent = /** @class */ (function () {
    // I initialize the user-projects-view component.
    function UserProjectsViewComponent(activatedRoute, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.selectedBoards = {};
        this.selectedPrototypes = {};
        this.unlisten = null;
        this.user = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    UserProjectsViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    UserProjectsViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    UserProjectsViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    UserProjectsViewComponent.prototype.toggleBoard = function (board) {
        this.selectedBoards[board.id] = !this.selectedBoards[board.id];
    };
    UserProjectsViewComponent.prototype.togglePrototype = function (prototype) {
        this.selectedPrototypes[prototype.id] = !this.selectedPrototypes[prototype.id];
    };
    UserProjectsViewComponent.prototype.updateProjects = function () {
        this.closeModal();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    UserProjectsViewComponent.prototype.loadData = function (userID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(userID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.boards = lodash_extended_1._.sortByCaseInsensitive(partial.boards, "name");
            _this.prototypes = lodash_extended_1._.sortByCaseInsensitive(partial.prototypes, "name");
            _this.user = partial.user;
            for (var _i = 0, _a = partial.boards; _i < _a.length; _i++) {
                var board = _a[_i];
                _this.selectedBoards[board.id] = board.isMember;
            }
            for (var _b = 0, _c = partial.prototypes; _b < _c.length; _b++) {
                var prototype = _c[_b];
                _this.selectedPrototypes[prototype.id] = prototype.isMember;
            }
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-person"
                    }
                }
            ]);
        });
    };
    UserProjectsViewComponent = __decorate([
        core_1.Component({
            selector: "user-projects-view",
            host: {
                "(directclick)": "closeModal()"
            },
            styles: [__webpack_require__(439)],
            template: __webpack_require__(440)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], UserProjectsViewComponent);
    return UserProjectsViewComponent;
}());
exports.UserProjectsViewComponent = UserProjectsViewComponent;


/***/ }),
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var platform_browser_1 = __webpack_require__(15);
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var AppReadyEvent = /** @class */ (function () {
    // I initialize the service.
    // --
    // NOTE: When I first tried to approach this problem, I was going to try and use the
    // core Renderer service; however, it appears that the Renderer cannot be injected
    // into a service object (throws error: No provider for Renderer!). As such, I am
    // treating THIS class as the implementation of the DOM abstraction (so to speak),
    // which can be overridden on a per-environment basis.
    function AppReadyEvent(doc) {
        this.doc = doc;
        this.isAppReady = false;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I trigger the "appready" event.
    // --
    // NOTE: In this particular implementation of this service on this PLATFORM, this
    // simply triggers the event on the DOM (Document Object Model); however, one could
    // easily imagine this event being triggered on an Observable or some other type of
    // message transport that makes more sense for a different platform. Nothing about
    // the DOM-interaction leaks outside of this service.
    AppReadyEvent.prototype.trigger = function () {
        // If the app-ready event has already been triggered, just ignore any subsequent
        // calls to trigger it again.
        if (this.isAppReady) {
            return;
        }
        var bubbles = true;
        var cancelable = false;
        this.doc.dispatchEvent(this.createEvent("appready", bubbles, cancelable));
        this.isAppReady = true;
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I create and return a custom event with the given configuration.
    AppReadyEvent.prototype.createEvent = function (eventType, bubbles, cancelable) {
        // IE (shakes fist) uses some other kind of event initialization. As such,
        // we'll default to trying the "normal" event generation and then fallback to
        // using the IE version.
        try {
            var customEvent = new CustomEvent(eventType, {
                bubbles: bubbles,
                cancelable: cancelable
            });
        }
        catch (error) {
            var customEvent = this.doc.createEvent("CustomEvent");
            customEvent.initCustomEvent(eventType, bubbles, cancelable);
        }
        return (customEvent);
    };
    AppReadyEvent = __decorate([
        core_2.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], AppReadyEvent);
    return AppReadyEvent;
}());
exports.AppReadyEvent = AppReadyEvent;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
// Import the application components and services.
var fragment_target_directive_1 = __webpack_require__(296);
var window_scroller_1 = __webpack_require__(39);
var window_scroller_2 = __webpack_require__(39);
var window_scroller_3 = __webpack_require__(39);
var FragmentPolyfillModule = /** @class */ (function () {
    function FragmentPolyfillModule() {
    }
    FragmentPolyfillModule_1 = FragmentPolyfillModule;
    FragmentPolyfillModule.forRoot = function (options) {
        return ({
            ngModule: FragmentPolyfillModule_1,
            providers: [
                {
                    provide: window_scroller_2.WINDOW_SCROLLER_OPTIONS,
                    useValue: {
                        smooth: ((options && options.smooth) || false)
                    }
                },
                {
                    provide: window_scroller_3.WindowScroller,
                    useClass: window_scroller_1.NativeWindowScroller
                }
            ]
        });
    };
    FragmentPolyfillModule = FragmentPolyfillModule_1 = __decorate([
        core_1.NgModule({
            exports: [
                fragment_target_directive_1.FragmentTargetDirective
            ],
            declarations: [
                fragment_target_directive_1.FragmentTargetDirective
            ]
        })
    ], FragmentPolyfillModule);
    return FragmentPolyfillModule;
    var FragmentPolyfillModule_1;
}());
exports.FragmentPolyfillModule = FragmentPolyfillModule;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
// Import the application components and services.
var dom_utils_1 = __webpack_require__(60);
var retain_scroll_polyfill_service_1 = __webpack_require__(110);
var retain_scroll_polyfill_service_2 = __webpack_require__(110);
var router_outlet_directive_1 = __webpack_require__(301);
var RetainScrollPolyfillModule = /** @class */ (function () {
    // I setup the module after it has been initialized.
    // --
    // NOTE: This is essentially a "run block" for the module. We need to use this run
    // block in order to ensure that the polyfill service is actually created and bound 
    // to the UI.
    function RetainScrollPolyfillModule(polyfillService) {
        console.group("Retain Scroll Polyfill Module");
        console.warn("This module assumes push-state-based navigation.");
        console.warn("This module monkey-patches the .pushState() history method.");
        console.warn("This module assumes simulated encapsulation attributes for CSS selector generation.");
        console.groupEnd();
    }
    RetainScrollPolyfillModule_1 = RetainScrollPolyfillModule;
    // ---
    // STATIC METHODS.
    // ---
    // I setup the module providers for the application.
    RetainScrollPolyfillModule.forRoot = function (options) {
        if (options === void 0) { options = {}; }
        return ({
            ngModule: RetainScrollPolyfillModule_1,
            providers: [
                dom_utils_1.DomUtils,
                retain_scroll_polyfill_service_2.RetainScrollPolyfillService,
                {
                    provide: retain_scroll_polyfill_service_1.OPTIONS_TOKEN,
                    useValue: {
                        pollDuration: (options.pollDuration || 3000),
                        pollCadence: (options.pollCadence || 50)
                    }
                }
            ]
        });
    };
    RetainScrollPolyfillModule = RetainScrollPolyfillModule_1 = __decorate([
        core_1.NgModule({
            exports: [
                router_outlet_directive_1.RouterOutletDirective
            ],
            declarations: [
                router_outlet_directive_1.RouterOutletDirective
            ]
        }),
        __metadata("design:paramtypes", [retain_scroll_polyfill_service_2.RetainScrollPolyfillService])
    ], RetainScrollPolyfillModule);
    return RetainScrollPolyfillModule;
    var RetainScrollPolyfillModule_1;
}());
exports.RetainScrollPolyfillModule = RetainScrollPolyfillModule;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
var core_3 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
var router_2 = __webpack_require__(1);
var core_4 = __webpack_require__(0);
var router_3 = __webpack_require__(1);
// Import the application components and services.
var dom_utils_1 = __webpack_require__(60);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
/**
* The algorithm in this polyfill works based on the order-of-operations of different
* kinds of navigation events. When a navigation is initiated by the application itself,
* such as with a [routerLink] click or a .navigate() method call, the operations are as
* follows:
*
* - NavigationStart
* - PushState <--- ( monkey-patched by this polyfill )
* - NavigationEnd
*
* And, if the navigation is initiated by the browser, such as through the Back button or
* a direct change to the URL, the operations are as follows:
*
* - PopState
* - NavigationStart
* - NavigationEnd
*
* As such, we can know which kind of navigation is happening (PushState vs. PopState) by
* the time we get to the NavigationStart event handler (PopState can be flagged).
*
* This algorithm monkey-patches the history.pushState() method in order to TRY and keep
* track of a state / history ID that can be mapped back to a render state. This helps
* reinstate views after the Back and Forward buttons have been pressed. But, it doesn't
* seem to work all that well. Though, it's possible that's just my relatively shallow
* understanding of how PopState works.
*
, CAUTION: We are monkey-patching the history.pushState() method and assuming that it is
* ALWAYS RECEIVING NULL FROM THE ANGULAR APPLICATION. This is likely to change in the
* future, which means this is a fairly brittle polyfill.
*/
exports.OPTIONS_TOKEN = new core_3.InjectionToken("RetainScrollPolyfillService.Options");
var RetainScrollPolyfillService = /** @class */ (function () {
    // I initialize the polyfill service.
    function RetainScrollPolyfillService(domUtils, router, zone, options) {
        this.domUtils = domUtils;
        this.router = router;
        this.zone = zone;
        // This algorithm works by monkey-patching the .pushState() method. So, if
        // pushState isn't supported, then there's really no reason to proceed with this
        // portion of the polyfill (the router-outlet co-opting can still operate).
        if (!this.supportsPushState()) {
            return;
        }
        this.applyStateToDomTimer = 0;
        this.historyCounter = 0;
        this.lastNavigationStartAt = 0;
        this.pendingElements = new Set();
        this.pendingElementsTimer = 0;
        this.pollCadence = options.pollCadence;
        this.pollDuration = options.pollDuration;
        this.poppedHistoryID = null;
        this.previousPageState = null;
        this.renderStates = Object.create(null);
        this.scrolledElements = new Map();
        this.currentHistoryID = this.getNextHistoryID();
        this.setupPushStateMonkeyPatch();
        this.setupScrollBinding();
        this.setupPopstateBinding();
        this.setupRouterBinding();
    }
    // ---
    // PRIVATE METHODS.
    // ---
    // I attempt to apply the given page-state to the active DOM. I will continue to poll
    // the document until all states have been reinstated; or, until the poll duration
    // has been exceeded; or, until a subsequent navigation has taken place.
    RetainScrollPolyfillService.prototype.applyPageStateToDom = function (pageState) {
        var _this = this;
        // The element state are stored as object keys based on selectors. In order to
        // make this set easier to deal with, let's convert the hash to an array.
        var elementStates = Object.keys(pageState.elementStates).map(function (selector) {
            return (pageState.elementStates[selector]);
        });
        if (!elementStates.length) {
            return;
        }
        console.group("Attempting to Reapply Page State In PopState Navigation");
        console.log(JSON.stringify(elementStates, null, 4));
        console.groupEnd();
        // Setup the scroll retention timer outside of the Angular Zone so that it 
        // doesn't trigger any additional change-detection digests.
        this.zone.runOutsideAngular(function () {
            var startedAt = Date.now();
            _this.applyStateToDomTimer = setInterval(function () {
                // NOTE: We're looping backwards over this collection so that we
                // can safely .splice() states out of it, mid-iteration, if the
                // state has been successfully applied.
                for (var i = (elementStates.length - 1); i >= 0; i--) {
                    var elementState = elementStates[i];
                    var target = _this.domUtils.select(elementState.selector);
                    if (target) {
                        // If the element in question has been scrolled (by the
                        // user) while we're attempting to reinstate the previous
                        // scroll offsets, then ignore this state - the user's
                        // action should take precedence.
                        if (_this.scrolledElements.has(target)) {
                            elementStates.splice(i, 1);
                        }
                        else {
                            var resultantScrollTop = _this.domUtils.scrollTo(target, elementState.scrollTop);
                            // If the attempt to restore the element to its 
                            // previous offset resulted in a match, then stop
                            // tracking this element. Otherwise, we'll continue
                            // to try and scroll it in the subsequent tick.
                            // --
                            // NOTE: We continue to try and update it because the
                            // target element may be loading asynchronous data
                            // that is required for the previous scroll offset.
                            if (resultantScrollTop === elementState.scrollTop) {
                                elementStates.splice(i, 1);
                            }
                        }
                    }
                }
                // If there are no more elements to scroll; or, we've exceeded
                // our poll duration, then stop watching the DOM.
                if (!elementStates.length || ((Date.now() - startedAt) >= _this.pollDuration)) {
                    clearTimeout(_this.applyStateToDomTimer);
                }
            }, _this.pollCadence);
        });
    };
    // I commit the pending elements to the scrolled elements collection.
    RetainScrollPolyfillService.prototype.commitPendingElements = function () {
        var _this = this;
        this.pendingElements.forEach(function (target) {
            _this.scrolledElements.set(target, _this.domUtils.getScrollTop(target));
        });
        this.pendingElements.clear();
    };
    // I get the page-state associated with the given history ID. Or, if it doesn't 
    // exist, I created it, add it to the render-state, and return it.
    RetainScrollPolyfillService.prototype.ensurePageState = function (historyID, useMostRecentAsDefault) {
        if (useMostRecentAsDefault === void 0) { useMostRecentAsDefault = false; }
        var renderedUrl = this.router.url;
        // Ensure that the current URL is being tracked by the render-state.
        if (!this.renderStates[renderedUrl]) {
            this.renderStates[renderedUrl] = {
                url: renderedUrl,
                pageStates: []
            };
        }
        var pageStates = this.renderStates[renderedUrl].pageStates;
        // If we already have a page-state associated with the given ID, return it.
        // --
        // NOTE: We're starting at the front of the collection since the newest items
        // are being unshifted onto the collection (ie, the most recent page states are
        // at the start of the collection). This is where the user is most likely to be
        // performing navigations.
        for (var _i = 0, pageStates_1 = pageStates; _i < pageStates_1.length; _i++) {
            var pageState = pageStates_1[_i];
            if (pageState.historyID === historyID) {
                return (pageState);
            }
        }
        // If we've made it this far, there is no page-state associated with the given
        // ID. As such, we'll need to create one.
        var pageState = {
            historyID: historyID,
            elementStates: Object.create(null)
        };
        // Under certain circumstances, when we're creating a new page-state, we want to
        // use the most recent page-state (at the same URL) as the basis for the new 
        // page-state. This would make sense if we popped the history and did not receive
        // a known history ID. In that case, we would want to model the page on a best
        // guess of what the page may have looked like. To be clear, this is a janky step
        // trying to make up for a janky history behavior.
        if (useMostRecentAsDefault && pageStates.length) {
            console.warn("No PageState associated with popState - using recent values as fallback.");
            Object.assign(pageState.elementStates, pageStates[0].elementStates);
        }
        pageStates.unshift(pageState);
        // Theoretically, the stored page states will grown in an unbounded fashion if 
        // the application is kept open indefinitely; so, let's just keep each page under
        // a length limit.
        if (pageStates.length > 15) {
            pageStates.pop();
        }
        return (pageState);
    };
    // I get the element-states from the given set of nodes.
    RetainScrollPolyfillService.prototype.getElementStatesFromNodes = function (nodes) {
        var _this = this;
        var elementStates = Object.create(null);
        nodes.forEach(function (scrollTop, target) {
            var selector = _this.domUtils.getSelector(target);
            elementStates[selector] = { selector: selector, scrollTop: scrollTop };
        });
        return (elementStates);
    };
    // I generate the next unique history state ID.
    RetainScrollPolyfillService.prototype.getNextHistoryID = function () {
        return ("retain-scroll-" + ++this.historyCounter + "-" + Date.now());
    };
    // I bind to the popstate event, which is triggered whenever the browser initiates
    // a change in the view state (such as through the Back or Forward buttons).
    RetainScrollPolyfillService.prototype.setupPopstateBinding = function () {
        var _this = this;
        // Setup the popstate binding outside of the Angular Zone so it doesn't trigger 
        // any additional change-detection digests.
        this.zone.runOutsideAngular(function () {
            window.addEventListener("popstate", function (event) {
                // CAUTION: The history object seems to be somewhat janky for me
                // (or, maybe I'm just not smart enough to figure it out). That 
                // said, it seems that using a combination of Back and Forwards 
                // operations quickly creates a scenario in which the history 
                // object stops reporting the correct (any) state object. As 
                // such, there are many times in which a popstate will not result
                // in an accessible "history ID", even though we've monkey-patched
                // the .pushState() method. In such cases, we'll just use a newly-
                // generated ID, which will cause a new state object to be created
                // by the navigation handler.
                // --
                // NOTE: We are storing the "popped" ID as a separate value from 
                // the "current" ID so that we have time to save the current state 
                // of the DOM (associated with the "current" ID) before the 
                // navigation starts.
                try {
                    _this.poppedHistoryID = event.state.id;
                }
                catch (error) {
                    _this.poppedHistoryID = _this.getNextHistoryID();
                }
            });
        });
    };
    // I override the native .pushState() method, ensuring that an unique ID is 
    // associated with each view state.
    // --
    // CAUTION: This assumes that Angular never provides a non-null "state" which, at
    // the time of this writing, appears to be true. However, it is a dicey assumption
    // that is likely to change in the future.
    RetainScrollPolyfillService.prototype.setupPushStateMonkeyPatch = function () {
        var _this = this;
        var corePushState = window.history.pushState;
        // Monkey-patch pushState() outside of the Angular Zone so it doesn't trigger any
        // additional change-detection digests.
        this.zone.runOutsideAngular(function () {
            window.history.pushState = function (state, title, url) {
                console.warn("Intercepting .pushState()");
                // The unique ID pushed into each state will become associated with 
                // any changes made the document's scroll offsets before the next 
                // navigation is initiated.
                corePushState.call(window.history, {
                    id: (_this.currentHistoryID = _this.getNextHistoryID()),
                    originalState: state
                }, title, url);
            };
        });
    };
    // I bind to the router events and perform to primary actions:
    // 
    // - Save the current page-state whenever navigating away from the current view.
    // - Reinstate an old page-state whenever navigating to an old view.
    RetainScrollPolyfillService.prototype.setupRouterBinding = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            // The goal of the NavigationStart event is to take changes that have
            // been made to the current DOM and store them in the render-state 
            // tree so they can be reinstated at a future date.
            if (event instanceof router_2.NavigationStart) {
                _this.lastNavigationStartAt = Date.now();
                // If the user is navigating away from the current view, kill any
                // timers that may be trying to reinstate a page-state or keep track
                // of any pending scrolling.
                clearTimeout(_this.applyStateToDomTimer);
                clearTimeout(_this.pendingElementsTimer);
                _this.pendingElements.clear();
                var currentPageState = _this.ensurePageState(_this.currentHistoryID);
                // If any elements have been scrolled while the view was rendered, 
                // add them to the current page-state.
                if (_this.scrolledElements.size) {
                    Object.assign(currentPageState.elementStates, _this.getElementStatesFromNodes(_this.scrolledElements));
                    _this.scrolledElements.clear();
                }
                // While we track elements that have been scrolled during the current
                // page rendering, it is likely that there are elements that were 
                // scrolled during a prior page rendering (and still have a non-zero
                // scroll offset, such a secondary router outlet). We want to 
                // propagate those values with the current page state so that a use 
                // of the Back button (for example) will reinstate those elements in
                // addition to the ones directly affected during the current page
                // rendering.
                // --
                // NOTE: We only want to do this as the user moves forward in time; 
                // not if the user is jumping to a previous point in history.
                if (_this.previousPageState && !_this.poppedHistoryID) {
                    for (var selector in _this.previousPageState.elementStates) {
                        // We only care about selectors that are missing from the
                        // current page-state. If the selector exists, it means that
                        // the current page-state has the more up-to-date element 
                        // state.
                        if (currentPageState.elementStates[selector]) {
                            continue;
                        }
                        var target = _this.domUtils.select(selector);
                        // We only care about the selectors that match elements that
                        // are still rendered on the page. A non-rendered element 
                        // won't be relevant for a future popstate navigation.
                        if (!target) {
                            continue;
                        }
                        // We only care about targeted elements that are still at the
                        // same scroll offset as the previous state. If the offsets 
                        // don't match, then it's likely that the currently rendered
                        // page is not compatible with the previous state. This can
                        // happen if you navigate through a page that doesn't have
                        // sufficient content to create scrolling (usually on the 
                        // window object).
                        if (_this.domUtils.getScrollTop(target) !== _this.previousPageState.elementStates[selector].scrollTop) {
                            continue;
                        }
                        console.group("Pulling Scroll Offset Forward from Previous State");
                        console.log(selector);
                        console.log(_this.previousPageState.elementStates[selector].scrollTop);
                        console.groupEnd();
                        currentPageState.elementStates[selector] = {
                            selector: selector,
                            scrollTop: _this.previousPageState.elementStates[selector].scrollTop
                        };
                    }
                }
                _this.previousPageState = currentPageState;
                // The goal of the NavigationEnd event is to reinstate a page-state in
                // the event that the page is being rendered as the result of a popstate
                // event (ex, the user hit the Back or Forward buttons).
            }
            else if (event instanceof router_1.NavigationEnd) {
                if (_this.poppedHistoryID) {
                    _this.currentHistoryID = _this.poppedHistoryID;
                    _this.poppedHistoryID = null;
                    // Get the old page-state associated with the popped history ID.
                    // --
                    // NOTE: This will create a page-state if none has yet been 
                    // associated with the given ID.
                    var currentPageState = _this.ensurePageState(_this.currentHistoryID, true);
                    _this.applyPageStateToDom(currentPageState);
                }
            }
        });
    };
    // I bind to the scroll event and keep track of any elements that are scrolled in the
    // rendered document.
    RetainScrollPolyfillService.prototype.setupScrollBinding = function () {
        var _this = this;
        // Add scroll-binding outside of the Angular Zone so it doesn't trigger any
        // additional change-detection digests.
        this.zone.runOutsideAngular(function () {
            // When navigating, the browser emits some scroll events as the DOM 
            // (Document Object Model) changes shape in a way that forces the various
            // scroll offsets to change. Since these scroll events are not indicative
            // of a user's intent, we're going to ignore them. This needs to be done
            // on both sides of the navigation event (for reasons that are not fully
            // obvious or logical -- basically, the window's scroll changes at a time
            // that is not easy to tap into).
            var scrollBufferWindow = 100;
            window.addEventListener("scroll", function (event) {
                // If the scroll event happens immediately following a 
                // navigation, then ignore it - it is likely a scroll that was 
                // forced by the browser's native behavior.
                if ((Date.now() - _this.lastNavigationStartAt) < scrollBufferWindow) {
                    return;
                }
                var target = _this.domUtils.getTargetFromScrollEvent(event);
                // If the scrolled element is one of the elements that we want to
                // keep track of (it will be null otherwise), let's put it in a 
                // pending elements set. This way, we can debounce the reading of
                // the scroll offset.
                if (target) {
                    _this.pendingElements.add(target);
                    // CAUTION: We are actively trying to inspect the scroll
                    // offset while the user is interacting with the page, as 
                    // opposed to just inspecting the element at the start of
                    // the next navigation, because the browser's native 
                    // behaviors make this hard to do. By eagerly storing the
                    // scroll offset, we don't have to worry about the complex
                    // and confusing interaction of the page state, browser
                    // behavior, and navigation events.
                    clearTimeout(_this.pendingElementsTimer);
                    _this.pendingElementsTimer = setTimeout(function () {
                        _this.commitPendingElements();
                    }, scrollBufferWindow);
                }
            }, 
            // We have to use the CAPTURING phase. Scroll events DO NOT BUBBLE.
            // As such, if we want to listen for all scroll events in the 
            // document, we have to use the capturing phase (as the event travels
            // down through the DOM tree).
            true);
        });
    };
    // I determine if the current browser supports pushState.
    RetainScrollPolyfillService.prototype.supportsPushState = function () {
        return (!!(window && window.history && window.history.pushState));
    };
    RetainScrollPolyfillService = __decorate([
        core_2.Injectable(),
        __param(3, core_1.Inject(exports.OPTIONS_TOKEN)),
        __metadata("design:paramtypes", [dom_utils_1.DomUtils,
            router_3.Router,
            core_4.NgZone, Object])
    ], RetainScrollPolyfillService);
    return RetainScrollPolyfillService;
}());
exports.RetainScrollPolyfillService = RetainScrollPolyfillService;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var app_ready_event_1 = __webpack_require__(107);
var sample_data_1 = __webpack_require__(3);
var session_1 = __webpack_require__(12);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ShellViewComponent = /** @class */ (function () {
    // I initialize the shell view component.
    function ShellViewComponent(appReadyEvent, session) {
        for (var _i = 0, _a = sample_data_1.sampleData.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.email === "ben@bennadel.com") {
                console.warn("Logged-in as", user.email);
                session.setUser(user);
            }
        }
        appReadyEvent.trigger();
    }
    ShellViewComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            styles: [__webpack_require__(303)],
            template: __webpack_require__(304)
        }),
        __metadata("design:paramtypes", [app_ready_event_1.AppReadyEvent,
            session_1.Session])
    ], ShellViewComponent);
    return ShellViewComponent;
}());
exports.ShellViewComponent = ShellViewComponent;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(113);
var DetailViewComponent = /** @class */ (function () {
    // I initialize the detail-view component.
    function DetailViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.board = null;
        this.items = null;
        this.members = null;
    }
    // ---
    // PUBLIE METHODS.
    // ---
    DetailViewComponent.prototype.gotoRelativeItem = function (direction, itemID) {
        var currentItem = lodash_extended_1._.find(this.items, { id: itemID });
        var index = lodash_extended_1._.indexOf(this.items, currentItem);
        switch (direction) {
            case "previous":
                if (--index < 0) {
                    index = (this.items.length - 1);
                }
                break;
            case "next":
                if (++index >= this.items.length) {
                    index = 0;
                }
                break;
        }
        this.router.navigate(["./items", this.items[index].id], {
            relativeTo: this.activatedRoute
        });
    };
    // I get called once when the component is being unmounted.
    DetailViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    // I get called once when the component is being mounted.
    DetailViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    DetailViewComponent.prototype.loadData = function (boardID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(boardID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.board = partial.board;
            _this.items = partial.items;
            _this.members = partial.members;
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: ["projects", "list", { filterType: "board" }],
                        modal: "modal/error/could-not-load-board"
                    }
                }
            ]);
        });
    };
    DetailViewComponent = __decorate([
        core_1.Component({
            selector: "board-view",
            styles: [__webpack_require__(308)],
            template: __webpack_require__(309)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], DetailViewComponent);
    return DetailViewComponent;
}());
exports.DetailViewComponent = DetailViewComponent;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (boardID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var board = sample_data_1.sampleDataIndex.boards[boardID];
            if (!board) {
                throw (new Error("NotFound"));
            }
            return ({
                board: {
                    id: board.id,
                    name: board.name
                },
                members: board.members.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        avatarUrl: user.avatarUrl
                    });
                }),
                items: board.items.map(function (item) {
                    return ({
                        id: item.id,
                        name: item.name,
                        type: item.type
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (itemID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var item = sample_data_1.sampleDataIndex.boardItems[itemID];
            if (!item) {
                throw (new Error("NotFound"));
            }
            var board = sample_data_1.sampleDataIndex.boards[item.boardID];
            return ({
                board: {
                    id: board.id,
                    name: board.name
                },
                item: {
                    id: item.id,
                    name: item.name,
                    type: item.type
                },
                comments: item.comments.map(function (comment) {
                    return ({
                        id: comment.id,
                        content: comment.content,
                        user: {
                            id: comment.user.id,
                            name: comment.user.name,
                            initials: comment.user.initials,
                            avatarUrl: comment.user.avatarUrl
                        }
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the console view.
    PartialService.prototype.get = function (prototypeID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var prototype = sample_data_1.sampleDataIndex.prototypes[prototypeID];
            if (!prototype) {
                throw (new Error("NotFound"));
            }
            var activeScreens = prototype.screens.filter(function (screen) {
                return (!screen.isArchived);
            });
            if (!activeScreens.length) {
                throw (new Error("EmptyPrototype"));
            }
            return ({
                prototype: {
                    id: prototype.id,
                    name: prototype.name
                },
                screens: activeScreens.map(function (screen) {
                    return ({
                        id: screen.id,
                        name: screen.name,
                        filename: screen.filename
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (freehandID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var freehand = sample_data_1.sampleDataIndex.freehands[freehandID];
            if (!freehand) {
                throw (new Error("NotFound"));
            }
            return ({
                freehand: {
                    id: freehand.id,
                    name: freehand.name
                }
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the inbox view.
    PartialService.prototype.get = function () {
        var _this = this;
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            return ({
                boards: _this.getBoards(),
                prototypes: _this.getPrototypes()
            });
        });
        return (promise);
    };
    // ---
    // PRIVATE METHODS.
    // ---
    PartialService.prototype.getBoards = function () {
        var data = sample_data_1.sampleData.boards
            .filter(function (board) {
            var hasConversations = board.items.some(function (item) {
                return (!!item.comments.length);
            });
            return (hasConversations);
        })
            .map(function (board) {
            return ({
                id: board.id,
                name: board.name
            });
        });
        return (data);
    };
    PartialService.prototype.getPrototypes = function () {
        var data = sample_data_1.sampleData.prototypes
            .filter(function (prototype) {
            var hasConversations = prototype.screens.some(function (screen) {
                return (!!screen.conversations.length);
            });
            return (hasConversations);
        })
            .map(function (prototype) {
            return ({
                id: prototype.id,
                name: prototype.name
            });
        });
        return (data);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the conversation-oriented partial payload for the board conversation 
    // view.
    PartialService.prototype.get = function (boardItemID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var boardItem = sample_data_1.sampleDataIndex.boardItems[boardItemID];
            if (!boardItem) {
                throw (new Error("NotFound"));
            }
            var board = sample_data_1.sampleDataIndex.boards[boardItem.boardID];
            return ({
                board: {
                    id: board.id,
                    name: board.name
                },
                boardItem: {
                    id: boardItem.id,
                    type: boardItem.type
                },
                comments: boardItem.comments.map(function (comment) {
                    return ({
                        id: comment.id,
                        content: comment.content,
                        user: {
                            id: comment.user.id,
                            name: comment.user.name,
                            initials: comment.user.initials,
                            avatarUrl: comment.user.avatarUrl
                        }
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the conversation-oriented partial payload for the prototype conversation
    // view.
    PartialService.prototype.get = function (conversationID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var conversation = sample_data_1.sampleDataIndex.screenConversations[conversationID];
            if (!conversation) {
                throw (new Error("NotFound"));
            }
            var screen = sample_data_1.sampleDataIndex.screens[conversation.screenID];
            var prototype = sample_data_1.sampleDataIndex.prototypes[screen.prototypeID];
            return ({
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
                comments: conversation.comments.map(function (comment) {
                    return ({
                        id: comment.id,
                        content: comment.content,
                        user: {
                            id: comment.user.id,
                            name: comment.user.name,
                            initials: comment.user.initials,
                            avatarUrl: comment.user.avatarUrl
                        }
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the boards-oriented partial payload for the threads view.
    PartialService.prototype.getForBoard = function (boardID) {
        var _this = this;
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            return ({
                threads: _this.getBoardThreads(boardID)
            });
        });
        return (promise);
    };
    // I return the prototypes-oriented partial payload for the threads view.
    PartialService.prototype.getForPrototype = function (prototypeID) {
        var _this = this;
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            return ({
                threads: _this.getPrototypeThreads(prototypeID)
            });
        });
        return (promise);
    };
    // ---
    // PRIVATE METHODS.
    // ---
    PartialService.prototype.getBoardThreads = function (boardID) {
        var board = sample_data_1.sampleDataIndex.boards[boardID];
        if (!board) {
            throw (new Error("NotFound"));
        }
        var data = board.items
            .filter(function (item) {
            return (!!item.comments.length);
        })
            .map(function (item) {
            var comment = lodash_extended_1._.last(item.comments);
            return ({
                id: comment.id,
                name: item.type,
                teaser: comment.content,
                user: {
                    id: comment.id,
                    name: comment.user.name,
                    initials: comment.user.initials,
                    avatarUrl: comment.user.avatarUrl
                }
            });
        });
        return (data);
    };
    PartialService.prototype.getPrototypeThreads = function (prototypeID) {
        var prototype = sample_data_1.sampleDataIndex.prototypes[prototypeID];
        if (!prototype) {
            throw (new Error("NotFound"));
        }
        var data = prototype.screens
            .filter(function (screen) {
            return (!!screen.conversations.length);
        })
            .map(function (screen) {
            var threads = screen.conversations.map(function (converation) {
                var comment = lodash_extended_1._.last(converation.comments);
                return ({
                    id: converation.id,
                    name: screen.name,
                    teaser: comment.content,
                    user: {
                        id: comment.id,
                        name: comment.user.name,
                        initials: comment.user.initials,
                        avatarUrl: comment.user.avatarUrl
                    }
                });
            });
            return (threads);
        });
        return (lodash_extended_1._.flatten(data));
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var sample_data_2 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (boardID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var board = sample_data_2.sampleDataIndex.boards[boardID];
            if (!board) {
                throw (new Error("NotFound"));
            }
            return ({
                board: {
                    id: board.id,
                    name: board.name
                },
                members: board.members.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        avatarUrl: user.avatarUrl
                    });
                }),
                users: sample_data_1.sampleData.users.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        avatarUrl: user.avatarUrl
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
var router_2 = __webpack_require__(1);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DoNotShowModalOnRefreshGuard = /** @class */ (function () {
    // I initialize the modal guard.
    function DoNotShowModalOnRefreshGuard(router) {
        this.router = router;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I determine if the requested route can be activated (ie, navigated to).
    DoNotShowModalOnRefreshGuard.prototype.canActivate = function (activatedRouteSnapshot, routerStateSnapshot) {
        // We don't want this modal to show on page-refresh. As such, if this is a page-
        // refresh, we'll navigate to the same URL less the modal outlet.
        if (this.isPageRefresh()) {
            this.router.navigateByUrl(this.getUrlWithoutModal(routerStateSnapshot));
            return (false);
        }
        return (true);
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I return the requested URL (as defined in the snapshot), less any of the "modal"
    // outlet segments.
    DoNotShowModalOnRefreshGuard.prototype.getUrlWithoutModal = function (routerStateSnapshot) {
        var urlTree = this.router.parseUrl(routerStateSnapshot.url);
        var segment = urlTree.root;
        // Since the "modal" outlet is known to be directly off the primary view, we're
        // going to walk down the tree of primary outlets and delete any "modal" 
        // children. This should leave us with a UrlTree that contains everything that 
        // the original URL had, less the "modal" outlet.
        while (segment && segment.children) {
            delete (segment.children.modal);
            segment = segment.children[router_1.PRIMARY_OUTLET];
        }
        return (urlTree);
    };
    // I determine if the current route-request is part of a page refresh.
    DoNotShowModalOnRefreshGuard.prototype.isPageRefresh = function () {
        // If the router has yet to establish a single navigation, it means that this
        // navigation is the first attempt to reconcile the application state with the
        // URL state. Meaning, this is a page refresh.
        return (!this.router.navigated);
    };
    DoNotShowModalOnRefreshGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_2.Router])
    ], DoNotShowModalOnRefreshGuard);
    return DoNotShowModalOnRefreshGuard;
}());
exports.DoNotShowModalOnRefreshGuard = DoNotShowModalOnRefreshGuard;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var sample_data_2 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (prototypeID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var prototype = sample_data_2.sampleDataIndex.prototypes[prototypeID];
            if (!prototype) {
                throw (new Error("NotFound"));
            }
            return ({
                prototype: {
                    id: prototype.id,
                    name: prototype.name
                },
                members: prototype.members.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        avatarUrl: user.avatarUrl
                    });
                }),
                users: sample_data_1.sampleData.users.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        avatarUrl: user.avatarUrl
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (boardID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var board = sample_data_1.sampleDataIndex.boards[boardID];
            if (!board) {
                throw (new Error("NotFound"));
            }
            return ({
                board: {
                    id: board.id,
                    name: board.name
                }
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (prototypeID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var prototype = sample_data_1.sampleDataIndex.prototypes[prototypeID];
            if (!prototype) {
                throw (new Error("NotFound"));
            }
            return ({
                prototype: {
                    id: prototype.id,
                    name: prototype.name
                }
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var sample_data_2 = __webpack_require__(3);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var PartialService = /** @class */ (function () {
    function PartialService() {
    }
    // I return the partial payload for the view.
    PartialService.prototype.get = function (userID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var user = sample_data_2.sampleDataIndex.users[userID];
            if (!user) {
                throw (new Error("NotFound"));
            }
            return ({
                user: {
                    id: user.id,
                    name: user.name,
                    initials: user.initials,
                    avatarUrl: user.avatarUrl
                },
                boards: sample_data_1.sampleData.boards.map(function (board) {
                    return ({
                        id: board.id,
                        name: board.name,
                        isMember: !!lodash_extended_1._.find(board.members, { id: user.id })
                    });
                }),
                prototypes: sample_data_1.sampleData.prototypes.map(function (prototype) {
                    return ({
                        id: prototype.id,
                        name: prototype.name,
                        isMember: !!lodash_extended_1._.find(prototype.members, { id: user.id })
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
    }
    // I return the partial payload for the product-updates detail view.
    PartialService.prototype.get = function (productUpdateID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var update = sample_data_1.sampleDataIndex.productUpdates[productUpdateID];
            if (!update) {
                throw (new Error("NotFound"));
            }
            return ({
                update: {
                    id: update.id,
                    message: update.message,
                    staff: {
                        name: update.staff.name,
                        initials: update.staff.initials
                    }
                }
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
    }
    // I return the partial payload for the product-updates list view.
    PartialService.prototype.get = function () {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            return ({
                updates: sample_data_1.sampleData.productUpdates.map(function (productUpdate) {
                    return ({
                        id: productUpdate.id,
                        message: productUpdate.message.substring(0, 50),
                        staff: {
                            name: productUpdate.staff.name,
                            initials: productUpdate.staff.initials
                        }
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
    }
    // I return the partial payload for the user detail view.
    PartialService.prototype.get = function (userID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var user = sample_data_1.sampleDataIndex.users[userID];
            if (!user) {
                throw (new Error("NotFound"));
            }
            return ({
                user: {
                    id: user.id,
                    name: user.name,
                    initials: user.initials,
                    email: user.email,
                    avatarUrl: user.avatarUrl
                }
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
    }
    // I return the partial payload for the inbox view.
    PartialService.prototype.get = function () {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            return ({
                users: sample_data_1.sampleData.users.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        email: user.email,
                        avatarUrl: user.avatarUrl
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the inbox view.
    PartialService.prototype.get = function () {
        var _this = this;
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            return ({
                boards: _this.getBoards(),
                freehands: _this.getFreehands(),
                prototypes: _this.getPrototypes()
            });
        });
        return (promise);
    };
    // ---
    // PRIVATE METHODS.
    // ---
    PartialService.prototype.getBoards = function () {
        var data = sample_data_1.sampleData.boards.map(function (board) {
            return ({
                id: board.id,
                name: board.name
            });
        });
        return (data);
    };
    PartialService.prototype.getFreehands = function () {
        var data = sample_data_1.sampleData.freehands.map(function (freehand) {
            return ({
                id: freehand.id,
                name: freehand.name
            });
        });
        return (data);
    };
    PartialService.prototype.getPrototypes = function () {
        var data = sample_data_1.sampleData.prototypes.map(function (prototype) {
            return ({
                id: prototype.id,
                name: prototype.name
            });
        });
        return (data);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (prototypeID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var prototype = sample_data_1.sampleDataIndex.prototypes[prototypeID];
            if (!prototype) {
                throw (new Error("NotFound"));
            }
            return ({
                prototype: {
                    id: prototype.id,
                    name: prototype.name
                },
                members: prototype.members.map(function (user) {
                    return ({
                        id: user.id,
                        name: user.name,
                        initials: user.initials,
                        avatarUrl: user.avatarUrl
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the application components and services.
var partial_helper_1 = __webpack_require__(5);
var sample_data_1 = __webpack_require__(3);
var PartialService = /** @class */ (function () {
    function PartialService() {
        // ...
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I return the partial payload for the view.
    PartialService.prototype.get = function (prototypeID) {
        var promise = partial_helper_1.PartialHelper.simulateNetworkLatency(function () {
            var prototype = sample_data_1.sampleDataIndex.prototypes[prototypeID];
            if (!prototype) {
                throw (new Error("NotFound"));
            }
            return ({
                screens: prototype.screens.map(function (screen) {
                    return ({
                        id: screen.id,
                        prototypeID: screen.prototypeID,
                        name: screen.name,
                        filename: screen.filename,
                        isArchived: screen.isArchived
                    });
                })
            });
        });
        return (promise);
    };
    return PartialService;
}());
exports.PartialService = PartialService;


/***/ }),
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var platform_browser_dynamic_1 = __webpack_require__(74);
// Import the root module for bootstrapping.
var app_module_1 = __webpack_require__(292);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
var platform_browser_1 = __webpack_require__(15);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
// Import the application components and services.
var core_module_1 = __webpack_require__(293);
var shell_view_component_1 = __webpack_require__(111);
var shell_view_module_1 = __webpack_require__(305);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                // BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                core_module_1.CoreModule,
                shell_view_module_1.ShellViewModule,
                router_1.RouterModule.forRoot(
                // I'm building the entire route tree with nested route configurations at 
                // boot-time. Currently, this feels like the lesser of all evils. With this
                // approach, I am not sure if I will ever have the ability to lazy-load? But,
                // this feels more straight-forward than anything I've seen so far. Nested 
                // routes seems to be a thing of much discussion, even today.
                // --
                // Read More: https://github.com/angular/angular/issues/10958
                // Read More: https://github.com/angular/angular/issues/10647
                shell_view_module_1.ShellViewModule.routes, {
                    // Tell the router to use the HashLocationStrategy.
                    useHash: true,
                    enableTracing: false
                })
            ],
            providers: [],
            bootstrap: [
                shell_view_component_1.ShellViewComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var platform_browser_1 = __webpack_require__(15);
var core_1 = __webpack_require__(0);
// Import the application components and services.
var app_ready_event_1 = __webpack_require__(107);
var direct_click_plugin_1 = __webpack_require__(295);
var dom_utils_1 = __webpack_require__(38);
var error_logger_1 = __webpack_require__(4);
var fragment_polyfill_module_1 = __webpack_require__(108);
var keyboard_shortcuts_1 = __webpack_require__(9);
var mousedown_outside_plugin_1 = __webpack_require__(299);
var retain_scroll_polyfill_module_1 = __webpack_require__(109);
var session_1 = __webpack_require__(12);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// The goal of the CoreModule is to organize providers for the root of the application.
// This module should NOT contain any declarations (those are in the SharedModule).
var CoreModule = /** @class */ (function () {
    // I initialize the shared module, essentially creating a "run block" for the module.
    function CoreModule(keyboardShortcuts) {
        keyboardShortcuts
            .setPriority("board-item", 100)
            .setPriority("console", 100)
            .setPriority("inbox", 200)
            .setPriority("modal", 300);
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                fragment_polyfill_module_1.FragmentPolyfillModule.forRoot({
                    smooth: true
                }),
                retain_scroll_polyfill_module_1.RetainScrollPolyfillModule.forRoot({
                    // Tell the polyfill how long to poll the document after a route change in
                    // order to look for elements that need to be restored to a previous offset.
                    pollDuration: 3000,
                    pollCadence: 50
                })
            ],
            providers: [
                app_ready_event_1.AppReadyEvent,
                dom_utils_1.DomUtils,
                error_logger_1.ErrorLogger,
                {
                    provide: platform_browser_1.EVENT_MANAGER_PLUGINS,
                    useClass: direct_click_plugin_1.DirectClickPlugin,
                    multi: true
                },
                {
                    provide: platform_browser_1.EVENT_MANAGER_PLUGINS,
                    useClass: mousedown_outside_plugin_1.MousedownOutsidePlugin,
                    multi: true
                },
                keyboard_shortcuts_1.KeyboardShortcuts,
                session_1.Session
            ]
        }),
        __metadata("design:paramtypes", [keyboard_shortcuts_1.KeyboardShortcuts])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;


/***/ }),
/* 294 */,
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DirectClickPlugin = /** @class */ (function () {
    function DirectClickPlugin() {
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I bind the "directclick" event to the given object.
    DirectClickPlugin.prototype.addEventListener = function (element, eventName, handler) {
        // By default, when we bind an event using the .addEventListener(), the event is
        // bound inside Angular's Zone. This means that when the event handler is
        // invoked, Angular's change-detection algorithm will get automatically triggered.
        // When there is a one-to-one mapping of events to event handler calls, this
        // makes sense. However, in this case, for the "directclick" event, not all
        // "click" events will lead to an event handler invocation. As such, we want to
        // bind the base "click" hander OUTSIDE OF THE ANGULAR ZONE, inspect the event,
        // then RE-ENTER THE ANGULAR ZONE only in the case when we're about to invoke the
        // event handler. This way, the "click" events WILL NOT trigger change-detection;
        // but, the "directclick" events WILL TRIGGER change-detection.
        var zone = this.manager.getZone();
        zone.runOutsideAngular(addClickHandler);
        return (removeClickHandler);
        // ---
        // LOCALLY-SCOPED FUNCTIONS.
        // ---
        // I handle the base "click" event OUTSIDE the Angular Zone.
        function addClickHandler() {
            element.addEventListener("click", clickHandler, false);
        }
        // I remove the base "click" event.
        function removeClickHandler() {
            element.removeEventListener("click", clickHandler, false);
        }
        // I handle the base "click" event.
        function clickHandler(event) {
            if (event.target !== element) {
                return;
            }
            // If the target of the click event is the bound element, then this "click"
            // event is a "directclick" event. At this point, we need to invoke the
            // event-handler. So, we're going to RE-ENTER THE ANGULAR ZONE so that the
            // change-detection algorithm will be triggered.
            zone.run(function runInZoneSoChangeDetectionWillBeTriggered() {
                handler(event);
            });
        }
    };
    // I bind the "directclick" event to the given global object.
    // --
    // CAUTION: Not currently supported - not sure it would even make sense.
    DirectClickPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
        throw (new Error("Unsupported event target " + element + " for event " + eventName + "."));
    };
    // I determine if the given event name is supported by this plugin. For each event
    // binding, the plugins are searched in the reverse order of the EVENT_MANAGER_PLUGINS
    // multi-collection. Angular will use the first plugin that supports the given event.
    DirectClickPlugin.prototype.supports = function (eventName) {
        return (eventName === "directclick");
    };
    return DirectClickPlugin;
}());
exports.DirectClickPlugin = DirectClickPlugin;


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// Import the application components and services.
var window_scroller_1 = __webpack_require__(39);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var FragmentTargetDirective = /** @class */ (function () {
    // I initialize the fragment-target directive.
    function FragmentTargetDirective(activatedRoute, elementRef, windowScroller) {
        this.activatedRoute = activatedRoute;
        this.elementRef = elementRef;
        this.windowScroller = windowScroller;
        this.id = null;
        this.fragmentSubscription = null;
        this.name = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called once when the directive is being destroyed.
    FragmentTargetDirective.prototype.ngOnDestroy = function () {
        (this.fragmentSubscription) && this.fragmentSubscription.unsubscribe();
    };
    // I get called once after the inputs have been bound for the first time.
    FragmentTargetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.fragmentSubscription = this.activatedRoute.fragment.subscribe(function (fragment) {
            if (!fragment) {
                return;
            }
            if ((fragment !== _this.id) &&
                (fragment !== _this.name)) {
                return;
            }
            _this.windowScroller.scrollIntoView(_this.elementRef);
        });
    };
    FragmentTargetDirective = __decorate([
        core_1.Directive({
            selector: "[id], a[name]",
            inputs: ["id", "name"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_2.ElementRef,
            window_scroller_1.WindowScroller])
    ], FragmentTargetDirective);
    return FragmentTargetDirective;
}());
exports.FragmentTargetDirective = FragmentTargetDirective;


/***/ }),
/* 297 */,
/* 298 */,
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var MousedownOutsidePlugin = /** @class */ (function () {
    function MousedownOutsidePlugin() {
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I bind the "mousedownoutside" event to the given object.
    MousedownOutsidePlugin.prototype.addEventListener = function (element, eventName, handler) {
        // By default, when we bind an event using the .addEventListener(), the event is
        // bound inside Angular's Zone. This means that when the event handler is
        // invoked, Angular's change-detection algorithm will get automatically triggered.
        // When there is a one-to-one mapping of events to event handler calls, this
        // makes sense. However, in this case, for the "mousedownoutside" event, not all
        // "mousedown" events will lead to an event handler invocation. As such, we want 
        // to bind the base "mousedown" hander OUTSIDE OF THE ANGULAR ZONE, inspect the 
        // event, then RE-ENTER THE ANGULAR ZONE only in the case when we're about to 
        // invoke the event handler. This way, the "mousedown" events WILL NOT trigger 
        // change-detection; but, the "mousedownoutside" events WILL TRIGGER change-
        // detection.
        var zone = this.manager.getZone();
        zone.runOutsideAngular(addMousedownHandler);
        return (removeMousedownHandler);
        // ---
        // LOCALLY-SCOPED FUNCTIONS.
        // ---
        // I handle the base "mousedown" event OUTSIDE the Angular Zone.
        function addMousedownHandler() {
            document.addEventListener("mousedown", mousedownHandler, false);
        }
        // I remove the base "mousedown" event.
        function removeMousedownHandler() {
            document.removeEventListener("mousedown", mousedownHandler, false);
        }
        // I handle the base "mousedown" event.
        function mousedownHandler(event) {
            var ignoreTargets = null;
            // By default, the mousedownOutside handler will respond to any mousedown 
            // events outside the current element. However, some of those events can be
            // ignored if the "data-ignoreMousedownOutside" attribute is provided (as 
            // a list of CSS selectors).
            // --
            // CAUTION: .dataset is not supported in IE10 (but getAttribute() would be
            // if you needed to support older browsers).
            if (element.dataset.ignoremousedownoutside) {
                ignoreTargets = Array.from(document.querySelectorAll(element.dataset.ignoremousedownoutside));
            }
            var target = event.target;
            // Since we're looking for events that originate outside of the current 
            // element (or any of the "ignore" elements), we have to walk up the DOM
            // (Document Object Model) tree in order to ensure that the event target is
            // not a descendant of the white-listed elements.
            while (target) {
                // If we've reached the element reference, this is an internal event and
                // we can safely ignore it.
                if (target === element) {
                    return;
                }
                // If we've reached one of the ignorable elements, this is an internal 
                // event and we can safely ignore it.
                if (ignoreTargets && (ignoreTargets.indexOf(target) !== -1)) {
                    return;
                }
                target = target.parentNode;
            }
            // If we've made it this far, it means that the mousedown event was outside 
            // of the current element AND outside of any elements that we need to ignore.
            // At this point, we need to invoke the event-handler; as such, we're going 
            // to RE-ENTER THE ANGULAR ZONE so that the change-detection algorithm will 
            // be triggered after our handler is invoked.
            zone.runGuarded(function runInZoneSoChangeDetectionWillBeTriggered() {
                handler(event);
            });
        }
    };
    // I bind the "mousedownOutside" event to the given global object.
    // --
    // CAUTION: This is not supported. It's not possible to mousedown outside the document.
    MousedownOutsidePlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
        throw (new Error("Unsupported event target " + element + " for event " + eventName + "."));
    };
    // I determine if the given event name is supported by this plugin. For each event
    // binding, the plugins are searched in the reverse order of the EVENT_MANAGER_PLUGINS
    // multi-collection. Angular will use the first plugin that supports the given event.
    MousedownOutsidePlugin.prototype.supports = function (eventName) {
        return (eventName === "mousedownoutside");
    };
    return MousedownOutsidePlugin;
}());
exports.MousedownOutsidePlugin = MousedownOutsidePlugin;


/***/ }),
/* 300 */,
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
var router_2 = __webpack_require__(1);
var router_3 = __webpack_require__(1);
// Import the application components and services.
var dom_utils_1 = __webpack_require__(60);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// I co-opt the <router-outlet> element selector so that I can tap into the life-cycle
// of the core RouterOutlet directive.
var RouterOutletDirective = /** @class */ (function () {
    // I initialize the router-outlet directive.
    function RouterOutletDirective(domUtils, elementRef, router, routerOutlet) {
        this.domUtils = domUtils;
        this.elementRef = elementRef;
        this.router = router;
        this.routerOutlet = routerOutlet;
        this.activateEventsSubscription = null;
        this.deactivateEventsSubscription = null;
        this.offsets = [];
        this.routerEventsSubscription = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called when the directive is being destroyed.
    RouterOutletDirective.prototype.ngOnDestroy = function () {
        (this.activateEventsSubscription) && this.activateEventsSubscription.unsubscribe();
        (this.deactivateEventsSubscription) && this.deactivateEventsSubscription.unsubscribe();
        (this.routerEventsSubscription) && this.routerEventsSubscription.unsubscribe();
    };
    // I get called once after the directive's inputs have been initialized.
    RouterOutletDirective.prototype.ngOnInit = function () {
        var _this = this;
        // In order to help with natural scroll behavior, we have to listen for the
        // creation and destruction of router View component.s		
        this.activateEventsSubscription = this.routerOutlet.activateEvents.subscribe(function (event) {
            _this.handleActivateEvent();
        });
        this.deactivateEventsSubscription = this.routerOutlet.deactivateEvents.subscribe(function (event) {
            _this.handleDectivateEvent();
        });
        // In order to make sure the offsets don't get applied inappropriately in the
        // future, we have to listen for navigation events.
        this.routerEventsSubscription = this.router.events.subscribe(function (event) {
            _this.handleNavigationEvent(event);
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I get called when a new router View component is being rendered.
    RouterOutletDirective.prototype.handleActivateEvent = function () {
        if (!this.offsets.length) {
            return;
        }
        console.group("Ensuring Ancestral Scroll Offsets in New Navigation");
        console.log(this.offsets.slice());
        console.groupEnd();
        // At this point, the View-in-question has been mounted in the DOM (Document
        // Object Model). We can now walk back up the DOM and make sure that the
        // previously-recorded offsets (in the last "deactivate" event) are being applied
        // to the ancestral elements. This will prevent the browser's native desire to 
        // auto-scroll-down a document once the view has been injected. Essentially, this
        // ensures that we scroll back to the "expected top" as the user clicks through
        // the application.
        var node = this.elementRef.nativeElement.parentNode;
        while (node) {
            // If this is an ELEMENT node, set its offset.
            if (node.nodeType === 1) {
                this.domUtils.scrollTo(node, this.offsets.shift());
            }
            node = node.parentNode;
        }
        // At the top, we'll always set the window's scroll.
        this.domUtils.scrollTo(window, this.offsets.shift());
    };
    // I get called when an existing router View component is being unmounted.
    RouterOutletDirective.prototype.handleDectivateEvent = function () {
        // At this point, the View-in-question has already been removed from the 
        // document. Let's walk up the DOM (Document Object Model) and record the scroll
        // position of all scrollable elements. This will give us a sense of what the DOM
        // should look like after the next View is injected.
        var node = this.elementRef.nativeElement.parentNode;
        while (node) {
            // If this is an ELEMENT node, capture its offset.
            if (node.nodeType === 1) {
                this.offsets.push(this.domUtils.getScrollTop(node));
            }
            node = node.parentNode;
        }
        // At the top, we'll always record the window's scroll.
        this.offsets.push(this.domUtils.getScrollTop(window));
    };
    // I get called whenever a router event is raised.
    RouterOutletDirective.prototype.handleNavigationEvent = function (event) {
        // The "offsets" are only meant to be used across a single navigation. As such,
        // let's clear out the offsets at the end of each navigation in order to ensure
        // that old offsets don't accidentally get applied to a future view mounted by
        // the current router-outlet.
        if (event instanceof router_1.NavigationEnd) {
            this.offsets.splice(0, this.offsets.length);
        }
    };
    RouterOutletDirective = __decorate([
        core_1.Directive({
            selector: "router-outlet"
        }),
        __metadata("design:paramtypes", [dom_utils_1.DomUtils,
            core_2.ElementRef,
            router_2.Router,
            router_3.RouterOutlet])
    ], RouterOutletDirective);
    return RouterOutletDirective;
}());
exports.RouterOutletDirective = RouterOutletDirective;


/***/ }),
/* 302 */,
/* 303 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 16px ;\n  font-smoothing: antialiased ;\n  -webkit-font-smoothing: antialiased ;\n  font-weight: 300 ;\n  margin: 0px 0px 0px 0px ;\n  min-height: 100vh ;\n  padding: 0px 0px 0px 0px ;\n}\n:host:after {\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n::ng-deep a {\n  cursor: pointer ;\n  text-decoration: underline ;\n}\n::ng-deep input,\n::ng-deep select,\n::ng-deep textarea {\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 16px ;\n  font-weight: 300 ;\n}\n"

/***/ }),
/* 304 */
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>\n\n<!--\n\tThis is our SECONDARY route for the updates.\n\t--\n\tNOTE: Really, I wanted this to be inside the Standard View so that it was only \n\tvisible when the Standard View was rendered; however, the standard view starts with\n\tan empty (\"\") parent route, which makes secondary views impossible to use. As such,\n\tit's being moved up to the Shell view where it will be harder to \"hide\". Oh well.\n\n\tI could have just included it as a Component in the Standard View; but, I wanted the\n\tview to be navigable using the back-button (as this is the expected behavior).\n-->\n<router-outlet name=\"updates\"></router-outlet>\n\n<!-- This is our SECONDARY route for the inbox. -->\n<router-outlet name=\"inbox\"></router-outlet>\n\n<!-- This is our SECONDARY route for the modal window. -->\n<router-outlet name=\"modal\"></router-outlet>\n"

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var boards_view_module_1 = __webpack_require__(306);
var console_view_module_1 = __webpack_require__(326);
var freehands_view_module_1 = __webpack_require__(352);
var inbox_view_module_1 = __webpack_require__(357);
var modal_view_module_1 = __webpack_require__(375);
var oops_view_module_1 = __webpack_require__(446);
var product_updates_view_module_1 = __webpack_require__(453);
var shared_module_1 = __webpack_require__(2);
var shell_view_component_1 = __webpack_require__(111);
var standard_view_module_1 = __webpack_require__(463);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ShellViewModule = /** @class */ (function () {
    function ShellViewModule() {
    }
    ShellViewModule.routes = [
        {
            // NOTE: Normally, I wouldn't include a "path" here because I would defer to
            // the child routes to define their own relevant prefix. However, since the 
            // ShellView component has several NAMED OUTLETs (Inbox, Modal), we have to
            // provide a path or the named outlets will break.
            // --
            // Read More: https://github.com/angular/angular/issues/14662
            path: "app",
            children: boards_view_module_1.BoardsViewModule.routes.concat(console_view_module_1.ConsoleViewModule.routes, inbox_view_module_1.InboxViewModule.routes, modal_view_module_1.ModalViewModule.routes, oops_view_module_1.OopsViewModule.routes, product_updates_view_module_1.ProductUpdatesViewModule.routes, standard_view_module_1.StandardViewModule.routes, freehands_view_module_1.FreehandsViewModule.routes, [
                // Handle the "no route" case.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "projects"
                }
            ])
        },
        // Handle the "no route" case.
        {
            path: "",
            pathMatch: "full",
            redirectTo: "app/projects"
        },
        // Handle the catch-all for not found routes.
        {
            path: "**",
            redirectTo: "/app/oops/not-found"
        }
    ];
    ShellViewModule = __decorate([
        core_1.NgModule({
            imports: [
                boards_view_module_1.BoardsViewModule,
                console_view_module_1.ConsoleViewModule,
                freehands_view_module_1.FreehandsViewModule,
                inbox_view_module_1.InboxViewModule,
                modal_view_module_1.ModalViewModule,
                oops_view_module_1.OopsViewModule,
                product_updates_view_module_1.ProductUpdatesViewModule,
                shared_module_1.SharedModule,
                standard_view_module_1.StandardViewModule
            ],
            declarations: [
                shell_view_component_1.ShellViewComponent
            ]
        })
    ], ShellViewModule);
    return ShellViewModule;
}());
exports.ShellViewModule = ShellViewModule;


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_module_1 = __webpack_require__(307);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BoardsViewModule = /** @class */ (function () {
    function BoardsViewModule() {
    }
    BoardsViewModule.routes = [
        {
            path: "boards",
            children: detail_view_module_1.DetailViewModule.routes.concat([
                // If someone is trying to get to the root of the boards section, 
                // redirect them to the projects list with board-filtering.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "/app/projects/list;filterType=board"
                }
            ])
        }
    ];
    BoardsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                detail_view_module_1.DetailViewModule
            ]
        })
    ], BoardsViewModule);
    return BoardsViewModule;
}());
exports.BoardsViewModule = BoardsViewModule;


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_component_1 = __webpack_require__(112);
var item_view_module_1 = __webpack_require__(310);
var partial_service_1 = __webpack_require__(113);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DetailViewModule = /** @class */ (function () {
    function DetailViewModule() {
    }
    DetailViewModule.routes = [
        {
            path: ":id",
            component: detail_view_component_1.DetailViewComponent,
            children: item_view_module_1.ItemViewModule.routes.slice()
        }
    ];
    DetailViewModule = __decorate([
        core_1.NgModule({
            imports: [
                item_view_module_1.ItemViewModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                detail_view_component_1.DetailViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], DetailViewModule);
    return DetailViewModule;
}());
exports.DetailViewModule = DetailViewModule;


/***/ }),
/* 308 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.header {\n  border-bottom: 1px solid #EAECF1 ;\n  display: flex ;\n  flex-direction: column ;\n  height: 40vh ;\n  min-height: 490px ;\n  position: relative ;\n}\n.header__top-spacer {\n  flex: 1 1 60% ;\n}\n.header__bottom-spacer {\n  flex: 1 1 40% ;\n}\n.header__marquee {\n  margin: 0px auto 0px auto ;\n  width: 800px ;\n}\n.header__in {\n  background-color: #3D3D3F ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  height: 37px ;\n  line-height: 37px ;\n  left: 27px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 27px ;\n  width: 37px ;\n}\n.header__tools {\n  position: absolute ;\n  right: 27px ;\n  top: 27px ;\n}\n.marquee__title {\n  color: #282F3D ;\n  font-size: 66px ;\n  font-weight: 400 ;\n  line-height: 66px ;\n  margin: 0px 0px 0px 0px ;\n  text-align: center ;\n  text-transform: uppercase ;\n}\n.marquee__description {\n  color: #888D9C ;\n  font-size: 34px ;\n  font-weight: 300 ;\n  line-height: 50px ;\n  margin-top: 15px ;\n  text-align: center ;\n}\n.marquee__members {\n  display: flex ;\n  justify-content: center ;\n  margin-top: 50px ;\n}\n.member-actions {\n  display: flex ;\n  justify-content: center ;\n  text-align: center ;\n  text-decoration: none ;\n}\n.member-actions__plus {\n  box-sizing: border-box;\n  border: 1px dashed #B6BAC7 ;\n  border-radius: 39px 39px 39px 39px ;\n  color: #B6BAC7 ;\n  height: 39px ;\n  font-size: 18px ;\n  font-weight: 600 ;\n  line-height: 38px ;\n  width: 39px ;\n}\n.member-actions__plus:hover {\n  border-color: #D3D5DD ;\n  color: #D3D5DD ;\n}\n.member-actions__avatar {\n  background-color: #CACFD3 ;\n  color: #959BA1 ;\n  height: 39px ;\n  width: 39px ;\n  margin-left: 10px ;\n}\n.tools {\n  display: flex ;\n}\n.tools__item {\n  border: 1px solid #CCCED3 ;\n  border-radius: 37px 37px 37px 37px ;\n  height: 37px ;\n  line-height: 37px ;\n  margin-left: 9px ;\n  text-align: center ;\n  text-decoration: none ;\n  width: 37px ;\n}\n.content {\n  padding: 0px 0px 30px 0px ;\n}\n.items {\n  display: flex ;\n  flex-wrap: wrap ;\n  justify-content: center ;\n  list-style-type: none ;\n  margin: 50px auto 0px auto ;\n  padding: 0px 0px 0px 0px ;\n  width: 1170px ;\n}\n.items__item {\n  flex: 0 0 auto ;\n  margin: 12px 10px 12px 10px ;\n}\n.item {\n  border: 1px solid #E5E6E8 ;\n  display: flex ;\n  flex-direction: column ;\n  height: 217px ;\n  text-decoration: none ;\n  width: 270px ;\n}\n.item__preview {\n  background-color: #FAFAFA ;\n  flex: 1 1 100% ;\n}\n.item__name {\n  border-top: 1px solid #E5E6E8 ;\n  color: #333C4E ;\n  flex: 0 0 auto ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  padding: 14px 16px 14px 16px ;\n}\n"

/***/ }),
/* 309 */
/***/ (function(module, exports) {

module.exports = "\n\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<div class=\"header\">\n\n\t\t<span class=\"header__top-spacer\"></span>\n\n\t\t<div class=\"header__marquee marquee\">\n\n\t\t\t<h1 class=\"marquee__title\">\n\t\t\t\t{{ board.name }}\n\t\t\t</h1>\n\n\t\t\t<div class=\"marquee__description\">\n\t\t\t\tAdd a description here...\n\t\t\t</div>\n\n\t\t\t<div class=\"marquee__members\">\n\t\t\t\t\n\t\t\t\t<a [routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'board-members', board.id ] } } ]\" class=\"member-actions\">\n\t\t\t\t\t<span class=\"member-actions__plus\">+</span>\n\n\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t*ngFor=\"let member of members\"\n\t\t\t\t\t\t[initials]=\"member.initials\"\n\t\t\t\t\t\t[src]=\"member.avatarUrl\"\n\t\t\t\t\t\t[title]=\"member.name\"\n\t\t\t\t\t\tclass=\"member-actions__avatar\">\n\t\t\t\t\t</app-avatar>\n\t\t\t\t</a>\n\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<span class=\"header__bottom-spacer\"></span>\n\n\n\t\t<a [routerLink]=\"[ '/app/projects/list', { filterType: 'board' } ]\" class=\"header__in\">in</a>\n\n\t\t<div class=\"header__tools tools\">\n\t\t\t\n\t\t\t<!--\n\t\t\t<a\n\t\t\t\t[routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'board-settings', board.id ] } } ]\"\n\t\t\t\tclass=\"tools__item\">\n\t\t\t\tS\n\t\t\t</a>\n\n\t\t\t<a class=\"tools__item\">\n\t\t\t\tC\n\t\t\t</a>\n\t\t\t-->\n\t\t\t\n\t\t\t<a\n\t\t\t\t[routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'share-board', board.id ] } } ]\"\n\t\t\t\tclass=\"tools__item\">\n\t\t\t\tS\n\t\t\t</a>\n\n\t\t</div>\n\n\t</div>\n\n\t<div class=\"content\">\n\n\t\t<ul class=\"items\">\n\t\t\t<li *ngFor=\"let item of items\" class=\"items__item\">\n\n\t\t\t\t<a routerLink=\"./items/{{ item.id }}\" class=\"item\">\n\t\t\t\t\t<span class=\"item__preview\">\n\t\t\t\t\t\t<br />\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"item__name\">\n\t\t\t\t\t\t{{ item.name }}\n\t\t\t\t\t</span>\n\t\t\t\t</a>\n\n\t\t\t</li>\n\t\t</ul>\n\n\t</div>\n\n\t<router-outlet></router-outlet>\n\n</ng-template>\n<!-- END: Loaded State. -->\n\n\n"

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var item_view_component_1 = __webpack_require__(311);
var partial_service_1 = __webpack_require__(114);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ItemViewModule = /** @class */ (function () {
    function ItemViewModule() {
    }
    ItemViewModule.routes = [
        {
            path: "items",
            children: [
                {
                    path: ":id",
                    component: item_view_component_1.ItemViewComponent
                },
                // Handle no route situation.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "../"
                }
            ]
        }
    ];
    ItemViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                item_view_component_1.ItemViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], ItemViewModule);
    return ItemViewModule;
}());
exports.ItemViewModule = ItemViewModule;


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var detail_view_component_1 = __webpack_require__(112);
var dom_utils_1 = __webpack_require__(38);
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(114);
var ItemViewComponent = /** @class */ (function () {
    // I initialize the detail-view component.
    function ItemViewComponent(activatedRoute, domUtils, detailViewComponent, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.detailViewComponent = detailViewComponent;
        this.domUtils = domUtils;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.board = null;
        this.comments = null;
        this.isLoading = true;
        this.item = null;
        this.paramMapSubscription = null;
        this.unlisten = null;
    }
    // ---
    // PUBLIE METHODS.
    // ---
    // I get called once when the component is being unmounted.
    ItemViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
        // When we close the item-view (pseudo modal window), we can allow any overflow
        // of the HTML page to show; this will re-enable the natural scrollbars on the 
        // main page.
        this.domUtils.showHtmlOverflow();
    };
    // I get called once when the component is being mounted.
    ItemViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Since the item-view is acting like a pseudo modal window, we want to hide the
        // scrollbars of the main document. This way, scrolling in the detail view won't
        // cause accidental scrolling in the main document.
        this.domUtils.hideHtmlOverflow();
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.router.navigate(["../../"], {
                    relativeTo: _this.activatedRoute
                });
            },
            "ArrowLeft": function (event) {
                _this.detailViewComponent.gotoRelativeItem("previous", +_this.activatedRoute.snapshot.params.id);
            },
            "ArrowRight": function (event) {
                _this.detailViewComponent.gotoRelativeItem("next", +_this.activatedRoute.snapshot.params.id);
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("board-item")
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ItemViewComponent.prototype.loadData = function (itemID) {
        var _this = this;
        this.item = lodash_extended_1._.find(this.detailViewComponent.items, { id: itemID });
        // This loading pertains only to the sidebar.
        this.isLoading = true;
        this.partialService
            .get(itemID)
            .then(function (partial) {
            // If the view has already moved onto another ID, then don't consume 
            // the response.
            if (itemID !== +_this.activatedRoute.snapshot.params.id) {
                return;
            }
            _this.isLoading = false;
            _this.board = partial.board;
            _this.comments = partial.comments;
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: ["boards", _this.activatedRoute.snapshot.parent.parent.params.id],
                        modal: "modal/error/could-not-load-board-item"
                    }
                }
            ]);
        });
    };
    ItemViewComponent = __decorate([
        core_1.Component({
            selector: "item-view",
            styles: [__webpack_require__(312)],
            template: __webpack_require__(313)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            dom_utils_1.DomUtils,
            detail_view_component_1.DetailViewComponent,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], ItemViewComponent);
    return ItemViewComponent;
}());
exports.ItemViewComponent = ItemViewComponent;


/***/ }),
/* 312 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  bottom: 0px ;\n  left: 0px ;\n  position: fixed ;\n  right: 0px ;\n  top: 0px ;\n  z-index: 99 ;\n}\n.in {\n  background-color: #3D3D3F ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  height: 37px ;\n  line-height: 37px ;\n  left: 27px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 27px ;\n  width: 37px ;\n  z-index: 1 ;\n}\n.content {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.content__main {\n  display: flex ;\n  flex: 1 1 100% ;\n}\n.content__sidebar {\n  border-left: 1px solid #E0E0E0 ;\n  flex: 0 0 auto ;\n  width: 440px ;\n}\n.sidebar {\n  display: flex ;\n  flex-direction: column ;\n}\n.sidebar__loading {\n  flex: 1 0 auto ;\n}\n.sidebar__metadata {\n  flex: 1 1 auto ;\n}\n.sidebar__main {\n  flex: 1 1 100% ;\n  overflow: auto ;\n}\n.sidebar__creator {\n  border-top: 1px solid #E0E0E0 ;\n  flex: 1 1 auto ;\n}\n.item-label {\n  background-color: #EAEAEA ;\n  border-radius: 10px 10px 10px 10px ;\n  margin: auto auto auto auto ;\n  padding: 15px 35px 20px 35px ;\n  text-align: center ;\n}\n.item-label__type {\n  display: block ;\n  font-size: 36px ;\n  font-weight: 300 ;\n  margin-bottom: 12px ;\n}\n.item-label__item {\n  display: block ;\n  font-size: 18px ;\n  line-height: 24px ;\n}\n.metadata {\n  padding: 37px 37px 10px 37px ;\n}\n.metadata__board {\n  color: #CED2DA ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  letter-spacing: .03em ;\n  margin-bottom: 20px ;\n  text-transform: uppercase ;\n}\n.metadata__item {\n  color: #41495A ;\n  font-size: 28px ;\n  font-weight: 400 ;\n  line-height: 38px ;\n}\n.comments {\n  list-style-type: none ;\n  margin: 26px 37px 26px 37px ;\n  padding: 0px 0px 0px 0px ;\n}\n.comments__item {\n  margin: 20px 0px 20px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.comment {\n  padding-left: 50px ;\n  position: relative ;\n}\n.comment__avatar {\n  background-color: #8D96AA ;\n  font-size: 12px ;\n  font-weight: 400 ;\n  height: 35px ;\n  left: 0px ;\n  position: absolute ;\n  top: 3px ;\n  width: 35px ;\n}\n.comment__author {\n  color: #333C4E ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin-bottom: 4px ;\n}\n.comment__content {\n  color: #3F495C ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 20px ;\n}\n.creator {\n  padding: 15px 10px 15px 63px ;\n  position: relative ;\n}\n.creator__avatar {\n  background-color: #CACFD3 ;\n  color: #959BA1 ;\n  height: 36px ;\n  left: 17px ;\n  margin-top: -18px;\n  position: absolute ;\n  top: 50% ;\n  width: 36px ;\n}\n.creator__identity {\n  color: #444C5E ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  margin-bottom: 3px ;\n}\n.creator__identity strong {\n  font-weight: 600 ;\n}\n.creator__modified {\n  color: #C5C9CF ;\n  font-size: 11px ;\n  font-weight: 400 ;\n}\n"

/***/ }),
/* 313 */
/***/ (function(module, exports) {

module.exports = "\n<!--\n\tWe always want to show the ability to leave this route, even before the contents have\n\tloaded fully. \n-->\n<a routerLink=\"../../\" class=\"in\">in</a>\n\n<!--\n\tFor this view, we're going to be loading the item from the parent view. As such, \n\tthe loading should be [essentially] instantaneous. The only thing that will load \n\twith network latency is the sidebar with the comments.\n-->\n<div *ngIf=\"item\" class=\"content\">\n\n\t<div class=\"content__main\">\n\n\t\t<span class=\"item-label\">\n\t\t\t<span class=\"item-label__type\">\n\t\t\t\t{{ item.type | uppercase }}\n\t\t\t</span>\n\t\t\t<span class=\"item-label__item\">\n\t\t\t\t{{ item.name }}\n\t\t\t</span>\n\t\t</span>\n\n\t</div>\n\n\t<div class=\"content__sidebar sidebar\">\n\n\t\t<!-- BEGIN: Loading State. -->\n\t\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t\t<app-loading-indicator class=\"sidebar__loading\"></app-loading-indicator>\n\n\t\t</ng-template>\n\t\t<!-- END: Loading State. -->\n\n\n\t\t<!-- BEGIN: Loaded State. -->\n\t\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t\t<div class=\"sidebar__metadata metadata\">\n\t\t\t\t\n\t\t\t\t<div class=\"metadata__board\">\n\t\t\t\t\t{{ board.name }}\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"metadata__item\">\n\t\t\t\t\t{{ item.name }}\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"sidebar__main\">\n\t\t\t\n\t\t\t\t<ul *ngIf=\"comments.length\" class=\"comments\">\n\t\t\t\t\t<li *ngFor=\"let comment of comments\" class=\"comments__item comment\">\n\n\t\t\t\t\t\t<app-avatar [initials]=\"comment.user.initials\" [src]=\"comment.user.avatarUrl\" class=\"comment__avatar\"></app-avatar>\n\n\t\t\t\t\t\t<div class=\"comment__author\">\n\t\t\t\t\t\t\t{{ comment.user.name }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"comment__content\">\n\t\t\t\t\t\t\t{{ comment.content }}\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"sidebar__creator creator\">\n\n\t\t\t\t<app-avatar initials=\"BN\" class=\"creator__avatar\"></app-avatar>\n\t\t\t\t<div class=\"creator__identity\">\n\t\t\t\t\tAdded by <strong>Someone</strong>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"creator__modified\">\n\t\t\t\t\tModified on January 5, 2018\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t</ng-template>\n\t\t<!-- END: Loaded State. -->\n\n\t</div>\n\n</div>\n"

/***/ }),
/* 314 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractControlDirective", function() { return AbstractControlDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractFormGroupDirective", function() { return AbstractFormGroupDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxControlValueAccessor", function() { return CheckboxControlValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlContainer", function() { return ControlContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NG_VALUE_ACCESSOR", function() { return NG_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPOSITION_BUFFER_MODE", function() { return COMPOSITION_BUFFER_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultValueAccessor", function() { return DefaultValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgControl", function() { return NgControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgControlStatus", function() { return NgControlStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgControlStatusGroup", function() { return NgControlStatusGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgForm", function() { return NgForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgModel", function() { return NgModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgModelGroup", function() { return NgModelGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioControlValueAccessor", function() { return RadioControlValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormControlDirective", function() { return FormControlDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormControlName", function() { return FormControlName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGroupDirective", function() { return FormGroupDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormArrayName", function() { return FormArrayName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGroupName", function() { return FormGroupName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgSelectOption", function() { return NgSelectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectControlValueAccessor", function() { return SelectControlValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMultipleControlValueAccessor", function() { return SelectMultipleControlValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxRequiredValidator", function() { return CheckboxRequiredValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailValidator", function() { return EmailValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxLengthValidator", function() { return MaxLengthValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinLengthValidator", function() { return MinLengthValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternValidator", function() { return PatternValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequiredValidator", function() { return RequiredValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormBuilder", function() { return FormBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractControl", function() { return AbstractControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormArray", function() { return FormArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormControl", function() { return FormControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGroup", function() { return FormGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NG_ASYNC_VALIDATORS", function() { return NG_ASYNC_VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NG_VALIDATORS", function() { return NG_VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsModule", function() { return FormsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactiveFormsModule", function() { return ReactiveFormsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵba", function() { return InternalFormsSharedModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵz", function() { return REACTIVE_DRIVEN_DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵx", function() { return SHARED_FORM_DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵy", function() { return TEMPLATE_DRIVEN_DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CHECKBOX_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return DEFAULT_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return AbstractControlStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return ngControlStatusHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return formDirectiveProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return formControlBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return modelGroupProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbf", function() { return NgNoValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbb", function() { return NUMBER_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbc", function() { return NumberValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return RADIO_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function() { return RadioControlRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbd", function() { return RANGE_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbe", function() { return RangeValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵj", function() { return formControlBinding$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵk", function() { return controlNameBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵl", function() { return formDirectiveProvider$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵn", function() { return formArrayNameProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵm", function() { return formGroupNameProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵo", function() { return SELECT_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵq", function() { return NgSelectMultipleOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵp", function() { return SELECT_MULTIPLE_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵs", function() { return CHECKBOX_REQUIRED_VALIDATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵt", function() { return EMAIL_VALIDATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵv", function() { return MAX_LENGTH_VALIDATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵu", function() { return MIN_LENGTH_VALIDATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵw", function() { return PATTERN_VALIDATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵr", function() { return REQUIRED_VALIDATOR; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(15);
/**
 * @license Angular v5.2.4
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Base class for control directives.
 *
 * Only used internally in the forms module.
 *
 * \@stable
 * @abstract
 */
var AbstractControlDirective = /** @class */ (function () {
    function AbstractControlDirective() {
    }
    Object.defineProperty(AbstractControlDirective.prototype, "value", {
        /** The value of the control. */
        get: /**
         * The value of the control.
         * @return {?}
         */
        function () { return this.control ? this.control.value : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "valid", {
        /**
         * A control is `valid` when its `status === VALID`.
         *
         * In order to have this status, the control must have passed all its
         * validation checks.
         */
        get: /**
         * A control is `valid` when its `status === VALID`.
         *
         * In order to have this status, the control must have passed all its
         * validation checks.
         * @return {?}
         */
        function () { return this.control ? this.control.valid : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
        /**
         * A control is `invalid` when its `status === INVALID`.
         *
         * In order to have this status, the control must have failed
         * at least one of its validation checks.
         */
        get: /**
         * A control is `invalid` when its `status === INVALID`.
         *
         * In order to have this status, the control must have failed
         * at least one of its validation checks.
         * @return {?}
         */
        function () { return this.control ? this.control.invalid : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "pending", {
        /**
         * A control is `pending` when its `status === PENDING`.
         *
         * In order to have this status, the control must be in the
         * middle of conducting a validation check.
         */
        get: /**
         * A control is `pending` when its `status === PENDING`.
         *
         * In order to have this status, the control must be in the
         * middle of conducting a validation check.
         * @return {?}
         */
        function () { return this.control ? this.control.pending : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
        /**
         * A control is `disabled` when its `status === DISABLED`.
         *
         * Disabled controls are exempt from validation checks and
         * are not included in the aggregate value of their ancestor
         * controls.
         */
        get: /**
         * A control is `disabled` when its `status === DISABLED`.
         *
         * Disabled controls are exempt from validation checks and
         * are not included in the aggregate value of their ancestor
         * controls.
         * @return {?}
         */
        function () { return this.control ? this.control.disabled : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
        /**
         * A control is `enabled` as long as its `status !== DISABLED`.
         *
         * In other words, it has a status of `VALID`, `INVALID`, or
         * `PENDING`.
         */
        get: /**
         * A control is `enabled` as long as its `status !== DISABLED`.
         *
         * In other words, it has a status of `VALID`, `INVALID`, or
         * `PENDING`.
         * @return {?}
         */
        function () { return this.control ? this.control.enabled : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "errors", {
        /**
         * Returns any errors generated by failing validation. If there
         * are no errors, it will return null.
         */
        get: /**
         * Returns any errors generated by failing validation. If there
         * are no errors, it will return null.
         * @return {?}
         */
        function () { return this.control ? this.control.errors : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
        /**
         * A control is `pristine` if the user has not yet changed
         * the value in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         */
        get: /**
         * A control is `pristine` if the user has not yet changed
         * the value in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         * @return {?}
         */
        function () { return this.control ? this.control.pristine : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
        /**
         * A control is `dirty` if the user has changed the value
         * in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         */
        get: /**
         * A control is `dirty` if the user has changed the value
         * in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         * @return {?}
         */
        function () { return this.control ? this.control.dirty : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "touched", {
        /**
         * A control is marked `touched` once the user has triggered
         * a `blur` event on it.
         */
        get: /**
         * A control is marked `touched` once the user has triggered
         * a `blur` event on it.
         * @return {?}
         */
        function () { return this.control ? this.control.touched : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () { return this.control ? this.control.status : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
        /**
         * A control is `untouched` if the user has not yet triggered
         * a `blur` event on it.
         */
        get: /**
         * A control is `untouched` if the user has not yet triggered
         * a `blur` event on it.
         * @return {?}
         */
        function () { return this.control ? this.control.untouched : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
        /**
         * Emits an event every time the validation status of the control
         * is re-calculated.
         */
        get: /**
         * Emits an event every time the validation status of the control
         * is re-calculated.
         * @return {?}
         */
        function () {
            return this.control ? this.control.statusChanges : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
        /**
         * Emits an event every time the value of the control changes, in
         * the UI or programmatically.
         */
        get: /**
         * Emits an event every time the value of the control changes, in
         * the UI or programmatically.
         * @return {?}
         */
        function () {
            return this.control ? this.control.valueChanges : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "path", {
        /**
         * Returns an array that represents the path from the top-level form
         * to this control. Each index is the string name of the control on
         * that level.
         */
        get: /**
         * Returns an array that represents the path from the top-level form
         * to this control. Each index is the string name of the control on
         * that level.
         * @return {?}
         */
        function () { return null; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the form control. This means by default:
     *
     * * it is marked as `pristine`
     * * it is marked as `untouched`
     * * value is set to null
     *
     * For more information, see {@link AbstractControl}.
     */
    /**
     * Resets the form control. This means by default:
     *
     * * it is marked as `pristine`
     * * it is marked as `untouched`
     * * value is set to null
     *
     * For more information, see {\@link AbstractControl}.
     * @param {?=} value
     * @return {?}
     */
    AbstractControlDirective.prototype.reset = /**
     * Resets the form control. This means by default:
     *
     * * it is marked as `pristine`
     * * it is marked as `untouched`
     * * value is set to null
     *
     * For more information, see {\@link AbstractControl}.
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = undefined; }
        if (this.control)
            this.control.reset(value);
    };
    /**
     * Returns true if the control with the given path has the error specified. Otherwise
     * returns false.
     *
     * If no path is given, it checks for the error on the present control.
     */
    /**
     * Returns true if the control with the given path has the error specified. Otherwise
     * returns false.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    AbstractControlDirective.prototype.hasError = /**
     * Returns true if the control with the given path has the error specified. Otherwise
     * returns false.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    function (errorCode, path) {
        return this.control ? this.control.hasError(errorCode, path) : false;
    };
    /**
     * Returns error data if the control with the given path has the error specified. Otherwise
     * returns null or undefined.
     *
     * If no path is given, it checks for the error on the present control.
     */
    /**
     * Returns error data if the control with the given path has the error specified. Otherwise
     * returns null or undefined.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    AbstractControlDirective.prototype.getError = /**
     * Returns error data if the control with the given path has the error specified. Otherwise
     * returns null or undefined.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    function (errorCode, path) {
        return this.control ? this.control.getError(errorCode, path) : null;
    };
    return AbstractControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A directive that contains multiple {\@link NgControl}s.
 *
 * Only used by the forms module.
 *
 * \@stable
 * @abstract
 */
var ControlContainer = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(ControlContainer, _super);
    function ControlContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ControlContainer.prototype, "formDirective", {
        /**
         * Get the form to which this container belongs.
         */
        get: /**
         * Get the form to which this container belongs.
         * @return {?}
         */
        function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlContainer.prototype, "path", {
        /**
         * Get the path to this container.
         */
        get: /**
         * Get the path to this container.
         * @return {?}
         */
        function () { return null; },
        enumerable: true,
        configurable: true
    });
    return ControlContainer;
}(AbstractControlDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} value
 * @return {?}
 */
function isEmptyInputValue(value) {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}
/**
 * Providers for validators to be used for {\@link FormControl}s in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * ### Example
 *
 * ```typescript
 * \@Directive({
 *   selector: '[custom-validator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(control: AbstractControl): ValidationErrors | null {
 *     return {"custom": true};
 *   }
 * }
 * ```
 *
 * \@stable
 */
var NG_VALIDATORS = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('NgValidators');
/**
 * Providers for asynchronous validators to be used for {\@link FormControl}s
 * in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * See {\@link NG_VALIDATORS} for more details.
 *
 * \@stable
 */
var NG_ASYNC_VALIDATORS = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('NgAsyncValidators');
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
/**
 * Provides a set of validators used by form controls.
 *
 * A validator is a function that processes a {\@link FormControl} or collection of
 * controls and returns a map of errors. A null map means that validation has passed.
 *
 * ### Example
 *
 * ```typescript
 * var loginControl = new FormControl("", Validators.required)
 * ```
 *
 * \@stable
 */
var Validators = /** @class */ (function () {
    function Validators() {
    }
    /**
     * Validator that requires controls to have a value greater than a number.
     *`min()` exists only as a function, not as a directive. For example,
     * `control = new FormControl('', Validators.min(3));`.
     */
    /**
     * Validator that requires controls to have a value greater than a number.
     * `min()` exists only as a function, not as a directive. For example,
     * `control = new FormControl('', Validators.min(3));`.
     * @param {?} min
     * @return {?}
     */
    Validators.min = /**
     * Validator that requires controls to have a value greater than a number.
     * `min()` exists only as a function, not as a directive. For example,
     * `control = new FormControl('', Validators.min(3));`.
     * @param {?} min
     * @return {?}
     */
    function (min) {
        return function (control) {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null; // don't validate empty values to allow optional controls
            }
            var /** @type {?} */ value = parseFloat(control.value);
            // Controls with NaN values after parsing should be treated as not having a
            // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
            return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
        };
    };
    /**
     * Validator that requires controls to have a value less than a number.
     * `max()` exists only as a function, not as a directive. For example,
     * `control = new FormControl('', Validators.max(15));`.
     */
    /**
     * Validator that requires controls to have a value less than a number.
     * `max()` exists only as a function, not as a directive. For example,
     * `control = new FormControl('', Validators.max(15));`.
     * @param {?} max
     * @return {?}
     */
    Validators.max = /**
     * Validator that requires controls to have a value less than a number.
     * `max()` exists only as a function, not as a directive. For example,
     * `control = new FormControl('', Validators.max(15));`.
     * @param {?} max
     * @return {?}
     */
    function (max) {
        return function (control) {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null; // don't validate empty values to allow optional controls
            }
            var /** @type {?} */ value = parseFloat(control.value);
            // Controls with NaN values after parsing should be treated as not having a
            // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
            return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
        };
    };
    /**
     * Validator that requires controls to have a non-empty value.
     */
    /**
     * Validator that requires controls to have a non-empty value.
     * @param {?} control
     * @return {?}
     */
    Validators.required = /**
     * Validator that requires controls to have a non-empty value.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return isEmptyInputValue(control.value) ? { 'required': true } : null;
    };
    /**
     * Validator that requires control value to be true.
     */
    /**
     * Validator that requires control value to be true.
     * @param {?} control
     * @return {?}
     */
    Validators.requiredTrue = /**
     * Validator that requires control value to be true.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return control.value === true ? null : { 'required': true };
    };
    /**
     * Validator that performs email validation.
     */
    /**
     * Validator that performs email validation.
     * @param {?} control
     * @return {?}
     */
    Validators.email = /**
     * Validator that performs email validation.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return EMAIL_REGEXP.test(control.value) ? null : { 'email': true };
    };
    /**
     * Validator that requires controls to have a value of a minimum length.
     */
    /**
     * Validator that requires controls to have a value of a minimum length.
     * @param {?} minLength
     * @return {?}
     */
    Validators.minLength = /**
     * Validator that requires controls to have a value of a minimum length.
     * @param {?} minLength
     * @return {?}
     */
    function (minLength) {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            var /** @type {?} */ length = control.value ? control.value.length : 0;
            return length < minLength ?
                { 'minlength': { 'requiredLength': minLength, 'actualLength': length } } :
                null;
        };
    };
    /**
     * Validator that requires controls to have a value of a maximum length.
     */
    /**
     * Validator that requires controls to have a value of a maximum length.
     * @param {?} maxLength
     * @return {?}
     */
    Validators.maxLength = /**
     * Validator that requires controls to have a value of a maximum length.
     * @param {?} maxLength
     * @return {?}
     */
    function (maxLength) {
        return function (control) {
            var /** @type {?} */ length = control.value ? control.value.length : 0;
            return length > maxLength ?
                { 'maxlength': { 'requiredLength': maxLength, 'actualLength': length } } :
                null;
        };
    };
    /**
     * Validator that requires a control to match a regex to its value.
     */
    /**
     * Validator that requires a control to match a regex to its value.
     * @param {?} pattern
     * @return {?}
     */
    Validators.pattern = /**
     * Validator that requires a control to match a regex to its value.
     * @param {?} pattern
     * @return {?}
     */
    function (pattern) {
        if (!pattern)
            return Validators.nullValidator;
        var /** @type {?} */ regex;
        var /** @type {?} */ regexStr;
        if (typeof pattern === 'string') {
            regexStr = '';
            if (pattern.charAt(0) !== '^')
                regexStr += '^';
            regexStr += pattern;
            if (pattern.charAt(pattern.length - 1) !== '$')
                regexStr += '$';
            regex = new RegExp(regexStr);
        }
        else {
            regexStr = pattern.toString();
            regex = pattern;
        }
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            var /** @type {?} */ value = control.value;
            return regex.test(value) ? null :
                { 'pattern': { 'requiredPattern': regexStr, 'actualValue': value } };
        };
    };
    /**
     * No-op validator.
     */
    /**
     * No-op validator.
     * @param {?} c
     * @return {?}
     */
    Validators.nullValidator = /**
     * No-op validator.
     * @param {?} c
     * @return {?}
     */
    function (c) { return null; };
    /**
     * @param {?} validators
     * @return {?}
     */
    Validators.compose = /**
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators)
            return null;
        var /** @type {?} */ presentValidators = /** @type {?} */ (validators.filter(isPresent));
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            return _mergeErrors(_executeValidators(control, presentValidators));
        };
    };
    /**
     * @param {?} validators
     * @return {?}
     */
    Validators.composeAsync = /**
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        if (!validators)
            return null;
        var /** @type {?} */ presentValidators = /** @type {?} */ (validators.filter(isPresent));
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            var /** @type {?} */ observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"].call(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__["forkJoin"])(observables), _mergeErrors);
        };
    };
    return Validators;
}());
/**
 * @param {?} o
 * @return {?}
 */
function isPresent(o) {
    return o != null;
}
/**
 * @param {?} r
 * @return {?}
 */
function toObservable(r) {
    var /** @type {?} */ obs = Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵisPromise"])(r) ? Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise__["fromPromise"])(r) : r;
    if (!(Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵisObservable"])(obs))) {
        throw new Error("Expected validator to return Promise or Observable.");
    }
    return obs;
}
/**
 * @param {?} control
 * @param {?} validators
 * @return {?}
 */
function _executeValidators(control, validators) {
    return validators.map(function (v) { return v(control); });
}
/**
 * @param {?} control
 * @param {?} validators
 * @return {?}
 */
function _executeAsyncValidators(control, validators) {
    return validators.map(function (v) { return v(control); });
}
/**
 * @param {?} arrayOfErrors
 * @return {?}
 */
function _mergeErrors(arrayOfErrors) {
    var /** @type {?} */ res = arrayOfErrors.reduce(function (res, errors) {
        return errors != null ? Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */])({}, /** @type {?} */ ((res)), errors) : /** @type {?} */ ((res));
    }, {});
    return Object.keys(res).length === 0 ? null : res;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A `ControlValueAccessor` acts as a bridge between the Angular forms API and a
 * native element in the DOM.
 *
 * Implement this interface if you want to create a custom form control directive
 * that integrates with Angular forms.
 *
 * \@stable
 * @record
 */

/**
 * Used to provide a {\@link ControlValueAccessor} for form controls.
 *
 * See {\@link DefaultValueAccessor} for how to implement one.
 * \@stable
 */
var NG_VALUE_ACCESSOR = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('NgValueAccessor');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return CheckboxControlValueAccessor; }),
    multi: true,
};
/**
 * The accessor for writing a value and listening to changes on a checkbox input element.
 *
 *  ### Example
 *  ```
 *  <input type="checkbox" name="rememberLogin" ngModel>
 *  ```
 *
 *  \@stable
 */
var CheckboxControlValueAccessor = /** @class */ (function () {
    function CheckboxControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxControlValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'checked', value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxControlValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxControlValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    CheckboxControlValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    CheckboxControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
                    host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
                    providers: [CHECKBOX_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CheckboxControlValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    ]; };
    return CheckboxControlValueAccessor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var DEFAULT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return DefaultValueAccessor; }),
    multi: true
};
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 * @return {?}
 */
function _isAndroid() {
    var /** @type {?} */ userAgent = Object(__WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["ɵgetDOM"])() ? Object(__WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["ɵgetDOM"])().getUserAgent() : '';
    return /android (\d+)/.test(userAgent.toLowerCase());
}
/**
 * Turn this mode on if you want form directives to buffer IME input until compositionend
 * \@experimental
 */
var COMPOSITION_BUFFER_MODE = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('CompositionEventMode');
/**
 * The default accessor for writing a value and listening to changes that is used by the
 * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  <input type="text" name="searchQuery" ngModel>
 *  ```
 *
 *  \@stable
 */
var DefaultValueAccessor = /** @class */ (function () {
    function DefaultValueAccessor(_renderer, _elementRef, _compositionMode) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._compositionMode = _compositionMode;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        /**
         * Whether the user is creating a composition string (IME events).
         */
        this._composing = false;
        if (this._compositionMode == null) {
            this._compositionMode = !_isAndroid();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DefaultValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ normalizedValue = value == null ? '' : value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    DefaultValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DefaultValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    DefaultValueAccessor.prototype._handleInput = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this._compositionMode || (this._compositionMode && !this._composing)) {
            this.onChange(value);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    DefaultValueAccessor.prototype._compositionStart = /**
     * \@internal
     * @return {?}
     */
    function () { this._composing = true; };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    DefaultValueAccessor.prototype._compositionEnd = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._composing = false;
        this._compositionMode && this.onChange(value);
    };
    DefaultValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
                    // TODO: vsavkin replace the above selector with the one below it once
                    // https://github.com/angular/angular/issues/3011 is implemented
                    // selector: '[ngModel],[formControl],[formControlName]',
                    host: {
                        '(input)': '$any(this)._handleInput($event.target.value)',
                        '(blur)': 'onTouched()',
                        '(compositionstart)': '$any(this)._compositionStart()',
                        '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
                    },
                    providers: [DEFAULT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DefaultValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [COMPOSITION_BUFFER_MODE,] },] },
    ]; };
    return DefaultValueAccessor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} validator
 * @return {?}
 */
function normalizeValidator(validator) {
    if ((/** @type {?} */ (validator)).validate) {
        return function (c) { return (/** @type {?} */ (validator)).validate(c); };
    }
    else {
        return /** @type {?} */ (validator);
    }
}
/**
 * @param {?} validator
 * @return {?}
 */
function normalizeAsyncValidator(validator) {
    if ((/** @type {?} */ (validator)).validate) {
        return function (c) { return (/** @type {?} */ (validator)).validate(c); };
    }
    else {
        return /** @type {?} */ (validator);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NUMBER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return NumberValueAccessor; }),
    multi: true
};
/**
 * The accessor for writing a number value and listening to changes that is used by the
 * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  <input type="number" [(ngModel)]="age">
 *  ```
 */
var NumberValueAccessor = /** @class */ (function () {
    function NumberValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NumberValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
        var /** @type {?} */ normalizedValue = value == null ? '' : value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NumberValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    NumberValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
                    host: {
                        '(change)': 'onChange($event.target.value)',
                        '(input)': 'onChange($event.target.value)',
                        '(blur)': 'onTouched()'
                    },
                    providers: [NUMBER_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    NumberValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    ]; };
    return NumberValueAccessor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @return {?}
 */
function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * A base class that all control directive extend.
 * It binds a {\@link FormControl} object to a DOM element.
 *
 * Used internally by Angular forms.
 *
 * \@stable
 * @abstract
 */
var NgControl = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(NgControl, _super);
    function NgControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * \@internal
         */
        _this._parent = null;
        _this.name = null;
        _this.valueAccessor = null;
        /**
         * \@internal
         */
        _this._rawValidators = [];
        /**
         * \@internal
         */
        _this._rawAsyncValidators = [];
        return _this;
    }
    Object.defineProperty(NgControl.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () { return /** @type {?} */ (unimplemented()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControl.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () { return /** @type {?} */ (unimplemented()); },
        enumerable: true,
        configurable: true
    });
    return NgControl;
}(AbstractControlDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return RadioControlValueAccessor; }),
    multi: true
};
/**
 * Internal class used by Angular to uncheck radio buttons with the matching name.
 */
var RadioControlRegistry = /** @class */ (function () {
    function RadioControlRegistry() {
        this._accessors = [];
    }
    /**
     * @param {?} control
     * @param {?} accessor
     * @return {?}
     */
    RadioControlRegistry.prototype.add = /**
     * @param {?} control
     * @param {?} accessor
     * @return {?}
     */
    function (control, accessor) {
        this._accessors.push([control, accessor]);
    };
    /**
     * @param {?} accessor
     * @return {?}
     */
    RadioControlRegistry.prototype.remove = /**
     * @param {?} accessor
     * @return {?}
     */
    function (accessor) {
        for (var /** @type {?} */ i = this._accessors.length - 1; i >= 0; --i) {
            if (this._accessors[i][1] === accessor) {
                this._accessors.splice(i, 1);
                return;
            }
        }
    };
    /**
     * @param {?} accessor
     * @return {?}
     */
    RadioControlRegistry.prototype.select = /**
     * @param {?} accessor
     * @return {?}
     */
    function (accessor) {
        var _this = this;
        this._accessors.forEach(function (c) {
            if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].fireUncheck(accessor.value);
            }
        });
    };
    /**
     * @param {?} controlPair
     * @param {?} accessor
     * @return {?}
     */
    RadioControlRegistry.prototype._isSameGroup = /**
     * @param {?} controlPair
     * @param {?} accessor
     * @return {?}
     */
    function (controlPair, accessor) {
        if (!controlPair[0].control)
            return false;
        return controlPair[0]._parent === accessor._control._parent &&
            controlPair[1].name === accessor.name;
    };
    RadioControlRegistry.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    RadioControlRegistry.ctorParameters = function () { return []; };
    return RadioControlRegistry;
}());
/**
 * \@whatItDoes Writes radio control values and listens to radio control changes.
 *
 * Used by {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName}
 * to keep the view synced with the {\@link FormControl} model.
 *
 * \@howToUse
 *
 * If you have imported the {\@link FormsModule} or the {\@link ReactiveFormsModule}, this
 * value accessor will be active on any radio control that has a form directive. You do
 * **not** need to add a special selector to activate it.
 *
 * ### How to use radio buttons with form directives
 *
 * To use radio buttons in a template-driven form, you'll want to ensure that radio buttons
 * in the same group have the same `name` attribute.  Radio buttons with different `name`
 * attributes do not affect each other.
 *
 * {\@example forms/ts/radioButtons/radio_button_example.ts region='TemplateDriven'}
 *
 * When using radio buttons in a reactive form, radio buttons in the same group should have the
 * same `formControlName`. You can also add a `name` attribute, but it's optional.
 *
 * {\@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 *  * **npm package**: `\@angular/forms`
 *
 *  \@stable
 */
var RadioControlValueAccessor = /** @class */ (function () {
    function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._registry = _registry;
        this._injector = _injector;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    RadioControlValueAccessor.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._control = this._injector.get(NgControl);
        this._checkName();
        this._registry.add(this._control, this);
    };
    /**
     * @return {?}
     */
    RadioControlValueAccessor.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._registry.remove(this); };
    /**
     * @param {?} value
     * @return {?}
     */
    RadioControlValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._state = value === this.value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'checked', this._state);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioControlValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function () {
            fn(_this.value);
            _this._registry.select(_this);
        };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RadioControlValueAccessor.prototype.fireUncheck = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.writeValue(value); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioControlValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    RadioControlValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /**
     * @return {?}
     */
    RadioControlValueAccessor.prototype._checkName = /**
     * @return {?}
     */
    function () {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this._throwNameError();
        }
        if (!this.name && this.formControlName)
            this.name = this.formControlName;
    };
    /**
     * @return {?}
     */
    RadioControlValueAccessor.prototype._throwNameError = /**
     * @return {?}
     */
    function () {
        throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
    };
    RadioControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
                    host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
                    providers: [RADIO_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RadioControlValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
        { type: RadioControlRegistry, },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"], },
    ]; };
    RadioControlValueAccessor.propDecorators = {
        "name": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        "formControlName": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        "value": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return RadioControlValueAccessor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var RANGE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return RangeValueAccessor; }),
    multi: true
};
/**
 * The accessor for writing a range value and listening to changes that is used by the
 * {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  <input type="range" [(ngModel)]="age" >
 *  ```
 */
var RangeValueAccessor = /** @class */ (function () {
    function RangeValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    RangeValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RangeValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RangeValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    RangeValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    RangeValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
                    host: {
                        '(change)': 'onChange($event.target.value)',
                        '(input)': 'onChange($event.target.value)',
                        '(blur)': 'onTouched()'
                    },
                    providers: [RANGE_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RangeValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    ]; };
    return RangeValueAccessor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return SelectControlValueAccessor; }),
    multi: true
};
/**
 * @param {?} id
 * @param {?} value
 * @return {?}
 */
function _buildValueString(id, value) {
    if (id == null)
        return "" + value;
    if (value && typeof value === 'object')
        value = 'Object';
    return (id + ": " + value).slice(0, 50);
}
/**
 * @param {?} valueString
 * @return {?}
 */
function _extractId(valueString) {
    return valueString.split(':')[0];
}
/**
 * \@whatItDoes Writes values and listens to changes on a select element.
 *
 * Used by {\@link NgModel}, {\@link FormControlDirective}, and {\@link FormControlName}
 * to keep the view synced with the {\@link FormControl} model.
 *
 * \@howToUse
 *
 * If you have imported the {\@link FormsModule} or the {\@link ReactiveFormsModule}, this
 * value accessor will be active on any select control that has a form directive. You do
 * **not** need to add a special selector to activate it.
 *
 * ### How to use select controls with form directives
 *
 * To use a select in a template-driven form, simply add an `ngModel` and a `name`
 * attribute to the main `<select>` tag.
 *
 * If your option values are simple strings, you can bind to the normal `value` property
 * on the option.  If your option values happen to be objects (and you'd like to save the
 * selection in your form as an object), use `ngValue` instead:
 *
 * {\@example forms/ts/selectControl/select_control_example.ts region='Component'}
 *
 * In reactive forms, you'll also want to add your form directive (`formControlName` or
 * `formControl`) on the main `<select>` tag. Like in the former example, you have the
 * choice of binding to the  `value` or `ngValue` property on the select's options.
 *
 * {\@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
 *
 * ### Caveat: Option selection
 *
 * Angular uses object identity to select option. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects option by the return value of the function.
 *
 * #### Syntax
 *
 * ```
 * <select [compareWith]="compareFn"  [(ngModel)]="selectedCountries">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * Note: We listen to the 'change' event because 'input' events aren't fired
 * for selects in Firefox and IE:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
 *
 * * **npm package**: `\@angular/forms`
 *
 * \@stable
 */
var SelectControlValueAccessor = /** @class */ (function () {
    function SelectControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@internal
         */
        this._optionMap = new Map();
        /**
         * \@internal
         */
        this._idCounter = 0;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this._compareWith = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵlooseIdentical"];
    }
    Object.defineProperty(SelectControlValueAccessor.prototype, "compareWith", {
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("compareWith must be a function, but received " + JSON.stringify(fn));
            }
            this._compareWith = fn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    SelectControlValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        var /** @type {?} */ id = this._getOptionId(value);
        if (id == null) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'selectedIndex', -1);
        }
        var /** @type {?} */ valueString = _buildValueString(id, value);
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', valueString);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectControlValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        var _this = this;
        this.onChange = function (valueString) {
            _this.value = _this._getOptionValue(valueString);
            fn(_this.value);
        };
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectControlValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectControlValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    SelectControlValueAccessor.prototype._registerOption = /**
     * \@internal
     * @return {?}
     */
    function () { return (this._idCounter++).toString(); };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    SelectControlValueAccessor.prototype._getOptionId = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
            var id = _a[_i];
            if (this._compareWith(this._optionMap.get(id), value))
                return id;
        }
        return null;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} valueString
     * @return {?}
     */
    SelectControlValueAccessor.prototype._getOptionValue = /**
     * \@internal
     * @param {?} valueString
     * @return {?}
     */
    function (valueString) {
        var /** @type {?} */ id = _extractId(valueString);
        return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
    };
    SelectControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
                    host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                    providers: [SELECT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectControlValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    ]; };
    SelectControlValueAccessor.propDecorators = {
        "compareWith": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return SelectControlValueAccessor;
}());
/**
 * \@whatItDoes Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * \@howToUse
 *
 * See docs for {\@link SelectControlValueAccessor} for usage examples.
 *
 * \@stable
 */
var NgSelectOption = /** @class */ (function () {
    function NgSelectOption(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (this._select)
            this.id = this._select._registerOption();
    }
    Object.defineProperty(NgSelectOption.prototype, "ngValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._select == null)
                return;
            this._select._optionMap.set(this.id, value);
            this._setElementValue(_buildValueString(this.id, value));
            this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgSelectOption.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._setElementValue(value);
            if (this._select)
                this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    NgSelectOption.prototype._setElementValue = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._element.nativeElement, 'value', value);
    };
    /**
     * @return {?}
     */
    NgSelectOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._select) {
            this._select._optionMap.delete(this.id);
            this._select.writeValue(this._select.value);
        }
    };
    NgSelectOption.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: 'option' },] },
    ];
    /** @nocollapse */
    NgSelectOption.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: SelectControlValueAccessor, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] },] },
    ]; };
    NgSelectOption.propDecorators = {
        "ngValue": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngValue',] },],
        "value": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['value',] },],
    };
    return NgSelectOption;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SELECT_MULTIPLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return SelectMultipleControlValueAccessor; }),
    multi: true
};
/**
 * @param {?} id
 * @param {?} value
 * @return {?}
 */
function _buildValueString$1(id, value) {
    if (id == null)
        return "" + value;
    if (typeof value === 'string')
        value = "'" + value + "'";
    if (value && typeof value === 'object')
        value = 'Object';
    return (id + ": " + value).slice(0, 50);
}
/**
 * @param {?} valueString
 * @return {?}
 */
function _extractId$1(valueString) {
    return valueString.split(':')[0];
}
/**
 * The accessor for writing a value and listening to changes on a select element.
 *
 *  ### Caveat: Options selection
 *
 * Angular uses object identity to select options. It's possible for the identities of items
 * to change while the data does not. This can happen, for example, if the items are produced
 * from an RPC to the server, and that RPC is re-run. Even if the data hasn't changed, the
 * second response will produce objects with different identities.
 *
 * To customize the default option comparison algorithm, `<select multiple>` supports `compareWith`
 * input. `compareWith` takes a **function** which has two arguments: `option1` and `option2`.
 * If `compareWith` is given, Angular selects options by the return value of the function.
 *
 * #### Syntax
 *
 * ```
 * <select multiple [compareWith]="compareFn"  [(ngModel)]="selectedCountries">
 *     <option *ngFor="let country of countries" [ngValue]="country">
 *         {{country.name}}
 *     </option>
 * </select>
 *
 * compareFn(c1: Country, c2: Country): boolean {
 *     return c1 && c2 ? c1.id === c2.id : c1 === c2;
 * }
 * ```
 *
 * \@stable
 */
var SelectMultipleControlValueAccessor = /** @class */ (function () {
    function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /**
         * \@internal
         */
        this._optionMap = new Map();
        /**
         * \@internal
         */
        this._idCounter = 0;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this._compareWith = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵlooseIdentical"];
    }
    Object.defineProperty(SelectMultipleControlValueAccessor.prototype, "compareWith", {
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("compareWith must be a function, but received " + JSON.stringify(fn));
            }
            this._compareWith = fn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.value = value;
        var /** @type {?} */ optionSelectedStateSetter;
        if (Array.isArray(value)) {
            // convert values to ids
            var /** @type {?} */ ids_1 = value.map(function (v) { return _this._getOptionId(v); });
            optionSelectedStateSetter = function (opt, o) { opt._setSelected(ids_1.indexOf(o.toString()) > -1); };
        }
        else {
            optionSelectedStateSetter = function (opt, o) { opt._setSelected(false); };
        }
        this._optionMap.forEach(optionSelectedStateSetter);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        var _this = this;
        this.onChange = function (_) {
            var /** @type {?} */ selected = [];
            if (_.hasOwnProperty('selectedOptions')) {
                var /** @type {?} */ options = _.selectedOptions;
                for (var /** @type {?} */ i = 0; i < options.length; i++) {
                    var /** @type {?} */ opt = options.item(i);
                    var /** @type {?} */ val = _this._getOptionValue(opt.value);
                    selected.push(val);
                }
            }
            else {
                var /** @type {?} */ options = /** @type {?} */ (_.options);
                for (var /** @type {?} */ i = 0; i < options.length; i++) {
                    var /** @type {?} */ opt = options.item(i);
                    if (opt.selected) {
                        var /** @type {?} */ val = _this._getOptionValue(opt.value);
                        selected.push(val);
                    }
                }
            }
            _this.value = selected;
            fn(selected);
        };
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype._registerOption = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ id = (this._idCounter++).toString();
        this._optionMap.set(id, value);
        return id;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype._getOptionId = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
            var id = _a[_i];
            if (this._compareWith(/** @type {?} */ ((this._optionMap.get(id)))._value, value))
                return id;
        }
        return null;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} valueString
     * @return {?}
     */
    SelectMultipleControlValueAccessor.prototype._getOptionValue = /**
     * \@internal
     * @param {?} valueString
     * @return {?}
     */
    function (valueString) {
        var /** @type {?} */ id = _extractId$1(valueString);
        return this._optionMap.has(id) ? /** @type {?} */ ((this._optionMap.get(id)))._value : valueString;
    };
    SelectMultipleControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
                    host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
                    providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectMultipleControlValueAccessor.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
    ]; };
    SelectMultipleControlValueAccessor.propDecorators = {
        "compareWith": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return SelectMultipleControlValueAccessor;
}());
/**
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * ### Example
 *
 * ```
 * <select multiple name="city" ngModel>
 *   <option *ngFor="let c of cities" [value]="c"></option>
 * </select>
 * ```
 */
var NgSelectMultipleOption = /** @class */ (function () {
    function NgSelectMultipleOption(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (this._select) {
            this.id = this._select._registerOption(this);
        }
    }
    Object.defineProperty(NgSelectMultipleOption.prototype, "ngValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._select == null)
                return;
            this._value = value;
            this._setElementValue(_buildValueString$1(this.id, value));
            this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgSelectMultipleOption.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._select) {
                this._value = value;
                this._setElementValue(_buildValueString$1(this.id, value));
                this._select.writeValue(this._select.value);
            }
            else {
                this._setElementValue(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    NgSelectMultipleOption.prototype._setElementValue = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._element.nativeElement, 'value', value);
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} selected
     * @return {?}
     */
    NgSelectMultipleOption.prototype._setSelected = /**
     * \@internal
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
    };
    /**
     * @return {?}
     */
    NgSelectMultipleOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._select) {
            this._select._optionMap.delete(this.id);
            this._select.writeValue(this._select.value);
        }
    };
    NgSelectMultipleOption.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: 'option' },] },
    ];
    /** @nocollapse */
    NgSelectMultipleOption.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], },
        { type: SelectMultipleControlValueAccessor, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] },] },
    ]; };
    NgSelectMultipleOption.propDecorators = {
        "ngValue": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngValue',] },],
        "value": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['value',] },],
    };
    return NgSelectMultipleOption;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} name
 * @param {?} parent
 * @return {?}
 */
function controlPath(name, parent) {
    return /** @type {?} */ ((parent.path)).concat([name]);
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpControl(control, dir) {
    if (!control)
        _throwError(dir, 'Cannot find control with');
    if (!dir.valueAccessor)
        _throwError(dir, 'No value accessor for form control with');
    control.validator = Validators.compose([/** @type {?} */ ((control.validator)), dir.validator]);
    control.asyncValidator = Validators.composeAsync([/** @type {?} */ ((control.asyncValidator)), dir.asyncValidator]); /** @type {?} */
    ((dir.valueAccessor)).writeValue(control.value);
    setUpViewChangePipeline(control, dir);
    setUpModelChangePipeline(control, dir);
    setUpBlurPipeline(control, dir);
    if (/** @type {?} */ ((dir.valueAccessor)).setDisabledState) {
        control.registerOnDisabledChange(function (isDisabled) { /** @type {?} */ ((/** @type {?} */ ((dir.valueAccessor)).setDisabledState))(isDisabled); });
    }
    // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
    dir._rawValidators.forEach(function (validator) {
        if ((/** @type {?} */ (validator)).registerOnValidatorChange)
            /** @type {?} */ (((/** @type {?} */ (validator)).registerOnValidatorChange))(function () { return control.updateValueAndValidity(); });
    });
    dir._rawAsyncValidators.forEach(function (validator) {
        if ((/** @type {?} */ (validator)).registerOnValidatorChange)
            /** @type {?} */ (((/** @type {?} */ (validator)).registerOnValidatorChange))(function () { return control.updateValueAndValidity(); });
    });
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function cleanUpControl(control, dir) {
    /** @type {?} */ ((dir.valueAccessor)).registerOnChange(function () { return _noControlError(dir); }); /** @type {?} */
    ((dir.valueAccessor)).registerOnTouched(function () { return _noControlError(dir); });
    dir._rawValidators.forEach(function (validator) {
        if (validator.registerOnValidatorChange) {
            validator.registerOnValidatorChange(null);
        }
    });
    dir._rawAsyncValidators.forEach(function (validator) {
        if (validator.registerOnValidatorChange) {
            validator.registerOnValidatorChange(null);
        }
    });
    if (control)
        control._clearChangeFns();
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpViewChangePipeline(control, dir) {
    /** @type {?} */ ((dir.valueAccessor)).registerOnChange(function (newValue) {
        control._pendingValue = newValue;
        control._pendingChange = true;
        control._pendingDirty = true;
        if (control.updateOn === 'change')
            updateControl(control, dir);
    });
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpBlurPipeline(control, dir) {
    /** @type {?} */ ((dir.valueAccessor)).registerOnTouched(function () {
        control._pendingTouched = true;
        if (control.updateOn === 'blur' && control._pendingChange)
            updateControl(control, dir);
        if (control.updateOn !== 'submit')
            control.markAsTouched();
    });
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function updateControl(control, dir) {
    dir.viewToModelUpdate(control._pendingValue);
    if (control._pendingDirty)
        control.markAsDirty();
    control.setValue(control._pendingValue, { emitModelToViewChange: false });
    control._pendingChange = false;
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpModelChangePipeline(control, dir) {
    control.registerOnChange(function (newValue, emitModelEvent) {
        /** @type {?} */ ((
        // control -> view
        dir.valueAccessor)).writeValue(newValue);
        // control -> ngModel
        if (emitModelEvent)
            dir.viewToModelUpdate(newValue);
    });
}
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpFormContainer(control, dir) {
    if (control == null)
        _throwError(dir, 'Cannot find control with');
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
/**
 * @param {?} dir
 * @return {?}
 */
function _noControlError(dir) {
    return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}
/**
 * @param {?} dir
 * @param {?} message
 * @return {?}
 */
function _throwError(dir, message) {
    var /** @type {?} */ messageEnd;
    if (/** @type {?} */ ((dir.path)).length > 1) {
        messageEnd = "path: '" + (/** @type {?} */ ((dir.path))).join(' -> ') + "'";
    }
    else if (/** @type {?} */ ((dir.path))[0]) {
        messageEnd = "name: '" + dir.path + "'";
    }
    else {
        messageEnd = 'unspecified name attribute';
    }
    throw new Error(message + " " + messageEnd);
}
/**
 * @param {?} validators
 * @return {?}
 */
function composeValidators(validators) {
    return validators != null ? Validators.compose(validators.map(normalizeValidator)) : null;
}
/**
 * @param {?} validators
 * @return {?}
 */
function composeAsyncValidators(validators) {
    return validators != null ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
        null;
}
/**
 * @param {?} changes
 * @param {?} viewModel
 * @return {?}
 */
function isPropertyUpdated(changes, viewModel) {
    if (!changes.hasOwnProperty('model'))
        return false;
    var /** @type {?} */ change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵlooseIdentical"])(viewModel, change.currentValue);
}
var BUILTIN_ACCESSORS = [
    CheckboxControlValueAccessor,
    RangeValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor,
    RadioControlValueAccessor,
];
/**
 * @param {?} valueAccessor
 * @return {?}
 */
function isBuiltInAccessor(valueAccessor) {
    return BUILTIN_ACCESSORS.some(function (a) { return valueAccessor.constructor === a; });
}
/**
 * @param {?} form
 * @param {?} directives
 * @return {?}
 */
function syncPendingControls(form, directives) {
    form._syncPendingControls();
    directives.forEach(function (dir) {
        var /** @type {?} */ control = /** @type {?} */ (dir.control);
        if (control.updateOn === 'submit' && control._pendingChange) {
            dir.viewToModelUpdate(control._pendingValue);
            control._pendingChange = false;
        }
    });
}
/**
 * @param {?} dir
 * @param {?} valueAccessors
 * @return {?}
 */
function selectValueAccessor(dir, valueAccessors) {
    if (!valueAccessors)
        return null;
    var /** @type {?} */ defaultAccessor = undefined;
    var /** @type {?} */ builtinAccessor = undefined;
    var /** @type {?} */ customAccessor = undefined;
    valueAccessors.forEach(function (v) {
        if (v.constructor === DefaultValueAccessor) {
            defaultAccessor = v;
        }
        else if (isBuiltInAccessor(v)) {
            if (builtinAccessor)
                _throwError(dir, 'More than one built-in value accessor matches form control with');
            builtinAccessor = v;
        }
        else {
            if (customAccessor)
                _throwError(dir, 'More than one custom value accessor matches form control with');
            customAccessor = v;
        }
    });
    if (customAccessor)
        return customAccessor;
    if (builtinAccessor)
        return builtinAccessor;
    if (defaultAccessor)
        return defaultAccessor;
    _throwError(dir, 'No valid value accessor for form control with');
    return null;
}
/**
 * @template T
 * @param {?} list
 * @param {?} el
 * @return {?}
 */
function removeDir(list, el) {
    var /** @type {?} */ index = list.indexOf(el);
    if (index > -1)
        list.splice(index, 1);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This is a base class for code shared between {\@link NgModelGroup} and {\@link FormGroupName}.
 *
 * \@stable
 */
var AbstractFormGroupDirective = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(AbstractFormGroupDirective, _super);
    function AbstractFormGroupDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    AbstractFormGroupDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._checkParentType(); /** @type {?} */
        ((this.formDirective)).addFormGroup(this);
    };
    /**
     * @return {?}
     */
    AbstractFormGroupDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formDirective) {
            this.formDirective.removeFormGroup(this);
        }
    };
    Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
        /**
         * Get the {@link FormGroup} backing this binding.
         */
        get: /**
         * Get the {\@link FormGroup} backing this binding.
         * @return {?}
         */
        function () { return /** @type {?} */ ((this.formDirective)).getFormGroup(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
        /**
         * Get the path to this control group.
         */
        get: /**
         * Get the path to this control group.
         * @return {?}
         */
        function () { return controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
        /**
         * Get the {@link Form} to which this group belongs.
         */
        get: /**
         * Get the {\@link Form} to which this group belongs.
         * @return {?}
         */
        function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () { return composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AbstractFormGroupDirective.prototype._checkParentType = /**
     * \@internal
     * @return {?}
     */
    function () { };
    return AbstractFormGroupDirective;
}(ControlContainer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AbstractControlStatus = /** @class */ (function () {
    function AbstractControlStatus(cd) {
        this._cd = cd;
    }
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.untouched : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.touched : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.pristine : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.dirty : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.valid : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.invalid : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassPending", {
        get: /**
         * @return {?}
         */
        function () { return this._cd.control ? this._cd.control.pending : false; },
        enumerable: true,
        configurable: true
    });
    return AbstractControlStatus;
}());
var ngControlStatusHost = {
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid',
    '[class.ng-pending]': 'ngClassPending',
};
/**
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status. The following classes are applied as the properties
 * become true:
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * \@stable
 */
var NgControlStatus = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(NgControlStatus, _super);
    function NgControlStatus(cd) {
        return _super.call(this, cd) || this;
    }
    NgControlStatus.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] },
    ];
    /** @nocollapse */
    NgControlStatus.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] },] },
    ]; };
    return NgControlStatus;
}(AbstractControlStatus));
/**
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc).
 *
 * \@stable
 */
var NgControlStatusGroup = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(NgControlStatusGroup, _super);
    function NgControlStatusGroup(cd) {
        return _super.call(this, cd) || this;
    }
    NgControlStatusGroup.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
                    host: ngControlStatusHost
                },] },
    ];
    /** @nocollapse */
    NgControlStatusGroup.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] },] },
    ]; };
    return NgControlStatusGroup;
}(AbstractControlStatus));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
 */
var VALID = 'VALID';
/**
 * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
 */
var INVALID = 'INVALID';
/**
 * Indicates that a FormControl is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
var PENDING = 'PENDING';
/**
 * Indicates that a FormControl is disabled, i.e. that the control is exempt from ancestor
 * calculations of validity or value.
 */
var DISABLED = 'DISABLED';
/**
 * @param {?} control
 * @param {?} path
 * @param {?} delimiter
 * @return {?}
 */
function _find(control, path, delimiter) {
    if (path == null)
        return null;
    if (!(path instanceof Array)) {
        path = (/** @type {?} */ (path)).split(delimiter);
    }
    if (path instanceof Array && (path.length === 0))
        return null;
    return (/** @type {?} */ (path)).reduce(function (v, name) {
        if (v instanceof FormGroup) {
            return v.controls[name] || null;
        }
        if (v instanceof FormArray) {
            return v.at(/** @type {?} */ (name)) || null;
        }
        return null;
    }, control);
}
/**
 * @param {?=} validatorOrOpts
 * @return {?}
 */
function coerceToValidator(validatorOrOpts) {
    var /** @type {?} */ validator = /** @type {?} */ ((isOptionsObj(validatorOrOpts) ? (/** @type {?} */ (validatorOrOpts)).validators :
        validatorOrOpts));
    return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
/**
 * @param {?=} asyncValidator
 * @param {?=} validatorOrOpts
 * @return {?}
 */
function coerceToAsyncValidator(asyncValidator, validatorOrOpts) {
    var /** @type {?} */ origAsyncValidator = /** @type {?} */ ((isOptionsObj(validatorOrOpts) ? (/** @type {?} */ (validatorOrOpts)).asyncValidators :
        asyncValidator));
    return Array.isArray(origAsyncValidator) ? composeAsyncValidators(origAsyncValidator) :
        origAsyncValidator || null;
}
/**
 * @record
 */

/**
 * @param {?=} validatorOrOpts
 * @return {?}
 */
function isOptionsObj(validatorOrOpts) {
    return validatorOrOpts != null && !Array.isArray(validatorOrOpts) &&
        typeof validatorOrOpts === 'object';
}
/**
 * \@whatItDoes This is the base class for {\@link FormControl}, {\@link FormGroup}, and
 * {\@link FormArray}.
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * \@stable
 * @abstract
 */
var AbstractControl = /** @class */ (function () {
    function AbstractControl(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        /**
         * \@internal
         */
        this._onCollectionChange = function () { };
        /**
         * A control is `pristine` if the user has not yet changed
         * the value in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         */
        this.pristine = true;
        /**
         * A control is marked `touched` once the user has triggered
         * a `blur` event on it.
         */
        this.touched = false;
        /**
         * \@internal
         */
        this._onDisabledChange = [];
    }
    Object.defineProperty(AbstractControl.prototype, "parent", {
        /**
         * The parent control.
         */
        get: /**
         * The parent control.
         * @return {?}
         */
        function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
        /**
         * A control is `valid` when its `status === VALID`.
         *
         * In order to have this status, the control must have passed all its
         * validation checks.
         */
        get: /**
         * A control is `valid` when its `status === VALID`.
         *
         * In order to have this status, the control must have passed all its
         * validation checks.
         * @return {?}
         */
        function () { return this.status === VALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "invalid", {
        /**
         * A control is `invalid` when its `status === INVALID`.
         *
         * In order to have this status, the control must have failed
         * at least one of its validation checks.
         */
        get: /**
         * A control is `invalid` when its `status === INVALID`.
         *
         * In order to have this status, the control must have failed
         * at least one of its validation checks.
         * @return {?}
         */
        function () { return this.status === INVALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pending", {
        /**
         * A control is `pending` when its `status === PENDING`.
         *
         * In order to have this status, the control must be in the
         * middle of conducting a validation check.
         */
        get: /**
         * A control is `pending` when its `status === PENDING`.
         *
         * In order to have this status, the control must be in the
         * middle of conducting a validation check.
         * @return {?}
         */
        function () { return this.status == PENDING; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "disabled", {
        /**
         * A control is `disabled` when its `status === DISABLED`.
         *
         * Disabled controls are exempt from validation checks and
         * are not included in the aggregate value of their ancestor
         * controls.
         */
        get: /**
         * A control is `disabled` when its `status === DISABLED`.
         *
         * Disabled controls are exempt from validation checks and
         * are not included in the aggregate value of their ancestor
         * controls.
         * @return {?}
         */
        function () { return this.status === DISABLED; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "enabled", {
        /**
         * A control is `enabled` as long as its `status !== DISABLED`.
         *
         * In other words, it has a status of `VALID`, `INVALID`, or
         * `PENDING`.
         */
        get: /**
         * A control is `enabled` as long as its `status !== DISABLED`.
         *
         * In other words, it has a status of `VALID`, `INVALID`, or
         * `PENDING`.
         * @return {?}
         */
        function () { return this.status !== DISABLED; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "dirty", {
        /**
         * A control is `dirty` if the user has changed the value
         * in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         */
        get: /**
         * A control is `dirty` if the user has changed the value
         * in the UI.
         *
         * Note that programmatic changes to a control's value will
         * *not* mark it dirty.
         * @return {?}
         */
        function () { return !this.pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "untouched", {
        /**
         * A control is `untouched` if the user has not yet triggered
         * a `blur` event on it.
         */
        get: /**
         * A control is `untouched` if the user has not yet triggered
         * a `blur` event on it.
         * @return {?}
         */
        function () { return !this.touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "updateOn", {
        /**
         * Returns the update strategy of the `AbstractControl` (i.e.
         * the event on which the control will update itself).
         * Possible values: `'change'` (default) | `'blur'` | `'submit'`
         */
        get: /**
         * Returns the update strategy of the `AbstractControl` (i.e.
         * the event on which the control will update itself).
         * Possible values: `'change'` (default) | `'blur'` | `'submit'`
         * @return {?}
         */
        function () {
            return this._updateOn ? this._updateOn : (this.parent ? this.parent.updateOn : 'change');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the synchronous validators that are active on this control.  Calling
     * this will overwrite any existing sync validators.
     */
    /**
     * Sets the synchronous validators that are active on this control.  Calling
     * this will overwrite any existing sync validators.
     * @param {?} newValidator
     * @return {?}
     */
    AbstractControl.prototype.setValidators = /**
     * Sets the synchronous validators that are active on this control.  Calling
     * this will overwrite any existing sync validators.
     * @param {?} newValidator
     * @return {?}
     */
    function (newValidator) {
        this.validator = coerceToValidator(newValidator);
    };
    /**
     * Sets the async validators that are active on this control. Calling this
     * will overwrite any existing async validators.
     */
    /**
     * Sets the async validators that are active on this control. Calling this
     * will overwrite any existing async validators.
     * @param {?} newValidator
     * @return {?}
     */
    AbstractControl.prototype.setAsyncValidators = /**
     * Sets the async validators that are active on this control. Calling this
     * will overwrite any existing async validators.
     * @param {?} newValidator
     * @return {?}
     */
    function (newValidator) {
        this.asyncValidator = coerceToAsyncValidator(newValidator);
    };
    /**
     * Empties out the sync validator list.
     */
    /**
     * Empties out the sync validator list.
     * @return {?}
     */
    AbstractControl.prototype.clearValidators = /**
     * Empties out the sync validator list.
     * @return {?}
     */
    function () { this.validator = null; };
    /**
     * Empties out the async validator list.
     */
    /**
     * Empties out the async validator list.
     * @return {?}
     */
    AbstractControl.prototype.clearAsyncValidators = /**
     * Empties out the async validator list.
     * @return {?}
     */
    function () { this.asyncValidator = null; };
    /**
     * Marks the control as `touched`.
     *
     * This will also mark all direct ancestors as `touched` to maintain
     * the model.
     */
    /**
     * Marks the control as `touched`.
     *
     * This will also mark all direct ancestors as `touched` to maintain
     * the model.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.markAsTouched = /**
     * Marks the control as `touched`.
     *
     * This will also mark all direct ancestors as `touched` to maintain
     * the model.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).touched = true;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsTouched(opts);
        }
    };
    /**
     * Marks the control as `untouched`.
     *
     * If the control has any children, it will also mark all children as `untouched`
     * to maintain the model, and re-calculate the `touched` status of all parent
     * controls.
     */
    /**
     * Marks the control as `untouched`.
     *
     * If the control has any children, it will also mark all children as `untouched`
     * to maintain the model, and re-calculate the `touched` status of all parent
     * controls.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.markAsUntouched = /**
     * Marks the control as `untouched`.
     *
     * If the control has any children, it will also mark all children as `untouched`
     * to maintain the model, and re-calculate the `touched` status of all parent
     * controls.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).touched = false;
        this._pendingTouched = false;
        this._forEachChild(function (control) { control.markAsUntouched({ onlySelf: true }); });
        if (this._parent && !opts.onlySelf) {
            this._parent._updateTouched(opts);
        }
    };
    /**
     * Marks the control as `dirty`.
     *
     * This will also mark all direct ancestors as `dirty` to maintain
     * the model.
     */
    /**
     * Marks the control as `dirty`.
     *
     * This will also mark all direct ancestors as `dirty` to maintain
     * the model.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.markAsDirty = /**
     * Marks the control as `dirty`.
     *
     * This will also mark all direct ancestors as `dirty` to maintain
     * the model.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).pristine = false;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsDirty(opts);
        }
    };
    /**
     * Marks the control as `pristine`.
     *
     * If the control has any children, it will also mark all children as `pristine`
     * to maintain the model, and re-calculate the `pristine` status of all parent
     * controls.
     */
    /**
     * Marks the control as `pristine`.
     *
     * If the control has any children, it will also mark all children as `pristine`
     * to maintain the model, and re-calculate the `pristine` status of all parent
     * controls.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.markAsPristine = /**
     * Marks the control as `pristine`.
     *
     * If the control has any children, it will also mark all children as `pristine`
     * to maintain the model, and re-calculate the `pristine` status of all parent
     * controls.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).pristine = true;
        this._pendingDirty = false;
        this._forEachChild(function (control) { control.markAsPristine({ onlySelf: true }); });
        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts);
        }
    };
    /**
     * Marks the control as `pending`.
     */
    /**
     * Marks the control as `pending`.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.markAsPending = /**
     * Marks the control as `pending`.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).status = PENDING;
        if (this._parent && !opts.onlySelf) {
            this._parent.markAsPending(opts);
        }
    };
    /**
     * Disables the control. This means the control will be exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children will be disabled to maintain the model.
     */
    /**
     * Disables the control. This means the control will be exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children will be disabled to maintain the model.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.disable = /**
     * Disables the control. This means the control will be exempt from validation checks and
     * excluded from the aggregate value of any parent. Its status is `DISABLED`.
     *
     * If the control has children, all children will be disabled to maintain the model.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).status = DISABLED;
        (/** @type {?} */ (this)).errors = null;
        this._forEachChild(function (control) { control.disable({ onlySelf: true }); });
        this._updateValue();
        if (opts.emitEvent !== false) {
            (/** @type {?} */ (this.valueChanges)).emit(this.value);
            (/** @type {?} */ (this.statusChanges)).emit(this.status);
        }
        this._updateAncestors(!!opts.onlySelf);
        this._onDisabledChange.forEach(function (changeFn) { return changeFn(true); });
    };
    /**
     * Enables the control. This means the control will be included in validation checks and
     * the aggregate value of its parent. Its status is re-calculated based on its value and
     * its validators.
     *
     * If the control has children, all children will be enabled.
     */
    /**
     * Enables the control. This means the control will be included in validation checks and
     * the aggregate value of its parent. Its status is re-calculated based on its value and
     * its validators.
     *
     * If the control has children, all children will be enabled.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.enable = /**
     * Enables the control. This means the control will be included in validation checks and
     * the aggregate value of its parent. Its status is re-calculated based on its value and
     * its validators.
     *
     * If the control has children, all children will be enabled.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).status = VALID;
        this._forEachChild(function (control) { control.enable({ onlySelf: true }); });
        this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent });
        this._updateAncestors(!!opts.onlySelf);
        this._onDisabledChange.forEach(function (changeFn) { return changeFn(false); });
    };
    /**
     * @param {?} onlySelf
     * @return {?}
     */
    AbstractControl.prototype._updateAncestors = /**
     * @param {?} onlySelf
     * @return {?}
     */
    function (onlySelf) {
        if (this._parent && !onlySelf) {
            this._parent.updateValueAndValidity();
            this._parent._updatePristine();
            this._parent._updateTouched();
        }
    };
    /**
     * @param {?} parent
     * @return {?}
     */
    AbstractControl.prototype.setParent = /**
     * @param {?} parent
     * @return {?}
     */
    function (parent) { this._parent = parent; };
    /**
     * Re-calculates the value and validation status of the control.
     *
     * By default, it will also update the value and validity of its ancestors.
     */
    /**
     * Re-calculates the value and validation status of the control.
     *
     * By default, it will also update the value and validity of its ancestors.
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.updateValueAndValidity = /**
     * Re-calculates the value and validation status of the control.
     *
     * By default, it will also update the value and validity of its ancestors.
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        this._setInitialStatus();
        this._updateValue();
        if (this.enabled) {
            this._cancelExistingSubscription();
            (/** @type {?} */ (this)).errors = this._runValidator();
            (/** @type {?} */ (this)).status = this._calculateStatus();
            if (this.status === VALID || this.status === PENDING) {
                this._runAsyncValidator(opts.emitEvent);
            }
        }
        if (opts.emitEvent !== false) {
            (/** @type {?} */ (this.valueChanges)).emit(this.value);
            (/** @type {?} */ (this.statusChanges)).emit(this.status);
        }
        if (this._parent && !opts.onlySelf) {
            this._parent.updateValueAndValidity(opts);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype._updateTreeValidity = /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = { emitEvent: true }; }
        this._forEachChild(function (ctrl) { return ctrl._updateTreeValidity(opts); });
        this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent });
    };
    /**
     * @return {?}
     */
    AbstractControl.prototype._setInitialStatus = /**
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this)).status = this._allControlsDisabled() ? DISABLED : VALID;
    };
    /**
     * @return {?}
     */
    AbstractControl.prototype._runValidator = /**
     * @return {?}
     */
    function () {
        return this.validator ? this.validator(this) : null;
    };
    /**
     * @param {?=} emitEvent
     * @return {?}
     */
    AbstractControl.prototype._runAsyncValidator = /**
     * @param {?=} emitEvent
     * @return {?}
     */
    function (emitEvent) {
        var _this = this;
        if (this.asyncValidator) {
            (/** @type {?} */ (this)).status = PENDING;
            var /** @type {?} */ obs = toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription =
                obs.subscribe(function (errors) { return _this.setErrors(errors, { emitEvent: emitEvent }); });
        }
    };
    /**
     * @return {?}
     */
    AbstractControl.prototype._cancelExistingSubscription = /**
     * @return {?}
     */
    function () {
        if (this._asyncValidationSubscription) {
            this._asyncValidationSubscription.unsubscribe();
        }
    };
    /**
     * Sets errors on a form control.
     *
     * This is used when validations are run manually by the user, rather than automatically.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ### Example
     *
     * ```
     * const login = new FormControl("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.setValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     */
    /**
     * Sets errors on a form control.
     *
     * This is used when validations are run manually by the user, rather than automatically.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ### Example
     *
     * ```
     * const login = new FormControl("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.setValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     * @param {?} errors
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype.setErrors = /**
     * Sets errors on a form control.
     *
     * This is used when validations are run manually by the user, rather than automatically.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ### Example
     *
     * ```
     * const login = new FormControl("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.setValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     * @param {?} errors
     * @param {?=} opts
     * @return {?}
     */
    function (errors, opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).errors = errors;
        this._updateControlsErrors(opts.emitEvent !== false);
    };
    /**
     * Retrieves a child control given the control's name or path.
     *
     * Paths can be passed in as an array or a string delimited by a dot.
     *
     * To get a control nested within a `person` sub-group:
     *
     * * `this.form.get('person.name');`
     *
     * -OR-
     *
     * * `this.form.get(['person', 'name']);`
     */
    /**
     * Retrieves a child control given the control's name or path.
     *
     * Paths can be passed in as an array or a string delimited by a dot.
     *
     * To get a control nested within a `person` sub-group:
     *
     * * `this.form.get('person.name');`
     *
     * -OR-
     *
     * * `this.form.get(['person', 'name']);`
     * @param {?} path
     * @return {?}
     */
    AbstractControl.prototype.get = /**
     * Retrieves a child control given the control's name or path.
     *
     * Paths can be passed in as an array or a string delimited by a dot.
     *
     * To get a control nested within a `person` sub-group:
     *
     * * `this.form.get('person.name');`
     *
     * -OR-
     *
     * * `this.form.get(['person', 'name']);`
     * @param {?} path
     * @return {?}
     */
    function (path) { return _find(this, path, '.'); };
    /**
     * Returns error data if the control with the given path has the error specified. Otherwise
     * returns null or undefined.
     *
     * If no path is given, it checks for the error on the present control.
     */
    /**
     * Returns error data if the control with the given path has the error specified. Otherwise
     * returns null or undefined.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    AbstractControl.prototype.getError = /**
     * Returns error data if the control with the given path has the error specified. Otherwise
     * returns null or undefined.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    function (errorCode, path) {
        var /** @type {?} */ control = path ? this.get(path) : this;
        return control && control.errors ? control.errors[errorCode] : null;
    };
    /**
     * Returns true if the control with the given path has the error specified. Otherwise
     * returns false.
     *
     * If no path is given, it checks for the error on the present control.
     */
    /**
     * Returns true if the control with the given path has the error specified. Otherwise
     * returns false.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    AbstractControl.prototype.hasError = /**
     * Returns true if the control with the given path has the error specified. Otherwise
     * returns false.
     *
     * If no path is given, it checks for the error on the present control.
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    function (errorCode, path) { return !!this.getError(errorCode, path); };
    Object.defineProperty(AbstractControl.prototype, "root", {
        /**
         * Retrieves the top-level ancestor of this control.
         */
        get: /**
         * Retrieves the top-level ancestor of this control.
         * @return {?}
         */
        function () {
            var /** @type {?} */ x = this;
            while (x._parent) {
                x = x._parent;
            }
            return x;
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    /**
     * \@internal
     * @param {?} emitEvent
     * @return {?}
     */
    AbstractControl.prototype._updateControlsErrors = /**
     * \@internal
     * @param {?} emitEvent
     * @return {?}
     */
    function (emitEvent) {
        (/** @type {?} */ (this)).status = this._calculateStatus();
        if (emitEvent) {
            (/** @type {?} */ (this.statusChanges)).emit(this.status);
        }
        if (this._parent) {
            this._parent._updateControlsErrors(emitEvent);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AbstractControl.prototype._initObservables = /**
     * \@internal
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this)).valueChanges = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        (/** @type {?} */ (this)).statusChanges = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    };
    /**
     * @return {?}
     */
    AbstractControl.prototype._calculateStatus = /**
     * @return {?}
     */
    function () {
        if (this._allControlsDisabled())
            return DISABLED;
        if (this.errors)
            return INVALID;
        if (this._anyControlsHaveStatus(PENDING))
            return PENDING;
        if (this._anyControlsHaveStatus(INVALID))
            return INVALID;
        return VALID;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} status
     * @return {?}
     */
    AbstractControl.prototype._anyControlsHaveStatus = /**
     * \@internal
     * @param {?} status
     * @return {?}
     */
    function (status) {
        return this._anyControls(function (control) { return control.status === status; });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AbstractControl.prototype._anyControlsDirty = /**
     * \@internal
     * @return {?}
     */
    function () {
        return this._anyControls(function (control) { return control.dirty; });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AbstractControl.prototype._anyControlsTouched = /**
     * \@internal
     * @return {?}
     */
    function () {
        return this._anyControls(function (control) { return control.touched; });
    };
    /** @internal */
    /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype._updatePristine = /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).pristine = !this._anyControlsDirty();
        if (this._parent && !opts.onlySelf) {
            this._parent._updatePristine(opts);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype._updateTouched = /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (opts === void 0) { opts = {}; }
        (/** @type {?} */ (this)).touched = this._anyControlsTouched();
        if (this._parent && !opts.onlySelf) {
            this._parent._updateTouched(opts);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} formState
     * @return {?}
     */
    AbstractControl.prototype._isBoxedValue = /**
     * \@internal
     * @param {?} formState
     * @return {?}
     */
    function (formState) {
        return typeof formState === 'object' && formState !== null &&
            Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} fn
     * @return {?}
     */
    AbstractControl.prototype._registerOnCollectionChange = /**
     * \@internal
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onCollectionChange = fn; };
    /** @internal */
    /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    AbstractControl.prototype._setUpdateStrategy = /**
     * \@internal
     * @param {?=} opts
     * @return {?}
     */
    function (opts) {
        if (isOptionsObj(opts) && (/** @type {?} */ (opts)).updateOn != null) {
            this._updateOn = /** @type {?} */ (((/** @type {?} */ (opts)).updateOn));
        }
    };
    return AbstractControl;
}());
/**
 * \@whatItDoes Tracks the value and validation status of an individual form control.
 *
 * It is one of the three fundamental building blocks of Angular forms, along with
 * {\@link FormGroup} and {\@link FormArray}.
 *
 * \@howToUse
 *
 * When instantiating a {\@link FormControl}, you can pass in an initial value as the
 * first argument. Example:
 *
 * ```ts
 * const ctrl = new FormControl('some value');
 * console.log(ctrl.value);     // 'some value'
 * ```
 *
 * You can also initialize the control with a form state object on instantiation,
 * which includes both the value and whether or not the control is disabled.
 * You can't use the value key without the disabled key; both are required
 * to use this way of initialization.
 *
 * ```ts
 * const ctrl = new FormControl({value: 'n/a', disabled: true});
 * console.log(ctrl.value);     // 'n/a'
 * console.log(ctrl.status);   // 'DISABLED'
 * ```
 *
 * The second {\@link FormControl} argument can accept one of three things:
 * * a sync validator function
 * * an array of sync validator functions
 * * an options object containing validator and/or async validator functions
 *
 * Example of a single sync validator function:
 *
 * ```ts
 * const ctrl = new FormControl('', Validators.required);
 * console.log(ctrl.value);     // ''
 * console.log(ctrl.status);   // 'INVALID'
 * ```
 *
 * Example using options object:
 *
 * ```ts
 * const ctrl = new FormControl('', {
 *    validators: Validators.required,
 *    asyncValidators: myAsyncValidator
 * });
 * ```
 *
 * The options object can also be used to define when the control should update.
 * By default, the value and validity of a control updates whenever the value
 * changes. You can configure it to update on the blur event instead by setting
 * the `updateOn` option to `'blur'`.
 *
 * ```ts
 * const c = new FormControl('', { updateOn: 'blur' });
 * ```
 *
 * You can also set `updateOn` to `'submit'`, which will delay value and validity
 * updates until the parent form of the control fires a submit event.
 *
 * See its superclass, {\@link AbstractControl}, for more properties and methods.
 *
 * * **npm package**: `\@angular/forms`
 *
 * \@stable
 */
var FormControl = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormControl, _super);
    function FormControl(formState, validatorOrOpts, asyncValidator) {
        if (formState === void 0) { formState = null; }
        var _this = _super.call(this, coerceToValidator(validatorOrOpts), coerceToAsyncValidator(asyncValidator, validatorOrOpts)) || this;
        /**
         * \@internal
         */
        _this._onChange = [];
        _this._applyFormState(formState);
        _this._setUpdateStrategy(validatorOrOpts);
        _this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        _this._initObservables();
        return _this;
    }
    /**
     * Set the value of the form control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
     * and not its parent component. This defaults to false.
     *
     * If `emitEvent` is `true`, this
     * change will cause a `valueChanges` event on the `FormControl` to be emitted. This defaults
     * to true (as it falls through to `updateValueAndValidity`).
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     *
     * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
     * model.  This is the default behavior if `emitViewToModelChange` is not specified.
     */
    /**
     * Set the value of the form control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
     * and not its parent component. This defaults to false.
     *
     * If `emitEvent` is `true`, this
     * change will cause a `valueChanges` event on the `FormControl` to be emitted. This defaults
     * to true (as it falls through to `updateValueAndValidity`).
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     *
     * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
     * model.  This is the default behavior if `emitViewToModelChange` is not specified.
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FormControl.prototype.setValue = /**
     * Set the value of the form control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
     * and not its parent component. This defaults to false.
     *
     * If `emitEvent` is `true`, this
     * change will cause a `valueChanges` event on the `FormControl` to be emitted. This defaults
     * to true (as it falls through to `updateValueAndValidity`).
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     *
     * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
     * model.  This is the default behavior if `emitViewToModelChange` is not specified.
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        (/** @type {?} */ (this)).value = this._pendingValue = value;
        if (this._onChange.length && options.emitModelToViewChange !== false) {
            this._onChange.forEach(function (changeFn) { return changeFn(_this.value, options.emitViewToModelChange !== false); });
        }
        this.updateValueAndValidity(options);
    };
    /**
     * Patches the value of a control.
     *
     * This function is functionally the same as {@link FormControl#setValue setValue} at this level.
     * It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
     * `FormArrays`, where it does behave differently.
     */
    /**
     * Patches the value of a control.
     *
     * This function is functionally the same as {\@link FormControl#setValue setValue} at this level.
     * It exists for symmetry with {\@link FormGroup#patchValue patchValue} on `FormGroups` and
     * `FormArrays`, where it does behave differently.
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FormControl.prototype.patchValue = /**
     * Patches the value of a control.
     *
     * This function is functionally the same as {\@link FormControl#setValue setValue} at this level.
     * It exists for symmetry with {\@link FormGroup#patchValue patchValue} on `FormGroups` and
     * `FormArrays`, where it does behave differently.
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        if (options === void 0) { options = {}; }
        this.setValue(value, options);
    };
    /**
     * Resets the form control. This means by default:
     *
     * * it is marked as `pristine`
     * * it is marked as `untouched`
     * * value is set to null
     *
     * You can also reset to a specific form state by passing through a standalone
     * value or a form state object that contains both a value and a disabled state
     * (these are the only two properties that cannot be calculated).
     *
     * Ex:
     *
     * ```ts
     * this.control.reset('Nancy');
     *
     * console.log(this.control.value);  // 'Nancy'
     * ```
     *
     * OR
     *
     * ```
     * this.control.reset({value: 'Nancy', disabled: true});
     *
     * console.log(this.control.value);  // 'Nancy'
     * console.log(this.control.status);  // 'DISABLED'
     * ```
     */
    /**
     * Resets the form control. This means by default:
     *
     * * it is marked as `pristine`
     * * it is marked as `untouched`
     * * value is set to null
     *
     * You can also reset to a specific form state by passing through a standalone
     * value or a form state object that contains both a value and a disabled state
     * (these are the only two properties that cannot be calculated).
     *
     * Ex:
     *
     * ```ts
     * this.control.reset('Nancy');
     *
     * console.log(this.control.value);  // 'Nancy'
     * ```
     *
     * OR
     *
     * ```
     * this.control.reset({value: 'Nancy', disabled: true});
     *
     * console.log(this.control.value);  // 'Nancy'
     * console.log(this.control.status);  // 'DISABLED'
     * ```
     * @param {?=} formState
     * @param {?=} options
     * @return {?}
     */
    FormControl.prototype.reset = /**
     * Resets the form control. This means by default:
     *
     * * it is marked as `pristine`
     * * it is marked as `untouched`
     * * value is set to null
     *
     * You can also reset to a specific form state by passing through a standalone
     * value or a form state object that contains both a value and a disabled state
     * (these are the only two properties that cannot be calculated).
     *
     * Ex:
     *
     * ```ts
     * this.control.reset('Nancy');
     *
     * console.log(this.control.value);  // 'Nancy'
     * ```
     *
     * OR
     *
     * ```
     * this.control.reset({value: 'Nancy', disabled: true});
     *
     * console.log(this.control.value);  // 'Nancy'
     * console.log(this.control.status);  // 'DISABLED'
     * ```
     * @param {?=} formState
     * @param {?=} options
     * @return {?}
     */
    function (formState, options) {
        if (formState === void 0) { formState = null; }
        if (options === void 0) { options = {}; }
        this._applyFormState(formState);
        this.markAsPristine(options);
        this.markAsUntouched(options);
        this.setValue(this.value, options);
        this._pendingChange = false;
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    FormControl.prototype._updateValue = /**
     * \@internal
     * @return {?}
     */
    function () { };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} condition
     * @return {?}
     */
    FormControl.prototype._anyControls = /**
     * \@internal
     * @param {?} condition
     * @return {?}
     */
    function (condition) { return false; };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    FormControl.prototype._allControlsDisabled = /**
     * \@internal
     * @return {?}
     */
    function () { return this.disabled; };
    /**
     * Register a listener for change events.
     */
    /**
     * Register a listener for change events.
     * @param {?} fn
     * @return {?}
     */
    FormControl.prototype.registerOnChange = /**
     * Register a listener for change events.
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange.push(fn); };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    FormControl.prototype._clearChangeFns = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._onChange = [];
        this._onDisabledChange = [];
        this._onCollectionChange = function () { };
    };
    /**
     * Register a listener for disabled events.
     */
    /**
     * Register a listener for disabled events.
     * @param {?} fn
     * @return {?}
     */
    FormControl.prototype.registerOnDisabledChange = /**
     * Register a listener for disabled events.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onDisabledChange.push(fn);
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} cb
     * @return {?}
     */
    FormControl.prototype._forEachChild = /**
     * \@internal
     * @param {?} cb
     * @return {?}
     */
    function (cb) { };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormControl.prototype._syncPendingControls = /**
     * \@internal
     * @return {?}
     */
    function () {
        if (this.updateOn === 'submit') {
            if (this._pendingDirty)
                this.markAsDirty();
            if (this._pendingTouched)
                this.markAsTouched();
            if (this._pendingChange) {
                this.setValue(this._pendingValue, { onlySelf: true, emitModelToViewChange: false });
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} formState
     * @return {?}
     */
    FormControl.prototype._applyFormState = /**
     * @param {?} formState
     * @return {?}
     */
    function (formState) {
        if (this._isBoxedValue(formState)) {
            (/** @type {?} */ (this)).value = this._pendingValue = formState.value;
            formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
                this.enable({ onlySelf: true, emitEvent: false });
        }
        else {
            (/** @type {?} */ (this)).value = this._pendingValue = formState;
        }
    };
    return FormControl;
}(AbstractControl));
/**
 * \@whatItDoes Tracks the value and validity state of a group of {\@link FormControl}
 * instances.
 *
 * A `FormGroup` aggregates the values of each child {\@link FormControl} into one object,
 * with each control name as the key.  It calculates its status by reducing the statuses
 * of its children. For example, if one of the controls in a group is invalid, the entire
 * group becomes invalid.
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {\@link FormControl} and {\@link FormArray}.
 *
 * \@howToUse
 *
 * When instantiating a {\@link FormGroup}, pass in a collection of child controls as the first
 * argument. The key for each child will be the name under which it is registered.
 *
 * ### Example
 *
 * ```
 * const form = new FormGroup({
 *   first: new FormControl('Nancy', Validators.minLength(2)),
 *   last: new FormControl('Drew'),
 * });
 *
 * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
 * console.log(form.status);  // 'VALID'
 * ```
 *
 * You can also include group-level validators as the second arg, or group-level async
 * validators as the third arg. These come in handy when you want to perform validation
 * that considers the value of more than one child control.
 *
 * ### Example
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('', Validators.minLength(2)),
 *   passwordConfirm: new FormControl('', Validators.minLength(2)),
 * }, passwordMatchValidator);
 *
 *
 * function passwordMatchValidator(g: FormGroup) {
 *    return g.get('password').value === g.get('passwordConfirm').value
 *       ? null : {'mismatch': true};
 * }
 * ```
 *
 * Like {\@link FormControl} instances, you can alternatively choose to pass in
 * validators and async validators as part of an options object.
 *
 * ```
 * const form = new FormGroup({
 *   password: new FormControl('')
 *   passwordConfirm: new FormControl('')
 * }, {validators: passwordMatchValidator, asyncValidators: otherValidator});
 * ```
 *
 * The options object can also be used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * group level, all child controls will default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormGroup({
 *    one: new FormControl()
 * }, {updateOn: 'blur'});
 * ```
 *
 * * **npm package**: `\@angular/forms`
 *
 * \@stable
 */
var FormGroup = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormGroup, _super);
    function FormGroup(controls, validatorOrOpts, asyncValidator) {
        var _this = _super.call(this, coerceToValidator(validatorOrOpts), coerceToAsyncValidator(asyncValidator, validatorOrOpts)) || this;
        _this.controls = controls;
        _this._initObservables();
        _this._setUpdateStrategy(validatorOrOpts);
        _this._setUpControls();
        _this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        return _this;
    }
    /**
     * Registers a control with the group's list of controls.
     *
     * This method does not update the value or validity of the control, so for most cases you'll want
     * to use {@link FormGroup#addControl addControl} instead.
     */
    /**
     * Registers a control with the group's list of controls.
     *
     * This method does not update the value or validity of the control, so for most cases you'll want
     * to use {\@link FormGroup#addControl addControl} instead.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    FormGroup.prototype.registerControl = /**
     * Registers a control with the group's list of controls.
     *
     * This method does not update the value or validity of the control, so for most cases you'll want
     * to use {\@link FormGroup#addControl addControl} instead.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    function (name, control) {
        if (this.controls[name])
            return this.controls[name];
        this.controls[name] = control;
        control.setParent(this);
        control._registerOnCollectionChange(this._onCollectionChange);
        return control;
    };
    /**
     * Add a control to this group.
     */
    /**
     * Add a control to this group.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    FormGroup.prototype.addControl = /**
     * Add a control to this group.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    function (name, control) {
        this.registerControl(name, control);
        this.updateValueAndValidity();
        this._onCollectionChange();
    };
    /**
     * Remove a control from this group.
     */
    /**
     * Remove a control from this group.
     * @param {?} name
     * @return {?}
     */
    FormGroup.prototype.removeControl = /**
     * Remove a control from this group.
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (this.controls[name])
            this.controls[name]._registerOnCollectionChange(function () { });
        delete (this.controls[name]);
        this.updateValueAndValidity();
        this._onCollectionChange();
    };
    /**
     * Replace an existing control.
     */
    /**
     * Replace an existing control.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    FormGroup.prototype.setControl = /**
     * Replace an existing control.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    function (name, control) {
        if (this.controls[name])
            this.controls[name]._registerOnCollectionChange(function () { });
        delete (this.controls[name]);
        if (control)
            this.registerControl(name, control);
        this.updateValueAndValidity();
        this._onCollectionChange();
    };
    /**
     * Check whether there is an enabled control with the given name in the group.
     *
     * It will return false for disabled controls. If you'd like to check for existence in the group
     * only, use {@link AbstractControl#get get} instead.
     */
    /**
     * Check whether there is an enabled control with the given name in the group.
     *
     * It will return false for disabled controls. If you'd like to check for existence in the group
     * only, use {\@link AbstractControl#get get} instead.
     * @param {?} controlName
     * @return {?}
     */
    FormGroup.prototype.contains = /**
     * Check whether there is an enabled control with the given name in the group.
     *
     * It will return false for disabled controls. If you'd like to check for existence in the group
     * only, use {\@link AbstractControl#get get} instead.
     * @param {?} controlName
     * @return {?}
     */
    function (controlName) {
        return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
    };
    /**
     *  Sets the value of the {@link FormGroup}. It accepts an object that matches
     *  the structure of the group, with control names as keys.
     *
     * This method performs strict checks, so it will throw an error if you try
     * to set the value of a control that doesn't exist or if you exclude the
     * value of a control.
     *
     *  ### Example
     *
     *  ```
     *  const form = new FormGroup({
     *     first: new FormControl(),
     *     last: new FormControl()
     *  });
     *  console.log(form.value);   // {first: null, last: null}
     *
     *  form.setValue({first: 'Nancy', last: 'Drew'});
     *  console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
     *
     *  ```
     */
    /**
     *  Sets the value of the {\@link FormGroup}. It accepts an object that matches
     *  the structure of the group, with control names as keys.
     *
     * This method performs strict checks, so it will throw an error if you try
     * to set the value of a control that doesn't exist or if you exclude the
     * value of a control.
     *
     *  ### Example
     *
     *  ```
     *  const form = new FormGroup({
     *     first: new FormControl(),
     *     last: new FormControl()
     *  });
     *  console.log(form.value);   // {first: null, last: null}
     *
     *  form.setValue({first: 'Nancy', last: 'Drew'});
     *  console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
     *
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FormGroup.prototype.setValue = /**
     *  Sets the value of the {\@link FormGroup}. It accepts an object that matches
     *  the structure of the group, with control names as keys.
     *
     * This method performs strict checks, so it will throw an error if you try
     * to set the value of a control that doesn't exist or if you exclude the
     * value of a control.
     *
     *  ### Example
     *
     *  ```
     *  const form = new FormGroup({
     *     first: new FormControl(),
     *     last: new FormControl()
     *  });
     *  console.log(form.value);   // {first: null, last: null}
     *
     *  form.setValue({first: 'Nancy', last: 'Drew'});
     *  console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
     *
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this._checkAllValuesPresent(value);
        Object.keys(value).forEach(function (name) {
            _this._throwIfControlMissing(name);
            _this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: options.emitEvent });
        });
        this.updateValueAndValidity(options);
    };
    /**
     *  Patches the value of the {@link FormGroup}. It accepts an object with control
     *  names as keys, and will do its best to match the values to the correct controls
     *  in the group.
     *
     *  It accepts both super-sets and sub-sets of the group without throwing an error.
     *
     *  ### Example
     *
     *  ```
     *  const form = new FormGroup({
     *     first: new FormControl(),
     *     last: new FormControl()
     *  });
     *  console.log(form.value);   // {first: null, last: null}
     *
     *  form.patchValue({first: 'Nancy'});
     *  console.log(form.value);   // {first: 'Nancy', last: null}
     *
     *  ```
     */
    /**
     *  Patches the value of the {\@link FormGroup}. It accepts an object with control
     *  names as keys, and will do its best to match the values to the correct controls
     *  in the group.
     *
     *  It accepts both super-sets and sub-sets of the group without throwing an error.
     *
     *  ### Example
     *
     *  ```
     *  const form = new FormGroup({
     *     first: new FormControl(),
     *     last: new FormControl()
     *  });
     *  console.log(form.value);   // {first: null, last: null}
     *
     *  form.patchValue({first: 'Nancy'});
     *  console.log(form.value);   // {first: 'Nancy', last: null}
     *
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FormGroup.prototype.patchValue = /**
     *  Patches the value of the {\@link FormGroup}. It accepts an object with control
     *  names as keys, and will do its best to match the values to the correct controls
     *  in the group.
     *
     *  It accepts both super-sets and sub-sets of the group without throwing an error.
     *
     *  ### Example
     *
     *  ```
     *  const form = new FormGroup({
     *     first: new FormControl(),
     *     last: new FormControl()
     *  });
     *  console.log(form.value);   // {first: null, last: null}
     *
     *  form.patchValue({first: 'Nancy'});
     *  console.log(form.value);   // {first: 'Nancy', last: null}
     *
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        Object.keys(value).forEach(function (name) {
            if (_this.controls[name]) {
                _this.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: options.emitEvent });
            }
        });
        this.updateValueAndValidity(options);
    };
    /**
     * Resets the {@link FormGroup}. This means by default:
     *
     * * The group and all descendants are marked `pristine`
     * * The group and all descendants are marked `untouched`
     * * The value of all descendants will be null or null maps
     *
     * You can also reset to a specific form state by passing in a map of states
     * that matches the structure of your form, with control names as keys. The state
     * can be a standalone value or a form state object with both a value and a disabled
     * status.
     *
     * ### Example
     *
     * ```ts
     * this.form.reset({first: 'name', last: 'last name'});
     *
     * console.log(this.form.value);  // {first: 'name', last: 'last name'}
     * ```
     *
     * - OR -
     *
     * ```
     * this.form.reset({
     *   first: {value: 'name', disabled: true},
     *   last: 'last'
     * });
     *
     * console.log(this.form.value);  // {first: 'name', last: 'last name'}
     * console.log(this.form.get('first').status);  // 'DISABLED'
     * ```
     */
    /**
     * Resets the {\@link FormGroup}. This means by default:
     *
     * * The group and all descendants are marked `pristine`
     * * The group and all descendants are marked `untouched`
     * * The value of all descendants will be null or null maps
     *
     * You can also reset to a specific form state by passing in a map of states
     * that matches the structure of your form, with control names as keys. The state
     * can be a standalone value or a form state object with both a value and a disabled
     * status.
     *
     * ### Example
     *
     * ```ts
     * this.form.reset({first: 'name', last: 'last name'});
     *
     * console.log(this.form.value);  // {first: 'name', last: 'last name'}
     * ```
     *
     * - OR -
     *
     * ```
     * this.form.reset({
     *   first: {value: 'name', disabled: true},
     *   last: 'last'
     * });
     *
     * console.log(this.form.value);  // {first: 'name', last: 'last name'}
     * console.log(this.form.get('first').status);  // 'DISABLED'
     * ```
     * @param {?=} value
     * @param {?=} options
     * @return {?}
     */
    FormGroup.prototype.reset = /**
     * Resets the {\@link FormGroup}. This means by default:
     *
     * * The group and all descendants are marked `pristine`
     * * The group and all descendants are marked `untouched`
     * * The value of all descendants will be null or null maps
     *
     * You can also reset to a specific form state by passing in a map of states
     * that matches the structure of your form, with control names as keys. The state
     * can be a standalone value or a form state object with both a value and a disabled
     * status.
     *
     * ### Example
     *
     * ```ts
     * this.form.reset({first: 'name', last: 'last name'});
     *
     * console.log(this.form.value);  // {first: 'name', last: 'last name'}
     * ```
     *
     * - OR -
     *
     * ```
     * this.form.reset({
     *   first: {value: 'name', disabled: true},
     *   last: 'last'
     * });
     *
     * console.log(this.form.value);  // {first: 'name', last: 'last name'}
     * console.log(this.form.get('first').status);  // 'DISABLED'
     * ```
     * @param {?=} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        if (value === void 0) { value = {}; }
        if (options === void 0) { options = {}; }
        this._forEachChild(function (control, name) {
            control.reset(value[name], { onlySelf: true, emitEvent: options.emitEvent });
        });
        this.updateValueAndValidity(options);
        this._updatePristine(options);
        this._updateTouched(options);
    };
    /**
     * The aggregate value of the {@link FormGroup}, including any disabled controls.
     *
     * If you'd like to include all values regardless of disabled status, use this method.
     * Otherwise, the `value` property is the best way to get the value of the group.
     */
    /**
     * The aggregate value of the {\@link FormGroup}, including any disabled controls.
     *
     * If you'd like to include all values regardless of disabled status, use this method.
     * Otherwise, the `value` property is the best way to get the value of the group.
     * @return {?}
     */
    FormGroup.prototype.getRawValue = /**
     * The aggregate value of the {\@link FormGroup}, including any disabled controls.
     *
     * If you'd like to include all values regardless of disabled status, use this method.
     * Otherwise, the `value` property is the best way to get the value of the group.
     * @return {?}
     */
    function () {
        return this._reduceChildren({}, function (acc, control, name) {
            acc[name] = control instanceof FormControl ? control.value : (/** @type {?} */ (control)).getRawValue();
            return acc;
        });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroup.prototype._syncPendingControls = /**
     * \@internal
     * @return {?}
     */
    function () {
        var /** @type {?} */ subtreeUpdated = this._reduceChildren(false, function (updated, child) {
            return child._syncPendingControls() ? true : updated;
        });
        if (subtreeUpdated)
            this.updateValueAndValidity({ onlySelf: true });
        return subtreeUpdated;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} name
     * @return {?}
     */
    FormGroup.prototype._throwIfControlMissing = /**
     * \@internal
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!Object.keys(this.controls).length) {
            throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
        }
        if (!this.controls[name]) {
            throw new Error("Cannot find form control with name: " + name + ".");
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} cb
     * @return {?}
     */
    FormGroup.prototype._forEachChild = /**
     * \@internal
     * @param {?} cb
     * @return {?}
     */
    function (cb) {
        var _this = this;
        Object.keys(this.controls).forEach(function (k) { return cb(_this.controls[k], k); });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroup.prototype._setUpControls = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this._forEachChild(function (control) {
            control.setParent(_this);
            control._registerOnCollectionChange(_this._onCollectionChange);
        });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroup.prototype._updateValue = /**
     * \@internal
     * @return {?}
     */
    function () { (/** @type {?} */ (this)).value = this._reduceValue(); };
    /** @internal */
    /**
     * \@internal
     * @param {?} condition
     * @return {?}
     */
    FormGroup.prototype._anyControls = /**
     * \@internal
     * @param {?} condition
     * @return {?}
     */
    function (condition) {
        var _this = this;
        var /** @type {?} */ res = false;
        this._forEachChild(function (control, name) {
            res = res || (_this.contains(name) && condition(control));
        });
        return res;
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroup.prototype._reduceValue = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        return this._reduceChildren({}, function (acc, control, name) {
            if (control.enabled || _this.disabled) {
                acc[name] = control.value;
            }
            return acc;
        });
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} initValue
     * @param {?} fn
     * @return {?}
     */
    FormGroup.prototype._reduceChildren = /**
     * \@internal
     * @param {?} initValue
     * @param {?} fn
     * @return {?}
     */
    function (initValue, fn) {
        var /** @type {?} */ res = initValue;
        this._forEachChild(function (control, name) { res = fn(res, control, name); });
        return res;
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroup.prototype._allControlsDisabled = /**
     * \@internal
     * @return {?}
     */
    function () {
        for (var _i = 0, _a = Object.keys(this.controls); _i < _a.length; _i++) {
            var controlName = _a[_i];
            if (this.controls[controlName].enabled) {
                return false;
            }
        }
        return Object.keys(this.controls).length > 0 || this.disabled;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    FormGroup.prototype._checkAllValuesPresent = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._forEachChild(function (control, name) {
            if (value[name] === undefined) {
                throw new Error("Must supply a value for form control with name: '" + name + "'.");
            }
        });
    };
    return FormGroup;
}(AbstractControl));
/**
 * \@whatItDoes Tracks the value and validity state of an array of {\@link FormControl},
 * {\@link FormGroup} or {\@link FormArray} instances.
 *
 * A `FormArray` aggregates the values of each child {\@link FormControl} into an array.
 * It calculates its status by reducing the statuses of its children. For example, if one of
 * the controls in a `FormArray` is invalid, the entire array becomes invalid.
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {\@link FormControl} and {\@link FormGroup}.
 *
 * \@howToUse
 *
 * When instantiating a {\@link FormArray}, pass in an array of child controls as the first
 * argument.
 *
 * ### Example
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy', Validators.minLength(2)),
 *   new FormControl('Drew'),
 * ]);
 *
 * console.log(arr.value);   // ['Nancy', 'Drew']
 * console.log(arr.status);  // 'VALID'
 * ```
 *
 * You can also include array-level validators and async validators. These come in handy
 * when you want to perform validation that considers the value of more than one child
 * control.
 *
 * The two types of validators can be passed in separately as the second and third arg
 * respectively, or together as part of an options object.
 *
 * ```
 * const arr = new FormArray([
 *   new FormControl('Nancy'),
 *   new FormControl('Drew')
 * ], {validators: myValidator, asyncValidators: myAsyncValidator});
 * ```
 *
 * The options object can also be used to set a default value for each child
 * control's `updateOn` property. If you set `updateOn` to `'blur'` at the
 * array level, all child controls will default to 'blur', unless the child
 * has explicitly specified a different `updateOn` value.
 *
 * ```ts
 * const c = new FormArray([
 *    new FormControl()
 * ], {updateOn: 'blur'});
 * ```
 *
 * ### Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 * * **npm package**: `\@angular/forms`
 *
 * \@stable
 */
var FormArray = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormArray, _super);
    function FormArray(controls, validatorOrOpts, asyncValidator) {
        var _this = _super.call(this, coerceToValidator(validatorOrOpts), coerceToAsyncValidator(asyncValidator, validatorOrOpts)) || this;
        _this.controls = controls;
        _this._initObservables();
        _this._setUpdateStrategy(validatorOrOpts);
        _this._setUpControls();
        _this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        return _this;
    }
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    /**
     * Get the {\@link AbstractControl} at the given `index` in the array.
     * @param {?} index
     * @return {?}
     */
    FormArray.prototype.at = /**
     * Get the {\@link AbstractControl} at the given `index` in the array.
     * @param {?} index
     * @return {?}
     */
    function (index) { return this.controls[index]; };
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    /**
     * Insert a new {\@link AbstractControl} at the end of the array.
     * @param {?} control
     * @return {?}
     */
    FormArray.prototype.push = /**
     * Insert a new {\@link AbstractControl} at the end of the array.
     * @param {?} control
     * @return {?}
     */
    function (control) {
        this.controls.push(control);
        this._registerControl(control);
        this.updateValueAndValidity();
        this._onCollectionChange();
    };
    /** Insert a new {@link AbstractControl} at the given `index` in the array. */
    /**
     * Insert a new {\@link AbstractControl} at the given `index` in the array.
     * @param {?} index
     * @param {?} control
     * @return {?}
     */
    FormArray.prototype.insert = /**
     * Insert a new {\@link AbstractControl} at the given `index` in the array.
     * @param {?} index
     * @param {?} control
     * @return {?}
     */
    function (index, control) {
        this.controls.splice(index, 0, control);
        this._registerControl(control);
        this.updateValueAndValidity();
    };
    /** Remove the control at the given `index` in the array. */
    /**
     * Remove the control at the given `index` in the array.
     * @param {?} index
     * @return {?}
     */
    FormArray.prototype.removeAt = /**
     * Remove the control at the given `index` in the array.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.controls[index])
            this.controls[index]._registerOnCollectionChange(function () { });
        this.controls.splice(index, 1);
        this.updateValueAndValidity();
    };
    /**
     * Replace an existing control.
     */
    /**
     * Replace an existing control.
     * @param {?} index
     * @param {?} control
     * @return {?}
     */
    FormArray.prototype.setControl = /**
     * Replace an existing control.
     * @param {?} index
     * @param {?} control
     * @return {?}
     */
    function (index, control) {
        if (this.controls[index])
            this.controls[index]._registerOnCollectionChange(function () { });
        this.controls.splice(index, 1);
        if (control) {
            this.controls.splice(index, 0, control);
            this._registerControl(control);
        }
        this.updateValueAndValidity();
        this._onCollectionChange();
    };
    Object.defineProperty(FormArray.prototype, "length", {
        /**
         * Length of the control array.
         */
        get: /**
         * Length of the control array.
         * @return {?}
         */
        function () { return this.controls.length; },
        enumerable: true,
        configurable: true
    });
    /**
     *  Sets the value of the {@link FormArray}. It accepts an array that matches
     *  the structure of the control.
     *
     * This method performs strict checks, so it will throw an error if you try
     * to set the value of a control that doesn't exist or if you exclude the
     * value of a control.
     *
     *  ### Example
     *
     *  ```
     *  const arr = new FormArray([
     *     new FormControl(),
     *     new FormControl()
     *  ]);
     *  console.log(arr.value);   // [null, null]
     *
     *  arr.setValue(['Nancy', 'Drew']);
     *  console.log(arr.value);   // ['Nancy', 'Drew']
     *  ```
     */
    /**
     *  Sets the value of the {\@link FormArray}. It accepts an array that matches
     *  the structure of the control.
     *
     * This method performs strict checks, so it will throw an error if you try
     * to set the value of a control that doesn't exist or if you exclude the
     * value of a control.
     *
     *  ### Example
     *
     *  ```
     *  const arr = new FormArray([
     *     new FormControl(),
     *     new FormControl()
     *  ]);
     *  console.log(arr.value);   // [null, null]
     *
     *  arr.setValue(['Nancy', 'Drew']);
     *  console.log(arr.value);   // ['Nancy', 'Drew']
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FormArray.prototype.setValue = /**
     *  Sets the value of the {\@link FormArray}. It accepts an array that matches
     *  the structure of the control.
     *
     * This method performs strict checks, so it will throw an error if you try
     * to set the value of a control that doesn't exist or if you exclude the
     * value of a control.
     *
     *  ### Example
     *
     *  ```
     *  const arr = new FormArray([
     *     new FormControl(),
     *     new FormControl()
     *  ]);
     *  console.log(arr.value);   // [null, null]
     *
     *  arr.setValue(['Nancy', 'Drew']);
     *  console.log(arr.value);   // ['Nancy', 'Drew']
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this._checkAllValuesPresent(value);
        value.forEach(function (newValue, index) {
            _this._throwIfControlMissing(index);
            _this.at(index).setValue(newValue, { onlySelf: true, emitEvent: options.emitEvent });
        });
        this.updateValueAndValidity(options);
    };
    /**
     *  Patches the value of the {@link FormArray}. It accepts an array that matches the
     *  structure of the control, and will do its best to match the values to the correct
     *  controls in the group.
     *
     *  It accepts both super-sets and sub-sets of the array without throwing an error.
     *
     *  ### Example
     *
     *  ```
     *  const arr = new FormArray([
     *     new FormControl(),
     *     new FormControl()
     *  ]);
     *  console.log(arr.value);   // [null, null]
     *
     *  arr.patchValue(['Nancy']);
     *  console.log(arr.value);   // ['Nancy', null]
     *  ```
     */
    /**
     *  Patches the value of the {\@link FormArray}. It accepts an array that matches the
     *  structure of the control, and will do its best to match the values to the correct
     *  controls in the group.
     *
     *  It accepts both super-sets and sub-sets of the array without throwing an error.
     *
     *  ### Example
     *
     *  ```
     *  const arr = new FormArray([
     *     new FormControl(),
     *     new FormControl()
     *  ]);
     *  console.log(arr.value);   // [null, null]
     *
     *  arr.patchValue(['Nancy']);
     *  console.log(arr.value);   // ['Nancy', null]
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    FormArray.prototype.patchValue = /**
     *  Patches the value of the {\@link FormArray}. It accepts an array that matches the
     *  structure of the control, and will do its best to match the values to the correct
     *  controls in the group.
     *
     *  It accepts both super-sets and sub-sets of the array without throwing an error.
     *
     *  ### Example
     *
     *  ```
     *  const arr = new FormArray([
     *     new FormControl(),
     *     new FormControl()
     *  ]);
     *  console.log(arr.value);   // [null, null]
     *
     *  arr.patchValue(['Nancy']);
     *  console.log(arr.value);   // ['Nancy', null]
     *  ```
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        value.forEach(function (newValue, index) {
            if (_this.at(index)) {
                _this.at(index).patchValue(newValue, { onlySelf: true, emitEvent: options.emitEvent });
            }
        });
        this.updateValueAndValidity(options);
    };
    /**
     * Resets the {@link FormArray}. This means by default:
     *
     * * The array and all descendants are marked `pristine`
     * * The array and all descendants are marked `untouched`
     * * The value of all descendants will be null or null maps
     *
     * You can also reset to a specific form state by passing in an array of states
     * that matches the structure of the control. The state can be a standalone value
     * or a form state object with both a value and a disabled status.
     *
     * ### Example
     *
     * ```ts
     * this.arr.reset(['name', 'last name']);
     *
     * console.log(this.arr.value);  // ['name', 'last name']
     * ```
     *
     * - OR -
     *
     * ```
     * this.arr.reset([
     *   {value: 'name', disabled: true},
     *   'last'
     * ]);
     *
     * console.log(this.arr.value);  // ['name', 'last name']
     * console.log(this.arr.get(0).status);  // 'DISABLED'
     * ```
     */
    /**
     * Resets the {\@link FormArray}. This means by default:
     *
     * * The array and all descendants are marked `pristine`
     * * The array and all descendants are marked `untouched`
     * * The value of all descendants will be null or null maps
     *
     * You can also reset to a specific form state by passing in an array of states
     * that matches the structure of the control. The state can be a standalone value
     * or a form state object with both a value and a disabled status.
     *
     * ### Example
     *
     * ```ts
     * this.arr.reset(['name', 'last name']);
     *
     * console.log(this.arr.value);  // ['name', 'last name']
     * ```
     *
     * - OR -
     *
     * ```
     * this.arr.reset([
     *   {value: 'name', disabled: true},
     *   'last'
     * ]);
     *
     * console.log(this.arr.value);  // ['name', 'last name']
     * console.log(this.arr.get(0).status);  // 'DISABLED'
     * ```
     * @param {?=} value
     * @param {?=} options
     * @return {?}
     */
    FormArray.prototype.reset = /**
     * Resets the {\@link FormArray}. This means by default:
     *
     * * The array and all descendants are marked `pristine`
     * * The array and all descendants are marked `untouched`
     * * The value of all descendants will be null or null maps
     *
     * You can also reset to a specific form state by passing in an array of states
     * that matches the structure of the control. The state can be a standalone value
     * or a form state object with both a value and a disabled status.
     *
     * ### Example
     *
     * ```ts
     * this.arr.reset(['name', 'last name']);
     *
     * console.log(this.arr.value);  // ['name', 'last name']
     * ```
     *
     * - OR -
     *
     * ```
     * this.arr.reset([
     *   {value: 'name', disabled: true},
     *   'last'
     * ]);
     *
     * console.log(this.arr.value);  // ['name', 'last name']
     * console.log(this.arr.get(0).status);  // 'DISABLED'
     * ```
     * @param {?=} value
     * @param {?=} options
     * @return {?}
     */
    function (value, options) {
        if (value === void 0) { value = []; }
        if (options === void 0) { options = {}; }
        this._forEachChild(function (control, index) {
            control.reset(value[index], { onlySelf: true, emitEvent: options.emitEvent });
        });
        this.updateValueAndValidity(options);
        this._updatePristine(options);
        this._updateTouched(options);
    };
    /**
     * The aggregate value of the array, including any disabled controls.
     *
     * If you'd like to include all values regardless of disabled status, use this method.
     * Otherwise, the `value` property is the best way to get the value of the array.
     */
    /**
     * The aggregate value of the array, including any disabled controls.
     *
     * If you'd like to include all values regardless of disabled status, use this method.
     * Otherwise, the `value` property is the best way to get the value of the array.
     * @return {?}
     */
    FormArray.prototype.getRawValue = /**
     * The aggregate value of the array, including any disabled controls.
     *
     * If you'd like to include all values regardless of disabled status, use this method.
     * Otherwise, the `value` property is the best way to get the value of the array.
     * @return {?}
     */
    function () {
        return this.controls.map(function (control) {
            return control instanceof FormControl ? control.value : (/** @type {?} */ (control)).getRawValue();
        });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormArray.prototype._syncPendingControls = /**
     * \@internal
     * @return {?}
     */
    function () {
        var /** @type {?} */ subtreeUpdated = this.controls.reduce(function (updated, child) {
            return child._syncPendingControls() ? true : updated;
        }, false);
        if (subtreeUpdated)
            this.updateValueAndValidity({ onlySelf: true });
        return subtreeUpdated;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} index
     * @return {?}
     */
    FormArray.prototype._throwIfControlMissing = /**
     * \@internal
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this.controls.length) {
            throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
        }
        if (!this.at(index)) {
            throw new Error("Cannot find form control at index " + index);
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} cb
     * @return {?}
     */
    FormArray.prototype._forEachChild = /**
     * \@internal
     * @param {?} cb
     * @return {?}
     */
    function (cb) {
        this.controls.forEach(function (control, index) { cb(control, index); });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormArray.prototype._updateValue = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        (/** @type {?} */ (this)).value =
            this.controls.filter(function (control) { return control.enabled || _this.disabled; })
                .map(function (control) { return control.value; });
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} condition
     * @return {?}
     */
    FormArray.prototype._anyControls = /**
     * \@internal
     * @param {?} condition
     * @return {?}
     */
    function (condition) {
        return this.controls.some(function (control) { return control.enabled && condition(control); });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormArray.prototype._setUpControls = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this._forEachChild(function (control) { return _this._registerControl(control); });
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    FormArray.prototype._checkAllValuesPresent = /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._forEachChild(function (control, i) {
            if (value[i] === undefined) {
                throw new Error("Must supply a value for form control at index: " + i + ".");
            }
        });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormArray.prototype._allControlsDisabled = /**
     * \@internal
     * @return {?}
     */
    function () {
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            if (control.enabled)
                return false;
        }
        return this.controls.length > 0 || this.disabled;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    FormArray.prototype._registerControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        control.setParent(this);
        control._registerOnCollectionChange(this._onCollectionChange);
    };
    return FormArray;
}(AbstractControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var formDirectiveProvider = {
    provide: ControlContainer,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return NgForm; })
};
var resolvedPromise = Promise.resolve(null);
/**
 * \@whatItDoes Creates a top-level {\@link FormGroup} instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * \@howToUse
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You can export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * {\@link FormGroup} instance are duplicated on the directive itself, so a reference to it
 * will give you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, you'll want to use {\@link NgModel} with a
 * `name` attribute.  You can also use {\@link NgModelGroup} if you'd like to create
 * sub-groups within the form.
 *
 * You can listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event will be emitted with the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * If you want to import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, you can add `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `FormsModule`
 *
 *  \@stable
 */
var NgForm = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(NgForm, _super);
    function NgForm(validators, asyncValidators) {
        var _this = _super.call(this) || this;
        _this.submitted = false;
        _this._directives = [];
        _this.ngSubmit = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        _this.form =
            new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
        return _this;
    }
    /**
     * @return {?}
     */
    NgForm.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () { this._setUpdateStrategy(); };
    Object.defineProperty(NgForm.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "controls", {
        get: /**
         * @return {?}
         */
        function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} dir
     * @return {?}
     */
    NgForm.prototype.addControl = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var /** @type {?} */ container = _this._findContainer(dir.path);
            (/** @type {?} */ (dir)).control = /** @type {?} */ (container.registerControl(dir.name, dir.control));
            setUpControl(dir.control, dir);
            dir.control.updateValueAndValidity({ emitEvent: false });
            _this._directives.push(dir);
        });
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    NgForm.prototype.getControl = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { return /** @type {?} */ (this.form.get(dir.path)); };
    /**
     * @param {?} dir
     * @return {?}
     */
    NgForm.prototype.removeControl = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var /** @type {?} */ container = _this._findContainer(dir.path);
            if (container) {
                container.removeControl(dir.name);
            }
            removeDir(_this._directives, dir);
        });
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    NgForm.prototype.addFormGroup = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var /** @type {?} */ container = _this._findContainer(dir.path);
            var /** @type {?} */ group = new FormGroup({});
            setUpFormContainer(group, dir);
            container.registerControl(dir.name, group);
            group.updateValueAndValidity({ emitEvent: false });
        });
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    NgForm.prototype.removeFormGroup = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var /** @type {?} */ container = _this._findContainer(dir.path);
            if (container) {
                container.removeControl(dir.name);
            }
        });
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    NgForm.prototype.getFormGroup = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { return /** @type {?} */ (this.form.get(dir.path)); };
    /**
     * @param {?} dir
     * @param {?} value
     * @return {?}
     */
    NgForm.prototype.updateModel = /**
     * @param {?} dir
     * @param {?} value
     * @return {?}
     */
    function (dir, value) {
        var _this = this;
        resolvedPromise.then(function () {
            var /** @type {?} */ ctrl = /** @type {?} */ (_this.form.get(/** @type {?} */ ((dir.path))));
            ctrl.setValue(value);
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgForm.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.control.setValue(value); };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgForm.prototype.onSubmit = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        (/** @type {?} */ (this)).submitted = true;
        syncPendingControls(this.form, this._directives);
        this.ngSubmit.emit($event);
        return false;
    };
    /**
     * @return {?}
     */
    NgForm.prototype.onReset = /**
     * @return {?}
     */
    function () { this.resetForm(); };
    /**
     * @param {?=} value
     * @return {?}
     */
    NgForm.prototype.resetForm = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = undefined; }
        this.form.reset(value);
        (/** @type {?} */ (this)).submitted = false;
    };
    /**
     * @return {?}
     */
    NgForm.prototype._setUpdateStrategy = /**
     * @return {?}
     */
    function () {
        if (this.options && this.options.updateOn != null) {
            this.form._updateOn = this.options.updateOn;
        }
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} path
     * @return {?}
     */
    NgForm.prototype._findContainer = /**
     * \@internal
     * @param {?} path
     * @return {?}
     */
    function (path) {
        path.pop();
        return path.length ? /** @type {?} */ (this.form.get(path)) : this.form;
    };
    NgForm.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
                    providers: [formDirectiveProvider],
                    host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
                    outputs: ['ngSubmit'],
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    NgForm.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
    ]; };
    NgForm.propDecorators = {
        "options": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngFormOptions',] },],
    };
    return NgForm;
}(ControlContainer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var FormErrorExamples = {
    formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
    formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
    formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; index as i\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
    ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
    ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var TemplateDrivenErrors = /** @class */ (function () {
    function TemplateDrivenErrors() {
    }
    /**
     * @return {?}
     */
    TemplateDrivenErrors.modelParentException = /**
     * @return {?}
     */
    function () {
        throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + FormErrorExamples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + FormErrorExamples.ngModelWithFormGroup);
    };
    /**
     * @return {?}
     */
    TemplateDrivenErrors.formGroupNameException = /**
     * @return {?}
     */
    function () {
        throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + FormErrorExamples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + FormErrorExamples.ngModelGroup);
    };
    /**
     * @return {?}
     */
    TemplateDrivenErrors.missingNameException = /**
     * @return {?}
     */
    function () {
        throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
    };
    /**
     * @return {?}
     */
    TemplateDrivenErrors.modelGroupParentException = /**
     * @return {?}
     */
    function () {
        throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + FormErrorExamples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + FormErrorExamples.ngModelGroup);
    };
    return TemplateDrivenErrors;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var modelGroupProvider = {
    provide: ControlContainer,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return NgModelGroup; })
};
/**
 * \@whatItDoes Creates and binds a {\@link FormGroup} instance to a DOM element.
 *
 * \@howToUse
 *
 * This directive can only be used as a child of {\@link NgForm} (or in other words,
 * within `<form>` tags).
 *
 * Use this directive if you'd like to create a sub-group within a form. This can
 * come in handy if you want to validate a sub-group of your form separately from
 * the rest of your form, or if some values in your domain model make more sense to
 * consume together in a nested object.
 *
 * Pass in the name you'd like this sub-group to have and it will become the key
 * for the sub-group in the form's full value. You can also export the directive into
 * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
 *
 * {\@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `FormsModule`
 *
 * \@stable
 */
var NgModelGroup = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(NgModelGroup, _super);
    function NgModelGroup(parent, validators, asyncValidators) {
        var _this = _super.call(this) || this;
        _this._parent = parent;
        _this._validators = validators;
        _this._asyncValidators = asyncValidators;
        return _this;
    }
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    NgModelGroup.prototype._checkParentType = /**
     * \@internal
     * @return {?}
     */
    function () {
        if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
            TemplateDrivenErrors.modelGroupParentException();
        }
    };
    NgModelGroup.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] },
    ];
    /** @nocollapse */
    NgModelGroup.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
    ]; };
    NgModelGroup.propDecorators = {
        "name": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngModelGroup',] },],
    };
    return NgModelGroup;
}(AbstractFormGroupDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var formControlBinding = {
    provide: NgControl,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return NgModel; })
};
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have and old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel` have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */
var resolvedPromise$1 = Promise.resolve(null);
/**
 * \@whatItDoes Creates a {\@link FormControl} instance from a domain model and binds it
 * to a form control element.
 *
 * The {\@link FormControl} instance will track the value, user interaction, and
 * validation status of the control and keep the view synced with the model. If used
 * within a parent form, the directive will also register itself with the form as a child
 * control.
 *
 * \@howToUse
 *
 * This directive can be used by itself or as part of a larger form. All you need is the
 * `ngModel` selector to activate it.
 *
 * It accepts a domain model as an optional {\@link Input}. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
 * class will set the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-box syntax'), the value in the UI will always be synced back to
 * the domain model in your class as well.
 *
 * If you wish to inspect the properties of the associated {\@link FormControl} (like
 * validity state), you can also export the directive into a local template variable using
 * `ngModel` as the key (ex: `#myVar="ngModel"`). You can then access the control using the
 * directive's `control` property, but most properties you'll need (like `valid` and `dirty`)
 * will fall through to the control anyway, so you can access them directly. You can see a
 * full list of properties directly available in {\@link AbstractControlDirective}.
 *
 * The following is an example of a simple standalone control using `ngModel`:
 *
 * {\@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * It's worth noting that in the context of a parent form, you often can skip one-way or
 * two-way binding because the parent form will sync the value for you. You can access
 * its properties by exporting it into a local template variable using `ngForm` (ex:
 * `#f="ngForm"`). Then you can pass it where it needs to go on submit.
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * Take a look at an example of using `ngModel` within a form:
 *
 * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * To see `ngModel` examples with different form control types, see:
 *
 * * Radio buttons: {\@link RadioControlValueAccessor}
 * * Selects: {\@link SelectControlValueAccessor}
 *
 * **npm package**: `\@angular/forms`
 *
 * **NgModule**: `FormsModule`
 *
 *  \@stable
 */
var NgModel = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(NgModel, _super);
    function NgModel(parent, validators, asyncValidators, valueAccessors) {
        var _this = _super.call(this) || this;
        _this.control = new FormControl();
        /**
         * \@internal
         */
        _this._registered = false;
        _this.update = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        _this._parent = parent;
        _this._rawValidators = validators || [];
        _this._rawAsyncValidators = asyncValidators || [];
        _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgModel.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._checkForErrors();
        if (!this._registered)
            this._setUpControl();
        if ('isDisabled' in changes) {
            this._updateDisabled(changes);
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
            this._updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    /**
     * @return {?}
     */
    NgModel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.formDirective && this.formDirective.removeControl(this); };
    Object.defineProperty(NgModel.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parent ? controlPath(this.name, this._parent) : [this.name];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () { return composeValidators(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return composeAsyncValidators(this._rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} newValue
     * @return {?}
     */
    NgModel.prototype.viewToModelUpdate = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    /**
     * @return {?}
     */
    NgModel.prototype._setUpControl = /**
     * @return {?}
     */
    function () {
        this._setUpdateStrategy();
        this._isStandalone() ? this._setUpStandalone() :
            this.formDirective.addControl(this);
        this._registered = true;
    };
    /**
     * @return {?}
     */
    NgModel.prototype._setUpdateStrategy = /**
     * @return {?}
     */
    function () {
        if (this.options && this.options.updateOn != null) {
            this.control._updateOn = this.options.updateOn;
        }
    };
    /**
     * @return {?}
     */
    NgModel.prototype._isStandalone = /**
     * @return {?}
     */
    function () {
        return !this._parent || !!(this.options && this.options.standalone);
    };
    /**
     * @return {?}
     */
    NgModel.prototype._setUpStandalone = /**
     * @return {?}
     */
    function () {
        setUpControl(this.control, this);
        this.control.updateValueAndValidity({ emitEvent: false });
    };
    /**
     * @return {?}
     */
    NgModel.prototype._checkForErrors = /**
     * @return {?}
     */
    function () {
        if (!this._isStandalone()) {
            this._checkParentType();
        }
        this._checkName();
    };
    /**
     * @return {?}
     */
    NgModel.prototype._checkParentType = /**
     * @return {?}
     */
    function () {
        if (!(this._parent instanceof NgModelGroup) &&
            this._parent instanceof AbstractFormGroupDirective) {
            TemplateDrivenErrors.formGroupNameException();
        }
        else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
            TemplateDrivenErrors.modelParentException();
        }
    };
    /**
     * @return {?}
     */
    NgModel.prototype._checkName = /**
     * @return {?}
     */
    function () {
        if (this.options && this.options.name)
            this.name = this.options.name;
        if (!this._isStandalone() && !this.name) {
            TemplateDrivenErrors.missingNameException();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgModel.prototype._updateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        resolvedPromise$1.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgModel.prototype._updateDisabled = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var /** @type {?} */ disabledValue = changes['isDisabled'].currentValue;
        var /** @type {?} */ isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
        resolvedPromise$1.then(function () {
            if (isDisabled && !_this.control.disabled) {
                _this.control.disable();
            }
            else if (!isDisabled && _this.control.disabled) {
                _this.control.enable();
            }
        });
    };
    NgModel.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[ngModel]:not([formControlName]):not([formControl])',
                    providers: [formControlBinding],
                    exportAs: 'ngModel'
                },] },
    ];
    /** @nocollapse */
    NgModel.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALUE_ACCESSOR,] },] },
    ]; };
    NgModel.propDecorators = {
        "name": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        "isDisabled": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['disabled',] },],
        "model": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngModel',] },],
        "options": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngModelOptions',] },],
        "update": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"], args: ['ngModelChange',] },],
    };
    return NgModel;
}(NgControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ReactiveErrors = /** @class */ (function () {
    function ReactiveErrors() {
    }
    /**
     * @return {?}
     */
    ReactiveErrors.controlParentException = /**
     * @return {?}
     */
    function () {
        throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + FormErrorExamples.formControlName);
    };
    /**
     * @return {?}
     */
    ReactiveErrors.ngModelGroupException = /**
     * @return {?}
     */
    function () {
        throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        " + FormErrorExamples.formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + FormErrorExamples.ngModelGroup);
    };
    /**
     * @return {?}
     */
    ReactiveErrors.missingFormException = /**
     * @return {?}
     */
    function () {
        throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + FormErrorExamples.formControlName);
    };
    /**
     * @return {?}
     */
    ReactiveErrors.groupParentException = /**
     * @return {?}
     */
    function () {
        throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + FormErrorExamples.formGroupName);
    };
    /**
     * @return {?}
     */
    ReactiveErrors.arrayParentException = /**
     * @return {?}
     */
    function () {
        throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + FormErrorExamples.formArrayName);
    };
    /**
     * @return {?}
     */
    ReactiveErrors.disabledAttrWarning = /**
     * @return {?}
     */
    function () {
        console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
    };
    return ReactiveErrors;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var formControlBinding$1 = {
    provide: NgControl,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return FormControlDirective; })
};
/**
 * \@whatItDoes Syncs a standalone {\@link FormControl} instance to a form control element.
 *
 * In other words, this directive ensures that any values written to the {\@link FormControl}
 * instance programmatically will be written to the DOM element (model -> view). Conversely,
 * any values written to the DOM element through user input will be reflected in the
 * {\@link FormControl} instance (view -> model).
 *
 * \@howToUse
 *
 * Use this directive if you'd like to create and manage a {\@link FormControl} instance directly.
 * Simply create a {\@link FormControl}, save it to your component class, and pass it into the
 * {\@link FormControlDirective}.
 *
 * This directive is designed to be used as a standalone control.  Unlike {\@link FormControlName},
 * it does not require that your {\@link FormControl} instance be part of any parent
 * {\@link FormGroup}, and it won't be registered to any {\@link FormGroupDirective} that
 * exists above it.
 *
 * **Get the value**: the `value` property is always synced and available on the
 * {\@link FormControl} instance. See a full list of available properties in
 * {\@link AbstractControl}.
 *
 * **Set the value**: You can pass in an initial value when instantiating the {\@link FormControl},
 * or you can set it programmatically later using {\@link AbstractControl#setValue setValue} or
 * {\@link AbstractControl#patchValue patchValue}.
 *
 * **Listen to value**: If you want to listen to changes in the value of the control, you can
 * subscribe to the {\@link AbstractControl#valueChanges valueChanges} event.  You can also listen to
 * {\@link AbstractControl#statusChanges statusChanges} to be notified when the validation status is
 * re-calculated.
 *
 * ### Example
 *
 * {\@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `ReactiveFormsModule`
 *
 *  \@stable
 */
var FormControlDirective = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormControlDirective, _super);
    function FormControlDirective(validators, asyncValidators, valueAccessors) {
        var _this = _super.call(this) || this;
        _this.update = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        _this._rawValidators = validators || [];
        _this._rawAsyncValidators = asyncValidators || [];
        _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
        return _this;
    }
    Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
        set: /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    FormControlDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this._isControlChanged(changes)) {
            setUpControl(this.form, this);
            if (this.control.disabled && /** @type {?} */ ((this.valueAccessor)).setDisabledState) {
                /** @type {?} */ ((/** @type {?} */ ((this.valueAccessor)).setDisabledState))(true);
            }
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
            this.form.setValue(this.model);
            this.viewModel = this.model;
        }
    };
    Object.defineProperty(FormControlDirective.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () { return composeValidators(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return composeAsyncValidators(this._rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} newValue
     * @return {?}
     */
    FormControlDirective.prototype.viewToModelUpdate = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormControlDirective.prototype._isControlChanged = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        return changes.hasOwnProperty('form');
    };
    FormControlDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[formControl]', providers: [formControlBinding$1], exportAs: 'ngForm' },] },
    ];
    /** @nocollapse */
    FormControlDirective.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALUE_ACCESSOR,] },] },
    ]; };
    FormControlDirective.propDecorators = {
        "form": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['formControl',] },],
        "model": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngModel',] },],
        "update": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"], args: ['ngModelChange',] },],
        "isDisabled": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['disabled',] },],
    };
    return FormControlDirective;
}(NgControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var formDirectiveProvider$1 = {
    provide: ControlContainer,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return FormGroupDirective; })
};
/**
 * \@whatItDoes Binds an existing {\@link FormGroup} to a DOM element.
 *
 * \@howToUse
 *
 * This directive accepts an existing {\@link FormGroup} instance. It will then use this
 * {\@link FormGroup} instance to match any child {\@link FormControl}, {\@link FormGroup},
 * and {\@link FormArray} instances to child {\@link FormControlName}, {\@link FormGroupName},
 * and {\@link FormArrayName} directives.
 *
 * **Set value**: You can set the form's initial value when instantiating the
 * {\@link FormGroup}, or you can set it programmatically later using the {\@link FormGroup}'s
 * {\@link AbstractControl#setValue setValue} or {\@link AbstractControl#patchValue patchValue}
 * methods.
 *
 * **Listen to value**: If you want to listen to changes in the value of the form, you can subscribe
 * to the {\@link FormGroup}'s {\@link AbstractControl#valueChanges valueChanges} event.  You can also
 * listen to its {\@link AbstractControl#statusChanges statusChanges} event to be notified when the
 * validation status is re-calculated.
 *
 * Furthermore, you can listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event will be emitted with the original form
 * submission event.
 *
 * ### Example
 *
 * In this example, we create form controls for first name and last name.
 *
 * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * **npm package**: `\@angular/forms`
 *
 * **NgModule**: {\@link ReactiveFormsModule}
 *
 *  \@stable
 */
var FormGroupDirective = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormGroupDirective, _super);
    function FormGroupDirective(_validators, _asyncValidators) {
        var _this = _super.call(this) || this;
        _this._validators = _validators;
        _this._asyncValidators = _asyncValidators;
        _this.submitted = false;
        _this.directives = [];
        _this.form = /** @type {?} */ ((null));
        _this.ngSubmit = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FormGroupDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._checkFormPresent();
        if (changes.hasOwnProperty('form')) {
            this._updateValidators();
            this._updateDomValue();
            this._updateRegistrations();
        }
    };
    Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroupDirective.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroupDirective.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () { return []; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.addControl = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var /** @type {?} */ ctrl = this.form.get(dir.path);
        setUpControl(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
        this.directives.push(dir);
        return ctrl;
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.getControl = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { return /** @type {?} */ (this.form.get(dir.path)); };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.removeControl = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { removeDir(this.directives, dir); };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.addFormGroup = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var /** @type {?} */ ctrl = this.form.get(dir.path);
        setUpFormContainer(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.removeFormGroup = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.getFormGroup = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { return /** @type {?} */ (this.form.get(dir.path)); };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.addFormArray = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        var /** @type {?} */ ctrl = this.form.get(dir.path);
        setUpFormContainer(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.removeFormArray = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { };
    /**
     * @param {?} dir
     * @return {?}
     */
    FormGroupDirective.prototype.getFormArray = /**
     * @param {?} dir
     * @return {?}
     */
    function (dir) { return /** @type {?} */ (this.form.get(dir.path)); };
    /**
     * @param {?} dir
     * @param {?} value
     * @return {?}
     */
    FormGroupDirective.prototype.updateModel = /**
     * @param {?} dir
     * @param {?} value
     * @return {?}
     */
    function (dir, value) {
        var /** @type {?} */ ctrl = /** @type {?} */ (this.form.get(dir.path));
        ctrl.setValue(value);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormGroupDirective.prototype.onSubmit = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        (/** @type {?} */ (this)).submitted = true;
        syncPendingControls(this.form, this.directives);
        this.ngSubmit.emit($event);
        return false;
    };
    /**
     * @return {?}
     */
    FormGroupDirective.prototype.onReset = /**
     * @return {?}
     */
    function () { this.resetForm(); };
    /**
     * @param {?=} value
     * @return {?}
     */
    FormGroupDirective.prototype.resetForm = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = undefined; }
        this.form.reset(value);
        (/** @type {?} */ (this)).submitted = false;
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroupDirective.prototype._updateDomValue = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.directives.forEach(function (dir) {
            var /** @type {?} */ newCtrl = _this.form.get(dir.path);
            if (dir.control !== newCtrl) {
                cleanUpControl(dir.control, dir);
                if (newCtrl)
                    setUpControl(newCtrl, dir);
                (/** @type {?} */ (dir)).control = newCtrl;
            }
        });
        this.form._updateTreeValidity({ emitEvent: false });
    };
    /**
     * @return {?}
     */
    FormGroupDirective.prototype._updateRegistrations = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.form._registerOnCollectionChange(function () { return _this._updateDomValue(); });
        if (this._oldForm)
            this._oldForm._registerOnCollectionChange(function () { });
        this._oldForm = this.form;
    };
    /**
     * @return {?}
     */
    FormGroupDirective.prototype._updateValidators = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ sync = composeValidators(this._validators);
        this.form.validator = Validators.compose([/** @type {?} */ ((this.form.validator)), /** @type {?} */ ((sync))]);
        var /** @type {?} */ async = composeAsyncValidators(this._asyncValidators);
        this.form.asyncValidator = Validators.composeAsync([/** @type {?} */ ((this.form.asyncValidator)), /** @type {?} */ ((async))]);
    };
    /**
     * @return {?}
     */
    FormGroupDirective.prototype._checkFormPresent = /**
     * @return {?}
     */
    function () {
        if (!this.form) {
            ReactiveErrors.missingFormException();
        }
    };
    FormGroupDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[formGroup]',
                    providers: [formDirectiveProvider$1],
                    host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    FormGroupDirective.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
    ]; };
    FormGroupDirective.propDecorators = {
        "form": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['formGroup',] },],
        "ngSubmit": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"] },],
    };
    return FormGroupDirective;
}(ControlContainer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var formGroupNameProvider = {
    provide: ControlContainer,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return FormGroupName; })
};
/**
 * \@whatItDoes Syncs a nested {\@link FormGroup} to a DOM element.
 *
 * \@howToUse
 *
 * This directive can only be used with a parent {\@link FormGroupDirective} (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the nested {\@link FormGroup} you want to link, and
 * will look for a {\@link FormGroup} registered with that name in the parent
 * {\@link FormGroup} instance you passed into {\@link FormGroupDirective}.
 *
 * Nested form groups can come in handy when you want to validate a sub-group of a
 * form separately from the rest or when you'd like to group the values of certain
 * controls into their own nested object.
 *
 * **Access the group**: You can access the associated {\@link FormGroup} using the
 * {\@link AbstractControl#get get} method. Ex: `this.form.get('name')`.
 *
 * You can also access individual controls within the group using dot syntax.
 * Ex: `this.form.get('name.first')`
 *
 * **Get the value**: the `value` property is always synced and available on the
 * {\@link FormGroup}. See a full list of available properties in {\@link AbstractControl}.
 *
 * **Set the value**: You can set an initial value for each child control when instantiating
 * the {\@link FormGroup}, or you can set it programmatically later using
 * {\@link AbstractControl#setValue setValue} or {\@link AbstractControl#patchValue patchValue}.
 *
 * **Listen to value**: If you want to listen to changes in the value of the group, you can
 * subscribe to the {\@link AbstractControl#valueChanges valueChanges} event.  You can also listen to
 * {\@link AbstractControl#statusChanges statusChanges} to be notified when the validation status is
 * re-calculated.
 *
 * ### Example
 *
 * {\@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `ReactiveFormsModule`
 *
 * \@stable
 */
var FormGroupName = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormGroupName, _super);
    function FormGroupName(parent, validators, asyncValidators) {
        var _this = _super.call(this) || this;
        _this._parent = parent;
        _this._validators = validators;
        _this._asyncValidators = asyncValidators;
        return _this;
    }
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    FormGroupName.prototype._checkParentType = /**
     * \@internal
     * @return {?}
     */
    function () {
        if (_hasInvalidParent(this._parent)) {
            ReactiveErrors.groupParentException();
        }
    };
    FormGroupName.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
    ];
    /** @nocollapse */
    FormGroupName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
    ]; };
    FormGroupName.propDecorators = {
        "name": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['formGroupName',] },],
    };
    return FormGroupName;
}(AbstractFormGroupDirective));
var formArrayNameProvider = {
    provide: ControlContainer,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return FormArrayName; })
};
/**
 * \@whatItDoes Syncs a nested {\@link FormArray} to a DOM element.
 *
 * \@howToUse
 *
 * This directive is designed to be used with a parent {\@link FormGroupDirective} (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the nested {\@link FormArray} you want to link, and
 * will look for a {\@link FormArray} registered with that name in the parent
 * {\@link FormGroup} instance you passed into {\@link FormGroupDirective}.
 *
 * Nested form arrays can come in handy when you have a group of form controls but
 * you're not sure how many there will be. Form arrays allow you to create new
 * form controls dynamically.
 *
 * **Access the array**: You can access the associated {\@link FormArray} using the
 * {\@link AbstractControl#get get} method on the parent {\@link FormGroup}.
 * Ex: `this.form.get('cities')`.
 *
 * **Get the value**: the `value` property is always synced and available on the
 * {\@link FormArray}. See a full list of available properties in {\@link AbstractControl}.
 *
 * **Set the value**: You can set an initial value for each child control when instantiating
 * the {\@link FormArray}, or you can set the value programmatically later using the
 * {\@link FormArray}'s {\@link AbstractControl#setValue setValue} or
 * {\@link AbstractControl#patchValue patchValue} methods.
 *
 * **Listen to value**: If you want to listen to changes in the value of the array, you can
 * subscribe to the {\@link FormArray}'s {\@link AbstractControl#valueChanges valueChanges} event.
 * You can also listen to its {\@link AbstractControl#statusChanges statusChanges} event to be
 * notified when the validation status is re-calculated.
 *
 * **Add new controls**: You can add new controls to the {\@link FormArray} dynamically by calling
 * its {\@link FormArray#push push} method.
 * Ex: `this.form.get('cities').push(new FormControl());`
 *
 * ### Example
 *
 * {\@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `ReactiveFormsModule`
 *
 * \@stable
 */
var FormArrayName = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormArrayName, _super);
    function FormArrayName(parent, validators, asyncValidators) {
        var _this = _super.call(this) || this;
        _this._parent = parent;
        _this._validators = validators;
        _this._asyncValidators = asyncValidators;
        return _this;
    }
    /**
     * @return {?}
     */
    FormArrayName.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._checkParentType(); /** @type {?} */
        ((this.formDirective)).addFormArray(this);
    };
    /**
     * @return {?}
     */
    FormArrayName.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formDirective) {
            this.formDirective.removeFormArray(this);
        }
    };
    Object.defineProperty(FormArrayName.prototype, "control", {
        get: /**
         * @return {?}
         */
        function () { return /** @type {?} */ ((this.formDirective)).getFormArray(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parent ? /** @type {?} */ (this._parent.formDirective) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () { return controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () { return composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormArrayName.prototype._checkParentType = /**
     * @return {?}
     */
    function () {
        if (_hasInvalidParent(this._parent)) {
            ReactiveErrors.arrayParentException();
        }
    };
    FormArrayName.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
    ];
    /** @nocollapse */
    FormArrayName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
    ]; };
    FormArrayName.propDecorators = {
        "name": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['formArrayName',] },],
    };
    return FormArrayName;
}(ControlContainer));
/**
 * @param {?} parent
 * @return {?}
 */
function _hasInvalidParent(parent) {
    return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
        !(parent instanceof FormArrayName);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var controlNameBinding = {
    provide: NgControl,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return FormControlName; })
};
/**
 * \@whatItDoes Syncs a {\@link FormControl} in an existing {\@link FormGroup} to a form control
 * element by name.
 *
 * In other words, this directive ensures that any values written to the {\@link FormControl}
 * instance programmatically will be written to the DOM element (model -> view). Conversely,
 * any values written to the DOM element through user input will be reflected in the
 * {\@link FormControl} instance (view -> model).
 *
 * \@howToUse
 *
 * This directive is designed to be used with a parent {\@link FormGroupDirective} (selector:
 * `[formGroup]`).
 *
 * It accepts the string name of the {\@link FormControl} instance you want to
 * link, and will look for a {\@link FormControl} registered with that name in the
 * closest {\@link FormGroup} or {\@link FormArray} above it.
 *
 * **Access the control**: You can access the {\@link FormControl} associated with
 * this directive by using the {\@link AbstractControl#get get} method.
 * Ex: `this.form.get('first');`
 *
 * **Get value**: the `value` property is always synced and available on the {\@link FormControl}.
 * See a full list of available properties in {\@link AbstractControl}.
 *
 *  **Set value**: You can set an initial value for the control when instantiating the
 *  {\@link FormControl}, or you can set it programmatically later using
 *  {\@link AbstractControl#setValue setValue} or {\@link AbstractControl#patchValue patchValue}.
 *
 * **Listen to value**: If you want to listen to changes in the value of the control, you can
 * subscribe to the {\@link AbstractControl#valueChanges valueChanges} event.  You can also listen to
 * {\@link AbstractControl#statusChanges statusChanges} to be notified when the validation status is
 * re-calculated.
 *
 * ### Example
 *
 * In this example, we create form controls for first name and last name.
 *
 * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * * Radio buttons: {\@link RadioControlValueAccessor}
 * * Selects: {\@link SelectControlValueAccessor}
 *
 * **npm package**: `\@angular/forms`
 *
 * **NgModule**: {\@link ReactiveFormsModule}
 *
 *  \@stable
 */
var FormControlName = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(FormControlName, _super);
    function FormControlName(parent, validators, asyncValidators, valueAccessors) {
        var _this = _super.call(this) || this;
        _this._added = false;
        _this.update = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        _this._parent = parent;
        _this._rawValidators = validators || [];
        _this._rawAsyncValidators = asyncValidators || [];
        _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
        return _this;
    }
    Object.defineProperty(FormControlName.prototype, "isDisabled", {
        set: /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    FormControlName.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this._added)
            this._setUpControl();
        if (isPropertyUpdated(changes, this.viewModel)) {
            this.viewModel = this.model;
            this.formDirective.updateModel(this, this.model);
        }
    };
    /**
     * @return {?}
     */
    FormControlName.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formDirective) {
            this.formDirective.removeControl(this);
        }
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    FormControlName.prototype.viewToModelUpdate = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    Object.defineProperty(FormControlName.prototype, "path", {
        get: /**
         * @return {?}
         */
        function () { return controlPath(this.name, /** @type {?} */ ((this._parent))); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "formDirective", {
        get: /**
         * @return {?}
         */
        function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "validator", {
        get: /**
         * @return {?}
         */
        function () { return composeValidators(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "asyncValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return /** @type {?} */ ((composeAsyncValidators(this._rawAsyncValidators)));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormControlName.prototype._checkParentType = /**
     * @return {?}
     */
    function () {
        if (!(this._parent instanceof FormGroupName) &&
            this._parent instanceof AbstractFormGroupDirective) {
            ReactiveErrors.ngModelGroupException();
        }
        else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
            !(this._parent instanceof FormArrayName)) {
            ReactiveErrors.controlParentException();
        }
    };
    /**
     * @return {?}
     */
    FormControlName.prototype._setUpControl = /**
     * @return {?}
     */
    function () {
        this._checkParentType();
        (/** @type {?} */ (this)).control = this.formDirective.addControl(this);
        if (this.control.disabled && /** @type {?} */ ((this.valueAccessor)).setDisabledState) {
            /** @type {?} */ ((/** @type {?} */ ((this.valueAccessor)).setDisabledState))(true);
        }
        this._added = true;
    };
    FormControlName.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
    ];
    /** @nocollapse */
    FormControlName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [NG_VALUE_ACCESSOR,] },] },
    ]; };
    FormControlName.propDecorators = {
        "name": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['formControlName',] },],
        "model": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['ngModel',] },],
        "update": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"], args: ['ngModelChange',] },],
        "isDisabled": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"], args: ['disabled',] },],
    };
    return FormControlName;
}(NgControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An interface that can be implemented by classes that can act as validators.
 *
 * ## Usage
 *
 * ```typescript
 * \@Directive({
 *   selector: '[custom-validator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(c: Control): {[key: string]: any} {
 *     return {"custom": true};
 *   }
 * }
 * ```
 *
 * \@stable
 * @record
 */

/**
 * \@experimental
 * @record
 */

var REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return RequiredValidator; }),
    multi: true
};
var CHECKBOX_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return CheckboxRequiredValidator; }),
    multi: true
};
/**
 * A Directive that adds the `required` validator to any controls marked with the
 * `required` attribute, via the {\@link NG_VALIDATORS} binding.
 *
 * ### Example
 *
 * ```
 * <input name="fullName" ngModel required>
 * ```
 *
 * \@stable
 */
var RequiredValidator = /** @class */ (function () {
    function RequiredValidator() {
    }
    Object.defineProperty(RequiredValidator.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = value != null && value !== false && "" + value !== 'false';
            if (this._onChange)
                this._onChange();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} c
     * @return {?}
     */
    RequiredValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.required ? Validators.required(c) : null;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RequiredValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    RequiredValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: ':not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]',
                    providers: [REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required ? "" : null' }
                },] },
    ];
    /** @nocollapse */
    RequiredValidator.ctorParameters = function () { return []; };
    RequiredValidator.propDecorators = {
        "required": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return RequiredValidator;
}());
/**
 * A Directive that adds the `required` validator to checkbox controls marked with the
 * `required` attribute, via the {\@link NG_VALIDATORS} binding.
 *
 * ### Example
 *
 * ```
 * <input type="checkbox" name="active" ngModel required>
 * ```
 *
 * \@experimental
 */
var CheckboxRequiredValidator = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */])(CheckboxRequiredValidator, _super);
    function CheckboxRequiredValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    CheckboxRequiredValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.required ? Validators.requiredTrue(c) : null;
    };
    CheckboxRequiredValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]',
                    providers: [CHECKBOX_REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required ? "" : null' }
                },] },
    ];
    /** @nocollapse */
    CheckboxRequiredValidator.ctorParameters = function () { return []; };
    return CheckboxRequiredValidator;
}(RequiredValidator));
/**
 * Provider which adds {\@link EmailValidator} to {\@link NG_VALIDATORS}.
 */
var EMAIL_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return EmailValidator; }),
    multi: true
};
/**
 * A Directive that adds the `email` validator to controls marked with the
 * `email` attribute, via the {\@link NG_VALIDATORS} binding.
 *
 * ### Example
 *
 * ```
 * <input type="email" name="email" ngModel email>
 * <input type="email" name="email" ngModel email="true">
 * <input type="email" name="email" ngModel [email]="true">
 * ```
 *
 * \@experimental
 */
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    Object.defineProperty(EmailValidator.prototype, "email", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._enabled = value === '' || value === true || value === 'true';
            if (this._onChange)
                this._onChange();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} c
     * @return {?}
     */
    EmailValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this._enabled ? Validators.email(c) : null;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    EmailValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    EmailValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[email][formControlName],[email][formControl],[email][ngModel]',
                    providers: [EMAIL_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    EmailValidator.ctorParameters = function () { return []; };
    EmailValidator.propDecorators = {
        "email": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return EmailValidator;
}());
/**
 * \@stable
 * @record
 */

/**
 * \@stable
 * @record
 */

/**
 * Provider which adds {\@link MinLengthValidator} to {\@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {\@example common/forms/ts/validators/validators.ts region='min'}
 */
var MIN_LENGTH_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return MinLengthValidator; }),
    multi: true
};
/**
 * A directive which installs the {\@link MinLengthValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `minlength` attribute.
 *
 * \@stable
 */
var MinLengthValidator = /** @class */ (function () {
    function MinLengthValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MinLengthValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('minlength' in changes) {
            this._createValidator();
            if (this._onChange)
                this._onChange();
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MinLengthValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.minlength == null ? null : this._validator(c);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MinLengthValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @return {?}
     */
    MinLengthValidator.prototype._createValidator = /**
     * @return {?}
     */
    function () {
        this._validator = Validators.minLength(parseInt(this.minlength, 10));
    };
    MinLengthValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
                    providers: [MIN_LENGTH_VALIDATOR],
                    host: { '[attr.minlength]': 'minlength ? minlength : null' }
                },] },
    ];
    /** @nocollapse */
    MinLengthValidator.ctorParameters = function () { return []; };
    MinLengthValidator.propDecorators = {
        "minlength": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return MinLengthValidator;
}());
/**
 * Provider which adds {\@link MaxLengthValidator} to {\@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {\@example common/forms/ts/validators/validators.ts region='max'}
 */
var MAX_LENGTH_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return MaxLengthValidator; }),
    multi: true
};
/**
 * A directive which installs the {\@link MaxLengthValidator} for any `formControlName,
 * `formControl`,
 * or control with `ngModel` that also has a `maxlength` attribute.
 *
 * \@stable
 */
var MaxLengthValidator = /** @class */ (function () {
    function MaxLengthValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MaxLengthValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('maxlength' in changes) {
            this._createValidator();
            if (this._onChange)
                this._onChange();
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MaxLengthValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.maxlength != null ? this._validator(c) : null;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaxLengthValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @return {?}
     */
    MaxLengthValidator.prototype._createValidator = /**
     * @return {?}
     */
    function () {
        this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
    };
    MaxLengthValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
                    providers: [MAX_LENGTH_VALIDATOR],
                    host: { '[attr.maxlength]': 'maxlength ? maxlength : null' }
                },] },
    ];
    /** @nocollapse */
    MaxLengthValidator.ctorParameters = function () { return []; };
    MaxLengthValidator.propDecorators = {
        "maxlength": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return MaxLengthValidator;
}());
var PATTERN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"])(function () { return PatternValidator; }),
    multi: true
};
/**
 * A Directive that adds the `pattern` validator to any controls marked with the
 * `pattern` attribute, via the {\@link NG_VALIDATORS} binding. Uses attribute value
 * as the regex to validate Control value against.  Follows pattern attribute
 * semantics; i.e. regex must match entire Control value.
 *
 * ### Example
 *
 * ```
 * <input [name]="fullName" pattern="[a-zA-Z ]*" ngModel>
 * ```
 * \@stable
 */
var PatternValidator = /** @class */ (function () {
    function PatternValidator() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PatternValidator.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('pattern' in changes) {
            this._createValidator();
            if (this._onChange)
                this._onChange();
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    PatternValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) { return this._validator(c); };
    /**
     * @param {?} fn
     * @return {?}
     */
    PatternValidator.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @return {?}
     */
    PatternValidator.prototype._createValidator = /**
     * @return {?}
     */
    function () { this._validator = Validators.pattern(this.pattern); };
    PatternValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
                    providers: [PATTERN_VALIDATOR],
                    host: { '[attr.pattern]': 'pattern ? pattern : null' }
                },] },
    ];
    /** @nocollapse */
    PatternValidator.ctorParameters = function () { return []; };
    PatternValidator.propDecorators = {
        "pattern": [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
    };
    return PatternValidator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Creates an {\@link AbstractControl} from a user-specified configuration.
 *
 * It is essentially syntactic sugar that shortens the `new FormGroup()`,
 * `new FormControl()`, and `new FormArray()` boilerplate that can build up in larger
 * forms.
 *
 * \@howToUse
 *
 * To use, inject `FormBuilder` into your component class. You can then call its methods
 * directly.
 *
 * {\@example forms/ts/formBuilder/form_builder_example.ts region='Component'}
 *
 *  * **npm package**: `\@angular/forms`
 *
 *  * **NgModule**: {\@link ReactiveFormsModule}
 *
 * \@stable
 */
var FormBuilder = /** @class */ (function () {
    function FormBuilder() {
    }
    /**
     * Construct a new {@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `validator` and `asyncValidator`.
     *
     * See the {@link FormGroup} constructor for more details.
     */
    /**
     * Construct a new {\@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `validator` and `asyncValidator`.
     *
     * See the {\@link FormGroup} constructor for more details.
     * @param {?} controlsConfig
     * @param {?=} extra
     * @return {?}
     */
    FormBuilder.prototype.group = /**
     * Construct a new {\@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `validator` and `asyncValidator`.
     *
     * See the {\@link FormGroup} constructor for more details.
     * @param {?} controlsConfig
     * @param {?=} extra
     * @return {?}
     */
    function (controlsConfig, extra) {
        if (extra === void 0) { extra = null; }
        var /** @type {?} */ controls = this._reduceControls(controlsConfig);
        var /** @type {?} */ validator = extra != null ? extra['validator'] : null;
        var /** @type {?} */ asyncValidator = extra != null ? extra['asyncValidator'] : null;
        return new FormGroup(controls, validator, asyncValidator);
    };
    /**
     * Construct a new {@link FormControl} with the given `formState`,`validator`, and
     * `asyncValidator`.
     *
     * `formState` can either be a standalone value for the form control or an object
     * that contains both a value and a disabled status.
     *
     */
    /**
     * Construct a new {\@link FormControl} with the given `formState`,`validator`, and
     * `asyncValidator`.
     *
     * `formState` can either be a standalone value for the form control or an object
     * that contains both a value and a disabled status.
     *
     * @param {?} formState
     * @param {?=} validator
     * @param {?=} asyncValidator
     * @return {?}
     */
    FormBuilder.prototype.control = /**
     * Construct a new {\@link FormControl} with the given `formState`,`validator`, and
     * `asyncValidator`.
     *
     * `formState` can either be a standalone value for the form control or an object
     * that contains both a value and a disabled status.
     *
     * @param {?} formState
     * @param {?=} validator
     * @param {?=} asyncValidator
     * @return {?}
     */
    function (formState, validator, asyncValidator) {
        return new FormControl(formState, validator, asyncValidator);
    };
    /**
     * Construct a {@link FormArray} from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    /**
     * Construct a {\@link FormArray} from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     * @param {?} controlsConfig
     * @param {?=} validator
     * @param {?=} asyncValidator
     * @return {?}
     */
    FormBuilder.prototype.array = /**
     * Construct a {\@link FormArray} from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     * @param {?} controlsConfig
     * @param {?=} validator
     * @param {?=} asyncValidator
     * @return {?}
     */
    function (controlsConfig, validator, asyncValidator) {
        var _this = this;
        var /** @type {?} */ controls = controlsConfig.map(function (c) { return _this._createControl(c); });
        return new FormArray(controls, validator, asyncValidator);
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} controlsConfig
     * @return {?}
     */
    FormBuilder.prototype._reduceControls = /**
     * \@internal
     * @param {?} controlsConfig
     * @return {?}
     */
    function (controlsConfig) {
        var _this = this;
        var /** @type {?} */ controls = {};
        Object.keys(controlsConfig).forEach(function (controlName) {
            controls[controlName] = _this._createControl(controlsConfig[controlName]);
        });
        return controls;
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} controlConfig
     * @return {?}
     */
    FormBuilder.prototype._createControl = /**
     * \@internal
     * @param {?} controlConfig
     * @return {?}
     */
    function (controlConfig) {
        if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
            controlConfig instanceof FormArray) {
            return controlConfig;
        }
        else if (Array.isArray(controlConfig)) {
            var /** @type {?} */ value = controlConfig[0];
            var /** @type {?} */ validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var /** @type {?} */ asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    };
    FormBuilder.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    FormBuilder.ctorParameters = function () { return []; };
    return FormBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@stable
 */
var VERSION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Version"]('5.2.4');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Adds `novalidate` attribute to all forms by default.
 *
 * `novalidate` is used to disable browser's native form validation.
 *
 * If you want to use native validation with Angular forms, just add `ngNativeValidate` attribute:
 *
 * ```
 * <form ngNativeValidate></form>
 * ```
 *
 * \@experimental
 */
var NgNoValidate = /** @class */ (function () {
    function NgNoValidate() {
    }
    NgNoValidate.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{
                    selector: 'form:not([ngNoForm]):not([ngNativeValidate])',
                    host: { 'novalidate': '' },
                },] },
    ];
    /** @nocollapse */
    NgNoValidate.ctorParameters = function () { return []; };
    return NgNoValidate;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SHARED_FORM_DIRECTIVES = [
    NgNoValidate,
    NgSelectOption,
    NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    RangeValueAccessor,
    CheckboxControlValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor,
    RadioControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    MinLengthValidator,
    MaxLengthValidator,
    PatternValidator,
    CheckboxRequiredValidator,
    EmailValidator,
];
var TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
var REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */
var InternalFormsSharedModule = /** @class */ (function () {
    function InternalFormsSharedModule() {
    }
    InternalFormsSharedModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                    declarations: SHARED_FORM_DIRECTIVES,
                    exports: SHARED_FORM_DIRECTIVES,
                },] },
    ];
    /** @nocollapse */
    InternalFormsSharedModule.ctorParameters = function () { return []; };
    return InternalFormsSharedModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The ng module for forms.
 * \@stable
 */
var FormsModule = /** @class */ (function () {
    function FormsModule() {
    }
    FormsModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                    declarations: TEMPLATE_DRIVEN_DIRECTIVES,
                    providers: [RadioControlRegistry],
                    exports: [InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    FormsModule.ctorParameters = function () { return []; };
    return FormsModule;
}());
/**
 * The ng module for reactive forms.
 * \@stable
 */
var ReactiveFormsModule = /** @class */ (function () {
    function ReactiveFormsModule() {
    }
    ReactiveFormsModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{
                    declarations: [REACTIVE_DRIVEN_DIRECTIVES],
                    providers: [FormBuilder, RadioControlRegistry],
                    exports: [InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    ReactiveFormsModule.ctorParameters = function () { return []; };
    return ReactiveFormsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=forms.js.map


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ForkJoinObservable_1 = __webpack_require__(316);
exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
//# sourceMappingURL=forkJoin.js.map

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(7);
var EmptyObservable_1 = __webpack_require__(29);
var isArray_1 = __webpack_require__(42);
var subscribeToResult_1 = __webpack_require__(48);
var OuterSubscriber_1 = __webpack_require__(50);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ForkJoinObservable = (function (_super) {
    __extends(ForkJoinObservable, _super);
    function ForkJoinObservable(sources, resultSelector) {
        _super.call(this);
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /* tslint:enable:max-line-length */
    /**
     * Joins last values emitted by passed Observables.
     *
     * <span class="informal">Wait for Observables to complete and then combine last values they emitted.</span>
     *
     * <img src="./img/forkJoin.png" width="100%">
     *
     * `forkJoin` is an operator that takes any number of Observables which can be passed either as an array
     * or directly as arguments. If no input Observables are provided, resulting stream will complete
     * immediately.
     *
     * `forkJoin` will wait for all passed Observables to complete and then it will emit an array with last
     * values from corresponding Observables. So if you pass `n` Observables to the operator, resulting
     * array will have `n` values, where first value is the last thing emitted by the first Observable,
     * second value is the last thing emitted by the second Observable and so on. That means `forkJoin` will
     * not emit more than once and it will complete after that. If you need to emit combined values not only
     * at the end of lifecycle of passed Observables, but also throughout it, try out {@link combineLatest}
     * or {@link zip} instead.
     *
     * In order for resulting array to have the same length as the number of input Observables, whenever any of
     * that Observables completes without emitting any value, `forkJoin` will complete at that moment as well
     * and it will not emit anything either, even if it already has some last values from other Observables.
     * Conversely, if there is an Observable that never completes, `forkJoin` will never complete as well,
     * unless at any point some other Observable completes without emitting value, which brings us back to
     * the previous case. Overall, in order for `forkJoin` to emit a value, all Observables passed as arguments
     * have to emit something at least once and complete.
     *
     * If any input Observable errors at some point, `forkJoin` will error as well and all other Observables
     * will be immediately unsubscribed.
     *
     * Optionally `forkJoin` accepts project function, that will be called with values which normally
     * would land in emitted array. Whatever is returned by project function, will appear in output
     * Observable instead. This means that default project can be thought of as a function that takes
     * all its arguments and puts them into an array. Note that project function will be called only
     * when output Observable is supposed to emit a result.
     *
     * @example <caption>Use forkJoin with operator emitting immediately</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.of(1, 2, 3, 4),
     *   Rx.Observable.of(5, 6, 7, 8)
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // [4, 8]
     * // "This is how it ends!"
     *
     *
     * @example <caption>Use forkJoin with operator emitting after some time</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.interval(1000).take(3), // emit 0, 1, 2 every second and complete
     *   Rx.Observable.interval(500).take(4) // emit 0, 1, 2, 3 every half a second and complete
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // [2, 3] after 3 seconds
     * // "This is how it ends!" immediately after
     *
     *
     * @example <caption>Use forkJoin with project function</caption>
     * const observable = Rx.Observable.forkJoin(
     *   Rx.Observable.interval(1000).take(3), // emit 0, 1, 2 every second and complete
     *   Rx.Observable.interval(500).take(4), // emit 0, 1, 2, 3 every half a second and complete
     *   (n, m) => n + m
     * );
     * observable.subscribe(
     *   value => console.log(value),
     *   err => {},
     *   () => console.log('This is how it ends!')
     * );
     *
     * // Logs:
     * // 5 after 3 seconds
     * // "This is how it ends!" immediately after
     *
     * @see {@link combineLatest}
     * @see {@link zip}
     *
     * @param {...SubscribableOrPromise} sources Any number of Observables provided either as an array or as an arguments
     * passed directly to the operator.
     * @param {function} [project] Function that takes values emitted by input Observables and returns value
     * that will appear in resulting Observable instead of default array.
     * @return {Observable} Observable emitting either an array of last values emitted by passed Observables
     * or value from project function.
     * @static true
     * @name forkJoin
     * @owner Observable
     */
    ForkJoinObservable.create = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        if (sources === null || arguments.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        var resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = sources.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
            sources = sources[0];
        }
        if (sources.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        return new ForkJoinObservable(sources, resultSelector);
    };
    ForkJoinObservable.prototype._subscribe = function (subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    };
    return ForkJoinObservable;
}(Observable_1.Observable));
exports.ForkJoinObservable = ForkJoinObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ForkJoinSubscriber = (function (_super) {
    __extends(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _super.call(this, destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        var len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
        }
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var destination = this.destination;
        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            var value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=ForkJoinObservable.js.map

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var AutofocusDirective = /** @class */ (function () {
    // I initialize the autofocus directive.
    function AutofocusDirective(elementRef) {
        this.elementRef = elementRef;
        this.timer = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called once after the contents have been fully initialized.
    AutofocusDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            var element = _this.elementRef.nativeElement;
            element.focus();
            element.select();
        }, 50);
    };
    // I get called once when the directive is being unmounted.
    AutofocusDirective.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
    };
    AutofocusDirective = __decorate([
        core_1.Directive({
            selector: "input[autofocus], select[autofocus], textarea[autofocus]"
        }),
        __metadata("design:paramtypes", [core_2.ElementRef])
    ], AutofocusDirective);
    return AutofocusDirective;
}());
exports.AutofocusDirective = AutofocusDirective;


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var AvatarComponent = /** @class */ (function () {
    // I initialize the avatar component.
    function AvatarComponent() {
        this.initials = "";
        this.src = "";
    }
    AvatarComponent = __decorate([
        core_1.Component({
            selector: "app-avatar",
            inputs: ["initials", "src"],
            host: {
                "[style.background-color]": "( src ? 'transparent' : null )"
            },
            template: __webpack_require__(319),
            styles: [__webpack_require__(320)]
        }),
        __metadata("design:paramtypes", [])
    ], AvatarComponent);
    return AvatarComponent;
}());
exports.AvatarComponent = AvatarComponent;


/***/ }),
/* 319 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"layout\" [ngSwitch]=\"!! src\">\n\t<img *ngSwitchCase=\"true\" [src]=\"src\" />\n\t<span *ngSwitchCase=\"false\">{{ initials }}</span>\n</div>\n"

/***/ }),
/* 320 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #959BA1 ;\n  border-radius: 100% 100% 100% 100% ;\n  color: #FFFFFF ;\n  display: inline-block;\n  font-size: 10px ;\n  font-weight: 600 ;\n  height: 36px ;\n  position: relative ;\n  text-transform: uppercase ;\n  width: 36px ;\n}\n.layout {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\nimg {\n  border-radius: 100% 100% 100% 100% ;\n  flex: 1 1 auto ;\n  width: 100% ;\n}\nspan {\n  margin: auto ;\n}\n"

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var LoadingIndicatorComponent = /** @class */ (function () {
    // I initialize the loading-indicator component.
    function LoadingIndicatorComponent() {
        this.theme = "light";
    }
    LoadingIndicatorComponent = __decorate([
        core_1.Component({
            selector: "app-loading-indicator",
            inputs: ["theme"],
            template: __webpack_require__(322),
            styles: [__webpack_require__(323)]
        }),
        __metadata("design:paramtypes", [])
    ], LoadingIndicatorComponent);
    return LoadingIndicatorComponent;
}());
exports.LoadingIndicatorComponent = LoadingIndicatorComponent;


/***/ }),
/* 322 */
/***/ (function(module, exports) {

module.exports = "\n<svg \n\txmlns=\"http://www.w3.org/2000/svg\"\n\txmlns:xlink=\"http://www.w3.org/1999/xlink\"\n\txml:space=\"preserve\"\n\tviewBox=\"0 0 51 51\" \n\tx=\"0px\"\n\ty=\"0px\"\n\twidth=\"51px\"\n\theight=\"51px\"\n\tclass=\"indicator\"\n\t[class.__indicator--light]=\"( theme === 'light' )\"\n\t[class.__indicator--dark]=\"( theme === 'dark' )\">\n\n\t<path\n\t\tid=\"Ellipse\" \n\t\td=\"M 3 25.5 C 3 13.0734 13.0734 3 25.5 3 C 37.9266 3 48 13.0734 48 25.5 C 48 37.9266 37.9266 48 25.5 48 C 13.0734 48 3 37.9266 3 25.5 Z\"\n\t\tstroke=\"currentColor\"\n\t\tstroke-width=\"5\"\n\t\tstroke-linecap=\"round\"\n\t\tfill=\"none\"\n\t\tclass=\"path\" \n\t/>\n\n</svg>\n"

/***/ }),
/* 323 */
/***/ (function(module, exports) {

module.exports = ":host {\n  color: #FF0099 ;\n  display: block ;\n  min-height: 300px ;\n  position: relative ;\n}\n.indicator {\n  height: 51px ;\n  left: 50% ;\n  margin: -25px 0px 0px -25px;\n  position: absolute ;\n  top: 50% ;\n  width: 51px ;\n}\n.indicator--dark {\n  color: #FFFFFF ;\n}\n.path {\n  animation: line-dash 1500ms infinite, line-rotation 1500ms linear infinite;\n  stroke-dasharray: 142px, 142px ;\n  transform-origin: 50% 50% ;\n}\n@keyframes line-dash {\n  from {\n    stroke-dashoffset: 0px ;\n  }\n  50% {\n    stroke-dashoffset: 142px ;\n  }\n  to {\n    stroke-dashoffset: 284px ;\n  }\n}\n@keyframes line-rotation {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n"

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// I toggle between "display:block" and "display:none" based on the truthy input value.
var ShowBlockDirective = /** @class */ (function () {
    function ShowBlockDirective() {
    }
    ShowBlockDirective = __decorate([
        core_1.Directive({
            selector: "[appShowBlock]",
            inputs: ["appShowBlock"],
            host: {
                "[style.display]": "( appShowBlock ? 'block' : 'none' )"
            }
        })
    ], ShowBlockDirective);
    return ShowBlockDirective;
}());
exports.ShowBlockDirective = ShowBlockDirective;


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
var core_3 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var Direction;
(function (Direction) {
    Direction["UP"] = "up";
    Direction["DOWN"] = "down";
    Direction["NONE"] = "none";
})(Direction || (Direction = {}));
var TrapScrollDirective = /** @class */ (function () {
    // I initialize the trap-scroll directive.
    function TrapScrollDirective(elementRef, zone) {
        var _this = this;
        // I handle both Wheel and Keyboard events, and prevent the default behaviors if the
        // events would cause scrolling at a higher point in the DOM tree.
        // --
        // CAUTION: Using fat-arrow binding for class method.
        this.handleEvent = function (event) {
            if (!_this.isTrappingEvent(event)) {
                return;
            }
            // Regardless of whether or not we're going to allow this event to be applied
            // locally, we want to stop the event from propagating above this container. This
            // way, we make sure that an ancestor instance of [trapScroll], higher up in the
            // Document Object Model (DOM) tree, doesn't accidentally interfere with the
            // default behavior being applied locally.
            // --
            // CAUTION: This will prevent the ability to perform some kinds of event
            // delegation. However, in Angular, event delegation is not used very often.
            event.stopPropagation();
            // If the given event won't produce a local scroll in the current element or one
            // of its local descendants, then let's prevent the default behavior so that the
            // event doesn't creating scrolling at a higher level in the DOM.
            if (_this.eventShouldBePrevented(event)) {
                event.preventDefault();
            }
        };
        this.element = elementRef.nativeElement;
        this.zone = zone;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called every time the input bindings are updated.
    TrapScrollDirective.prototype.ngOnChanges = function (changes) {
        // Normalize the inputs. Since the inputs can be passed-in as either string-based
        // attributes or as property values, we need to funnel both types of input into a
        // set of Booleans so that the rest of our logic can be properly typed.
        this.trapScroll = this.normalizeInputAsBoolean(this.trapScroll);
        this.trapKeyScroll = this.normalizeInputAsBoolean(this.trapKeyScroll);
        if ("trapKeyScroll" in changes) {
            // If the trapping of keyboard-based scrolling is turned on, we want to give
            // the element a tabIndex so that it can be focused. This will allow us to
            // bind keyboard events directly to the element (as opposed to having to bind
            // them to the global object). This will also give the element a :focus
            // outline, which is good for accessibility (but can be overridden in the
            // parent component styles).
            if (this.trapKeyScroll) {
                this.element.tabIndex = -1; // Focus without tab-based navigation.
            }
            else {
                this.element.removeAttribute("tabIndex");
            }
        }
    };
    // I get called once when the directive is being unmounted.
    TrapScrollDirective.prototype.ngOnDestroy = function () {
        this.element.removeEventListener("wheel", this.handleEvent, false);
        this.element.removeEventListener("keydown", this.handleEvent, false);
    };
    // I get called once after the inputs have been bound for the first time.
    TrapScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Normally, we would add event handlers like this in the host bindings. However,
        // if we use the Angular event bindings, they will be run inside of the Angular
        // Zone.js instance. Which means that Angular will trigger a change-detection
        // digest FOR EVERY WHEEL EVENT (even if we try to detach this directive's change
        // detection reference). As such, we need to fall back to the DOM-native event
        // binding AND run them OUTSIDE OF THE ANGULAR ZONE. This way, Angular won't try
        // to trigger any change detection when our event-handlers are called.
        this.zone.runOutsideAngular(function () {
            // NOTE: All modern browsers support "wheel". As such, we'll apply this
            // as a progressive enhancement and not worry about older browsers.
            _this.element.addEventListener("wheel", _this.handleEvent, false);
            _this.element.addEventListener("keydown", _this.handleEvent, false);
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I determine if the given event should be prevented. We'll want to do this if the
    // event won't cause local scrolling and may bubble up to cause a scrolling action in
    // a parent element.
    TrapScrollDirective.prototype.eventShouldBePrevented = function (event) {
        var target = event.target;
        var direction = this.getDirectionFromEvent(event);
        // Check for embedded scrolling opportunities.
        while (target !== this.element) {
            // If the event will cause scrolling in an embedded element, then we DO NOT
            // want to prevent the default behavior of the event.
            if (this.isScrollableElement(target) && !this.isScrolledInMaxDirection(target, direction)) {
                return (false);
            }
            target = target.parentNode;
        }
        // If we've made it this far, there weren't any embedded scrollable elements to
        // inspect. As such, we can now examine the container. If the event will cause
        // scrolling in container element, then we DO NOT want to prevent the default
        // behavior of the event.
        return (this.isScrolledInMaxDirection(target, direction));
    };
    // I get the direction from the given event.
    TrapScrollDirective.prototype.getDirectionFromEvent = function (event) {
        if (event instanceof WheelEvent) {
            return (this.getDirectionFromWheelEvent(event));
        }
        else {
            return (this.getDirectionFromKeyboardEvent(event));
        }
    };
    // I return the normalized scroll direction of the given keyboard event.
    TrapScrollDirective.prototype.getDirectionFromKeyboardEvent = function (event) {
        switch (event.key) {
            case " ":
                return (event.shiftKey ? Direction.UP : Direction.DOWN);
                // @ts-ignore: TS7027: Unreachable code detected.
                break;
            case "ArrowUp":
            case "Home":
            case "PageUp":
                return (Direction.UP);
                // @ts-ignore: TS7027: Unreachable code detected.
                break;
            case "ArrowDown":
            case "End":
            case "PageDown":
                return (Direction.DOWN);
                // @ts-ignore: TS7027: Unreachable code detected.
                break;
            default:
                return (Direction.NONE);
                // @ts-ignore: TS7027: Unreachable code detected.
                break;
        }
    };
    // I return the normalized scroll direction of the given wheel event.
    TrapScrollDirective.prototype.getDirectionFromWheelEvent = function (event) {
        var delta = (event.deltaY || event.detail);
        return ((delta <= 0) ? Direction.UP : Direction.DOWN);
    };
    // I determine if the given element is a Form element that is relevant to key-based
    // scrolling events.
    TrapScrollDirective.prototype.isFormElement = function (element) {
        return ((element.tagName === "TEXTAREA") ||
            (element.tagName === "INPUT") ||
            (element.tagName === "SELECT"));
    };
    // I determine if the given element is scrollable.
    TrapScrollDirective.prototype.isScrollableElement = function (element) {
        // If the element has an overflow that hides the content, then the scrollHeight
        // is still reported as larger than the clientHeight even though no scrolling on
        // the element can be performed.
        if (getComputedStyle(element).overflowY === "hidden") {
            return (false);
        }
        // If the scrollHeight is the same as the clientHeight, it should mean that
        // there is no content that is outside the visible bounds of the given element.
        // Meaning, the element is only scrollable if these values don't match.
        return (element.scrollHeight !== element.clientHeight);
    };
    // I determine if the element is currently scrolled to the maximum value in the
    // given direction.
    TrapScrollDirective.prototype.isScrolledInMaxDirection = function (element, direction) {
        return (((direction === Direction.UP) && this.isScrolledToTheTop(element)) ||
            ((direction === Direction.DOWN) && this.isScrolledToTheBottom(element)));
    };
    // I determine if the current element is scrolled all the way to the bottom.
    TrapScrollDirective.prototype.isScrolledToTheBottom = function (element) {
        return ((element.clientHeight + element.scrollTop) >= element.scrollHeight);
    };
    // I determine if the current element is scrolled all the way to the top.
    TrapScrollDirective.prototype.isScrolledToTheTop = function (element) {
        return (!element.scrollTop);
    };
    // I determine if the given event is being trapped by the current element.
    TrapScrollDirective.prototype.isTrappingEvent = function (event) {
        if (!this.trapScroll) {
            return (false);
        }
        if (event instanceof KeyboardEvent) {
            if (!this.trapKeyScroll) {
                return (false);
            }
            var target = event.target;
            // Dealing with embedded form elements is rather tricky. Some of the keys
            // work as you might expect while other keys, like PageUp and Home, exhibit
            // some funky behavior, acting on the page, not on the target element. As
            // such, we'll just allow all keyboard events in a form element to work as
            // the browser originally intended. And, for the most part, they already
            // trap key events.
            if ((event instanceof KeyboardEvent) && this.isFormElement(target)) {
                return (false);
            }
            // If this is a keyboard event, but the key isn't one that denotes a
            // direction, then we won't trap it. This way, we only trap what we need
            // to and we let everything else bubble up through the DOM.
            if (this.getDirectionFromKeyboardEvent(event) === Direction.NONE) {
                return (false);
            }
        }
        return (true);
    };
    // I return a Boolean coercion for the given Input value.
    TrapScrollDirective.prototype.normalizeInputAsBoolean = function (value) {
        return (
        // If the associated input attribute was included without any value, it will
        // be passed-in as a string. As such, we want to consume the empty string as
        // an implicit truthy.
        (value === "") ||
            // If the associated input attribute is being used to set a property, then we
            // want to consume it as a Truthy value.
            !!value);
    };
    TrapScrollDirective = __decorate([
        core_1.Directive({
            selector: "[trapScroll]",
            inputs: ["trapScroll", "trapKeyScroll"]
        }),
        __metadata("design:paramtypes", [core_2.ElementRef, core_3.NgZone])
    ], TrapScrollDirective);
    return TrapScrollDirective;
}());
exports.TrapScrollDirective = TrapScrollDirective;


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var build_view_module_1 = __webpack_require__(327);
var comment_view_module_1 = __webpack_require__(333);
var console_view_component_1 = __webpack_require__(19);
var history_view_module_1 = __webpack_require__(337);
var inspect_view_module_1 = __webpack_require__(341);
var partial_service_1 = __webpack_require__(115);
var preview_view_module_1 = __webpack_require__(345);
var screen_browser_component_1 = __webpack_require__(349);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ConsoleViewModule = /** @class */ (function () {
    function ConsoleViewModule() {
    }
    ConsoleViewModule.routes = [
        {
            path: "console/prototypes/:prototypeID/screens/:screenID",
            component: console_view_component_1.ConsoleViewComponent,
            children: build_view_module_1.BuildViewModule.routes.concat(comment_view_module_1.CommentViewModule.routes, history_view_module_1.HistoryViewModule.routes, inspect_view_module_1.InspectViewModule.routes, preview_view_module_1.PreviewViewModule.routes, [
                // Handle the "no route" case.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "preview"
                }
            ])
        }
    ];
    ConsoleViewModule = __decorate([
        core_1.NgModule({
            imports: [
                build_view_module_1.BuildViewModule,
                comment_view_module_1.CommentViewModule,
                history_view_module_1.HistoryViewModule,
                inspect_view_module_1.InspectViewModule,
                preview_view_module_1.PreviewViewModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                console_view_component_1.ConsoleViewComponent,
                screen_browser_component_1.ScreenBrowserComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], ConsoleViewModule);
    return ConsoleViewModule;
}());
exports.ConsoleViewModule = ConsoleViewModule;


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var build_view_component_1 = __webpack_require__(328);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BuildViewModule = /** @class */ (function () {
    function BuildViewModule() {
    }
    BuildViewModule.routes = [
        {
            path: "build",
            component: build_view_component_1.BuildViewComponent
        }
    ];
    BuildViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                build_view_component_1.BuildViewComponent
            ]
        })
    ], BuildViewModule);
    return BuildViewModule;
}());
exports.BuildViewModule = BuildViewModule;


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import these modules for their side-effects.
// Import the application components and services.
var console_view_component_1 = __webpack_require__(19);
var BuildViewComponent = /** @class */ (function () {
    // I initialize the build-view component.
    function BuildViewComponent(consoleViewComponent) {
        this.consoleViewComponent = consoleViewComponent;
        this.screen = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called whenever Angular runs a dirty-check.
    BuildViewComponent.prototype.ngDoCheck = function () {
        // CAUTION: In a more robust app, there may be some sort of Observable that the
        // Console component exposes (or some other accessible Store object) that I could
        // watch for state changes; however, for the time-being, I'm just going to use 
        // the DoCheck interface to watch for changes.
        if (this.screen !== this.consoleViewComponent.screen) {
            this.screen = this.consoleViewComponent.screen;
        }
    };
    BuildViewComponent = __decorate([
        core_1.Component({
            selector: "build-view",
            styles: [__webpack_require__(331)],
            template: __webpack_require__(332)
        }),
        __metadata("design:paramtypes", [console_view_component_1.ConsoleViewComponent])
    ], BuildViewComponent);
    return BuildViewComponent;
}());
exports.BuildViewComponent = BuildViewComponent;


/***/ }),
/* 329 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  flex-direction: column ;\n  left: 0px ;\n  position: fixed ;\n  right: 0px ;\n  top: 0px ;\n}\n.loading {\n  height: 100% ;\n}\n.workspace {\n  flex: 1 0 auto ;\n  position: relative ;\n}\n.toolbar-toggle {\n  background-color: #1F2532 ;\n  border-radius: 0px 3px 0px 0px ;\n  bottom: 0px ;\n  color: #FFFFFF ;\n  cursor: pointer ;\n  font-size: 11px ;\n  font-weight: 700 ;\n  left: 0px ;\n  letter-spacing: 1px ;\n  line-height: 20px ;\n  opacity: 0.5 ;\n  padding: 0px 8px 0px 8px ;\n  position: absolute ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  transition: opacity 200ms ease ;\n}\n.toolbar-toggle:hover {\n  opacity: 1.0 ;\n}\nscreen-browser {\n  bottom: 60px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.toolbar {\n  background-color: #1F2532 ;\n  display: flex ;\n  height: 60px ;\n  flex: 0 0 auto ;\n  justify-content: space-between;\n}\n.toolbar__context {\n  flex: 1 1 50% ;\n}\n.toolbar__modes {\n  flex: 0 0 auto ;\n}\n.toolbar__secondary {\n  align-self: center ;\n  flex: 1 1 50% ;\n  height: 36px ;\n}\n.context {\n  display: flex ;\n  line-height: 60px ;\n}\n.context__logo {\n  color: #FFFFFF ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  padding: 0px 25px 0px 25px ;\n  text-decoration: none ;\n}\n.context__prototype,\n.context__screen {\n  color: #99A0AF ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  text-decoration: none ;\n  transition: color 100ms ease ;\n}\n.context__prototype:hover,\n.context__screen:hover {\n  color: #AAB2C4 ;\n}\n.context__pipe {\n  color: #485369 ;\n  font-size: 16px ;\n  padding: 0px 25px 0px 25px ;\n}\n.context__pipe:first-of-type {\n  padding-left: 0px ;\n}\n.modes {\n  display: flex ;\n  line-height: 60px ;\n}\n.modes__mode {\n  color: #8B909D ;\n  font-weight: 600 ;\n  position: relative ;\n  text-align: center ;\n  text-decoration: none ;\n  width: 60px ;\n}\n.modes__mode--on:before {\n  background-color: #FF3366 ;\n  content: \"\";\n  height: 3px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modes__mode--on.modes__mode--preview {\n  color: #61D079 ;\n}\n.modes__mode--on.modes__mode--preview:before {\n  background-color: #61D079 ;\n}\n.modes__mode--on.modes__mode--build {\n  color: #50A6DF ;\n}\n.modes__mode--on.modes__mode--build:before {\n  background-color: #50A6DF ;\n}\n.modes__mode--on.modes__mode--comment {\n  color: #FF3366 ;\n}\n.modes__mode--on.modes__mode--comment:before {\n  background-color: #FF3366 ;\n}\n.modes__mode--on.modes__mode--inspect {\n  color: #FDC228 ;\n}\n.modes__mode--on.modes__mode--inspect:before {\n  background-color: #FDC228 ;\n}\n.modes__mode--on.modes__mode--history {\n  color: #2AB3AB ;\n}\n.modes__mode--on.modes__mode--history:before {\n  background-color: #2AB3AB ;\n}\n.secondary {\n  display: flex ;\n  justify-content: flex-end;\n  line-height: 34px ;\n  padding-right: 15px ;\n}\n.secondary__button--status {\n  box-sizing: border-box;\n  height: 34px ;\n  margin-right: 20px ;\n  padding-top: 10px ;\n  width: 30px ;\n}\n.secondary__button--status:before {\n  background-color: #8891A0 ;\n  border-radius: 7px 7px 7px 7px ;\n  content: \"\";\n  display: block ;\n  height: 14px ;\n  margin: 0px auto 0px auto ;\n  width: 14px ;\n}\n.secondary__button--share {\n  border: 1px solid #2C3547 ;\n  border-radius: 2px 2px 2px 2px ;\n  color: #8891A0 ;\n  font-size: 10px ;\n  font-weight: 700 ;\n  padding: 0px 20px 0px 20px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease;\n}\n.secondary__button--share:hover {\n  background-color: #6CBD7D ;\n  border-color: #6CBD7D ;\n  color: #FFFFFF ;\n}\n.status-menu {\n  background-color: #1F2532 ;\n  border-radius: 4px 4px 4px 4px ;\n  bottom: 75px ;\n  box-shadow: 0px 0px 10px rgba(24, 28, 38, 0.38);\n  padding: 22px 0px 20px 0px ;\n  position: absolute ;\n  right: 21px ;\n  width: 240px ;\n}\n.status-menu__items {\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.status-menu__item {\n  color: #9EA5B2 ;\n  font-size: 12px ;\n  line-height: 24px ;\n  margin: 0px 0px 0px 0px ;\n  padding: 8px 0px 8px 70px ;\n  position: relative ;\n  text-transform: uppercase ;\n}\n.status-menu__item:before {\n  border-radius: 7px 7px 7px 7px ;\n  content: \"\";\n  height: 14px ;\n  left: 35px ;\n  margin-top: -7px;\n  position: absolute ;\n  top: 50% ;\n  width: 14px ;\n}\n.status-menu__item--on-hold:before {\n  background-color: #F88639 ;\n}\n.status-menu__item--in-progress:before {\n  background-color: #2E8EC1 ;\n}\n.status-menu__item--needs-review:before {\n  background-color: #F4C712 ;\n}\n.status-menu__item--approved:before {\n  background-color: #00A553 ;\n}\n"

/***/ }),
/* 330 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<div class=\"workspace\">\n\n\t\t<router-outlet></router-outlet>\n\n\t\t<a *ngIf=\"( selectedMode === 'preview' )\" (click)=\"toggleToolbar()\" class=\"toolbar-toggle\" [ngSwitch]=\"isShowingToolbar\">\n\t\t\t<span *ngSwitchCase=\"true\">Hide</span>\n\t\t\t<span *ngSwitchCase=\"false\">Show</span>\n\t\t</a>\n\n\t</div>\n\n\t<div *ngIf=\"isShowingToolbar\" class=\"toolbar\">\n\n\t\t<nav class=\"toolbar__context context\">\n\t\t\t<a routerLink=\"/app/prototypes\" class=\"context__logo\">\n\t\t\t\tin\n\t\t\t</a>\n\t\t\t<span class=\"context__pipe\">\n\t\t\t\t&#x276F;\n\t\t\t</span>\n\t\t\t<a routerLink=\"/app/prototypes/{{ prototype.id }}\" class=\"context__prototype\">\n\t\t\t\t<span>{{ prototype.name }}</span>\n\t\t\t</a>\n\t\t\t<span class=\"context__pipe\">\n\t\t\t\t&#x276F;\n\t\t\t</span>\n\t\t\t<a (click)=\"toggleScreenBrowser()\" class=\"context__screen\" title=\"Browse Screens (Command+F)\" [class.__context-screen--open]=\"isShowingScreenBrowser\">\n\t\t\t\t<span>{{ screen.name }}</span>\n\t\t\t</a>\n\t\t</nav>\n\n\t\t<nav class=\"toolbar__modes modes\">\n\t\t\t<a routerLink=\"./preview\" title=\"Preview (P)\" class=\"modes__mode modes__mode--preview\" routerLinkActive=\"modes__mode--on\">P</a>\n\t\t\t<a routerLink=\"./build\" title=\"Build (B)\" class=\"modes__mode modes__mode--build\" routerLinkActive=\"modes__mode--on\">B</a>\n\t\t\t<a routerLink=\"./comment\" title=\"Comment (C)\" class=\"modes__mode modes__mode--comment\" routerLinkActive=\"modes__mode--on\">C</a>\n\t\t\t<a routerLink=\"./inspect\" title=\"Inspect (I)\" class=\"modes__mode modes__mode--inspect\" routerLinkActive=\"modes__mode--on\">I</a>\n\t\t\t<a routerLink=\"./history\" title=\"History (H)\" class=\"modes__mode modes__mode--history\" routerLinkActive=\"modes__mode--on\">H</a>\n\t\t</nav>\n\n\t\t<div class=\"toolbar__secondary secondary\">\n\t\t\t\n\t\t\t<a (click)=\"toggleStatusMenu()\" class=\"secondary__button secondary__button--status statusMenuTrigger\">\n\t\t\t\t<br />\n\t\t\t</a>\n\n\t\t\t<a\n\t\t\t\t[routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'share-prototype', prototype.id ] } } ]\"\n\t\t\t\tclass=\"secondary__button secondary__button--share\">\n\t\t\t\tShare\n\t\t\t</a>\n\n\t\t</div>\n\n\t</div>\n\n\t<screen-browser\n\t\t*ngIf=\"isShowingScreenBrowser\"\n\t\t[screens]=\"screens\"\n\t\t[selectedScreen]=\"screen\"\n\t\t(selectScreen)=\"gotoScreen( $event )\"\n\t\t(close)=\"toggleScreenBrowser()\">\n\t</screen-browser>\n\n\t<div \n\t\t*ngIf=\"isShowingStatusMenu\"\n\t\t(click)=\"hideStatusMenu()\"\n\t\t(mousedownoutside)=\"hideStatusMenu()\"\n\t\tdata-ignoreMousedownOutside=\"a.statusMenuTrigger\"\n\t\tclass=\"status-menu\">\n\n\t\t<ul class=\"status-menu__items\">\n\t\t\t<li class=\"status-menu__item status-menu__item--on-hold\">\n\t\t\t\tOn Hold\n\t\t\t</li>\n\t\t\t<li class=\"status-menu__item status-menu__item--in-progress\">\n\t\t\t\tIn Progress\n\t\t\t</li>\n\t\t\t<li class=\"status-menu__item status-menu__item--needs-review\">\n\t\t\t\tNeeds Review\n\t\t\t</li>\n\t\t\t<li class=\"status-menu__item status-menu__item--approved\">\n\t\t\t\tApproved\n\t\t\t</li>\n\t\t</ul>\n\n\t</div>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 331 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.label {\n  background-color: #EAEAEA ;\n  border-radius: 10px 10px 10px 10px ;\n  margin: auto auto auto auto ;\n  padding: 15px 35px 20px 35px ;\n  text-align: center ;\n}\n.label__mode {\n  display: block ;\n  font-size: 36px ;\n  font-weight: 300 ;\n  margin-bottom: 12px ;\n}\n.label__screen {\n  display: block ;\n  font-size: 18px ;\n  line-height: 24px ;\n}\n"

/***/ }),
/* 332 */
/***/ (function(module, exports) {

module.exports = "\n<span class=\"label\">\n\t<span class=\"label__mode\">Build Mode</span>\n\t<span class=\"label__screen\">{{ screen.name }}</span>\n</span>\n"

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var comment_view_component_1 = __webpack_require__(334);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var CommentViewModule = /** @class */ (function () {
    function CommentViewModule() {
    }
    CommentViewModule.routes = [
        {
            path: "comment",
            component: comment_view_component_1.CommentViewComponent
        }
    ];
    CommentViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                comment_view_component_1.CommentViewComponent
            ]
        })
    ], CommentViewModule);
    return CommentViewModule;
}());
exports.CommentViewModule = CommentViewModule;


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import these modules for their side-effects.
// Import the application components and services.
var console_view_component_1 = __webpack_require__(19);
var CommentViewComponent = /** @class */ (function () {
    // I initialize the comment-view component.
    function CommentViewComponent(consoleViewComponent) {
        this.consoleViewComponent = consoleViewComponent;
        this.screen = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called whenever Angular runs a dirty-check.
    CommentViewComponent.prototype.ngDoCheck = function () {
        // CAUTION: In a more robust app, there may be some sort of Observable that the
        // Console component exposes (or some other accessible Store object) that I could
        // watch for state changes; however, for the time-being, I'm just going to use 
        // the DoCheck interface to watch for changes.
        if (this.screen !== this.consoleViewComponent.screen) {
            this.screen = this.consoleViewComponent.screen;
        }
    };
    CommentViewComponent = __decorate([
        core_1.Component({
            selector: "comment-view",
            styles: [__webpack_require__(335)],
            template: __webpack_require__(336)
        }),
        __metadata("design:paramtypes", [console_view_component_1.ConsoleViewComponent])
    ], CommentViewComponent);
    return CommentViewComponent;
}());
exports.CommentViewComponent = CommentViewComponent;


/***/ }),
/* 335 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.label {\n  background-color: #EAEAEA ;\n  border-radius: 10px 10px 10px 10px ;\n  margin: auto auto auto auto ;\n  padding: 15px 35px 20px 35px ;\n  text-align: center ;\n}\n.label__mode {\n  display: block ;\n  font-size: 36px ;\n  font-weight: 300 ;\n  margin-bottom: 12px ;\n}\n.label__screen {\n  display: block ;\n  font-size: 18px ;\n  line-height: 24px ;\n}\n"

/***/ }),
/* 336 */
/***/ (function(module, exports) {

module.exports = "\n<span class=\"label\">\n\t<span class=\"label__mode\">Comment Mode</span>\n\t<span class=\"label__screen\">{{ screen.name }}</span>\n</span>\n"

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var history_view_component_1 = __webpack_require__(338);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var HistoryViewModule = /** @class */ (function () {
    function HistoryViewModule() {
    }
    HistoryViewModule.routes = [
        {
            path: "history",
            component: history_view_component_1.HistoryViewComponent
        }
    ];
    HistoryViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                history_view_component_1.HistoryViewComponent
            ]
        })
    ], HistoryViewModule);
    return HistoryViewModule;
}());
exports.HistoryViewModule = HistoryViewModule;


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import these modules for their side-effects.
// Import the application components and services.
var console_view_component_1 = __webpack_require__(19);
var HistoryViewComponent = /** @class */ (function () {
    // I initialize the history-view component.
    function HistoryViewComponent(consoleViewComponent) {
        this.consoleViewComponent = consoleViewComponent;
        this.screen = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called whenever Angular runs a dirty-check.
    HistoryViewComponent.prototype.ngDoCheck = function () {
        // CAUTION: In a more robust app, there may be some sort of Observable that the
        // Console component exposes (or some other accessible Store object) that I could
        // watch for state changes; however, for the time-being, I'm just going to use 
        // the DoCheck interface to watch for changes.
        if (this.screen !== this.consoleViewComponent.screen) {
            this.screen = this.consoleViewComponent.screen;
        }
    };
    HistoryViewComponent = __decorate([
        core_1.Component({
            selector: "history-view",
            styles: [__webpack_require__(339)],
            template: __webpack_require__(340)
        }),
        __metadata("design:paramtypes", [console_view_component_1.ConsoleViewComponent])
    ], HistoryViewComponent);
    return HistoryViewComponent;
}());
exports.HistoryViewComponent = HistoryViewComponent;


/***/ }),
/* 339 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.label {\n  background-color: #EAEAEA ;\n  border-radius: 10px 10px 10px 10px ;\n  margin: auto auto auto auto ;\n  padding: 15px 35px 20px 35px ;\n  text-align: center ;\n}\n.label__mode {\n  display: block ;\n  font-size: 36px ;\n  font-weight: 300 ;\n  margin-bottom: 12px ;\n}\n.label__screen {\n  display: block ;\n  font-size: 18px ;\n  line-height: 24px ;\n}\n"

/***/ }),
/* 340 */
/***/ (function(module, exports) {

module.exports = "\n<span class=\"label\">\n\t<span class=\"label__mode\">History Mode</span>\n\t<span class=\"label__screen\">{{ screen.name }}</span>\n</span>\n"

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var inspect_view_component_1 = __webpack_require__(342);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var InspectViewModule = /** @class */ (function () {
    function InspectViewModule() {
    }
    InspectViewModule.routes = [
        {
            path: "inspect",
            component: inspect_view_component_1.InspectViewComponent
        }
    ];
    InspectViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                inspect_view_component_1.InspectViewComponent
            ]
        })
    ], InspectViewModule);
    return InspectViewModule;
}());
exports.InspectViewModule = InspectViewModule;


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import these modules for their side-effects.
// Import the application components and services.
var console_view_component_1 = __webpack_require__(19);
var InspectViewComponent = /** @class */ (function () {
    // I initialize the inspect-view component.
    function InspectViewComponent(consoleViewComponent) {
        this.consoleViewComponent = consoleViewComponent;
        this.screen = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called whenever Angular runs a dirty-check.
    InspectViewComponent.prototype.ngDoCheck = function () {
        // CAUTION: In a more robust app, there may be some sort of Observable that the
        // Console component exposes (or some other accessible Store object) that I could
        // watch for state changes; however, for the time-being, I'm just going to use 
        // the DoCheck interface to watch for changes.
        if (this.screen !== this.consoleViewComponent.screen) {
            this.screen = this.consoleViewComponent.screen;
        }
    };
    InspectViewComponent = __decorate([
        core_1.Component({
            selector: "inspect-view",
            styles: [__webpack_require__(343)],
            template: __webpack_require__(344)
        }),
        __metadata("design:paramtypes", [console_view_component_1.ConsoleViewComponent])
    ], InspectViewComponent);
    return InspectViewComponent;
}());
exports.InspectViewComponent = InspectViewComponent;


/***/ }),
/* 343 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.label {\n  background-color: #EAEAEA ;\n  border-radius: 10px 10px 10px 10px ;\n  margin: auto auto auto auto ;\n  padding: 15px 35px 20px 35px ;\n  text-align: center ;\n}\n.label__mode {\n  display: block ;\n  font-size: 36px ;\n  font-weight: 300 ;\n  margin-bottom: 12px ;\n}\n.label__screen {\n  display: block ;\n  font-size: 18px ;\n  line-height: 24px ;\n}\n"

/***/ }),
/* 344 */
/***/ (function(module, exports) {

module.exports = "\n<span class=\"label\">\n\t<span class=\"label__mode\">Inspect Mode</span>\n\t<span class=\"label__screen\">{{ screen.name }}</span>\n</span>\n"

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var preview_view_component_1 = __webpack_require__(346);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PreviewViewModule = /** @class */ (function () {
    function PreviewViewModule() {
    }
    PreviewViewModule.routes = [
        {
            path: "preview",
            component: preview_view_component_1.PreviewViewComponent
        }
    ];
    PreviewViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                preview_view_component_1.PreviewViewComponent
            ]
        })
    ], PreviewViewModule);
    return PreviewViewModule;
}());
exports.PreviewViewModule = PreviewViewModule;


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import these modules for their side-effects.
// Import the application components and services.
var console_view_component_1 = __webpack_require__(19);
var PreviewViewComponent = /** @class */ (function () {
    // I initialize the preview-view component.
    function PreviewViewComponent(consoleViewComponent) {
        this.consoleViewComponent = consoleViewComponent;
        this.screen = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called whenever Angular runs a dirty-check.
    PreviewViewComponent.prototype.ngDoCheck = function () {
        // CAUTION: In a more robust app, there may be some sort of Observable that the
        // Console component exposes (or some other accessible Store object) that I could
        // watch for state changes; however, for the time-being, I'm just going to use 
        // the DoCheck interface to watch for changes.
        if (this.screen !== this.consoleViewComponent.screen) {
            this.screen = this.consoleViewComponent.screen;
        }
    };
    PreviewViewComponent = __decorate([
        core_1.Component({
            selector: "preview-view",
            styles: [__webpack_require__(347)],
            template: __webpack_require__(348)
        }),
        __metadata("design:paramtypes", [console_view_component_1.ConsoleViewComponent])
    ], PreviewViewComponent);
    return PreviewViewComponent;
}());
exports.PreviewViewComponent = PreviewViewComponent;


/***/ }),
/* 347 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.label {\n  background-color: #EAEAEA ;\n  border-radius: 10px 10px 10px 10px ;\n  margin: auto auto auto auto ;\n  padding: 15px 35px 20px 35px ;\n  text-align: center ;\n}\n.label__mode {\n  display: block ;\n  font-size: 36px ;\n  font-weight: 300 ;\n  margin-bottom: 12px ;\n}\n.label__screen {\n  display: block ;\n  font-size: 18px ;\n  line-height: 24px ;\n}\n"

/***/ }),
/* 348 */
/***/ (function(module, exports) {

module.exports = "\n<span class=\"label\">\n\t<span class=\"label__mode\">Preview Mode</span>\n\t<span class=\"label__screen\">{{ screen.name }}</span>\n</span>\n"

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
var ScreenBrowserComponent = /** @class */ (function () {
    // I initialize the screen-browser component.
    function ScreenBrowserComponent() {
        this.closeEvent = new core_2.EventEmitter();
        this.filterText = "";
        this.filterTextHasFocus = false; // This is updated in the HTML itself (easier).
        this.filteredScreens = [];
        this.screens = [];
        this.selectedScreen = null;
        this.selectScreenEvent = new core_2.EventEmitter();
    }
    // ---
    // PUBLIC METHODS.
    // ---
    ScreenBrowserComponent.prototype.close = function () {
        this.closeEvent.emit();
    };
    // I navigate to the first item in the filtered list.
    ScreenBrowserComponent.prototype.handleEnter = function () {
        var filteredScreen = this.filteredScreens.find(function (filteredScreen) {
            return (filteredScreen.isVisible);
        });
        if (filteredScreen) {
            this.selectScreen(filteredScreen.item);
        }
    };
    ScreenBrowserComponent.prototype.handleFilter = function () {
        var _this = this;
        var normalizedFilter = this.filterText.trim().toLowerCase();
        var visibleIndex = 0;
        this.filteredScreens.forEach(function (filteredScreen, i) {
            filteredScreen.isVisible = false;
            if (_this.containsSubstring(filteredScreen.tags, normalizedFilter)) {
                filteredScreen.column = ((visibleIndex++ % 4) + 1);
                filteredScreen.isVisible = true;
            }
        });
    };
    ScreenBrowserComponent.prototype.ngOnChanges = function (changes) {
        this.filteredScreens = this.screens.map(function (screen, index) {
            return ({
                item: screen,
                tags: [
                    screen.name.toLowerCase(),
                    screen.filename.toLowerCase()
                ],
                column: ((index % 4) + 1),
                isVisible: true
            });
        });
    };
    ScreenBrowserComponent.prototype.selectScreen = function (screen) {
        this.selectScreenEvent.emit(screen);
    };
    // ---
    // PRIVATE METHODS.
    // ---
    // I determine if the collection of values contains the given input as a substring.
    ScreenBrowserComponent.prototype.containsSubstring = function (values, input) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (value.includes(input)) {
                return (true);
            }
        }
        return (false);
    };
    ScreenBrowserComponent = __decorate([
        core_1.Component({
            selector: "screen-browser",
            inputs: ["screens", "selectedScreen"],
            outputs: [
                "closeEvent: close",
                "selectScreenEvent: selectScreen"
            ],
            host: {
                "(window: keydown.Escape)": "close()"
            },
            styles: [__webpack_require__(350)],
            template: __webpack_require__(351)
        }),
        __metadata("design:paramtypes", [])
    ], ScreenBrowserComponent);
    return ScreenBrowserComponent;
}());
exports.ScreenBrowserComponent = ScreenBrowserComponent;


/***/ }),
/* 350 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: flex ;\n  flex-direction: column ;\n}\n.titlebar {\n  background-color: #1F2532 ;\n  display: flex ;\n  flex: 0 0 auto ;\n  height: 60px ;\n  line-height: 60px ;\n}\n.count {\n  color: #8C94A1 ;\n  flex: 1 1 auto ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  padding-left: 20px ;\n}\n.close {\n  color: #8C94A1 ;\n  font-size: 16px ;\n  font-weight: 600 ;\n  text-align: center ;\n  text-decoration: none ;\n  transition: color 200ms ease ;\n  width: 60px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #FFFFFF ;\n}\n.body {\n  background-color: #252C3A ;\n  border-bottom: 1px solid #2D3544 ;\n  border-top: 1px solid #2D3544 ;\n  flex: 1 1 auto ;\n  overflow: auto ;\n  padding: 50px 0px 30px 0px ;\n}\n.body::-webkit-scrollbar {\n  background-color: inherit ;\n  width: 8px ;\n  height: 8px ;\n}\n.body::-webkit-scrollbar-thumb {\n  background-color: #42516A ;\n  border-radius: 4px 4px 4px 4px ;\n}\n.body::-webkit-scrollbar-track {\n  background-color: #1F2532 ;\n}\n.search {\n  display: flex ;\n  margin: 0px auto 40px auto ;\n  width: 1170px ;\n}\n.search__input {\n  background: none ;\n  border: none ;\n  border-bottom: 1px solid #2D3544 ;\n  color: #C6CEDA ;\n  font-size: 13px ;\n  padding: 10px 20px 10px 20px ;\n  width: 200px ;\n}\n.search__tip {\n  align-self: center ;\n  color: #FFFFFF ;\n  font-size: 14px ;\n  margin-left: 15px ;\n}\n.search__key {\n  background-color: #1C3E54 ;\n  border: 1px solid #50A6DF ;\n  border-radius: 4px 4px 4px 4px ;\n  color: #FFFFFF ;\n  display: inline-block;\n  margin: 0px 2px 0px 2px ;\n  padding: 1px 7px 2px 7px ;\n}\n.items {\n  list-style-type: none ;\n  margin: 0px auto 0px auto ;\n  padding: 0px 0px 0px 0px ;\n  width: 1170px ;\n}\n.items:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.items__item {\n  float: left ;\n  margin: 0px 56px 20px 0px ;\n  width: 250px ;\n}\n.items__item--column-4 {\n  margin-right: 0px ;\n}\n.screen {\n  display: block ;\n  text-decoration: none ;\n}\n.screen__thumbnail {\n  background-color: #222222 ;\n  border: 1px solid #111111 ;\n  border-radius: 3px 3px 3px 3px ;\n  display: block ;\n  height: 150px ;\n  margin-bottom: 10px ;\n  transition: background-color 100ms ease;\n}\n.screen__name {\n  color: #757B8C ;\n  display: block ;\n  text-align: center ;\n  transition: color 100ms ease ;\n}\n.screen--selected .screen__thumbnail {\n  border-color: #2F7BBD ;\n}\n.screen:hover .screen__thumbnail {\n  background-color: #111111 ;\n}\n.screen:hover .screen__name {\n  color: #ACB1BE ;\n}\n"

/***/ }),
/* 351 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"titlebar\">\n\n\t<span class=\"count\">\n\t\t{{ screens.length }} Screens\n\t</span>\n\n\t<a (click)=\"close()\" class=\"close\"></a>\n\n</div>\n\n<div class=\"body\">\n\n\t<form class=\"search\">\n\n\t\t<input\n\t\t\ttype=\"text\" \n\t\t\tname=\"filterText\"\n\t\t\t[(ngModel)]=\"filterText\" \n\t\t\t(ngModelChange)=\"handleFilter()\" \n\t\t\t(keydown.enter)=\"handleEnter()\"\n\t\t\t(focus)=\"filterTextHasFocus = true\"\n\t\t\t(blur)=\"filterTextHasFocus = false\"\n\t\t\tplaceholder=\"Search for a screen...\" \n\t\t\tautocomplete=\"off\"\n\t\t\tautofocus\n\t\t\tclass=\"search__input\" \n\t\t/>\n\n\t\t<span *ngIf=\"( filterTextHasFocus && filterText.length )\" class=\"search__tip\">\n\t\t\t&#8592; <strong>Tip:</strong> Hit <code class=\"search__key\">Enter</code> to navigate to first item.\n\t\t</span>\n\n\t</form>\n\n\t<ul class=\"items\">\n\t\t<li \n\t\t\t*ngFor=\"let filteredItem of filteredScreens\"\n\t\t\tclass=\"items__item items__item--column-{{ filteredItem.column}}\"\n\t\t\t[appShowBlock]=\"filteredItem.isVisible\">\n\n\t\t\t<a (click)=\"selectScreen( filteredItem.item )\" class=\"screen\" [class.screen--selected]=\"( filteredItem.item === selectedScreen )\">\n\t\t\t\t<span class=\"screen__thumbnail\"></span>\n\t\t\t\t<span class=\"screen__name\">\n\t\t\t\t\t{{ filteredItem.item.name }}\n\t\t\t\t</span>\n\t\t\t</a>\n\n\t\t</li>\n\t</ul>\n\n</div>\n"

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_module_1 = __webpack_require__(353);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var FreehandsViewModule = /** @class */ (function () {
    function FreehandsViewModule() {
    }
    FreehandsViewModule.routes = [
        {
            path: "freehands",
            children: detail_view_module_1.DetailViewModule.routes.concat([
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "/app/projects/list;filterType=freehand"
                }
            ])
        }
    ];
    FreehandsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                detail_view_module_1.DetailViewModule
            ]
        })
    ], FreehandsViewModule);
    return FreehandsViewModule;
}());
exports.FreehandsViewModule = FreehandsViewModule;


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_component_1 = __webpack_require__(354);
var partial_service_1 = __webpack_require__(116);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DetailViewModule = /** @class */ (function () {
    function DetailViewModule() {
    }
    DetailViewModule.routes = [
        {
            path: ":id",
            component: detail_view_component_1.DetailViewComponent
        }
    ];
    DetailViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                detail_view_component_1.DetailViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], DetailViewModule);
    return DetailViewModule;
}());
exports.DetailViewModule = DetailViewModule;


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(116);
var DetailViewComponent = /** @class */ (function () {
    // I initialize the detail-view component.
    function DetailViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.freehand = null;
        this.isLoading = true;
    }
    // ---
    // PUBLIE METHODS.
    // ---
    // I get called once when the component is being unmounted.
    DetailViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    // I get called once when the component is being mounted.
    DetailViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    DetailViewComponent.prototype.loadData = function (freehandID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(freehandID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.freehand = partial.freehand;
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: ["projects", "list", { filterType: "freehand" }],
                        modal: "modal/error/could-not-load-freehand"
                    }
                }
            ]);
        });
    };
    DetailViewComponent = __decorate([
        core_1.Component({
            selector: "detail-view",
            styles: [__webpack_require__(355)],
            template: __webpack_require__(356)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], DetailViewComponent);
    return DetailViewComponent;
}());
exports.DetailViewComponent = DetailViewComponent;


/***/ }),
/* 355 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.header {\n  padding-top: 200px ;\n}\n.header__in {\n  background-color: #3D3D3F ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  height: 37px ;\n  line-height: 37px ;\n  left: 27px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 27px ;\n  width: 37px ;\n}\n.header__title {\n  color: #282F3D ;\n  font-size: 66px ;\n  font-weight: 400 ;\n  line-height: 66px ;\n  margin: 0px 0px 0px 0px ;\n  text-align: center ;\n  text-transform: uppercase ;\n}\n.teaser {\n  text-align: center ;\n}\n.teaser__back {\n  color: #333333 ;\n}\n"

/***/ }),
/* 356 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<header class=\"header\">\n\n\t\t<a [routerLink]=\"[ '/app/projects/list', { filterType: 'freehand' } ]\" class=\"header__in\">in</a>\n\n\t\t<div class=\"header__title\">\n\t\t\t{{ freehand.name }}\n\t\t</div>\n\n\t</header>\n\n\t<p class=\"teaser\">\n\t\t( This page opens in an entirely different system in production &mdash;\n\t\t<a [routerLink]=\"[ '/app/projects/list', { filterType: 'freehand' } ]\" class=\"teaser__back\">go back</a> )\n\t</p>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
// import { DetailViewModule } from "./detail-view/detail-view.module";
var inbox_view_component_1 = __webpack_require__(358);
var partial_service_1 = __webpack_require__(117);
var shared_module_1 = __webpack_require__(2);
var threads_view_module_1 = __webpack_require__(361);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var InboxViewModule = /** @class */ (function () {
    function InboxViewModule() {
    }
    InboxViewModule.routes = [
        {
            outlet: "inbox",
            path: "inbox",
            component: inbox_view_component_1.InboxViewComponent,
            children: threads_view_module_1.ThreadsViewModule.routes.slice()
        }
    ];
    InboxViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                threads_view_module_1.ThreadsViewModule
            ],
            declarations: [
                inbox_view_component_1.InboxViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], InboxViewModule);
    return InboxViewModule;
}());
exports.InboxViewModule = InboxViewModule;


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var dom_utils_1 = __webpack_require__(38);
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(117);
var InboxViewComponent = /** @class */ (function () {
    // I initialize the list-view component.
    function InboxViewComponent(activatedRoute, domUtils, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.domUtils = domUtils;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.inboxes = [];
        this.isLoading = true;
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    InboxViewComponent.prototype.closeInbox = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    inbox: null
                }
            }
        ]);
    };
    InboxViewComponent.prototype.ngOnDestroy = function () {
        // When we close the inbox outlet, we can allow any overflow of the HTML page to
        // show; this will re-enable the natural scrollbars on the main page.
        this.domUtils.showHtmlOverflow();
        (this.unlisten) && this.unlisten();
    };
    InboxViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // When we open a inbox outlet, it will have it's own scrollbar. In order to not
        // show two scrollbars doubled-up on the side of the screen, we have to make sure
        // that the HTML page doesn't show a scrollbar for the main body.
        this.domUtils.hideHtmlOverflow();
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeInbox();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("inbox")
        });
        this.loadData();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    InboxViewComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get()
            .then(function (partial) {
            _this.isLoading = false;
            _this.inboxes = [];
            partial.prototypes.forEach(function (prototype) {
                _this.inboxes.push({
                    name: prototype.name,
                    resource: "./prototypes/" + prototype.id
                });
            });
            partial.boards.forEach(function (board) {
                _this.inboxes.push({
                    name: board.name,
                    resource: "./boards/" + board.id
                });
            });
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-inbox",
                        inbox: null
                    }
                }
            ]);
        });
    };
    InboxViewComponent = __decorate([
        core_1.Component({
            selector: "inbox-view",
            styles: [__webpack_require__(359)],
            template: __webpack_require__(360)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            dom_utils_1.DomUtils,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], InboxViewComponent);
    return InboxViewComponent;
}());
exports.InboxViewComponent = InboxViewComponent;


/***/ }),
/* 359 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  left: 0px ;\n  position: fixed ;\n  right: 0px ;\n  top: 0px ;\n  z-index: 102 ;\n}\n.backdrop {\n  background-color: rgba(0, 0, 0, 0.5);\n  bottom: 0px ;\n  cursor: pointer ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.close {\n  background-color: #FFFFFF ;\n  border-radius: 40px 40px 40px 40px ;\n  color: #333333 ;\n  cursor: pointer ;\n  height: 40px ;\n  line-height: 40px ;\n  position: absolute ;\n  right: 30px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 25px ;\n  width: 40px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.list-panel {\n  animation: inbox-view-list-panel-enter 200ms;\n  background-color: #1F2532 ;\n  bottom: 0px ;\n  display: block ;\n  left: 0px ;\n  position: absolute ;\n  top: 0px ;\n  width: 270px ;\n  z-index: 2 ;\n}\n@keyframes inbox-view-list-panel-enter {\n  from {\n    left: -270px;\n  }\n  to {\n    left: 0px ;\n  }\n}\n.detail-panel {\n  animation: inbox-view-detail-panel-enter 200ms;\n  bottom: 0px ;\n  left: 270px ;\n  position: absolute ;\n  top: 0px ;\n  z-index: 1 ;\n}\n@keyframes inbox-view-detail-panel-enter {\n  from {\n    left: 0px ;\n  }\n  to {\n    left: 270px ;\n  }\n}\n.logo {\n  color: #FFFFFF ;\n  cursor: pointer ;\n  font-size: 30px ;\n  font-weight: 600 ;\n  left: 25px ;\n  line-height: 30px ;\n  position: absolute ;\n  top: 27px ;\n}\n.loading {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.list {\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  padding: 25px 0px 25px 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 80px ;\n}\n.list__header {\n  color: #DADEE6 ;\n  font-size: 10px ;\n  font-weight: 600 ;\n  margin: 0px 0px 15px 25px ;\n  text-transform: uppercase ;\n}\n.list__items {\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.list__item {\n  padding-right: 20px ;\n}\n.list__link {\n  border-radius: 0px 3px 3px 0px ;\n  color: #91949A ;\n  cursor: pointer ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  padding: 10px 10px 11px 25px ;\n  text-decoration: none ;\n}\n.list__link:hover {\n  background-color: #252D3D ;\n}\n.list__link--on,\n.list__link--on:hover {\n  background-color: #1E8FE1 ;\n  color: #EBEDF2 ;\n}\n"

/***/ }),
/* 360 */
/***/ (function(module, exports) {

module.exports = "\n<div [routerLink]=\"[ '/app', { outlets: { inbox: null } } ]\" class=\"backdrop\">\n\t<a [routerLink]=\"[ '/app', { outlets: { inbox: null } } ]\" class=\"close\"></a>\n</div>\n\n<section class=\"list-panel\">\n\n\t<span [routerLink]=\"[ '/app', { outlets: { inbox: null } } ]\" class=\"logo\">in</span>\n\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator theme=\"dark\" class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<div class=\"list\">\n\n\t\t\t<h2 class=\"list__header\">\n\t\t\t\tRecent Conversations\n\t\t\t</h2>\n\n\t\t\t<ul class=\"list__items\">\n\t\t\t\t<li *ngFor=\"let inbox of inboxes\" class=\"list__item\">\n\t\t\t\t\t<a routerLink=\"{{ inbox.resource }}\" class=\"list__link\" routerLinkActive=\"list__link--on\">\n\t\t\t\t\t\t{{ inbox.name }}\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t</div>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</section>\n\n<section class=\"detail-panel\">\n\t\n\t<router-outlet></router-outlet>\n\n</section>\n"

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var conversation_view_module_1 = __webpack_require__(362);
var partial_service_1 = __webpack_require__(120);
var shared_module_1 = __webpack_require__(2);
var threads_view_component_1 = __webpack_require__(372);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ThreadsViewModule = /** @class */ (function () {
    function ThreadsViewModule() {
    }
    ThreadsViewModule.routes = [
        {
            path: ":type/:id",
            component: threads_view_component_1.ThreadsViewComponent,
            children: conversation_view_module_1.ConversationViewModule.routes.slice()
        }
    ];
    ThreadsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                conversation_view_module_1.ConversationViewModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                threads_view_component_1.ThreadsViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], ThreadsViewModule);
    return ThreadsViewModule;
}());
exports.ThreadsViewModule = ThreadsViewModule;


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var board_conversation_view_component_1 = __webpack_require__(363);
var conversation_view_component_1 = __webpack_require__(366);
var partial_service_1 = __webpack_require__(118);
var partial_service_2 = __webpack_require__(119);
var prototype_conversation_view_component_1 = __webpack_require__(369);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ConversationViewModule = /** @class */ (function () {
    function ConversationViewModule() {
    }
    ConversationViewModule.routes = [
        {
            path: "conversations/:id",
            component: conversation_view_component_1.ConversationViewComponent
            // CAUTION: We're not including the Board Conversation or the Prototype 
            // Conversation as child routes. This is because we need to render them based
            // on the parent route state. As such, we're going to be conditionally 
            // rendering them in the view; however, they will act as if they are routable
            // components and will reach into the ActivatedRoute to access their params.
        }
    ];
    ConversationViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                board_conversation_view_component_1.BoardConversationViewComponent,
                conversation_view_component_1.ConversationViewComponent,
                prototype_conversation_view_component_1.PrototypeConversationViewComponent
            ],
            providers: [
                partial_service_1.PartialService,
                partial_service_2.PartialService
            ]
        })
    ], ConversationViewModule);
    return ConversationViewModule;
}());
exports.ConversationViewModule = ConversationViewModule;


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(118);
var BoardConversationViewComponent = /** @class */ (function () {
    // I initialize the board-conversation-view component.
    function BoardConversationViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.board = null;
        this.boardItem = null;
        this.comments = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    BoardConversationViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    BoardConversationViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    BoardConversationViewComponent.prototype.loadData = function (id) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(id)
            .then(function (partial) {
            _this.isLoading = false;
            _this.board = partial.board;
            _this.boardItem = partial.boardItem;
            _this.comments = partial.comments;
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-inbox-conversation",
                        inbox: "inbox"
                    }
                }
            ]);
        });
    };
    BoardConversationViewComponent = __decorate([
        core_1.Component({
            selector: "board-conversation-view",
            styles: [__webpack_require__(364)],
            template: __webpack_require__(365)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], BoardConversationViewComponent);
    return BoardConversationViewComponent;
}());
exports.BoardConversationViewComponent = BoardConversationViewComponent;


/***/ }),
/* 364 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.loading {\n  height: 100% ;\n}\n.header {\n  margin: 26px 0px 50px 0px ;\n}\n.header__board-name {\n  color: #8C96A9 ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  line-height: 16px ;\n  margin: 0px 0px 2px 0px ;\n  text-align: center ;\n  text-transform: uppercase ;\n}\n.header__type {\n  color: #3D4356 ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  line-height: 19px ;\n  margin: 0px 0px 17px 0px ;\n  text-align: center ;\n}\n.header__figure {\n  background-color: #FF3366 ;\n  display: block ;\n  height: 210px ;\n  margin: 0px auto 0px auto ;\n  text-decoration: none ;\n  width: 520px ;\n}\n.header__color {\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 36px ;\n  font-weight: 600 ;\n  height: 210px ;\n  line-height: 210px ;\n  text-align: center ;\n}\n.comments {\n  list-style-type: none ;\n  margin: 26px auto 26px auto ;\n  padding: 0px 0px 0px 0px ;\n  width: 520px ;\n}\n.comments__item {\n  margin: 20px 0px 20px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.comment {\n  padding-left: 55px ;\n  position: relative ;\n}\n.comment__avatar {\n  background-color: #8D96AA ;\n  font-size: 12px ;\n  height: 35px ;\n  left: 0px ;\n  position: absolute ;\n  top: 3px ;\n  width: 35px ;\n}\n.comment__author {\n  color: #333C4E ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin-bottom: 4px ;\n}\n.comment__content {\n  color: #3F495C ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 20px ;\n}\n"

/***/ }),
/* 365 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<header class=\"header\">\n\t\t\n\t\t<div class=\"header__board-name\">\n\t\t\t{{ board.name }}\n\t\t</div>\n\n\t\t<div class=\"header__type\">\n\t\t\t{{ boardItem.type }}\n\t\t</div>\n\n\t\t<a \n\t\t\t[routerLink]=\"[ '/app', { outlets: { primary: [ 'boards', board.id, 'items', boardItem.id ], inbox: null } } ]\"\n\t\t\tclass=\"header__figure\">\n\t\t\t<span class=\"header__color\">#FF3366</span>\n\t\t</a>\n\n\t</header>\n\n\t<ul class=\"comments\">\n\t\t<ng-template ngFor let-comment [ngForOf]=\"comments\">\n\n\t\t\t<li class=\"comments__item comment\">\n\t\t\t\t\n\t\t\t\t<app-avatar\n\t\t\t\t\t[initials]=\"comment.user.initials\"\n\t\t\t\t\t[src]=\"comment.user.avatarUrl\"\n\t\t\t\t\t[title]=\"comment.user.name\"\n\t\t\t\t\tclass=\"comment__avatar\">\n\t\t\t\t</app-avatar>\n\n\t\t\t\t<div class=\"comment__author\">\n\t\t\t\t\t{{ comment.user.name }}\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"comment__content\">\n\t\t\t\t\t{{ comment.content }}\n\t\t\t\t</div>\n\n\t\t\t</li>\n\n\t\t</ng-template>\n\t</ul>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
// Import the application components and services.
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ConversationViewComponent = /** @class */ (function () {
    // I initialize the conversation-view component.
    function ConversationViewComponent(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.type = "";
    }
    // ---
    // PUBLIC METHODS.
    // ---
    ConversationViewComponent.prototype.ngOnDestroy = function () {
        (this.parentParamMapSubscription) && this.parentParamMapSubscription.unsubscribe();
    };
    ConversationViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentParamMapSubscription = this.activatedRoute.parent.paramMap.subscribe(function (paramMap) {
            _this.type = paramMap.get("type");
        });
    };
    ConversationViewComponent = __decorate([
        core_1.Component({
            selector: "conversation-view",
            styles: [__webpack_require__(367)],
            template: __webpack_require__(368)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], ConversationViewComponent);
    return ConversationViewComponent;
}());
exports.ConversationViewComponent = ConversationViewComponent;


/***/ }),
/* 367 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  top: 0px ;\n}\n.detail-panel {\n  animation: conversations-view-list-panel-enter 200ms;\n  background-color: #FFFFFF ;\n  border-left: 1px solid #E1E2E6 ;\n  bottom: 0px ;\n  display: block ;\n  left: 0px ;\n  position: absolute ;\n  top: 0px ;\n  width: 590px ;\n}\n@keyframes conversations-view-list-panel-enter {\n  from {\n    left: -590px;\n  }\n  to {\n    left: 0px ;\n  }\n}\n"

/***/ }),
/* 368 */
/***/ (function(module, exports) {

module.exports = "\n<!--\n\tWe are somewhat HACKING the idea of a routable component here. Because we need to\n\trender the subview based on the PARENT ROUTE, we can't rely on the router-outlet.\n\tInstead, we have to explicitly render these components AS IF THEY WERE ROUTABLE \n\tviews. That said, these components will believe they are routable internally and\n\twill use the ActivatedRoute injectable to gather data.\n-->\n<section class=\"detail-panel\">\n\t\n\t<ng-template [ngIf]=\"( type === 'boards' )\">\n\t\t<board-conversation-view></board-conversation-view>\n\t</ng-template>\n\n\t<ng-template [ngIf]=\"( type === 'prototypes' )\">\n\t\t<prototype-conversation-view></prototype-conversation-view>\n\t</ng-template>\n\t\n</section>\n"

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(119);
var PrototypeConversationViewComponent = /** @class */ (function () {
    // I initialize the prototype-conversation-view component.
    function PrototypeConversationViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.comments = null;
        this.conversation = null;
        this.isLoading = true;
        this.prototype = null;
        this.screen = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    PrototypeConversationViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    PrototypeConversationViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    PrototypeConversationViewComponent.prototype.loadData = function (id) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(id)
            .then(function (partial) {
            _this.isLoading = false;
            _this.prototype = partial.prototype;
            _this.screen = partial.screen;
            _this.conversation = partial.conversation;
            _this.comments = partial.comments;
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-inbox-conversation",
                        inbox: "inbox"
                    }
                }
            ]);
        });
    };
    PrototypeConversationViewComponent = __decorate([
        core_1.Component({
            selector: "prototype-conversation-view",
            styles: [__webpack_require__(370)],
            template: __webpack_require__(371)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], PrototypeConversationViewComponent);
    return PrototypeConversationViewComponent;
}());
exports.PrototypeConversationViewComponent = PrototypeConversationViewComponent;


/***/ }),
/* 370 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.loading {\n  height: 100% ;\n}\n.header {\n  margin: 26px 0px 50px 0px ;\n}\n.header__prototype-name {\n  color: #8C96A9 ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  line-height: 16px ;\n  margin: 0px 0px 2px 0px ;\n  text-align: center ;\n  text-transform: uppercase ;\n}\n.header__screen-name {\n  color: #3D4356 ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  line-height: 19px ;\n  margin: 0px 0px 17px 0px ;\n  text-align: center ;\n}\n.header__figure {\n  background-color: #E0E0E0 ;\n  display: block ;\n  height: 210px ;\n  margin: 0px auto 0px auto ;\n  overflow: hidden ;\n  position: relative ;\n  text-decoration: none ;\n  width: 520px ;\n}\n.header__figure:hover .header__conversation-label {\n  height: 36px ;\n  margin: -18px 0px 0px -18px;\n  line-height: 36px ;\n  width: 36px ;\n}\n.header__conversation-label {\n  background-color: #FF4070 ;\n  border-radius: 36px 36px 36px 36px ;\n  color: #FFFFFF ;\n  font-size: 12px ;\n  font-weight: 700 ;\n  height: 32px ;\n  left: 30% ;\n  margin: -16px 0px 0px -16px;\n  line-height: 32px ;\n  position: absolute ;\n  text-align: center ;\n  top: 40% ;\n  width: 32px ;\n}\n.comments {\n  list-style-type: none ;\n  margin: 26px auto 26px auto ;\n  padding: 0px 0px 0px 0px ;\n  width: 520px ;\n}\n.comments__item {\n  margin: 20px 0px 20px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.comment {\n  padding-left: 55px ;\n  position: relative ;\n}\n.comment__avatar {\n  background-color: #8D96AA ;\n  font-size: 12px ;\n  height: 35px ;\n  left: 0px ;\n  position: absolute ;\n  top: 3px ;\n  width: 35px ;\n}\n.comment__author {\n  color: #333C4E ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin-bottom: 4px ;\n}\n.comment__content {\n  color: #3F495C ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 20px ;\n}\n"

/***/ }),
/* 371 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<header class=\"header\">\n\t\t\n\t\t<div class=\"header__prototype-name\">\n\t\t\t{{ prototype.name }}\n\t\t</div>\n\n\t\t<div class=\"header__screen-name\">\n\t\t\t{{ screen.name }}\n\t\t</div>\n\n\t\t<a \n\t\t\t[routerLink]=\"[ '/app', { outlets: { primary: [ 'console', 'prototypes', prototype.id, 'screens', screen.id ], inbox: null } } ]\" \n\t\t\t[title]=\"screen.filename\"\n\t\t\tclass=\"header__figure\">\n\t\t\t<span class=\"header__conversation-label\">\n\t\t\t\t{{ conversation.label }}\n\t\t\t</span>\n\t\t</a>\n\n\t</header>\n\n\t<ul class=\"comments\">\n\t\t<ng-template ngFor let-comment [ngForOf]=\"comments\">\n\n\t\t\t<li class=\"comments__item comment\">\n\t\t\t\t\n\t\t\t\t<app-avatar\n\t\t\t\t\t[initials]=\"comment.user.initials\"\n\t\t\t\t\t[src]=\"comment.user.avatarUrl\"\n\t\t\t\t\t[title]=\"comment.user.name\"\n\t\t\t\t\tclass=\"comment__avatar\">\n\t\t\t\t</app-avatar>\n\t\t\t\t\n\t\t\t\t<div class=\"comment__author\">\n\t\t\t\t\t{{ comment.user.name }}\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"comment__content\">\n\t\t\t\t\t{{ comment.content }}\n\t\t\t\t</div>\n\n\t\t\t</li>\n\n\t\t</ng-template>\n\t</ul>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(120);
var ThreadsViewComponent = /** @class */ (function () {
    // I initialize the threads-view component.
    function ThreadsViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.type = "";
        this.threads = [];
    }
    // ---
    // PUBLIC METHODS.
    // ---
    ThreadsViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    ThreadsViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(paramMap.get("type"), +paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ThreadsViewComponent.prototype.loadData = function (type, id) {
        var _this = this;
        this.type = (type === "prototypes")
            ? "Prototype"
            : "Board";
        this.isLoading = true;
        var promise = (type === "prototypes")
            ? this.partialService.getForPrototype(id)
            : this.partialService.getForBoard(id);
        promise
            .then(function (partial) {
            _this.isLoading = false;
            _this.threads = partial.threads;
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-inbox-thread",
                        inbox: "inbox"
                    }
                }
            ]);
        });
    };
    ThreadsViewComponent = __decorate([
        core_1.Component({
            selector: "threads-view",
            styles: [__webpack_require__(373)],
            template: __webpack_require__(374)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], ThreadsViewComponent);
    return ThreadsViewComponent;
}());
exports.ThreadsViewComponent = ThreadsViewComponent;


/***/ }),
/* 373 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  top: 0px ;\n}\n.list-panel {\n  animation: threads-view-list-panel-enter 200ms;\n  background-color: #F6F6F6 ;\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  top: 0px ;\n  width: 348px ;\n  z-index: 2 ;\n}\n@keyframes threads-view-list-panel-enter {\n  from {\n    left: -348px;\n  }\n  to {\n    left: 0px ;\n  }\n}\n.detail-panel {\n  animation: threads-view-detail-panel-enter 200ms;\n  bottom: 0px ;\n  left: 348px ;\n  position: absolute ;\n  top: 0px ;\n  z-index: 1 ;\n}\n@keyframes threads-view-detail-panel-enter {\n  from {\n    left: 0px ;\n  }\n  to {\n    left: 348px ;\n  }\n}\n.loading {\n  height: 100% ;\n}\n.header {\n  background-color: #FFFFFF ;\n  border-bottom: 1px solid #E1E2E6 ;\n  height: 80px;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.header__title {\n  color: #3D4356 ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  left: 29px ;\n  line-height: 80px;\n  position: absolute ;\n  top: 0px ;\n  text-transform: uppercase ;\n}\n.notifications {\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 80px;\n}\n.notifications__list {\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.notifications__item {\n  border-bottom: 1px solid #E1E2E6 ;\n}\n.notification {\n  display: block ;\n  padding: 15px 15px 15px 84px ;\n  position: relative ;\n  text-decoration: none ;\n}\n.notification__avatar {\n  background-color: #8D96AA ;\n  font-size: 12px ;\n  height: 35px ;\n  left: 30px ;\n  position: absolute ;\n  top: 35px ;\n  width: 35px ;\n}\n.notification__screen-name {\n  color: #8C96A9 ;\n  display: block ;\n  font-size: 11px ;\n  text-transform: uppercase ;\n}\n.notification__teaser {\n  color: #333C4E ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 19px ;\n  margin: 7px 0px 10px 0px ;\n}\n.notification__author {\n  color: #8C96A9 ;\n  display: block ;\n  font-size: 11px ;\n}\n.notification--on {\n  background-color: #1E81D6 ;\n}\n.notification--on .notification__avatar {\n  background-color: #78B3E6 ;\n}\n.notification--on .notification__screen-name {\n  color: #85B5DE ;\n}\n.notification--on .notification__teaser {\n  color: #FFFFFF ;\n}\n.notification--on .notification__author {\n  color: #85B5DE ;\n}\n"

/***/ }),
/* 374 */
/***/ (function(module, exports) {

module.exports = "\n<section class=\"list-panel\">\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<div class=\"header\">\n\t\t\t<span class=\"header__title\">{{ type }} Name</span>\n\t\t</div>\n\n\t\t<div class=\"notifications\">\n\n\t\t\t<ul class=\"notifications__list\">\n\t\t\t\t\n\t\t\t\t<ng-template ngFor let-thread [ngForOf]=\"threads\">\n\n\t\t\t\t\t<li class=\"notifications__item\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<a [routerLink]=\"[ 'conversations', thread.id ]\" class=\"notifications__link notification\" routerLinkActive=\"notification--on\">\n\t\t\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t\t\t[initials]=\"thread.user.initials\"\n\t\t\t\t\t\t\t\t[src]=\"thread.user.avatarUrl\"\n\t\t\t\t\t\t\t\t[title]=\"thread.user.name\"\n\t\t\t\t\t\t\t\tclass=\"notification__avatar\">\n\t\t\t\t\t\t\t</app-avatar>\n\t\t\t\t\t\t\t<span class=\"notification__screen-name\">{{ thread.name }}</span>\n\t\t\t\t\t\t\t<span class=\"notification__teaser\">{{ thread.teaser }}</span>\n\t\t\t\t\t\t\t<span class=\"notification__author\">{{ thread.user.name }}</span>\t\t\t\t\n\t\t\t\t\t\t</a>\n\n\t\t\t\t\t</li>\n\n\t\t\t\t</ng-template>\n\n\t\t\t</ul>\n\n\t\t</div>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</section>\n\n<section class=\"detail-panel\">\n\n\t<router-outlet></router-outlet>\n\n</section>\n"

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var board_members_view_module_1 = __webpack_require__(376);
var create_project_view_module_1 = __webpack_require__(380);
var do_not_show_modal_on_refresh_guard_1 = __webpack_require__(122);
var enterprise_demo_scheduled_view_module_1 = __webpack_require__(384);
var enterprise_demo_view_module_1 = __webpack_require__(388);
var error_view_module_1 = __webpack_require__(392);
var modal_view_component_1 = __webpack_require__(396);
var prototype_members_view_module_1 = __webpack_require__(399);
var shared_module_1 = __webpack_require__(2);
var share_board_view_module_1 = __webpack_require__(403);
var share_prototype_view_module_1 = __webpack_require__(415);
var upgrade_plan_view_module_1 = __webpack_require__(427);
var user_projects_view_module_1 = __webpack_require__(437);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ModalViewModule = /** @class */ (function () {
    function ModalViewModule() {
    }
    ModalViewModule.routes = [
        {
            outlet: "modal",
            path: "modal",
            component: modal_view_component_1.ModalViewComponent,
            children: board_members_view_module_1.BoardMembersViewModule.routes.concat(create_project_view_module_1.CreateProjectViewModule.routes, enterprise_demo_scheduled_view_module_1.EnterpriseDemoScheduledViewModule.routes, enterprise_demo_view_module_1.EnterpriseDemoViewModule.routes, error_view_module_1.ErrorViewModule.routes, prototype_members_view_module_1.PrototypeMembersViewModule.routes, share_board_view_module_1.ShareBoardViewModule.routes, share_prototype_view_module_1.SharePrototypeViewModule.routes, upgrade_plan_view_module_1.UpgradePlanViewModule.routes, user_projects_view_module_1.UserProjectsViewModule.routes)
        }
    ];
    ModalViewModule = __decorate([
        core_1.NgModule({
            imports: [
                board_members_view_module_1.BoardMembersViewModule,
                create_project_view_module_1.CreateProjectViewModule,
                enterprise_demo_scheduled_view_module_1.EnterpriseDemoScheduledViewModule,
                enterprise_demo_view_module_1.EnterpriseDemoViewModule,
                error_view_module_1.ErrorViewModule,
                prototype_members_view_module_1.PrototypeMembersViewModule,
                shared_module_1.SharedModule,
                share_board_view_module_1.ShareBoardViewModule,
                share_prototype_view_module_1.SharePrototypeViewModule,
                upgrade_plan_view_module_1.UpgradePlanViewModule,
                user_projects_view_module_1.UserProjectsViewModule
            ],
            declarations: [
                modal_view_component_1.ModalViewComponent
            ],
            providers: [
                do_not_show_modal_on_refresh_guard_1.DoNotShowModalOnRefreshGuard
            ]
        })
    ], ModalViewModule);
    return ModalViewModule;
}());
exports.ModalViewModule = ModalViewModule;


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var board_members_view_component_1 = __webpack_require__(377);
var partial_service_1 = __webpack_require__(121);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BoardMembersViewModule = /** @class */ (function () {
    function BoardMembersViewModule() {
    }
    BoardMembersViewModule.routes = [
        {
            path: "board-members/:id",
            component: board_members_view_component_1.BoardMembersViewComponent
        }
    ];
    BoardMembersViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                board_members_view_component_1.BoardMembersViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], BoardMembersViewModule);
    return BoardMembersViewModule;
}());
exports.BoardMembersViewModule = BoardMembersViewModule;


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(121);
var BoardMembersViewComponent = /** @class */ (function () {
    // I initialize the create-project-view component.
    function BoardMembersViewComponent(activatedRoute, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.board = null;
        this.filterText = "";
        this.isLoading = true;
        this.members = null;
        this.renderedUsers = {};
        this.selectedUsers = {};
        this.users = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    BoardMembersViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    BoardMembersViewComponent.prototype.handleFilter = function () {
        var value = this.filterText.toLowerCase();
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (value) {
                this.renderedUsers[user.id] = user.name.toLowerCase().includes(value);
            }
            else {
                this.renderedUsers[user.id] = true;
            }
        }
    };
    // I get called once when the component is being unmounted.
    BoardMembersViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    // I get called once when the component is being mounted.
    BoardMembersViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    BoardMembersViewComponent.prototype.toggleUser = function (user) {
        this.selectedUsers[user.id] = !this.selectedUsers[user.id];
    };
    BoardMembersViewComponent.prototype.update = function () {
        this.closeModal();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    BoardMembersViewComponent.prototype.loadData = function (boardID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(boardID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.board = partial.board;
            _this.members = partial.members;
            _this.users = partial.users;
            // Setup the collection of user IDs.
            for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                _this.renderedUsers[user.id] = true;
                _this.selectedUsers[user.id] = !!lodash_extended_1._.find(_this.members, { id: user.id });
            }
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-board"
                    }
                }
            ]);
        });
    };
    BoardMembersViewComponent = __decorate([
        core_1.Component({
            selector: "board-members-view",
            host: {
                "(directclick)": "closeModal()"
            },
            styles: [__webpack_require__(378)],
            template: __webpack_require__(379)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], BoardMembersViewComponent);
    return BoardMembersViewComponent;
}());
exports.BoardMembersViewComponent = BoardMembersViewComponent;


/***/ }),
/* 378 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: rgba(50, 58, 69, 0.96);\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modal {\n  background-color: #F9F9FB ;\n  border-radius: 4px 4px 4px 4px ;\n  box-sizing: border-box;\n  margin: auto auto auto auto ;\n  position: relative ;\n  width: 630px ;\n}\n.close {\n  color: #999999 ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: color 200ms ease ;\n  width: 50px ;\n  z-index: 1 ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #000000 ;\n}\n.header {\n  background-color: #FFFFFF ;\n  border-bottom: 1px solid #EAECF1 ;\n  border-radius: 4px 4px 0px 0px ;\n  padding: 50px 0px 35px 0px ;\n}\n.header__title {\n  color: #464D5D ;\n  font-size: 28px ;\n  font-weight: 600 ;\n  line-height: 33px ;\n  margin: 0px 0px 30px 0px ;\n  text-align: center ;\n}\n.header__input {\n  border: 1px solid #DEE3E9 ;\n  box-sizing: border-box;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 400 ;\n  margin: 0px auto 0px auto ;\n  padding: 15px 18px 15px 18px ;\n  width: 550px;\n}\n.body {\n  border-radius: 0px 0px 4px 4px ;\n}\n.users {\n  height: 223px ;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  overflow-y: auto ;\n  padding: 35px 40px 40px 40px ;\n}\n.users__item {\n  border-bottom: 1px solid #DEE3E9 ;\n  margin: 0px 0px 0px 0px ;\n}\n.users__item:first-child {\n  border-top-width: 0px ;\n}\n.user-toggle {\n  align-items: center ;\n  cursor: pointer ;\n  display: flex ;\n  padding: 14px 0px 14px 0px ;\n  text-decoration: none ;\n}\n.user-toggle__avatar {\n  flex: 0 0 auto ;\n  margin-right: 13px ;\n}\n.user-toggle__name {\n  color: #7E8890 ;\n  flex: 1 1 100% ;\n  font-size: 16px ;\n  font-weight: 400 ;\n}\n.user-toggle__checkbox {\n  align-items: center ;\n  background-color: #FFFFFF ;\n  border: 1px solid #DADADA ;\n  border-radius: 100% ;\n  color: #DADADA ;\n  display: flex ;\n  font-size: 21px ;\n  flex: 0 0 auto ;\n  justify-content: center ;\n  height: 31px ;\n  width: 31px ;\n}\n.user-toggle--on .user-toggle__name {\n  color: #6CBB7D ;\n}\n.user-toggle--on .user-toggle__checkbox {\n  border-color: #6CBB7D ;\n  color: #6CBB7D ;\n  font-weight: 600 ;\n}\n.footer {\n  padding: 40px 0px 40px 0px ;\n}\n.footer__update {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin: 0px auto 0px auto ;\n  padding: 16px 0px 15px 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 183px ;\n}\n.footer__update:hover {\n  background-color: #7EC58D ;\n}\n"

/***/ }),
/* 379 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"modal\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<header class=\"header\">\n\t\t\t\n\t\t\t<h1 class=\"header__title\">\n\t\t\t\tAdd or Remove Board Members\n\t\t\t</h1>\n\n\t\t\t<input\n\t\t\t\ttype=\"text\" \n\t\t\t\tname=\"filterText\"\n\t\t\t\t[(ngModel)]=\"filterText\" \n\t\t\t\t(ngModelChange)=\"handleFilter()\" \n\t\t\t\tplaceholder=\"Search {{ users.length }} connections...\" \n\t\t\t\tautocomplete=\"off\"\n\t\t\t\tclass=\"header__input\" \n\t\t\t/>\n\n\t\t</header>\n\n\t\t<section class=\"body\">\n\t\t\t\n\t\t\t<ul class=\"users\">\n\t\t\t\t<li *ngFor=\"let user of users\" [appShowBlock]=\"renderedUsers[ user.id ]\" class=\"users__item\">\n\n\t\t\t\t\t<a (click)=\"toggleUser( user )\" class=\"user-toggle\" [class.user-toggle--on]=\"selectedUsers[ user.id ]\">\n\n\t\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t\t[initials]=\"user.initials\"\n\t\t\t\t\t\t\t[src]=\"user.avatarUrl\"\n\t\t\t\t\t\t\tclass=\"user-toggle__avatar\">\n\t\t\t\t\t\t</app-avatar>\n\n\t\t\t\t\t\t<span class=\"user-toggle__name\">\n\t\t\t\t\t\t\t{{ user.name }}\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<span class=\"user-toggle__checkbox\">\n\t\t\t\t\t\t\t+\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t</a>\n\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t</section>\n\n\t\t<footer class=\"footer\">\n\n\t\t\t<a (click)=\"update()\" class=\"footer__update\">\n\t\t\t\tUpdate\n\t\t\t</a>\n\n\t\t</footer>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</div>\n"

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var create_project_view_component_1 = __webpack_require__(381);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var CreateProjectViewModule = /** @class */ (function () {
    function CreateProjectViewModule() {
    }
    CreateProjectViewModule.routes = [
        {
            path: "create-project",
            component: create_project_view_component_1.CreateProjectViewComponent
        }
    ];
    CreateProjectViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                create_project_view_component_1.CreateProjectViewComponent
            ]
        })
    ], CreateProjectViewModule);
    return CreateProjectViewModule;
}());
exports.CreateProjectViewModule = CreateProjectViewModule;


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var keyboard_shortcuts_1 = __webpack_require__(9);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var CreateProjectViewComponent = /** @class */ (function () {
    // I initialize the create-project-view component.
    function CreateProjectViewComponent(activatedRoute, keyboardShortcuts, router) {
        this.activatedRoute = activatedRoute;
        this.keyboardShortcuts = keyboardShortcuts;
        this.router = router;
        this.form = {
            name: ""
        };
        this.options = [];
        this.projectType = null;
        this.selectedOption = "";
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    CreateProjectViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    // I get called once when the component is being unmounted.
    CreateProjectViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    // I get called once when the component is being mounted.
    CreateProjectViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.projectType = (paramMap.get("projectType") || null);
            // When switching the project type, we need to reset the options.
            _this.selectedOption = "";
            _this.options = [];
            switch (_this.projectType) {
                case "board":
                    _this.options = ["Masonry", "Meticulous", "Grid"];
                    break;
                case "prototype":
                    _this.options = ["Desktop (Web)", "iPad", "Android Tablet", "iPhone", "Android Phone", "Apple Watch", "Android Watch"];
                    break;
            }
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    CreateProjectViewComponent.prototype.processForm = function () {
        switch (this.projectType) {
            case "board":
                var resource = "boards/1";
                break;
            case "freehand":
                var resource = "freehands/1";
                break;
            case "prototype":
                var resource = "prototypes/1";
                break;
        }
        this.router.navigate([
            "/app",
            {
                outlets: {
                    primary: resource,
                    modal: null
                }
            }
        ]);
    };
    CreateProjectViewComponent.prototype.selectOption = function (option) {
        this.selectedOption = option;
    };
    CreateProjectViewComponent = __decorate([
        core_1.Component({
            selector: "create-project-view",
            styles: [__webpack_require__(382)],
            template: __webpack_require__(383)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            keyboard_shortcuts_1.KeyboardShortcuts,
            router_2.Router])
    ], CreateProjectViewComponent);
    return CreateProjectViewComponent;
}());
exports.CreateProjectViewComponent = CreateProjectViewComponent;


/***/ }),
/* 382 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.close {\n  background-color: #FFFFFF ;\n  border-radius: 40px 40px 40px 40px ;\n  color: #333333 ;\n  cursor: pointer ;\n  height: 40px ;\n  line-height: 40px ;\n  position: absolute ;\n  right: 30px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 25px ;\n  transition: background-color 200ms ease;\n  width: 40px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  background-color: #CCCCCC ;\n}\n.back {\n  background-color: #FFFFFF ;\n  border-radius: 40px 40px 40px 40px ;\n  color: #333333 ;\n  cursor: pointer ;\n  height: 40px ;\n  left: 30px ;\n  line-height: 40px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 25px ;\n  transition: background-color 200ms ease;\n  width: 40px ;\n}\n.back:after {\n  content: \"\\2190\";\n}\n.back:hover {\n  background-color: #CCCCCC ;\n}\nh1 {\n  color: #8C96A9 ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  line-height: 16px ;\n  margin: 80px 0px 5px 0px ;\n  text-align: center ;\n  text-transform: uppercase ;\n}\nh2 {\n  color: #434C5E ;\n  font-size: 30px ;\n  font-weight: 300 ;\n  line-height: 35px ;\n  margin: 0px 0px 40px 0px ;\n  text-align: center ;\n}\n.project-types {\n  height: 475px ;\n  list-style-type: none ;\n  margin: 0px auto 0px auto ;\n  padding: 0px 0px 0px 0px ;\n  position: relative ;\n  width: 1120px ;\n}\n.project-types__item {\n  height: 478px ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n  position: absolute ;\n  top: 0px ;\n  width: 320px ;\n}\n.project-types__item--col1 {\n  left: 0px ;\n}\n.project-types__item--col2 {\n  left: 400px ;\n}\n.project-types__item--col3 {\n  right: 0px ;\n}\n.project-type {\n  background-color: #FFFFFF ;\n  display: block ;\n  padding: 1px 0px 1px 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  width: 320px ;\n}\n.project-type__thumbnail {\n  background-color: #F0F0F0 ;\n  border-radius: 10px 10px 10px 10px ;\n  display: block ;\n  height: 222px ;\n  margin: 10px 10px 30px 10px ;\n  width: 300px ;\n}\n.project-type__name {\n  color: #596377 ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 700 ;\n  letter-spacing: 1.23px ;\n  line-height: 19px ;\n  margin-bottom: 20px ;\n  text-transform: uppercase ;\n}\n.project-type__description {\n  color: #8B95A9 ;\n  display: block ;\n  font-size: 13px ;\n  line-height: 20px ;\n  margin-bottom: 30px ;\n}\n.project-type__cta {\n  background-color: #FF3366 ;\n  border-radius: 40px 40px 40px 40px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  height: 40px ;\n  letter-spacing: 1.1px ;\n  line-height: 40px ;\n  margin: 0px auto 40px auto ;\n  text-transform: uppercase ;\n  width: 220px ;\n}\n.project-type:hover {\n  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1), 0px -1px 1px 1px rgba(0, 0, 0, 0.02);\n}\n.input {\n  border: 0px solid #A5ACBA ;\n  border-bottom-width: 1px ;\n  color: #434C5E ;\n  display: block ;\n  font-size: 30px ;\n  margin: 0px auto 40px auto ;\n  outline: 0px ;\n  padding: 16px 0px 16px 0px ;\n  text-align: center ;\n  width: 540px ;\n}\n.input::placeholder {\n  color: #CCCCCC ;\n}\n.project-options {\n  list-style-type: none ;\n  margin: 0px auto 0px auto ;\n  padding: 0px 0px 30px 0px ;\n  width: 880px ;\n}\n.project-options__item {\n  float: left ;\n  height: 173px ;\n  margin: 10px 10px 10px 10px ;\n  padding: 0px 0px 0px 0px ;\n  width: 200px ;\n}\n.project-options:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.project-options--length-3 {\n  width: 660px ;\n}\n.project-option {\n  display: block ;\n  height: 173px ;\n  padding-top: 1px ;\n  text-decoration: none ;\n  width: 200px ;\n}\n.project-option__thumbnail {\n  background-color: #F0F0F0 ;\n  border-radius: 10px 10px 10px 10px ;\n  display: block ;\n  height: 120px ;\n  margin: 10px auto 10px auto ;\n  width: 180px ;\n}\n.project-option__name {\n  color: #596377 ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 400 ;\n  line-height: 19px ;\n  text-align: center ;\n}\n.project-option:hover {\n  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1), 0px -1px 1px 1px rgba(0, 0, 0, 0.02);\n}\n.project-option--on .project-option__thumbnail {\n  background-color: rgba(255, 51, 102, 0.1);\n}\n.get-started {\n  background-color: #14B876 ;\n  border-radius: 44px 44px 44px 44px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  height: 44px ;\n  letter-spacing: 1px ;\n  line-height: 44px ;\n  margin: 0px auto 80px auto ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 180px ;\n}\n"

/***/ }),
/* 383 */
/***/ (function(module, exports) {

module.exports = "\n<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n<h1>\n\tCreate New Project\n</h1>\n\n<!-- BEGIN: Project Type Selection. -->\n<ng-template [ngIf]=\"! projectType\">\n\t\n\t<h2>\n\t\tChoose a project type\n\t</h2>\n\n\t<ul class=\"project-types\">\n\t\t<li class=\"project-types__item project-types__item--col1\">\n\n\t\t\t<a [routerLink]=\"[{ projectType: 'prototype' }]\" class=\"project-types__type project-type project-type\">\n\n\t\t\t\t<span class=\"project-type__thumbnail\"></span>\n\t\t\t\t<span class=\"project-type__name\">\n\t\t\t\t\tPrototype\n\t\t\t\t</span>\n\t\t\t\t<span class=\"project-type__description\">\n\t\t\t\t\tInteractive mockup of a web,<br />\n\t\t\t\t\tmobile or wearable experience.\n\t\t\t\t</span>\n\t\t\t\t<span class=\"project-type__cta\">\n\t\t\t\t\tCreate New Prototype\n\t\t\t\t</span>\n\n\t\t\t</a>\n\n\t\t</li>\n\t\t<li class=\"project-types__item project-types__item--col2\">\n\n\t\t\t<a [routerLink]=\"[{ projectType: 'board' }]\" class=\"project-types__type project-type\">\n\t\t\t\t\n\t\t\t\t<span class=\"project-type__thumbnail\"></span>\n\t\t\t\t<span class=\"project-type__name\">\n\t\t\t\t\tBoard\n\t\t\t\t</span>\n\t\t\t\t<span class=\"project-type__description\">\n\t\t\t\t\tCollaborative moodboard, brandboard,<br />\n\t\t\t\t\tdesign story or collection.\n\t\t\t\t</span>\n\t\t\t\t<span class=\"project-type__cta\">\n\t\t\t\t\tCreate New Board\n\t\t\t\t</span>\n\n\t\t\t</a>\n\n\t\t</li>\n\t\t<li class=\"project-types__item project-types__item--col3\">\n\n\t\t\t<a [routerLink]=\"[{ projectType: 'freehand' }]\" class=\"project-types__type project-type\">\n\t\t\t\t\n\t\t\t\t<span class=\"project-type__thumbnail\"></span>\n\t\t\t\t<span class=\"project-type__name\">\n\t\t\t\t\tFreehand\n\t\t\t\t</span>\n\t\t\t\t<span class=\"project-type__description\">\n\t\t\t\t\tSketch, collaborate on design changes,<br />\n\t\t\t\t\tor co-draw in real time.\n\t\t\t\t</span>\n\t\t\t\t<span class=\"project-type__cta\">\n\t\t\t\t\tCreate New Freehand\n\t\t\t\t</span>\n\n\t\t\t</a>\n\n\t\t</li>\n\t</ul>\n\n</ng-template>\n<!-- END: Project Type Selection. -->\n\n\n<!-- BEGIN: Project Form. -->\n<ng-template [ngIf]=\"projectType\">\n\n\t<a [routerLink]=\"[{ projectType: '' }]\" class=\"back\"></a>\n\n\t<form (submit)=\"processForm()\">\n\n\t\t<input name=\"name\" [(ngModel)]=\"form.name\" placeholder=\"Add a project name\" autofocus class=\"input\" />\n\t\t\n\t\t<ul *ngIf=\"options.length\" class=\"project-options project-options--length-{{ options.length }}\">\n\t\t\t<li *ngFor=\"let option of options\" class=\"project-options__item\">\n\n\t\t\t\t<a\n\t\t\t\t\t(click)=\"selectOption( option )\"\n\t\t\t\t\tclass=\"project-options__option project-option\"\n\t\t\t\t\t[class.project-option--on]=\"( option === selectedOption )\">\n\n\t\t\t\t\t<span class=\"project-option__thumbnail\"></span>\n\t\t\t\t\t<span class=\"project-option__name\">\n\t\t\t\t\t\t{{ option }}\n\t\t\t\t\t</span>\n\n\t\t\t\t</a>\n\n\t\t\t</li>\n\t\t</ul>\n\n\t\t<a (click)=\"processForm()\" class=\"get-started\">\n\t\t\tGet Started\n\t\t</a>\n\n\t</form>\n\n</ng-template>\n<!-- END: Project Form. -->\n"

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var enterprise_demo_scheduled_view_component_1 = __webpack_require__(385);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var EnterpriseDemoScheduledViewModule = /** @class */ (function () {
    function EnterpriseDemoScheduledViewModule() {
    }
    EnterpriseDemoScheduledViewModule.routes = [
        {
            path: "enterprise-demo-scheduled",
            component: enterprise_demo_scheduled_view_component_1.EnterpriseDemoScheduledViewComponent
        }
    ];
    EnterpriseDemoScheduledViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                enterprise_demo_scheduled_view_component_1.EnterpriseDemoScheduledViewComponent
            ]
        })
    ], EnterpriseDemoScheduledViewModule);
    return EnterpriseDemoScheduledViewModule;
}());
exports.EnterpriseDemoScheduledViewModule = EnterpriseDemoScheduledViewModule;


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var keyboard_shortcuts_1 = __webpack_require__(9);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var EnterpriseDemoScheduledViewComponent = /** @class */ (function () {
    // I initialize the enterprise-demo-scheduled-view component.
    function EnterpriseDemoScheduledViewComponent(activatedRoute, keyboardShortcuts, router) {
        this.activatedRoute = activatedRoute;
        this.keyboardShortcuts = keyboardShortcuts;
        this.router = router;
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    EnterpriseDemoScheduledViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    // I get called once when the component is being unmounted.
    EnterpriseDemoScheduledViewComponent.prototype.ngOnDestroy = function () {
        (this.unlisten) && this.unlisten();
    };
    // I get called once when the component is being mounted.
    EnterpriseDemoScheduledViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    EnterpriseDemoScheduledViewComponent = __decorate([
        core_1.Component({
            selector: "enterprise-demo-scheduled-view",
            styles: [__webpack_require__(386)],
            template: __webpack_require__(387)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            keyboard_shortcuts_1.KeyboardShortcuts,
            router_2.Router])
    ], EnterpriseDemoScheduledViewComponent);
    return EnterpriseDemoScheduledViewComponent;
}());
exports.EnterpriseDemoScheduledViewComponent = EnterpriseDemoScheduledViewComponent;


/***/ }),
/* 386 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.content {\n  flex: 0 0 auto ;\n  margin: auto auto auto auto ;\n  text-align: center ;\n  width: 500px ;\n}\n.checkmark {\n  border: 2px solid #1E8FE1 ;\n  border-radius: 71px 71px 71px 71px ;\n  color: #1E8FE1;\n  font-size: 37px ;\n  font-weight: 600 ;\n  height: 71px ;\n  line-height: 71px ;\n  margin: 0px auto 50px auto ;\n  width: 71px ;\n}\n.title {\n  color: #434C5F ;\n  font-size: 30px ;\n  font-weight: 400 ;\n  line-height: 35px ;\n  margin-bottom: 20px ;\n}\n.description {\n  color: #5F697A ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 25px ;\n}\n.back {\n  background-color: #1E8FE1 ;\n  border-radius: 57px 57px 57px 57px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  line-height: 57px ;\n  margin: 60px auto 0px auto ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 250px ;\n}\n"

/***/ }),
/* 387 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"content\">\n\n\t<div class=\"checkmark\">\n\t\t✔\n\t</div>\n\n\t<div class=\"title\">\n\t\tKeep an eye on your inbox...\n\t</div>\n\n\t<div class=\"description\">\n\t\tWe will be in touch soon with details about how to get your team started\n\t\twith InVision Enterprise.\n\t</div>\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"back\">\n\t\tBack to InVision\n\t</a>\n\n</div>\n"

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var enterprise_demo_view_component_1 = __webpack_require__(389);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var EnterpriseDemoViewModule = /** @class */ (function () {
    function EnterpriseDemoViewModule() {
    }
    EnterpriseDemoViewModule.routes = [
        {
            path: "enterprise-demo",
            component: enterprise_demo_view_component_1.EnterpriseDemoViewComponent
        }
    ];
    EnterpriseDemoViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                enterprise_demo_view_component_1.EnterpriseDemoViewComponent
            ]
        })
    ], EnterpriseDemoViewModule);
    return EnterpriseDemoViewModule;
}());
exports.EnterpriseDemoViewModule = EnterpriseDemoViewModule;


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var keyboard_shortcuts_1 = __webpack_require__(9);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var EnterpriseDemoViewComponent = /** @class */ (function () {
    // I initialize the enterprise-demo-view component.
    function EnterpriseDemoViewComponent(activatedRoute, keyboardShortcuts, router) {
        this.activatedRoute = activatedRoute;
        this.keyboardShortcuts = keyboardShortcuts;
        this.router = router;
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    EnterpriseDemoViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    // I get called once when the component is being unmounted.
    EnterpriseDemoViewComponent.prototype.ngOnDestroy = function () {
        (this.unlisten) && this.unlisten();
    };
    // I get called once when the component is being mounted.
    EnterpriseDemoViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    EnterpriseDemoViewComponent = __decorate([
        core_1.Component({
            selector: "enterprise-demo-view",
            styles: [__webpack_require__(390)],
            template: __webpack_require__(391)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            keyboard_shortcuts_1.KeyboardShortcuts,
            router_2.Router])
    ], EnterpriseDemoViewComponent);
    return EnterpriseDemoViewComponent;
}());
exports.EnterpriseDemoViewComponent = EnterpriseDemoViewComponent;


/***/ }),
/* 390 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.close {\n  background-color: #FFFFFF ;\n  border-radius: 40px 40px 40px 40px ;\n  color: #333333 ;\n  cursor: pointer ;\n  height: 40px ;\n  line-height: 40px ;\n  position: absolute ;\n  right: 30px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 25px ;\n  transition: background-color 200ms ease;\n  width: 40px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  background-color: #CCCCCC ;\n}\n.sidebar-column {\n  background-color: #242838 ;\n  display: flex ;\n  flex-direction: column ;\n  position: relative ;\n  flex: 0 0 auto ;\n  width: 460px ;\n}\n.sidebar-column__features {\n  flex: 0 0 auto ;\n  margin: auto 40px auto 40px ;\n}\n.content-column {\n  box-sizing: border-box;\n  display: flex ;\n  flex: 1 1 auto ;\n  padding: 20px 20px 20px 20px ;\n  overflow: auto ;\n}\n.content-column__content {\n  margin: auto auto auto auto ;\n}\n.in {\n  background-color: #FFFFFF ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #242838 ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  height: 40px ;\n  line-height: 40px ;\n  left: 40px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 40px ;\n  width: 40px ;\n  z-index: 2 ;\n}\n.features {\n  color: #FFFFFF ;\n}\n.features__title {\n  font-size: 14px ;\n  font-weight: 600 ;\n  letter-spacing: 1px ;\n  line-height: 19px ;\n  margin-bottom: 40px ;\n  text-transform: uppercase ;\n}\n.features__list {\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.features__feature {\n  margin: 0px 0px 50px 0px ;\n  padding: 0px 0px 0px 60px ;\n  position: relative ;\n}\n.features__feature:last-child {\n  margin-bottom: 0px ;\n}\n.features__feature:before {\n  border: 1px solid #1E8FE1 ;\n  border-radius: 4px 4px 4px 4px ;\n  content: \"\";\n  height: 40px ;\n  left: 0px ;\n  position: absolute ;\n  top: 0px ;\n  width: 40px ;\n}\n.features__name {\n  font-size: 15px ;\n  font-weight: 600 ;\n  line-height: 20px ;\n  margin-bottom: 3px ;\n}\n.features__description {\n  color: #CCCCCC ;\n  font-size: 13px ;\n  line-height: 18px ;\n}\n.trusted {\n  bottom: 40px ;\n  color: #999999 ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  left: 40px ;\n  letter-spacing: 1px ;\n  line-height: 16px ;\n  position: absolute ;\n  text-transform: uppercase ;\n}\n.header {\n  color: #434C5E ;\n  font-weight: 400 ;\n  text-align: center ;\n}\n.header__title {\n  font-size: 30px ;\n  line-height: 35px ;\n  margin-bottom: 20px ;\n}\n.header__subtitle {\n  font-size: 16px ;\n  margin-bottom: 75px ;\n}\n.form {\n  background-color: #FAFAFA ;\n  box-sizing: border-box;\n  color: #999999 ;\n  height: 400px ;\n  margin: 35px 0px 40px 0px ;\n  padding: 20px 20px 20px 20px ;\n  width: 540px ;\n}\n.schedule {\n  background-color: #1E8FE1 ;\n  border-radius: 57px 57px 57px 57px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  line-height: 57px ;\n  margin: 0px auto 0px auto ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 275px ;\n}\n"

/***/ }),
/* 391 */
/***/ (function(module, exports) {

module.exports = "\n<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n<div class=\"sidebar-column\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"in\">\n\t\tin\n\t</a>\n\n\t<div class=\"sidebar-column__features features\">\n\n\t\t<div class=\"features__title\">\n\t\t\tThe top product design cloud, featuring:\n\t\t</div>\n\n\t\t<ul class=\"features__list\">\n\t\t\t<li class=\"features__feature\">\n\t\t\t\t<div class=\"features__name\">\n\t\t\t\t\tUnlimited Access\n\t\t\t\t</div>\n\t\t\t\t<div class=\"features__description\">\n\t\t\t\t\tNo limits on projects, members and storage\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class=\"features__feature\">\n\t\t\t\t<div class=\"features__name\">\n\t\t\t\t\tCustom Workflows\n\t\t\t\t</div>\n\t\t\t\t<div class=\"features__description\">\n\t\t\t\t\tDetailed control over your team’s design process\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class=\"features__feature\">\n\t\t\t\t<div class=\"features__name\">\n\t\t\t\t\tEnhanced Security\n\t\t\t\t</div>\n\t\t\t\t<div class=\"features__description\">\n\t\t\t\t\t256-bit encryption, SSO and user management\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class=\"features__feature\">\n\t\t\t\t<div class=\"features__name\">\n\t\t\t\t\tPriority Support\n\t\t\t\t</div>\n\t\t\t\t<div class=\"features__description\">\n\t\t\t\t\tGet the white glove treatment that you deserve\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\n\t</div>\n\n\t<div class=\"trusted\">\n\t\tTrusted by the world's smartest companies\n\t</div>\n\n</div>\n\n<div class=\"content-column\">\n\t<div class=\"content-column__content\">\n\n\t\t<header class=\"header\">\n\t\t\t<div class=\"header__title\">\n\t\t\t\tGet a Demo of InVision Enterprise!\n\t\t\t</div>\n\n\t\t\t<div class=\"header__subtitle\">\n\t\t\t\tNo credit card required. No setup fees. No obligation.\n\t\t\t</div>\n\t\t</header>\n\n\t\t<div class=\"form\">\n\t\t\t( Contact information form )\n\t\t</div>\n\n\t\t<a [routerLink]=\"[ '/app', { outlets: { modal: 'modal/enterprise-demo-scheduled' } } ]\" class=\"schedule\">\n\t\t\tSchedule Demo\n\t\t</a>\n\n\t</div>\n</div>"

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var do_not_show_modal_on_refresh_guard_1 = __webpack_require__(122);
var error_view_component_1 = __webpack_require__(393);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ErrorViewModule = /** @class */ (function () {
    function ErrorViewModule() {
    }
    ErrorViewModule.routes = [
        {
            path: "error/:type",
            component: error_view_component_1.ErrorViewComponent,
            canActivate: [do_not_show_modal_on_refresh_guard_1.DoNotShowModalOnRefreshGuard]
        }
    ];
    ErrorViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                error_view_component_1.ErrorViewComponent
            ]
        })
    ], ErrorViewModule);
    return ErrorViewModule;
}());
exports.ErrorViewModule = ErrorViewModule;


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var keyboard_shortcuts_1 = __webpack_require__(9);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ErrorViewComponent = /** @class */ (function () {
    // I initialize the create-project-view component.
    function ErrorViewComponent(activatedRoute, keyboardShortcuts, router) {
        this.activatedRoute = activatedRoute;
        this.keyboardShortcuts = keyboardShortcuts;
        this.router = router;
        this.setType();
        this.unlisten = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    ErrorViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    ErrorViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    ErrorViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.setType(paramMap.get("type"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            // Enable the inputs option so that an input focused somewhere in the 
            // background won't prevent the Esc-key from closing the modal.
            inputs: true
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ErrorViewComponent.prototype.setType = function (type) {
        if (type === void 0) { type = "generic"; }
        switch (this.type = type) {
            case "cannot-build-empty-prototype":
                this.title = "Your Prototype Is Empty";
                this.message = "Sorry, you must upload at least one screen before you can start building out the prototype in the Console.";
                break;
            case "could-not-load-board":
                this.title = "Not Found";
                this.message = "Sorry, we were unable to locate the selected board.";
                break;
            case "could-not-load-board-item":
                this.title = "Not Found";
                this.message = "Sorry, we were unable to load the selected item. It's possible that it was deleted since you last accessed it. Try refreshing your browser to make sure you have the most up-to-date list of items.";
                break;
            case "could-not-load-freehand":
                this.title = "Not Found";
                this.message = "Sorry, we were unable to locate the selected freehand.";
                break;
            case "could-not-load-inbox":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to load your Inbox. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-inbox-conversation":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to load the selected Inbox conversation. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-inbox-thread":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to load the selected Inbox thread. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-people":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to load your team members. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-person":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to location the selected team member.";
                break;
            case "could-not-load-product-updates":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to load the recent product updates. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-projects":
                this.title = "Something Went Wrong";
                this.message = "Sorry, we were unable to load your projects. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-prototype":
                this.title = "Not Found";
                this.message = "Sorry, we were unable to locate the selected prototype.";
                break;
            case "could-not-load-prototype-screens":
                this.title = "Not Found";
                this.message = "Sorry, we were unable to load the selected prototype screens. Please wait and try again in a few minutes.";
                break;
            case "could-not-load-screen":
                this.title = "Not Found";
                this.message = "Sorry, we were unable to load the selected screen. It's possible that it was archived or deleted since you last accessed it. Try refreshing your browser to make sure you have the most up-to-date list of screens.";
                break;
            default:
                this.title = "Something Went Wrong";
                this.message = "Sorry, an unexpected error occurred and we are unable to process your request at this time. The error has been logged an our engineering team will be investigating.";
                break;
        }
    };
    ErrorViewComponent = __decorate([
        core_1.Component({
            selector: "error-view",
            host: {
                "(directclick)": "closeModal()"
            },
            styles: [__webpack_require__(394)],
            template: __webpack_require__(395)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            keyboard_shortcuts_1.KeyboardShortcuts,
            router_2.Router])
    ], ErrorViewComponent);
    return ErrorViewComponent;
}());
exports.ErrorViewComponent = ErrorViewComponent;


/***/ }),
/* 394 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: rgba(50, 58, 69, 0.96);\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modal {\n  background-color: #FFFFFF ;\n  border-radius: 4px 4px 4px 4px ;\n  box-sizing: border-box;\n  margin: auto auto auto auto ;\n  padding: 40px 40px 40px 40px ;\n  position: relative ;\n  width: 630px ;\n}\n.close {\n  color: #999999 ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: color 200ms ease ;\n  width: 50px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #000000 ;\n}\n.title {\n  color: #464D5D ;\n  font-size: 28px ;\n  font-weight: 600 ;\n  line-height: 33px ;\n  margin: 0px 0px 20px 0px ;\n}\n.message {\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 26px ;\n  margin: 0px 0px 0px 0px ;\n}\n"

/***/ }),
/* 395 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"modal\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n\t<h1 class=\"title\">\n\t\t{{ title }}\n\t</h1>\n\n\t<p class=\"message\">\n\t\t{{ message }}\n\t</p>\n\n</div>\n"

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var dom_utils_1 = __webpack_require__(38);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ModalViewComponent = /** @class */ (function () {
    // I initialize the modal-view component.
    function ModalViewComponent(domUtils) {
        this.domUtils = domUtils;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I get called once when the component is being unmounted.
    ModalViewComponent.prototype.ngOnDestroy = function () {
        // When we close the modal window, we can allow any overflow of the HTML page to
        // show; this will re-enable the natural scrollbars on the main page.
        this.domUtils.showHtmlOverflow();
    };
    // I get called once when the component it about to be mounted.
    ModalViewComponent.prototype.ngOnInit = function () {
        // When we open a modal window, it will have it's own scrollbar. In order to not
        // show two scrollbars doubled-up on the side of the screen, we have to make sure
        // that the HTML page doesn't show a scrollbar for the main body.
        this.domUtils.hideHtmlOverflow();
    };
    ModalViewComponent = __decorate([
        core_1.Component({
            selector: "modal-view",
            styles: [__webpack_require__(397)],
            template: __webpack_require__(398)
        }),
        __metadata("design:paramtypes", [dom_utils_1.DomUtils])
    ], ModalViewComponent);
    return ModalViewComponent;
}());
exports.ModalViewComponent = ModalViewComponent;


/***/ }),
/* 397 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: fixed ;\n  right: 0px ;\n  top: 0px ;\n  z-index: 103 ;\n}\n"

/***/ }),
/* 398 */
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>\n"

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var partial_service_1 = __webpack_require__(123);
var prototype_members_view_component_1 = __webpack_require__(400);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PrototypeMembersViewModule = /** @class */ (function () {
    function PrototypeMembersViewModule() {
    }
    PrototypeMembersViewModule.routes = [
        {
            path: "prototype-members/:id",
            component: prototype_members_view_component_1.PrototypeMembersViewComponent
        }
    ];
    PrototypeMembersViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                prototype_members_view_component_1.PrototypeMembersViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], PrototypeMembersViewModule);
    return PrototypeMembersViewModule;
}());
exports.PrototypeMembersViewModule = PrototypeMembersViewModule;


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var lodash_extended_1 = __webpack_require__(13);
var error_logger_1 = __webpack_require__(4);
var keyboard_shortcuts_1 = __webpack_require__(9);
var partial_service_1 = __webpack_require__(123);
var PrototypeMembersViewComponent = /** @class */ (function () {
    // I initialize the create-project-view component.
    function PrototypeMembersViewComponent(activatedRoute, errorLogger, keyboardShortcuts, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.keyboardShortcuts = keyboardShortcuts;
        this.partialService = partialService;
        this.router = router;
        this.prototype = null;
        this.filterText = "";
        this.isLoading = true;
        this.members = null;
        this.renderedUsers = {};
        this.selectedUsers = {};
        this.users = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I close the modal window.
    PrototypeMembersViewComponent.prototype.closeModal = function () {
        this.router.navigate([
            "/app",
            {
                outlets: {
                    modal: null
                }
            }
        ]);
    };
    PrototypeMembersViewComponent.prototype.handleFilter = function () {
        var value = this.filterText.toLowerCase();
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (value) {
                this.renderedUsers[user.id] = user.name.toLowerCase().includes(value);
            }
            else {
                this.renderedUsers[user.id] = true;
            }
        }
    };
    // I get called once when the component is being unmounted.
    PrototypeMembersViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
        (this.unlisten) && this.unlisten();
    };
    // I get called once when the component is being mounted.
    PrototypeMembersViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.unlisten = this.keyboardShortcuts.listen({
            "Escape": function (event) {
                _this.closeModal();
            }
        }, {
            priority: this.keyboardShortcuts.getPriority("modal"),
            inputs: true
        });
    };
    PrototypeMembersViewComponent.prototype.toggleUser = function (user) {
        this.selectedUsers[user.id] = !this.selectedUsers[user.id];
    };
    PrototypeMembersViewComponent.prototype.update = function () {
        this.closeModal();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    PrototypeMembersViewComponent.prototype.loadData = function (prototypeID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(prototypeID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.members = partial.members;
            _this.prototype = partial.prototype;
            _this.users = partial.users;
            // Setup the collection of user IDs.
            for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                _this.renderedUsers[user.id] = true;
                _this.selectedUsers[user.id] = !!lodash_extended_1._.find(_this.members, { id: user.id });
            }
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-prototype"
                    }
                }
            ]);
        });
    };
    PrototypeMembersViewComponent = __decorate([
        core_1.Component({
            selector: "prototype-members-view",
            host: {
                "(directclick)": "closeModal()"
            },
            styles: [__webpack_require__(401)],
            template: __webpack_require__(402)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            keyboard_shortcuts_1.KeyboardShortcuts,
            partial_service_1.PartialService,
            router_2.Router])
    ], PrototypeMembersViewComponent);
    return PrototypeMembersViewComponent;
}());
exports.PrototypeMembersViewComponent = PrototypeMembersViewComponent;


/***/ }),
/* 401 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: rgba(50, 58, 69, 0.96);\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modal {\n  background-color: #F9F9FB ;\n  border-radius: 4px 4px 4px 4px ;\n  box-sizing: border-box;\n  margin: auto auto auto auto ;\n  position: relative ;\n  width: 630px ;\n}\n.close {\n  color: #999999 ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: color 200ms ease ;\n  width: 50px ;\n  z-index: 1 ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #000000 ;\n}\n.header {\n  background-color: #FFFFFF ;\n  border-bottom: 1px solid #EAECF1 ;\n  border-radius: 4px 4px 0px 0px ;\n  padding: 50px 0px 35px 0px ;\n}\n.header__title {\n  color: #464D5D ;\n  font-size: 28px ;\n  font-weight: 600 ;\n  line-height: 33px ;\n  margin: 0px 0px 30px 0px ;\n  text-align: center ;\n}\n.header__input {\n  border: 1px solid #DEE3E9 ;\n  box-sizing: border-box;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 400 ;\n  margin: 0px auto 0px auto ;\n  padding: 15px 18px 15px 18px ;\n  width: 550px;\n}\n.body {\n  border-radius: 0px 0px 4px 4px ;\n}\n.users {\n  height: 223px ;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  overflow-y: auto ;\n  padding: 35px 40px 40px 40px ;\n}\n.users__item {\n  border-bottom: 1px solid #DEE3E9 ;\n  margin: 0px 0px 0px 0px ;\n}\n.users__item:first-child {\n  border-top-width: 0px ;\n}\n.user-toggle {\n  align-items: center ;\n  cursor: pointer ;\n  display: flex ;\n  padding: 14px 0px 14px 0px ;\n  text-decoration: none ;\n}\n.user-toggle__avatar {\n  flex: 0 0 auto ;\n  margin-right: 13px ;\n}\n.user-toggle__name {\n  color: #7E8890 ;\n  flex: 1 1 100% ;\n  font-size: 16px ;\n  font-weight: 400 ;\n}\n.user-toggle__checkbox {\n  align-items: center ;\n  background-color: #FFFFFF ;\n  border: 1px solid #DADADA ;\n  border-radius: 100% ;\n  color: #DADADA ;\n  display: flex ;\n  font-size: 21px ;\n  flex: 0 0 auto ;\n  justify-content: center ;\n  height: 31px ;\n  width: 31px ;\n}\n.user-toggle--on .user-toggle__name {\n  color: #6CBB7D ;\n}\n.user-toggle--on .user-toggle__checkbox {\n  border-color: #6CBB7D ;\n  color: #6CBB7D ;\n  font-weight: 600 ;\n}\n.footer {\n  padding: 40px 0px 40px 0px ;\n}\n.footer__update {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin: 0px auto 0px auto ;\n  padding: 16px 0px 15px 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 183px ;\n}\n.footer__update:hover {\n  background-color: #7EC58D ;\n}\n"

/***/ }),
/* 402 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"modal\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<header class=\"header\">\n\t\t\t\n\t\t\t<h1 class=\"header__title\">\n\t\t\t\tAdd or Remove Prototype Members\n\t\t\t</h1>\n\n\t\t\t<input\n\t\t\t\ttype=\"text\" \n\t\t\t\tname=\"filterText\"\n\t\t\t\t[(ngModel)]=\"filterText\" \n\t\t\t\t(ngModelChange)=\"handleFilter()\" \n\t\t\t\tplaceholder=\"Search {{ users.length }} connections...\" \n\t\t\t\tautocomplete=\"off\"\n\t\t\t\tclass=\"header__input\" \n\t\t\t/>\n\n\t\t</header>\n\n\t\t<section class=\"body\">\n\t\t\t\n\t\t\t<ul class=\"users\">\n\t\t\t\t<li *ngFor=\"let user of users\" [appShowBlock]=\"renderedUsers[ user.id ]\" class=\"users__item\">\n\n\t\t\t\t\t<a (click)=\"toggleUser( user )\" class=\"user-toggle\" [class.user-toggle--on]=\"selectedUsers[ user.id ]\">\n\n\t\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t\t[initials]=\"user.initials\"\n\t\t\t\t\t\t\t[src]=\"user.avatarUrl\"\n\t\t\t\t\t\t\tclass=\"user-toggle__avatar\">\n\t\t\t\t\t\t</app-avatar>\n\n\t\t\t\t\t\t<span class=\"user-toggle__name\">\n\t\t\t\t\t\t\t{{ user.name }}\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<span class=\"user-toggle__checkbox\">\n\t\t\t\t\t\t\t+\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t</a>\n\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t</section>\n\n\t\t<footer class=\"footer\">\n\n\t\t\t<a (click)=\"update()\" class=\"footer__update\">\n\t\t\t\tUpdate\n\t\t\t</a>\n\n\t\t</footer>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</div>\n"

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var email_view_component_1 = __webpack_require__(404);
var partial_service_1 = __webpack_require__(124);
var shared_module_1 = __webpack_require__(2);
var share_board_view_component_1 = __webpack_require__(40);
var sms_view_component_1 = __webpack_require__(409);
var url_view_component_1 = __webpack_require__(412);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ShareBoardViewModule = /** @class */ (function () {
    function ShareBoardViewModule() {
    }
    ShareBoardViewModule.routes = [
        {
            path: "share-board/:id",
            component: share_board_view_component_1.ShareBoardViewComponent,
            children: [
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "url"
                },
                {
                    path: "url",
                    component: url_view_component_1.UrlViewComponent
                },
                {
                    path: "email",
                    component: email_view_component_1.EmailViewComponent
                },
                {
                    path: "sms",
                    component: sms_view_component_1.SmsViewComponent
                }
            ]
        }
    ];
    ShareBoardViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                email_view_component_1.EmailViewComponent,
                share_board_view_component_1.ShareBoardViewComponent,
                sms_view_component_1.SmsViewComponent,
                url_view_component_1.UrlViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], ShareBoardViewModule);
    return ShareBoardViewModule;
}());
exports.ShareBoardViewModule = ShareBoardViewModule;


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var share_board_view_component_1 = __webpack_require__(40);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var EmailViewComponent = /** @class */ (function () {
    // I initialize the email-view component.
    function EmailViewComponent(parentView) {
        this.parentView = parentView;
    }
    EmailViewComponent = __decorate([
        core_1.Component({
            selector: "email-view",
            styles: [__webpack_require__(407)],
            template: __webpack_require__(408)
        }),
        __metadata("design:paramtypes", [share_board_view_component_1.ShareBoardViewComponent])
    ], EmailViewComponent);
    return EmailViewComponent;
}());
exports.EmailViewComponent = EmailViewComponent;


/***/ }),
/* 405 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: rgba(50, 58, 69, 0.96);\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modal {\n  background-color: #FFFFFF ;\n  border-radius: 4px 4px 4px 4px ;\n  box-sizing: border-box;\n  left: 50% ;\n  margin-left: -335px;\n  position: absolute ;\n  top: 150px ;\n  width: 670px ;\n}\n.close {\n  color: #999999 ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: color 200ms ease ;\n  width: 50px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #000000 ;\n}\n.header {\n  padding-top: 50px ;\n}\n.body {\n  background-color: #F9F9FB ;\n  border-radius: 0px 0px 4px 4px ;\n  border-top: 1px solid #EAECF1 ;\n  padding: 35px 65px 40px 65px ;\n}\nh1 {\n  color: #464D5D ;\n  font-size: 28px ;\n  font-weight: 600 ;\n  line-height: 33px ;\n  margin: 0px 0px 12px 0px ;\n  text-align: center ;\n}\n.delivery-methods {\n  display: flex ;\n  flex-direction: row ;\n  justify-content: center ;\n  line-height: 17px ;\n}\n.delivery-methods__method {\n  color: #A4ABB1 ;\n  flex: 0 0 auto ;\n  font-size: 12px ;\n  margin: 0px 7px 0px 7px ;\n  padding: 21px 10px 22px 10px ;\n  position: relative ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.delivery-methods__method--on {\n  color: #464D5D ;\n}\n.delivery-methods__method--on:after {\n  background-color: #52B266 ;\n  bottom: 0px ;\n  content: \"\";\n  height: 2px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n"

/***/ }),
/* 406 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"modal\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<header class=\"header\">\n\t\t\t\n\t\t\t<h1>\n\t\t\t\tShare Board\n\t\t\t</h1>\n\n\t\t\t<nav class=\"delivery-methods\">\n\t\t\t\t<a routerLink=\"./url\" class=\"delivery-methods__method\" routerLinkActive=\"delivery-methods__method--on\">\n\t\t\t\t\tUrl\n\t\t\t\t</a>\n\t\t\t\t<a routerLink=\"./email\" class=\"delivery-methods__method\" routerLinkActive=\"delivery-methods__method--on\">\n\t\t\t\t\tEmail\n\t\t\t\t</a>\n\t\t\t\t<a routerLink=\"./sms\" class=\"delivery-methods__method\" routerLinkActive=\"delivery-methods__method--on\">\n\t\t\t\t\tSMS\n\t\t\t\t</a>\n\t\t\t</nav>\n\n\t\t</header>\n\n\t\t<section class=\"body\">\n\t\t\t<router-outlet></router-outlet>\n\t\t</section>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</div>\n"

/***/ }),
/* 407 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.description {\n  font-size: 16px ;\n  line-height: 25px ;\n  margin-bottom: 40px ;\n}\n.description strong {\n  color: #1E8FE1 ;\n  font-weight: 600 ;\n}\n.form__label {\n  color: #3C5170 ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  margin-bottom: 10px ;\n  text-transform: uppercase ;\n}\n.form__field {\n  align-items: stretch ;\n  display: flex ;\n}\n.form__input {\n  border: 1px solid #DEE3E9 ;\n  border-right-width: 0px ;\n  border-radius: 3px 0px 0px 3px ;\n  box-sizing: border-box;\n  flex: 1 1 100% ;\n  font-size: 16px ;\n  line-height: 50px ;\n  padding: 0px 18px 0px 18px ;\n  width: 100% ;\n}\n.form__button {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-left-width: 0px ;\n  border-radius: 0px 3px 3px 0px ;\n  color: #FFFFFF ;\n  display: flex ;\n  flex: 0 0 auto ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  padding: 0px 25px 0px 25px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.form__button span {\n  margin: auto ;\n}\n.form__url {\n  font-size: 13px ;\n  line-height: 18px ;\n  margin-top: 20px ;\n}\n.form__url strong {\n  color: #3C5170 ;\n  font-weight: 600 ;\n  text-transform: uppercase ;\n}\n"

/***/ }),
/* 408 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"description\">\n\tYou are about to share the board, <strong>{{ parentView.board.name }}</strong>. \n\tThis will give other people access to your board content.\n</div>\n\n<form class=\"form\">\n\t\n\t<label class=\"form__label\">\n\t\tEmail This Priavte URL To Others:\n\t</label>\n\n\t<div class=\"form__field\">\n\n\t\t<input autofocus class=\"form__input\" />\n\n\t\t<a class=\"form__button\">\n\t\t\t<span>Send</span>\n\t\t</a>\n\n\t</div>\n\n\t<div class=\"form__url\">\n\t\t<strong>Share Url:</strong> {{ parentView.shareUrl }}\n\t</div>\n\n</form>\n"

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var share_board_view_component_1 = __webpack_require__(40);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var SmsViewComponent = /** @class */ (function () {
    // I initialize the sms-view component.
    function SmsViewComponent(parentView) {
        this.parentView = parentView;
    }
    SmsViewComponent = __decorate([
        core_1.Component({
            selector: "sms-view",
            styles: [__webpack_require__(410)],
            template: __webpack_require__(411)
        }),
        __metadata("design:paramtypes", [share_board_view_component_1.ShareBoardViewComponent])
    ], SmsViewComponent);
    return SmsViewComponent;
}());
exports.SmsViewComponent = SmsViewComponent;


/***/ }),
/* 410 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.header {\n  color: #464D5D ;\n  font-size: 16px ;\n  font-weight: 600 ;\n  line-height: 25px ;\n  margin-bottom: 10px ;\n}\n.description {\n  font-size: 16px ;\n  line-height: 25px ;\n  margin-bottom: 40px ;\n}\n.description strong {\n  color: #1E8FE1 ;\n  font-weight: 600 ;\n}\n.form__label {\n  color: #3C5170 ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  margin-bottom: 10px ;\n  text-transform: uppercase ;\n}\n.form__field {\n  align-items: stretch ;\n  display: flex ;\n}\n.form__input {\n  border: 1px solid #DEE3E9 ;\n  border-right-width: 0px ;\n  border-radius: 3px 0px 0px 3px ;\n  box-sizing: border-box;\n  flex: 1 1 100% ;\n  font-size: 16px ;\n  line-height: 50px ;\n  padding: 0px 18px 0px 18px ;\n  width: 100% ;\n}\n.form__button {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-left-width: 0px ;\n  border-radius: 0px 3px 3px 0px ;\n  color: #FFFFFF ;\n  display: flex ;\n  flex: 0 0 auto ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  padding: 0px 25px 0px 25px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.form__button span {\n  margin: auto ;\n}\n.form__url {\n  font-size: 13px ;\n  line-height: 18px ;\n  margin-top: 20px ;\n}\n.form__url strong {\n  color: #3C5170 ;\n  font-weight: 600 ;\n  text-transform: uppercase ;\n}\n"

/***/ }),
/* 411 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"header\">\n\tSend board to mobile device\n</div>\n\n<div class=\"description\">\n\tSend <strong>{{ parentView.board.name }}</strong> via SMS or visit the private \n\tURL on the mobile device to install this board directly to the device.\n</div>\n\n<form class=\"form\">\n\t\n\t<label class=\"form__label\">\n\t\tSend Via SMS:\n\t</label>\n\n\t<div class=\"form__field\">\n\n\t\t<input autofocus class=\"form__input\" />\n\n\t\t<a class=\"form__button\">\n\t\t\t<span>Send</span>\n\t\t</a>\n\n\t</div>\n\n\t<div class=\"form__url\">\n\t\t<strong>Share Url:</strong> {{ parentView.shareUrl }}\n\t</div>\n\n</form>\n"

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var share_board_view_component_1 = __webpack_require__(40);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var UrlViewComponent = /** @class */ (function () {
    // I initialize the url-view component.
    function UrlViewComponent(parentView) {
        this.parentView = parentView;
    }
    UrlViewComponent = __decorate([
        core_1.Component({
            selector: "url-view",
            styles: [__webpack_require__(413)],
            template: __webpack_require__(414)
        }),
        __metadata("design:paramtypes", [share_board_view_component_1.ShareBoardViewComponent])
    ], UrlViewComponent);
    return UrlViewComponent;
}());
exports.UrlViewComponent = UrlViewComponent;


/***/ }),
/* 413 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.description {\n  font-size: 16px ;\n  line-height: 25px ;\n  margin-bottom: 40px ;\n}\n.description strong {\n  color: #1E8FE1 ;\n  font-weight: 600 ;\n}\n.form__label {\n  color: #3C5170 ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  margin-bottom: 10px ;\n  text-transform: uppercase ;\n}\n.form__field {\n  align-items: stretch ;\n  display: flex ;\n}\n.form__input {\n  border: 1px solid #DEE3E9 ;\n  border-right-width: 0px ;\n  border-radius: 3px 0px 0px 3px ;\n  box-sizing: border-box;\n  flex: 1 1 100% ;\n  font-size: 16px ;\n  line-height: 50px ;\n  padding: 0px 18px 0px 18px ;\n  width: 100% ;\n}\n.form__button {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-left-width: 0px ;\n  border-radius: 0px 3px 3px 0px ;\n  color: #FFFFFF ;\n  display: flex ;\n  flex: 0 0 auto ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  padding: 0px 25px 0px 25px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.form__button span {\n  margin: auto ;\n}\n"

/***/ }),
/* 414 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"description\">\n\tYou are about to share the board, <strong>{{ parentView.board.name }}</strong>. \n\tThis will give other people access to your board content.\n</div>\n\n<form class=\"form\">\n\t\n\t<label class=\"form__label\">\n\t\tCopy This Priavte URL To Share:\n\t</label>\n\n\t<div class=\"form__field\">\n\t\t\n\t\t<input \n\t\t\t#input\n\t\t\t[value]=\"parentView.shareUrl\"\n\t\t\t(click)=\"input.select()\"\n\t\t\treadonly\n\t\t\tautofocus\n\t\t\tclass=\"form__input\"\n\t\t/>\n\n\t\t<a class=\"form__button\">\n\t\t\t<span>Copy</span>\n\t\t</a>\n\n\t</div>\n\n</form>\n"

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var email_view_component_1 = __webpack_require__(416);
var partial_service_1 = __webpack_require__(125);
var shared_module_1 = __webpack_require__(2);
var share_prototype_view_component_1 = __webpack_require__(41);
var sms_view_component_1 = __webpack_require__(421);
var url_view_component_1 = __webpack_require__(424);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var SharePrototypeViewModule = /** @class */ (function () {
    function SharePrototypeViewModule() {
    }
    SharePrototypeViewModule.routes = [
        {
            path: "share-prototype/:id",
            component: share_prototype_view_component_1.SharePrototypeViewComponent,
            children: [
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "url"
                },
                {
                    path: "url",
                    component: url_view_component_1.UrlViewComponent
                },
                {
                    path: "email",
                    component: email_view_component_1.EmailViewComponent
                },
                {
                    path: "sms",
                    component: sms_view_component_1.SmsViewComponent
                }
            ]
        }
    ];
    SharePrototypeViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                email_view_component_1.EmailViewComponent,
                share_prototype_view_component_1.SharePrototypeViewComponent,
                sms_view_component_1.SmsViewComponent,
                url_view_component_1.UrlViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], SharePrototypeViewModule);
    return SharePrototypeViewModule;
}());
exports.SharePrototypeViewModule = SharePrototypeViewModule;


/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var share_prototype_view_component_1 = __webpack_require__(41);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var EmailViewComponent = /** @class */ (function () {
    // I initialize the email-view component.
    function EmailViewComponent(parentView) {
        this.parentView = parentView;
    }
    EmailViewComponent = __decorate([
        core_1.Component({
            selector: "email-view",
            styles: [__webpack_require__(419)],
            template: __webpack_require__(420)
        }),
        __metadata("design:paramtypes", [share_prototype_view_component_1.SharePrototypeViewComponent])
    ], EmailViewComponent);
    return EmailViewComponent;
}());
exports.EmailViewComponent = EmailViewComponent;


/***/ }),
/* 417 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: rgba(50, 58, 69, 0.96);\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modal {\n  background-color: #FFFFFF ;\n  border-radius: 4px 4px 4px 4px ;\n  box-sizing: border-box;\n  left: 50% ;\n  margin-left: -335px;\n  position: absolute ;\n  top: 150px ;\n  width: 670px ;\n}\n.close {\n  color: #999999 ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: color 200ms ease ;\n  width: 50px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #000000 ;\n}\n.header {\n  padding-top: 50px ;\n}\n.body {\n  background-color: #F9F9FB ;\n  border-radius: 0px 0px 4px 4px ;\n  border-top: 1px solid #EAECF1 ;\n  padding: 35px 65px 40px 65px ;\n}\nh1 {\n  color: #464D5D ;\n  font-size: 28px ;\n  font-weight: 600 ;\n  line-height: 33px ;\n  margin: 0px 0px 12px 0px ;\n  text-align: center ;\n}\n.delivery-methods {\n  display: flex ;\n  flex-direction: row ;\n  justify-content: center ;\n  line-height: 17px ;\n}\n.delivery-methods__method {\n  color: #A4ABB1 ;\n  flex: 0 0 auto ;\n  font-size: 12px ;\n  margin: 0px 7px 0px 7px ;\n  padding: 21px 10px 22px 10px ;\n  position: relative ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.delivery-methods__method--on {\n  color: #464D5D ;\n}\n.delivery-methods__method--on:after {\n  background-color: #52B266 ;\n  bottom: 0px ;\n  content: \"\";\n  height: 2px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n"

/***/ }),
/* 418 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"modal\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<header class=\"header\">\n\t\t\t\n\t\t\t<h1>\n\t\t\t\tShare Prototype\n\t\t\t</h1>\n\n\t\t\t<nav class=\"delivery-methods\">\n\t\t\t\t<a routerLink=\"./url\" class=\"delivery-methods__method\" routerLinkActive=\"delivery-methods__method--on\">\n\t\t\t\t\tUrl\n\t\t\t\t</a>\n\t\t\t\t<a routerLink=\"./email\" class=\"delivery-methods__method\" routerLinkActive=\"delivery-methods__method--on\">\n\t\t\t\t\tEmail\n\t\t\t\t</a>\n\t\t\t\t<a routerLink=\"./sms\" class=\"delivery-methods__method\" routerLinkActive=\"delivery-methods__method--on\">\n\t\t\t\t\tSMS\n\t\t\t\t</a>\n\t\t\t</nav>\n\n\t\t</header>\n\n\t\t<section class=\"body\">\n\t\t\t<router-outlet></router-outlet>\n\t\t</section>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</div>\n"

/***/ }),
/* 419 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.description {\n  font-size: 16px ;\n  line-height: 25px ;\n  margin-bottom: 40px ;\n}\n.description strong {\n  color: #1E8FE1 ;\n  font-weight: 600 ;\n}\n.form__label {\n  color: #3C5170 ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  margin-bottom: 10px ;\n  text-transform: uppercase ;\n}\n.form__input {\n  border: 1px solid #DEE3E9 ;\n  border-radius: 3px 3px 3px 3px ;\n  box-sizing: border-box;\n  display: block ;\n  font-size: 16px ;\n  line-height: 21px ;\n  padding: 16px 18px 16px 18px ;\n  width: 100% ;\n}\n.form__url {\n  font-size: 13px ;\n  line-height: 18px ;\n  margin-top: 20px ;\n}\n.form__url strong {\n  color: #3C5170 ;\n  font-weight: 600 ;\n  text-transform: uppercase ;\n}\n"

/***/ }),
/* 420 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"description\">\n\tYou are about to share the prototype, <strong>{{ parentView.prototype.name }}</strong>. \n\tThis will give other people access to your prototype content.\n</div>\n\n<form class=\"form\">\n\t\n\t<label class=\"form__label\">\n\t\tEmail This Priavte URL To Others:\n\t</label>\n\n\t<input autofocus class=\"form__input\" />\n\n\t<div class=\"form__url\">\n\t\t<strong>Share Url:</strong> {{ parentView.shareUrl }}\n\t</div>\n\n</form>\n"

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var share_prototype_view_component_1 = __webpack_require__(41);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var SmsViewComponent = /** @class */ (function () {
    // I initialize the sms-view component.
    function SmsViewComponent(parentView) {
        this.parentView = parentView;
    }
    SmsViewComponent = __decorate([
        core_1.Component({
            selector: "sms-view",
            styles: [__webpack_require__(422)],
            template: __webpack_require__(423)
        }),
        __metadata("design:paramtypes", [share_prototype_view_component_1.SharePrototypeViewComponent])
    ], SmsViewComponent);
    return SmsViewComponent;
}());
exports.SmsViewComponent = SmsViewComponent;


/***/ }),
/* 422 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.header {\n  color: #464D5D ;\n  font-size: 16px ;\n  font-weight: 600 ;\n  line-height: 25px ;\n  margin-bottom: 10px ;\n}\n.description {\n  font-size: 16px ;\n  line-height: 25px ;\n  margin-bottom: 40px ;\n}\n.description strong {\n  color: #1E8FE1 ;\n  font-weight: 600 ;\n}\n.form__label {\n  color: #3C5170 ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  margin-bottom: 10px ;\n  text-transform: uppercase ;\n}\n.form__input {\n  border: 1px solid #DEE3E9 ;\n  border-radius: 3px 3px 3px 3px ;\n  box-sizing: border-box;\n  display: block ;\n  font-size: 16px ;\n  line-height: 21px ;\n  padding: 16px 18px 16px 18px ;\n  width: 100% ;\n}\n.form__url {\n  font-size: 13px ;\n  line-height: 18px ;\n  margin-top: 20px ;\n}\n.form__url strong {\n  color: #3C5170 ;\n  font-weight: 600 ;\n  text-transform: uppercase ;\n}\n"

/***/ }),
/* 423 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"header\">\n\tSend prototype to mobile device\n</div>\n\n<div class=\"description\">\n\tSend <strong>{{ parentView.prototype.name }}</strong> via SMS or visit the private \n\tURL on the mobile device to install this prototype directly to the device.\n</div>\n\n<form class=\"form\">\n\t\n\t<label class=\"form__label\">\n\t\tSend Via SMS:\n\t</label>\n\n\t<input autofocus class=\"form__input\" />\n\n\t<div class=\"form__url\">\n\t\t<strong>Share Url:</strong> {{ parentView.shareUrl }}\n\t</div>\n\n</form>\n"

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var share_prototype_view_component_1 = __webpack_require__(41);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var UrlViewComponent = /** @class */ (function () {
    // I initialize the url-view component.
    function UrlViewComponent(parentView) {
        this.parentView = parentView;
    }
    UrlViewComponent = __decorate([
        core_1.Component({
            selector: "url-view",
            styles: [__webpack_require__(425)],
            template: __webpack_require__(426)
        }),
        __metadata("design:paramtypes", [share_prototype_view_component_1.SharePrototypeViewComponent])
    ], UrlViewComponent);
    return UrlViewComponent;
}());
exports.UrlViewComponent = UrlViewComponent;


/***/ }),
/* 425 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.description {\n  font-size: 16px ;\n  line-height: 25px ;\n  margin-bottom: 40px ;\n}\n.description strong {\n  color: #1E8FE1 ;\n  font-weight: 600 ;\n}\n.form__label {\n  color: #3C5170 ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  margin-bottom: 10px ;\n  text-transform: uppercase ;\n}\n.form__field {\n  align-items: stretch ;\n  display: flex ;\n}\n.form__input {\n  border: 1px solid #DEE3E9 ;\n  border-right-width: 0px ;\n  border-radius: 3px 0px 0px 3px ;\n  box-sizing: border-box;\n  flex: 1 1 100% ;\n  font-size: 16px ;\n  line-height: 50px ;\n  padding: 0px 18px 0px 18px ;\n  width: 100% ;\n}\n.form__button {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-left-width: 0px ;\n  border-radius: 0px 3px 3px 0px ;\n  color: #FFFFFF ;\n  display: flex ;\n  flex: 0 0 auto ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  padding: 0px 25px 0px 25px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.form__button span {\n  margin: auto ;\n}\n"

/***/ }),
/* 426 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"description\">\n\tYou are about to share the prototype, <strong>{{ parentView.prototype.name }}</strong>. \n\tThis will give other people access to your prototype content.\n</div>\n\n<form class=\"form\">\n\t\n\t<label class=\"form__label\">\n\t\tCopy This Priavte URL To Share:\n\t</label>\n\n\t<div class=\"form__field\">\n\t\t\n\t\t<input \n\t\t\t#input\n\t\t\t[value]=\"parentView.shareUrl\"\n\t\t\t(click)=\"input.select()\"\n\t\t\treadonly\n\t\t\tautofocus\n\t\t\tclass=\"form__input\"\n\t\t/>\n\n\t\t<a class=\"form__button\">\n\t\t\t<span>Copy</span>\n\t\t</a>\n\n\t</div>\n\n</form>\n"

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var select_payment_view_component_1 = __webpack_require__(428);
var select_plan_view_component_1 = __webpack_require__(431);
var shared_module_1 = __webpack_require__(2);
var upgrade_plan_view_component_1 = __webpack_require__(434);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var UpgradePlanViewModule = /** @class */ (function () {
    function UpgradePlanViewModule() {
    }
    UpgradePlanViewModule.routes = [
        {
            path: "upgrade-plan",
            component: upgrade_plan_view_component_1.UpgradePlanViewComponent,
            children: [
                {
                    path: "select-plan",
                    component: select_plan_view_component_1.SelectPlanViewComponent
                },
                {
                    path: "select-payment",
                    component: select_payment_view_component_1.SelectPaymentViewComponent
                },
                // Handle the no-route route.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "select-plan"
                }
            ]
        }
    ];
    UpgradePlanViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                select_payment_view_component_1.SelectPaymentViewComponent,
                select_plan_view_component_1.SelectPlanViewComponent,
                upgrade_plan_view_component_1.UpgradePlanViewComponent
            ]
        })
    ], UpgradePlanViewModule);
    return UpgradePlanViewModule;
}());
exports.UpgradePlanViewModule = UpgradePlanViewModule;


/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var SelectPaymentViewComponent = /** @class */ (function () {
    function SelectPaymentViewComponent() {
    }
    SelectPaymentViewComponent = __decorate([
        core_1.Component({
            selector: "select-payment-view",
            styles: [__webpack_require__(429)],
            template: __webpack_require__(430)
        })
    ], SelectPaymentViewComponent);
    return SelectPaymentViewComponent;
}());
exports.SelectPaymentViewComponent = SelectPaymentViewComponent;


/***/ }),
/* 429 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.header {\n  color: #434C5E ;\n  font-weight: 400 ;\n  text-align: center ;\n}\n.header__title {\n  font-size: 30px ;\n  line-height: 35px ;\n  margin-bottom: 20px ;\n}\n.header__subtitle {\n  font-size: 16px ;\n}\n.form {\n  background-color: #FAFAFA ;\n  box-sizing: border-box;\n  color: #999999 ;\n  height: 500px ;\n  margin: 35px 0px 40px 0px ;\n  padding: 20px 20px 20px 20px ;\n  width: 540px ;\n}\n.upgrade {\n  background-color: #00B96B ;\n  border-radius: 57px 57px 57px 57px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  line-height: 57px ;\n  margin: 0px auto 0px auto ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 275px ;\n}\n.security {\n  margin-top: 25px ;\n  text-align: center ;\n}\n.security__description {\n  color: #00B974 ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  line-height: 19px ;\n  margin-bottom: 4px ;\n}\n.security__encryption {\n  color: #838A9A ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 18px ;\n}\n"

/***/ }),
/* 430 */
/***/ (function(module, exports) {

module.exports = "\n<header class=\"header\">\n\n\t<div class=\"header__title\">\n\t\tLet's finish powering you up!\n\t</div>\n\n\t<div class=\"header__subtitle\">\n\t\tThis plan is right for you.\n\t</div>\n\n</header>\n\n<div class=\"form\">\n\t( Credit card form )\n</div>\n\n<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"upgrade\">\n\tUpgrade My Plan\n</a>\n\n<div class=\"security\">\n\t<div class=\"security__description\">\n\t\tSecure credit card payment\n\t</div>\n\t<div class=\"security__encryption\">\n\t\tThis is a secure 128-bit SSL encrypted payment\n\t</div>\n</div>\n"

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var SelectPlanViewComponent = /** @class */ (function () {
    function SelectPlanViewComponent() {
    }
    SelectPlanViewComponent = __decorate([
        core_1.Component({
            selector: "select-plan-view",
            styles: [__webpack_require__(432)],
            template: __webpack_require__(433)
        })
    ], SelectPlanViewComponent);
    return SelectPlanViewComponent;
}());
exports.SelectPlanViewComponent = SelectPlanViewComponent;


/***/ }),
/* 432 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.header {\n  color: #434C5E ;\n  font-weight: 400 ;\n  text-align: center ;\n}\n.header__title {\n  font-size: 30px ;\n  line-height: 35px ;\n  margin-bottom: 20px ;\n}\n.header__subtitle {\n  font-size: 16px ;\n  margin-bottom: 75px ;\n}\n.plans {\n  display: flex ;\n  justify-content: center ;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.plans__item {\n  flex: 0 0 auto ;\n  height: 417px ;\n  margin: 0px 10px 0px 10px ;\n  position: relative ;\n  width: 220px ;\n}\n.plan {\n  border-radius: 5px 5px 5px 5px ;\n  border-top: 6px solid #596377 ;\n  bottom: 0px ;\n  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  display: flex ;\n  flex-direction: column ;\n  left: 0px ;\n  padding: 34px 20px 40px 20px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: ease 200ms box-shadow;\n}\n.plan:hover {\n  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);\n}\n.plan__name {\n  color: #596377 ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  line-height: 19px ;\n  margin-bottom: 20px ;\n  text-transform: uppercase ;\n}\n.plan__description {\n  color: #8C96A9 ;\n  font-size: 12px ;\n  font-style: italic ;\n  font-weight: 400 ;\n  line-height: 18px ;\n  margin-bottom: 30px ;\n}\n.plan__features {\n  color: #8C96A9 ;\n  flex: 2 0 auto ;\n  font-size: 13px ;\n}\n.plan__price {\n  margin-bottom: 20px ;\n}\n.plan__cta {\n  align-self: center ;\n  background-color: #11B683 ;\n  border-radius: 36px 36px 36px 36px ;\n  color: #FFFFFF ;\n  font-size: 10px ;\n  font-weight: 600 ;\n  letter-spacing: 0.5px ;\n  line-height: 36px ;\n  width: 150px ;\n  text-align: center ;\n  text-transform: uppercase ;\n}\n.plan--enterprise {\n  border-top-color: #1E8FE1 ;\n}\n.plan--enterprise .plan__cta {\n  background-color: #1E8FE1 ;\n}\n.price {\n  display: flex ;\n  justify-content: center ;\n}\n.price__currency {\n  align-self: flex-start;\n  color: #434C5E ;\n  font-size: 20px ;\n  font-weight: 300 ;\n}\n.price__amount {\n  color: #434C5E ;\n  font-size: 48px ;\n  font-weight: 400 ;\n  line-height: 1 ;\n  margin: 0px 4px 0px 4px ;\n}\n.price__term {\n  align-self: flex-end;\n  color: #8C96A9 ;\n  font-size: 14px ;\n  font-weight: 400 ;\n}\n"

/***/ }),
/* 433 */
/***/ (function(module, exports) {

module.exports = "\n<header class=\"header\">\n\n\t<div class=\"header__title\">\n\t\tMore features, more power, more creativity.\n\t</div>\n\n\t<div class=\"header__subtitle\">\n\t\tFind the perfect plan for you &mdash; 100% satisfaction guaranteed.\n\t</div>\n\n</header>\n\n<ul class=\"plans\">\n\t<li class=\"plans__item\">\n\n\t\t<a [routerLink]=\"[ '../select-payment', { plan: 'starter' } ]\" class=\"plan\">\n\t\t\t<span class=\"plan__name\">\n\t\t\t\tStarter\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__description\">\n\t\t\t\tFind the perfect plan for you &mdash; 100% satisfaction guaranteed.\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__features\">\n\t\t\t\t( details )\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__price price\">\n\t\t\t\t<span class=\"price__currency\">$</span>\n\t\t\t\t<span class=\"price__amount\">13</span>\n\t\t\t\t<span class=\"price__term\">/ mo</span>\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__cta\">\n\t\t\t\tChoose Starter\n\t\t\t</span>\n\t\t</a>\n\n\t</li>\n\t<li class=\"plans__item\">\n\n\t\t<a [routerLink]=\"[ '../select-payment', { plan: 'professional' } ]\" class=\"plan\">\n\t\t\t<span class=\"plan__name\">\n\t\t\t\tProfessional\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__description\">\n\t\t\t\tFor professional designers with lots of active projects.\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__features\">\n\t\t\t\t( details )\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__price price\">\n\t\t\t\t<span class=\"price__currency\">$</span>\n\t\t\t\t<span class=\"price__amount\">22</span>\n\t\t\t\t<span class=\"price__term\">/ mo</span>\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__cta\">\n\t\t\t\tChoose Pro\n\t\t\t</span>\n\t\t</a>\n\n\t</li>\n\t<li class=\"plans__item\">\n\n\t\t<a [routerLink]=\"[ '../select-payment', { plan: 'team' } ]\" class=\"plan\">\n\t\t\t<span class=\"plan__name\">\n\t\t\t\tTeam\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__description\">\n\t\t\t\tFor teams of up to 5 people handling many projects.\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__features\">\n\t\t\t\t( details )\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__price price\">\n\t\t\t\t<span class=\"price__currency\">$</span>\n\t\t\t\t<span class=\"price__amount\">89</span>\n\t\t\t\t<span class=\"price__term\">/ mo</span>\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__cta\">\n\t\t\t\tChoose Team\n\t\t\t</span>\n\t\t</a>\n\n\t</li>\n\t<li class=\"plans__item\">\n\n\t\t<a [routerLink]=\"[ '/app', { outlets: { modal: 'modal/enterprise-demo' } } ]\" class=\"plan plan--enterprise\">\n\t\t\t<span class=\"plan__name\">\n\t\t\t\tEnterprise\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__description\">\n\t\t\t\tAdvanced features for large teams with complex projects.\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__features\">\n\t\t\t\t( details )\n\t\t\t</span>\n\n\t\t\t<span class=\"plan__cta\">\n\t\t\t\tSchedule a Demo\n\t\t\t</span>\n\t\t</a>\n\n\t</li>\n</ul>\n"

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var UpgradePlanViewComponent = /** @class */ (function () {
    // I initialize the upgrade-plan-view component.
    function UpgradePlanViewComponent(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    UpgradePlanViewComponent = __decorate([
        core_1.Component({
            selector: "upgrade-plan-view",
            styles: [__webpack_require__(435)],
            template: __webpack_require__(436)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router])
    ], UpgradePlanViewComponent);
    return UpgradePlanViewComponent;
}());
exports.UpgradePlanViewComponent = UpgradePlanViewComponent;


/***/ }),
/* 435 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.sidebar-column {\n  position: relative ;\n  flex: 1 1 auto ;\n  width: 22% ;\n}\n.content-column {\n  box-sizing: border-box;\n  display: flex ;\n  flex: 1 1 auto ;\n  padding: 20px 20px 20px 20px ;\n  overflow: auto ;\n  width: 78% ;\n}\n.content-column__content {\n  margin: auto auto auto auto ;\n}\n.in {\n  background-color: #3D3D3F ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  height: 40px ;\n  line-height: 40px ;\n  left: 40px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 40px ;\n  width: 40px ;\n  z-index: 2 ;\n}\n.testimonials {\n  background-color: #F0F0F0 ;\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n  z-index: 1 ;\n}\n.testimonials__content {\n  bottom: 45px ;\n  color: #333333 ;\n  left: 40px ;\n  position: absolute ;\n  right: 40px ;\n}\n.testimonials__quote {\n  font-size: 14px ;\n  font-style: italic ;\n  font-weight: 400 ;\n  line-height: 24px ;\n  margin-bottom: 40px ;\n}\n.testimonials__customer {\n  font-size: 11px ;\n  font-weight: 600 ;\n  letter-spacing: 1px ;\n  line-height: 16px ;\n  margin-bottom: 15px ;\n  text-transform: uppercase ;\n}\n.testimonials__company {\n  font-size: 20px ;\n  font-weight: 600 ;\n  letter-spacing: 1px ;\n  line-height: 22px ;\n  text-transform: uppercase ;\n}\n"

/***/ }),
/* 436 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"sidebar-column\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"in\">\n\t\tin\n\t</a>\n\n\t<div class=\"testimonials\">\n\t\t<div class=\"testimonials__content\">\n\n\t\t\t<div class=\"testimonials__quote\">\n\t\t\t\tWith InVision, we can get feedback not just from drivers we see in San\n\t\t\t\tFrancisco but from all around the world.\n\t\t\t</div>\n\n\t\t\t<div class=\"testimonials__customer\">\n\t\t\t\tMolly Nix, Uber\n\t\t\t</div>\n\n\t\t\t<div class=\"testimonials__company\">\n\t\t\t\tUber\n\t\t\t</div>\t\t\t\n\n\t\t</div>\n\t</div>\n\n</div>\n\n<div class=\"content-column\">\n\t<div class=\"content-column__content\">\n\n\t\t<router-outlet></router-outlet>\n\n\t</div>\n</div>\n"

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var boards_view_component_1 = __webpack_require__(438);
var partial_service_1 = __webpack_require__(126);
var prototypes_view_component_1 = __webpack_require__(443);
var shared_module_1 = __webpack_require__(2);
var user_projects_view_component_1 = __webpack_require__(61);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var UserProjectsViewModule = /** @class */ (function () {
    function UserProjectsViewModule() {
    }
    UserProjectsViewModule.routes = [
        {
            path: "user-projects/:id",
            component: user_projects_view_component_1.UserProjectsViewComponent,
            children: [
                {
                    path: "boards",
                    component: boards_view_component_1.BoardsViewComponent
                },
                {
                    path: "prototypes",
                    component: prototypes_view_component_1.PrototypesViewComponent
                },
                // Handle the no-route route.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "prototypes"
                }
            ]
        }
    ];
    UserProjectsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                boards_view_component_1.BoardsViewComponent,
                prototypes_view_component_1.PrototypesViewComponent,
                user_projects_view_component_1.UserProjectsViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], UserProjectsViewModule);
    return UserProjectsViewModule;
}());
exports.UserProjectsViewModule = UserProjectsViewModule;


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var user_projects_view_component_1 = __webpack_require__(61);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BoardsViewComponent = /** @class */ (function () {
    // I initialize the boards-view component.
    function BoardsViewComponent(parentView) {
        this.parentView = parentView;
    }
    BoardsViewComponent = __decorate([
        core_1.Component({
            selector: "boards-view",
            styles: [__webpack_require__(441)],
            template: __webpack_require__(442)
        }),
        __metadata("design:paramtypes", [user_projects_view_component_1.UserProjectsViewComponent])
    ], BoardsViewComponent);
    return BoardsViewComponent;
}());
exports.BoardsViewComponent = BoardsViewComponent;


/***/ }),
/* 439 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: rgba(50, 58, 69, 0.96);\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  overflow: auto ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.modal {\n  background-color: #F9F9FB ;\n  border-radius: 4px 4px 4px 4px ;\n  box-sizing: border-box;\n  margin: auto auto auto auto ;\n  position: relative ;\n  width: 630px ;\n}\n.close {\n  color: #999999 ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 0px ;\n  transition: color 200ms ease ;\n  width: 50px ;\n}\n.close:after {\n  content: \"\\2715\";\n}\n.close:hover {\n  color: #000000 ;\n}\n.header {\n  background-color: #FFFFFF ;\n  border-radius: 4px 4px 0px 0px ;\n  padding-top: 50px ;\n}\n.header__avatar {\n  font-size: 16px ;\n  height: 60px ;\n  display: block ;\n  margin: 0px auto 20px auto ;\n  width: 60px ;\n}\n.body {\n  border-top: 1px solid #EAECF1 ;\n}\nh1 {\n  color: #464D5D ;\n  font-size: 28px ;\n  font-weight: 600 ;\n  line-height: 33px ;\n  margin: 0px 0px 12px 0px ;\n  text-align: center ;\n}\n.project-types {\n  display: flex ;\n  flex-direction: row ;\n  justify-content: center ;\n  line-height: 17px ;\n}\n.project-types__type {\n  color: #A4ABB1 ;\n  flex: 0 0 auto ;\n  font-size: 12px ;\n  margin: 0px 7px 0px 7px ;\n  padding: 21px 10px 22px 10px ;\n  position: relative ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.project-types__type--on {\n  color: #464D5D ;\n}\n.project-types__type--on:after {\n  background-color: #52B266 ;\n  bottom: 0px ;\n  content: \"\";\n  height: 2px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n.footer {\n  padding: 40px 0px 40px 0px ;\n}\n.footer__update {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin: 0px auto 0px auto ;\n  padding: 16px 0px 15px 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 293px ;\n}\n.footer__update:hover {\n  background-color: #7EC58D ;\n}\n"

/***/ }),
/* 440 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"modal\">\n\n\t<a [routerLink]=\"[ '/app', { outlets: { modal: null } } ]\" class=\"close\"></a>\n\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<header class=\"header\">\n\n\t\t\t<app-avatar\n\t\t\t\t[initials]=\"user.initials\"\n\t\t\t\t[src]=\"user.avatarUrl\"\n\t\t\t\tclass=\"header__avatar\">\n\t\t\t</app-avatar>\n\t\t\t\n\t\t\t<h1 class=\"header__title\">\n\t\t\t\t{{ user.name }}\n\t\t\t</h1>\n\n\t\t\t<nav class=\"header__nav project-types\">\n\t\t\t\t<a routerLink=\"./prototypes\" class=\"project-types__type\" routerLinkActive=\"project-types__type--on\">\n\t\t\t\t\tPrototypes\n\t\t\t\t</a>\n\t\t\t\t<a routerLink=\"./boards\" class=\"project-types__type\" routerLinkActive=\"project-types__type--on\">\n\t\t\t\t\tBoards\n\t\t\t\t</a>\n\t\t\t</nav>\n\n\t\t</header>\n\n\t\t<section class=\"body\">\n\n\t\t\t<router-outlet></router-outlet>\n\n\t\t</section>\n\n\t\t<footer class=\"footer\">\n\n\t\t\t<a (click)=\"updateProjects()\" class=\"footer__update\">\n\t\t\t\tUpdate Project Memberships\n\t\t\t</a>\n\n\t\t</footer>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</div>\n"

/***/ }),
/* 441 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.boards {\n  height: 223px ;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  overflow-y: auto ;\n  padding: 35px 40px 40px 40px ;\n}\n.boards__item {\n  border-bottom: 1px solid #DEE3E9 ;\n  margin: 0px 0px 0px 0px ;\n}\n.boards__item:first-child {\n  border-top-width: 0px ;\n}\n.toggle {\n  align-items: center ;\n  cursor: pointer ;\n  display: flex ;\n  padding: 14px 0px 14px 0px ;\n  text-decoration: none ;\n}\n.toggle__thumbnail {\n  background-color: #EAEAEA ;\n  border-radius: 3px 3px 3px 3px ;\n  flex: 0 0 auto ;\n  height: 60px ;\n  margin-right: 13px ;\n  width: 80px ;\n}\n.toggle__details {\n  flex: 1 1 100% ;\n}\n.toggle__name {\n  color: #7E8890 ;\n  display: block ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 21px ;\n  margin-bottom: 3px ;\n}\n.toggle__date {\n  color: #BBC3C9 ;\n  display: block ;\n  font-size: 12px ;\n  line-height: 17px ;\n}\n.toggle__checkbox {\n  align-items: center ;\n  background-color: #FFFFFF ;\n  border: 1px solid #DADADA ;\n  border-radius: 100% ;\n  color: #DADADA ;\n  display: flex ;\n  font-size: 21px ;\n  flex: 0 0 auto ;\n  justify-content: center ;\n  height: 31px ;\n  width: 31px ;\n}\n.toggle--on .toggle__name {\n  color: #6CBB7D ;\n}\n.toggle--on .toggle__checkbox {\n  border-color: #6CBB7D ;\n  color: #6CBB7D ;\n  font-weight: 600 ;\n}\n"

/***/ }),
/* 442 */
/***/ (function(module, exports) {

module.exports = "\n<ul class=\"boards\">\n\t<li *ngFor=\"let board of parentView.boards\" class=\"boards__item\">\n\n\t\t<a \n\t\t\t(click)=\"parentView.toggleBoard( board )\"\n\t\t\tclass=\"toggle\"\n\t\t\t[class.toggle--on]=\"parentView.selectedBoards[ board.id ]\">\n\n\t\t\t<span class=\"toggle__details\">\n\t\t\t\t<span class=\"toggle__name\">\n\t\t\t\t\t{{ board.name }}\n\t\t\t\t</span>\n\t\t\t\t<span class=\"toggle__date\">\n\t\t\t\t\tLast updated some time ago.\n\t\t\t\t</span>\n\t\t\t</span>\n\n\t\t\t<span class=\"toggle__checkbox\">\n\t\t\t\t+\n\t\t\t</span>\n\n\t\t</a>\n\n\t</li>\n</ul>\n"

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var user_projects_view_component_1 = __webpack_require__(61);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PrototypesViewComponent = /** @class */ (function () {
    // I initialize the prototypes-view component.
    function PrototypesViewComponent(parentView) {
        this.parentView = parentView;
    }
    PrototypesViewComponent = __decorate([
        core_1.Component({
            selector: "prototypes-view",
            styles: [__webpack_require__(444)],
            template: __webpack_require__(445)
        }),
        __metadata("design:paramtypes", [user_projects_view_component_1.UserProjectsViewComponent])
    ], PrototypesViewComponent);
    return PrototypesViewComponent;
}());
exports.PrototypesViewComponent = PrototypesViewComponent;


/***/ }),
/* 444 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.prototypes {\n  height: 223px ;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  overflow-y: auto ;\n  padding: 35px 40px 40px 40px ;\n}\n.prototypes__item {\n  border-bottom: 1px solid #DEE3E9 ;\n  margin: 0px 0px 0px 0px ;\n}\n.prototypes__item:first-child {\n  border-top-width: 0px ;\n}\n.toggle {\n  align-items: center ;\n  cursor: pointer ;\n  display: flex ;\n  padding: 14px 0px 14px 0px ;\n  text-decoration: none ;\n}\n.toggle__thumbnail {\n  background-color: #EAEAEA ;\n  border-radius: 3px 3px 3px 3px ;\n  flex: 0 0 auto ;\n  height: 60px ;\n  margin-right: 13px ;\n  width: 80px ;\n}\n.toggle__details {\n  flex: 1 1 100% ;\n}\n.toggle__name {\n  color: #7E8890 ;\n  display: block ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 21px ;\n  margin-bottom: 3px ;\n}\n.toggle__date {\n  color: #BBC3C9 ;\n  display: block ;\n  font-size: 12px ;\n  line-height: 17px ;\n}\n.toggle__checkbox {\n  align-items: center ;\n  background-color: #FFFFFF ;\n  border: 1px solid #DADADA ;\n  border-radius: 100% ;\n  color: #DADADA ;\n  display: flex ;\n  font-size: 21px ;\n  flex: 0 0 auto ;\n  justify-content: center ;\n  height: 31px ;\n  width: 31px ;\n}\n.toggle--on .toggle__name {\n  color: #6CBB7D ;\n}\n.toggle--on .toggle__checkbox {\n  border-color: #6CBB7D ;\n  color: #6CBB7D ;\n  font-weight: 600 ;\n}\n"

/***/ }),
/* 445 */
/***/ (function(module, exports) {

module.exports = "\n<ul class=\"prototypes\">\n\t<li *ngFor=\"let prototype of parentView.prototypes\" class=\"prototypes__item\">\n\n\t\t<a \n\t\t\t(click)=\"parentView.togglePrototype( prototype )\"\n\t\t\tclass=\"toggle\"\n\t\t\t[class.toggle--on]=\"parentView.selectedPrototypes[ prototype.id ]\">\n\n\t\t\t<span class=\"toggle__thumbnail\">\n\t\t\t\t<br />\n\t\t\t</span>\n\n\t\t\t<span class=\"toggle__details\">\n\t\t\t\t<span class=\"toggle__name\">\n\t\t\t\t\t{{ prototype.name }}\n\t\t\t\t</span>\n\t\t\t\t<span class=\"toggle__date\">\n\t\t\t\t\tLast updated a long time ago.\n\t\t\t\t</span>\n\t\t\t</span>\n\n\t\t\t<span class=\"toggle__checkbox\">\n\t\t\t\t+\n\t\t\t</span>\n\n\t\t</a>\n\n\t</li>\n</ul>\n"

/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var not_found_view_component_1 = __webpack_require__(447);
var oops_view_component_1 = __webpack_require__(450);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var OopsViewModule = /** @class */ (function () {
    function OopsViewModule() {
    }
    OopsViewModule.routes = [
        {
            path: "oops",
            component: oops_view_component_1.OopsViewComponent,
            children: [
                {
                    path: "not-found",
                    component: not_found_view_component_1.NotFoundViewComponent
                },
                // Handle the....
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "not-found"
                }
            ]
        }
    ];
    OopsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                not_found_view_component_1.NotFoundViewComponent,
                oops_view_component_1.OopsViewComponent
            ]
        })
    ], OopsViewModule);
    return OopsViewModule;
}());
exports.OopsViewModule = OopsViewModule;


/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var NotFoundViewComponent = /** @class */ (function () {
    function NotFoundViewComponent() {
    }
    NotFoundViewComponent = __decorate([
        core_1.Component({
            selector: "not-found-view",
            styles: [__webpack_require__(448)],
            template: __webpack_require__(449)
        })
    ], NotFoundViewComponent);
    return NotFoundViewComponent;
}());
exports.NotFoundViewComponent = NotFoundViewComponent;


/***/ }),
/* 448 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  border: 1px solid #E0E0E0 ;\n  border-radius: 5px 5px 5px 5px ;\n  margin: auto auto auto auto ;\n  padding: 35px ;\n  width: 400px ;\n}\n.icon {\n  color: #E0E0E0 ;\n  display: block ;\n  height: 80px ;\n  margin: 0px auto 30px auto ;\n  width: 80px ;\n}\n.error {\n  font-size: 20px ;\n  font-weight: 400 ;\n  line-height: 150% ;\n  margin-bottom: 30px ;\n  text-align: center ;\n}\n.home {\n  background-color: #64BA76 ;\n  border: 1px solid #4BA75E ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 600 ;\n  margin: 0px auto 0px auto ;\n  padding: 16px 0px 15px 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 183px ;\n}\n.home:hover {\n  background-color: #7EC58D ;\n}\n"

/***/ }),
/* 449 */
/***/ (function(module, exports) {

module.exports = "\n<svg fill=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\">\n\t<path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n\t<path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>\n</svg>\n\n<div class=\"error\">\n\tI'm sorry &mdash; we couldn't find the page you requested. Perhaps you are using an \n\told bookmark that no longer works? Or, perhaps a link was sent to you in error.\n</div>\n\n<a routerLink=\"/app\" class=\"home\">\n\tReturn to App\n</a>\n\n"

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var OopsViewComponent = /** @class */ (function () {
    function OopsViewComponent() {
    }
    OopsViewComponent = __decorate([
        core_1.Component({
            selector: "oops-view",
            styles: [__webpack_require__(451)],
            template: __webpack_require__(452)
        })
    ], OopsViewComponent);
    return OopsViewComponent;
}());
exports.OopsViewComponent = OopsViewComponent;


/***/ }),
/* 451 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #F9F9FB ;\n  bottom: 0px ;\n  display: flex ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.in {\n  background-color: #3D3D3F ;\n  border-radius: 3px 3px 3px 3px ;\n  color: #FFFFFF ;\n  font-size: 26px ;\n  font-weight: 600 ;\n  height: 37px ;\n  line-height: 37px ;\n  left: 27px ;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 27px ;\n  width: 37px ;\n  z-index: 1 ;\n}\nrouter-outlet {\n  display: none ;\n}\n"

/***/ }),
/* 452 */
/***/ (function(module, exports) {

module.exports = "\n<a routerLink=\"/app\" class=\"in\">in</a>\n\n<router-outlet></router-outlet>\n"

/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_component_1 = __webpack_require__(454);
var list_view_component_1 = __webpack_require__(457);
var partial_service_1 = __webpack_require__(127);
var partial_service_2 = __webpack_require__(128);
var product_updates_view_component_1 = __webpack_require__(460);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProductUpdatesViewModule = /** @class */ (function () {
    function ProductUpdatesViewModule() {
    }
    ProductUpdatesViewModule.routes = [
        {
            outlet: "updates",
            path: "product-updates",
            component: product_updates_view_component_1.ProductUpdatesViewComponent,
            children: [
                {
                    path: "",
                    pathMatch: "full",
                    component: list_view_component_1.ListViewComponent
                },
                {
                    path: ":id",
                    component: detail_view_component_1.DetailViewComponent
                }
            ]
        }
    ];
    ProductUpdatesViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                detail_view_component_1.DetailViewComponent,
                list_view_component_1.ListViewComponent,
                product_updates_view_component_1.ProductUpdatesViewComponent
            ],
            providers: [
                partial_service_1.PartialService,
                partial_service_2.PartialService
            ]
        })
    ], ProductUpdatesViewModule);
    return ProductUpdatesViewModule;
}());
exports.ProductUpdatesViewModule = ProductUpdatesViewModule;


/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(15);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(127);
var DetailViewComponent = /** @class */ (function () {
    // I initialize the detail-view component.
    function DetailViewComponent(activatedRoute, domSanitizer, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.domSanitizer = domSanitizer;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.paramMapSubscription = null;
        this.update = null;
    }
    // ---
    // PUBLIE METHODS.
    // ---
    // I get called once when the component is being unmounted.
    DetailViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    // I get called once when the component is being mounted.
    DetailViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    DetailViewComponent.prototype.loadData = function (productUpdateID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(productUpdateID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.update = {
                id: partial.update.id,
                message: partial.update.message,
                staff: partial.update.staff,
                // Converting the raw text to HTML mark-up.
                messageSafe: _this.domSanitizer.bypassSecurityTrustHtml(partial.update.message.replace(/\n/g, "<br />"))
            };
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-product-updates",
                        updates: null
                    }
                }
            ]);
        });
    };
    DetailViewComponent = __decorate([
        core_1.Component({
            selector: "detail-view",
            styles: [__webpack_require__(455)],
            template: __webpack_require__(456)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            platform_browser_1.DomSanitizer,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], DetailViewComponent);
    return DetailViewComponent;
}());
exports.DetailViewComponent = DetailViewComponent;


/***/ }),
/* 455 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  flex-direction: column ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.loading {\n  color: #333C4E ;\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.header {\n  background-color: #333C4E ;\n  box-sizing: border-box;\n  flex: 0 0 auto ;\n  padding: 20px 0px 20px 128px ;\n  position: relative ;\n}\n.header__avatar {\n  height: 35px ;\n  left: 80px ;\n  position: absolute ;\n  top: 22px ;\n  width: 35px ;\n}\n.header__name {\n  color: #FFFFFF ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 21px ;\n}\n.header__status {\n  color: #CCCCCC ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 18px ;\n}\n.header__back {\n  color: #FFFFFF ;\n  font-size: 30px ;\n  font-weight: 600 ;\n  height: 50px ;\n  left: 20px ;\n  line-height: 45px ;\n  margin-top: -25px;\n  position: absolute ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 50% ;\n  width: 50px ;\n}\n.header__back:hover {\n  background-color: #29303f;\n}\n.header__close {\n  color: #FFFFFF ;\n  font-size: 20px ;\n  font-weight: 400 ;\n  height: 50px ;\n  line-height: 50px ;\n  margin-top: -25px;\n  position: absolute ;\n  right: 20px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 50% ;\n  width: 50px ;\n}\n.header__close:hover {\n  background-color: #29303f;\n}\n.body {\n  flex: 1 0 auto ;\n  position: relative ;\n}\n.body__viewport {\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  padding: 30px 35px 40px 35px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.body__content {\n  border: 1px solid #F3F4F5 ;\n  border-radius: 4px 4px 4px 4px ;\n  color: #6E7A89 ;\n  font-size: 14px ;\n  line-height: 19px ;\n  padding: 25px 25px 25px 25px ;\n}\n.footer {\n  background-color: #F4F7F9 ;\n  flex: 0 0 auto ;\n  height: 45px ;\n}\n"

/***/ }),
/* 456 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<header class=\"header\">\n\n\t\t<a routerLink=\"../\" class=\"header__back\">\n\t\t\t&laquo;\n\t\t</a>\n\n\t\t<app-avatar\n\t\t\t[initials]=\"update.staff.initials\"\n\t\t\tclass=\"header__avatar\">\n\t\t</app-avatar>\n\n\t\t<div class=\"header__name\">\n\t\t\t{{ update.staff.name }}\n\t\t</div>\n\n\t\t<div class=\"header__status\">\n\t\t\tAway\n\t\t</div>\n\n\t\t<a [routerLink]=\"[ '/app', { outlets: { updates: null } } ]\" class=\"header__close\">\n\t\t\tx\n\t\t</a>\n\n\t</header>\n\n\t<section class=\"body\">\n\t\t<div class=\"body__viewport\">\n\t\t\t<div [innerHTML]=\"update.messageSafe\" class=\"body__content\">\n\t\t\t\t<!-- HTML is being injected via property. -->\n\t\t\t</div>\n\t\t</div>\n\t</section>\n\n\t<footer class=\"footer\">\n\t\t<br />\n\t</footer>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(128);
var ListViewComponent = /** @class */ (function () {
    // I initialize the list-view component.
    function ListViewComponent(errorLogger, partialSerivce, router) {
        this.errorLogger = errorLogger;
        this.partialService = partialSerivce;
        this.router = router;
        this.isLoading = true;
        this.updates = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    ListViewComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ListViewComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get()
            .then(function (partial) {
            _this.isLoading = false;
            _this.updates = partial.updates;
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-product-updates",
                        updates: null
                    }
                }
            ]);
        });
    };
    ListViewComponent = __decorate([
        core_1.Component({
            selector: "list-view",
            styles: [__webpack_require__(458)],
            template: __webpack_require__(459)
        }),
        __metadata("design:paramtypes", [error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_1.Router])
    ], ListViewComponent);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;


/***/ }),
/* 458 */
/***/ (function(module, exports) {

module.exports = ":host {\n  bottom: 0px ;\n  display: flex ;\n  flex-direction: column ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.header {\n  background-color: #333C4E ;\n  flex: 0 0 auto ;\n  padding: 20px 0px 20px 80px ;\n  position: relative ;\n}\n.header__headline {\n  color: #FFFFFF ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 21px ;\n}\n.header__byline {\n  color: #CCCCCC ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 18px ;\n}\n.header__close {\n  color: #FFFFFF ;\n  font-size: 20px ;\n  font-weight: 400 ;\n  height: 50px ;\n  line-height: 50px ;\n  margin-top: -25px;\n  position: absolute ;\n  right: 20px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: 50% ;\n  width: 50px ;\n}\n.header__close:hover {\n  background-color: #29303f;\n}\n.body {\n  flex: 1 1 auto ;\n  position: relative ;\n}\n.loading {\n  color: #333C4E ;\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.items {\n  bottom: 0px ;\n  left: 0px ;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  overflow: auto ;\n  padding: 0px 0px 0px 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.items__item {\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.message {\n  border-bottom: 1px solid #F3F4F5 ;\n  display: block ;\n  padding: 32px 30px 32px 80px ;\n  position: relative ;\n  text-decoration: none ;\n}\n.message__avatar {\n  height: 35px ;\n  left: 30px ;\n  position: absolute ;\n  top: 33px ;\n  width: 35px ;\n}\n.message__name {\n  color: #666666 ;\n  display: block ;\n  font-size: 13px ;\n  line-height: 18px ;\n  margin-bottom: 2px ;\n}\n.message__teaser {\n  color: #3A3C4C ;\n  display: block ;\n  font-size: 13px ;\n  font-weight: 400 ;\n  line-height: 18px ;\n  overflow: hidden ;\n  text-overflow: ellipsis ;\n  white-space: nowrap ;\n  width: 100% ;\n}\n.message:hover {\n  background-color: #F7F8FA ;\n  border-color: #EBEDF1 ;\n}\n"

/***/ }),
/* 459 */
/***/ (function(module, exports) {

module.exports = "\n<header class=\"header\">\n\n\t<div class=\"header__headline\">\n\t\tConversations\n\t</div>\n\n\t<div class=\"header__byline\">\n\t\twith InVision\n\t</div>\n\n\t<a [routerLink]=\"[ '/app', { outlets: { updates: null } } ]\" class=\"header__close\">\n\t\tx\n\t</a>\n\n</header>\n\n<section class=\"body\">\n\n\t<!-- BEGIN: Loading State. -->\n\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t</ng-template>\n\t<!-- END: Loading State. -->\n\n\n\t<!-- BEGIN: Loaded State. -->\n\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t<ul class=\"items\">\n\t\t\t<li *ngFor=\"let update of updates\" class=\"items__item\">\n\n\t\t\t\t<a [routerLink]=\"[ './', update.id ]\" class=\"message\">\n\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t[initials]=\"update.staff.initials\"\n\t\t\t\t\t\tclass=\"message__avatar\">\n\t\t\t\t\t</app-avatar>\n\t\t\t\t\t<span class=\"message__name\">\n\t\t\t\t\t\t{{ update.staff.name }}\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"message__teaser\">\n\t\t\t\t\t\t{{ update.message }}\n\t\t\t\t\t</span>\n\t\t\t\t</a>\n\n\t\t\t</li>\n\t\t</ul>\n\n\t</ng-template>\n\t<!-- END: Loaded State. -->\n\n</section>\n"

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProductUpdatesViewComponent = /** @class */ (function () {
    // I initialize the product-updates-view component.
    function ProductUpdatesViewComponent() {
    }
    ProductUpdatesViewComponent = __decorate([
        core_1.Component({
            selector: "product-updates-view",
            styles: [__webpack_require__(461)],
            template: __webpack_require__(462)
        }),
        __metadata("design:paramtypes", [])
    ], ProductUpdatesViewComponent);
    return ProductUpdatesViewComponent;
}());
exports.ProductUpdatesViewComponent = ProductUpdatesViewComponent;


/***/ }),
/* 461 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FFFFFF ;\n  bottom: 0px ;\n  box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.16);\n  position: fixed ;\n  right: 0px ;\n  top: 0px ;\n  width: 370px ;\n  z-index: 101 ;\n}\n.scroll-trap {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\nrouter-outlet {\n  display: none ;\n}\n"

/***/ }),
/* 462 */
/***/ (function(module, exports) {

module.exports = "\n<!--\n\tThis wrapper just serves to prevent the scroll-wheel from affecting the parent\n\tview container's scroll offset (which is a janky experience). \n-->\n<div trapScroll class=\"scroll-trap\">\n\t<router-outlet></router-outlet>\n</div>\n"

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var activity_view_module_1 = __webpack_require__(464);
var learn_view_module_1 = __webpack_require__(468);
var people_view_module_1 = __webpack_require__(472);
var projects_view_module_1 = __webpack_require__(505);
var prototypes_view_module_1 = __webpack_require__(519);
var shared_module_1 = __webpack_require__(2);
var standard_view_component_1 = __webpack_require__(544);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var StandardViewModule = /** @class */ (function () {
    function StandardViewModule() {
    }
    StandardViewModule.routes = [
        {
            path: "",
            component: standard_view_component_1.StandardViewComponent,
            children: activity_view_module_1.ActivityViewModule.routes.concat(learn_view_module_1.LearnViewModule.routes, people_view_module_1.PeopleViewModule.routes, projects_view_module_1.ProjectsViewModule.routes, prototypes_view_module_1.PrototypesViewModule.routes, [
                // Handle the "no route" case.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "projects"
                }
            ])
        }
    ];
    StandardViewModule = __decorate([
        core_1.NgModule({
            imports: [
                activity_view_module_1.ActivityViewModule,
                learn_view_module_1.LearnViewModule,
                people_view_module_1.PeopleViewModule,
                projects_view_module_1.ProjectsViewModule,
                prototypes_view_module_1.PrototypesViewModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                standard_view_component_1.StandardViewComponent
            ]
        })
    ], StandardViewModule);
    return StandardViewModule;
}());
exports.StandardViewModule = StandardViewModule;


/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var activity_view_component_1 = __webpack_require__(465);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ActivityViewModule = /** @class */ (function () {
    function ActivityViewModule() {
    }
    ActivityViewModule.routes = [
        {
            path: "activity",
            component: activity_view_component_1.ActivityViewComponent
        }
    ];
    ActivityViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                activity_view_component_1.ActivityViewComponent
            ]
        })
    ], ActivityViewModule);
    return ActivityViewModule;
}());
exports.ActivityViewModule = ActivityViewModule;


/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ActivityViewComponent = /** @class */ (function () {
    function ActivityViewComponent() {
    }
    ActivityViewComponent = __decorate([
        core_1.Component({
            selector: "activity-view",
            styles: [
                __webpack_require__(28),
                __webpack_require__(466)
            ],
            template: __webpack_require__(467)
        })
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;


/***/ }),
/* 466 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.activity-wrapper {\n  position: relative ;\n}\n.activity-wrapper:before {\n  background-color: #DFE0E3 ;\n  bottom: 0px ;\n  content: \"\";\n  left: 60px ;\n  position: absolute ;\n  top: 0px ;\n  width: 1px ;\n  z-index: 1 ;\n}\n.activity {\n  margin-bottom: 30px ;\n  position: relative ;\n  z-index: 2 ;\n}\n.activity__header {\n  padding-bottom: 30px ;\n}\n.activity__date {\n  background-color: #3E85C1 ;\n  border-radius: 30px 30px 30px 30px ;\n  color: #FFFFFF ;\n  font-size: 11px ;\n  font-weight: 400 ;\n  line-height: 16px ;\n  padding: 10px 0px 10px 0px ;\n  text-align: center ;\n  text-transform: uppercase ;\n  width: 120px ;\n}\n.activity__content {\n  background-color: #FFFFFF ;\n  border-radius: 4px 4px 4px 4px ;\n  box-shadow: 0px 1px 2px rgba(43, 59, 93, 0.29);\n  color: #58606E ;\n  font-size: 14px ;\n  line-height: 19px ;\n  margin-bottom: 15px ;\n  padding: 30px 30px 30px 30px ;\n}\n"

/***/ }),
/* 467 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"m-standard-header\">\n\t<div class=\"m-standard-header__container\">\n\n\t\t<span routerLink=\"/\" class=\"m-standard-header__logo\">\n\t\t\tin\n\t\t</span>\n\n\t\t<h1 class=\"m-standard-header__title\">\n\t\t\tActivity\n\t\t</h1>\n\n\t</div>\n</div>\n\n<div class=\"m-stndard-body\">\n\t<div class=\"m-standard-body__container\">\n\n\t\t<div class=\"activity-wrapper\">\n\n\t\t\t<section class=\"activity\">\n\n\t\t\t\t<div class=\"activity__header\">\n\t\t\t\t\t<div class=\"activity__date\">\n\t\t\t\t\t\tToday\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"activity__content\" [style.padding-bottom.px]=\"100\">\n\t\t\t\t\tDetails would go here...\n\t\t\t\t</div>\n\n\t\t\t</section>\n\n\t\t\t<section class=\"activity\">\n\n\t\t\t\t<div class=\"activity__header\">\n\t\t\t\t\t<div class=\"activity__date\">\n\t\t\t\t\t\tYesterday\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"activity__content\" [style.padding-bottom.px]=\"100\">\n\t\t\t\t\tDetails would go here...\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"activity__content\" [style.padding-bottom.px]=\"400\">\n\t\t\t\t\tDetails would go here...\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"activity__content\" [style.padding-bottom.px]=\"200\">\n\t\t\t\t\tDetails would go here...\n\t\t\t\t</div>\n\n\t\t\t</section>\n\n\t\t\t<section class=\"activity\">\n\n\t\t\t\t<div class=\"activity__header\">\n\t\t\t\t\t<div class=\"activity__date\">\n\t\t\t\t\t\tLast Week\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"activity__content\" [style.padding-bottom.px]=\"300\">\n\t\t\t\t\tDetails would go here...\n\t\t\t\t</div>\n\n\t\t\t</section>\n\n\t\t</div>\n\n\t</div>\n</div>\n"

/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var learn_view_component_1 = __webpack_require__(469);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var LearnViewModule = /** @class */ (function () {
    function LearnViewModule() {
    }
    LearnViewModule.routes = [
        {
            path: "learn",
            component: learn_view_component_1.LearnViewComponent
        }
    ];
    LearnViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                learn_view_component_1.LearnViewComponent
            ]
        })
    ], LearnViewModule);
    return LearnViewModule;
}());
exports.LearnViewModule = LearnViewModule;


/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var LearnViewComponent = /** @class */ (function () {
    // I initialize the list-view component.
    function LearnViewComponent() {
        this.tutorials = {
            invision101: [
                { name: "Prototype Basics" },
                { name: "Interactive Prototypes" },
                { name: "Design Feedback & Collaboration" }
            ],
            workflowTips: [
                { name: "Managing Projects in Workflow" },
                { name: "Using Overlay Screens" },
                { name: "Creating a Board" },
                { name: "Using GIFs for Custom Interactions" },
                { name: "Using Transparent Navigation" },
                { name: "Using LiveShare" },
                { name: "Creating Fixed Elements" },
                { name: "Replacing Screens" },
                { name: "Changing Device Skins" },
                { name: "Sharing Selections of Screens" },
                { name: "Organizing Prototypes" },
                { name: "Working With Retina Sized Images" }
            ]
        };
        this.faqs = [
            { name: "Which plan is right for me?" },
            { name: "Can I create wireframes using InVision?" },
            { name: "Can I conduct user testing with InVision?" },
            { name: "How do I set up my Team?" },
            { name: "How can I password protect my prototype?" },
            { name: "How do I determine the right screen size?" },
            { name: "How do I export a prototype to a PDF or Zip file?" },
            { name: "What is Craft by InVision LABS?" }
        ];
    }
    LearnViewComponent = __decorate([
        core_1.Component({
            selector: "learn-view",
            styles: [__webpack_require__(470)],
            template: __webpack_require__(471)
        }),
        __metadata("design:paramtypes", [])
    ], LearnViewComponent);
    return LearnViewComponent;
}());
exports.LearnViewComponent = LearnViewComponent;


/***/ }),
/* 470 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.intro {\n  height: 590px ;\n  position: relative ;\n}\n.intro__hero {\n  background-color: #1A212C ;\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: -60px;\n  z-index: 1 ;\n}\n.intro__call-to-action {\n  padding-top: 170px ;\n  position: relative ;\n  z-index: 2 ;\n}\n.intro__title {\n  color: #FFFFFF ;\n  font-size: 42px ;\n  font-weight: 300 ;\n  line-height: 58px ;\n  margin: 0px 0px 34px 0px ;\n  text-align: center ;\n}\n.intro__button {\n  background-color: #FC3768 ;\n  border-radius: 55px 55px 55px 55px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 400 ;\n  height: 55px ;\n  line-height: 55px ;\n  margin: 0px auto 0px auto ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 210px ;\n}\n.nav {\n  display: flex ;\n  justify-content: center ;\n  margin: 0px auto 0px auto ;\n}\n.nav__item {\n  border-top: 2px solid transparent ;\n  color: #7E8890 ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  letter-spacing: 0.5px ;\n  margin: 0px 25px 0px 25px ;\n  padding: 16px 0px 16px 0px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.nav__item--on {\n  border-color: #FC3768 ;\n  color: #464D5D ;\n}\n.section {\n  margin: 57px auto 0px auto ;\n  text-align: center ;\n  width: 1170px ;\n}\n.section:first-of-type {\n  margin-top: 87px ;\n}\n.section__title {\n  color: #1F2532 ;\n  font-size: 35px ;\n  font-weight: 300 ;\n  line-height: 40px ;\n  margin: 0px 0px 15px 0px ;\n}\n.section__description {\n  color: #7E8890 ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 21px ;\n  margin: 0px 0px 43px 0px ;\n}\n.tutorials {\n  display: flex ;\n  flex-wrap: wrap ;\n  justify-content: space-between;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.tutorials__item {\n  height: 285px ;\n  margin: 0px 0px 30px 0px ;\n  padding: 0px 0px 0px 0px ;\n  position: relative ;\n  width: 368px ;\n}\n.tutorial {\n  border-radius: 3px 3px 3px 3px ;\n  bottom: 0px ;\n  box-shadow: 0px 1px 2px rgba(43, 59, 93, 0.3);\n  display: flex ;\n  flex-direction: column ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  text-decoration: none ;\n  top: 0px ;\n}\n.tutorial__thumb {\n  background-color: #5C6270 ;\n  border-radius: 3px 3px 0px 0px ;\n  display: flex ;\n  flex: 1 1 100% ;\n  transition: background-color ease 200ms;\n}\n.tutorial__play {\n  background-color: #FC3768 ;\n  border-radius: 54px 54px 54px 54px ;\n  color: #FFFFFF ;\n  height: 54px ;\n  line-height: 54px ;\n  margin: auto auto auto auto ;\n  width: 54px ;\n}\n.tutorial__name {\n  background-color: #FFFFFF ;\n  border-radius: 0px 0px 3px 3px ;\n  border-top: 1px solid #EAEAEA ;\n  color: #47506E ;\n  flex: 1 0 auto ;\n  font-size: 18px ;\n  font-weight: 400 ;\n  padding: 25px 10px 26px 10px ;\n  text-align: center ;\n}\n.tutorial:hover .tutorial__thumb {\n  background-color: #3F434E ;\n}\n.faqs {\n  display: flex ;\n  flex-wrap: wrap ;\n  justify-content: space-between;\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.faqs__item {\n  display: flex ;\n  justify-content: stretch ;\n  height: 200px ;\n  margin: 0px 0px 30px 0px ;\n  padding: 0px 0px 0px 0px ;\n  width: 368px ;\n}\n.faq {\n  border-radius: 3px 3px 3px 3px ;\n  background-color: #FFFFFF ;\n  box-shadow: 0px 1px 2px rgba(43, 59, 93, 0.29);\n  display: flex ;\n  flex: 1 0 auto ;\n  text-decoration: none ;\n}\n.faq__name {\n  color: #47506E ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 28px ;\n  margin: auto auto auto auto ;\n  max-width: 300px ;\n}\n.more-faqs {\n  border-radius: 3px 3px 3px 3px ;\n  background-color: #F9F9F9 ;\n  border: 1px solid #DADADA ;\n  display: flex ;\n  flex: 1 0 auto ;\n  text-decoration: none ;\n}\n.more-faqs__name {\n  color: #47506E ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 28px ;\n  margin: auto auto auto auto ;\n  max-width: 300px ;\n}\n.webinar {\n  background-color: #ECECF1 ;\n  color: #5F697A ;\n  font-size: 18px ;\n  font-weight: 400 ;\n  line-height: 23px ;\n  margin: 50px 0px 0px 0px ;\n  padding: 40px 0px 40px 0px ;\n  text-align: center ;\n}\n.webinar a {\n  color: #347CBB ;\n  text-decoration: none ;\n}\n"

/***/ }),
/* 471 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"intro\">\n\n\t<div class=\"intro__hero\">\n\t\t<br />\n\t</div>\n\n\t<div class=\"intro__call-to-action\">\n\n\t\t<h1 class=\"intro__title\">\n\t\t\tGet the basics of InVision, plus pick up<br />\n\t\t\tsome advanced tips and tricks.\n\t\t</h1>\n\n\t\t<a class=\"intro__button\">Get Started</a>\n\n\t</div>\n\n</div>\n\n<nav class=\"nav\">\n\t<a routerLink=\"./\" fragment=\"section_getting_started\" class=\"nav__item nav__item--on\">Getting Started</a>\n\t<a routerLink=\"./\" fragment=\"section_invision_101\" class=\"nav__item\">InVision 101</a>\n\t<a routerLink=\"./\" fragment=\"section_workflow_tips\" class=\"nav__item\">Workflow Tips</a>\n\t<a routerLink=\"./\" fragment=\"section_faq\" class=\"nav__item\">FAQ</a>\n</nav>\n\n<section id=\"section_invision_101\" class=\"section\">\n\n\t<header class=\"section__header\">\n\n\t\t<h2 class=\"section__title\">\n\t\t\tInVision 101\n\t\t</h2>\n\n\t\t<div class=\"section__description\">\n\t\t\tSet yourself up for success with these basic tutorials.\n\t\t</div>\n\n\t</header>\n\n\t<ul class=\"tutorials\">\n\t\t<li *ngFor=\"let tutorial of tutorials.invision101\" class=\"tutorials__item\">\n\t\t\t<a class=\"tutorial\">\n\t\t\t\t<span class=\"tutorial__thumb\">\n\t\t\t\t\t<span class=\"tutorial__play\">\n\t\t\t\t\t\t▶\n\t\t\t\t\t</span>\n\t\t\t\t</span>\n\t\t\t\t<span class=\"tutorial__name\">\n\t\t\t\t\t{{ tutorial.name }}\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t</li>\n\t</ul>\n\n</section>\n\n<section id=\"section_workflow_tips\" class=\"section\">\n\n\t<header class=\"section__header\">\n\t\t\n\t\t<h2 class=\"section__title\">\n\t\t\tWorkflow Tips\n\t\t</h2>\n\n\t\t<div class=\"section__description\">\n\t\t\tFor advanced prototypers like yourself.\n\t\t</div>\n\n\t</header>\n\n\t<ul class=\"tutorials\">\n\t\t<li *ngFor=\"let tutorial of tutorials.workflowTips\" class=\"tutorials__item\">\n\t\t\t<a class=\"tutorial\">\n\t\t\t\t<span class=\"tutorial__thumb\">\n\t\t\t\t\t<span class=\"tutorial__play\">\n\t\t\t\t\t\t▶\n\t\t\t\t\t</span>\n\t\t\t\t</span>\n\t\t\t\t<span class=\"tutorial__name\">\n\t\t\t\t\t{{ tutorial.name }}\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t</li>\n\t</ul>\n\t\n</section>\n\n<section id=\"section_faq\" class=\"section\">\n\t\n\t<header class=\"section__header\">\n\t\t\n\t\t<h2 class=\"section__title\">\n\t\t\tFAQs\n\t\t</h2>\n\n\t\t<div class=\"section__description\">\n\t\t\tStill stumped? Check out these common questions.\n\t\t</div>\n\n\t</header>\n\n\t<ul class=\"faqs\">\n\t\t<li *ngFor=\"let faq of faqs\" class=\"faqs__item\">\n\t\t\t<a class=\"faq\">\n\t\t\t\t<span class=\"faq__name\">\n\t\t\t\t\t{{ faq.name }}\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t</li>\n\t\t<li class=\"faqs__item\">\n\t\t\t<a class=\"more-faqs\">\n\t\t\t\t<span class=\"more-faqs__name\">\n\t\t\t\t\tMore FAQs →\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t</li>\n\t</ul>\n\n</section>\n\n<div class=\"webinar\">\n\n\tPrefer a guided tour? <a>Sign up for a webinar →</a>\n\n</div>\n"

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_module_1 = __webpack_require__(473);
var list_view_module_1 = __webpack_require__(501);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PeopleViewModule = /** @class */ (function () {
    function PeopleViewModule() {
    }
    PeopleViewModule.routes = [
        {
            path: "people",
            children: list_view_module_1.ListViewModule.routes.concat(detail_view_module_1.DetailViewModule.routes, [
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "list"
                }
            ])
        }
    ];
    PeopleViewModule = __decorate([
        core_1.NgModule({
            imports: [
                detail_view_module_1.DetailViewModule,
                list_view_module_1.ListViewModule
            ]
        })
    ], PeopleViewModule);
    return PeopleViewModule;
}());
exports.PeopleViewModule = PeopleViewModule;


/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var activity_view_module_1 = __webpack_require__(474);
var billing_view_module_1 = __webpack_require__(478);
var detail_view_component_1 = __webpack_require__(482);
var notifications_view_module_1 = __webpack_require__(485);
var partial_service_1 = __webpack_require__(129);
var password_view_module_1 = __webpack_require__(489);
var profile_view_module_1 = __webpack_require__(493);
var projects_view_module_1 = __webpack_require__(497);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DetailViewModule = /** @class */ (function () {
    function DetailViewModule() {
    }
    DetailViewModule.routes = [
        {
            path: ":id",
            component: detail_view_component_1.DetailViewComponent,
            children: activity_view_module_1.ActivityViewModule.routes.concat(billing_view_module_1.BillingViewModule.routes, notifications_view_module_1.NotificationsViewModule.routes, password_view_module_1.PasswordViewModule.routes, profile_view_module_1.ProfileViewModule.routes, projects_view_module_1.ProjectsViewModule.routes, [
                // Handle the no-route route.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "activity"
                }
            ])
        }
    ];
    DetailViewModule = __decorate([
        core_1.NgModule({
            imports: [
                activity_view_module_1.ActivityViewModule,
                billing_view_module_1.BillingViewModule,
                notifications_view_module_1.NotificationsViewModule,
                password_view_module_1.PasswordViewModule,
                profile_view_module_1.ProfileViewModule,
                projects_view_module_1.ProjectsViewModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                detail_view_component_1.DetailViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], DetailViewModule);
    return DetailViewModule;
}());
exports.DetailViewModule = DetailViewModule;


/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var activity_view_component_1 = __webpack_require__(475);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ActivityViewModule = /** @class */ (function () {
    function ActivityViewModule() {
    }
    ActivityViewModule.routes = [
        {
            path: "activity",
            component: activity_view_component_1.ActivityViewComponent
        }
    ];
    ActivityViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                activity_view_component_1.ActivityViewComponent
            ]
        })
    ], ActivityViewModule);
    return ActivityViewModule;
}());
exports.ActivityViewModule = ActivityViewModule;


/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ActivityViewComponent = /** @class */ (function () {
    // I initialize the activity-view component.
    function ActivityViewComponent(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    ActivityViewComponent = __decorate([
        core_1.Component({
            selector: "activity-view",
            styles: [__webpack_require__(476)],
            template: __webpack_require__(477)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router])
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;


/***/ }),
/* 476 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 477 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tActivity View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var billing_view_component_1 = __webpack_require__(479);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BillingViewModule = /** @class */ (function () {
    function BillingViewModule() {
    }
    BillingViewModule.routes = [
        {
            path: "billing",
            component: billing_view_component_1.BillingViewComponent
        }
    ];
    BillingViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                billing_view_component_1.BillingViewComponent
            ]
        })
    ], BillingViewModule);
    return BillingViewModule;
}());
exports.BillingViewModule = BillingViewModule;


/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var session_1 = __webpack_require__(12);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BillingViewComponent = /** @class */ (function () {
    // I initialize the billing-view component.
    function BillingViewComponent(activatedRoute, router, session) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        // Only the logged-in viewer can see this section.
        if (!session.isForUser(+this.activatedRoute.snapshot.parent.paramMap.get("id"))) {
            this.router.navigate(["/app/people", session.user.id, "billing"]);
        }
    }
    BillingViewComponent = __decorate([
        core_1.Component({
            selector: "billing-view",
            styles: [__webpack_require__(480)],
            template: __webpack_require__(481)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router,
            session_1.Session])
    ], BillingViewComponent);
    return BillingViewComponent;
}());
exports.BillingViewComponent = BillingViewComponent;


/***/ }),
/* 480 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 481 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tBilling View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(129);
var session_1 = __webpack_require__(12);
var DetailViewComponent = /** @class */ (function () {
    // I initialize the detail-view component.
    function DetailViewComponent(activatedRoute, errorLogger, partialService, router, session) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.session = session;
        this.isLoading = true;
        this.isSelf = false;
        this.paramMapSubscription = null;
        this.user = null;
    }
    // ---
    // PUBLIE METHODS.
    // ---
    // I get called once when the component is being unmounted.
    DetailViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    // I get called once when the component is being mounted.
    DetailViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    DetailViewComponent.prototype.loadData = function (userID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(userID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.user = partial.user;
            // Some actions won't be available to non-self users.
            _this.isSelf = _this.session.isForUser(_this.user);
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: "people",
                        modal: "modal/error/could-not-load-person"
                    }
                }
            ]);
        });
    };
    DetailViewComponent = __decorate([
        core_1.Component({
            selector: "detail-view",
            styles: [
                __webpack_require__(28),
                __webpack_require__(483)
            ],
            template: __webpack_require__(484)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router,
            session_1.Session])
    ], DetailViewComponent);
    return DetailViewComponent;
}());
exports.DetailViewComponent = DetailViewComponent;


/***/ }),
/* 483 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.badge {\n  display: flex ;\n}\n.badge__avatar {\n  flex: 0 0 auto ;\n  font-size: 12px ;\n  height: 40px ;\n  width: 40px ;\n}\n.badge__name {\n  flex: 1 1 auto ;\n  margin-left: 20px ;\n}\n.person-actions {\n  top: 25px ;\n  position: absolute ;\n  right: 0px ;\n}\n.person-actions__add-to-projects {\n  background-color: #FF4070 ;\n  border-radius: 2px 2px 2px 2px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  letter-spacing: 0.8px ;\n  line-height: 16px ;\n  padding: 10px 23px 9px 23px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n"

/***/ }),
/* 484 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<div class=\"m-standard-header\">\n\t\t<div class=\"m-standard-header__container m-standard-header__container--with-nav\">\n\n\t\t\t<span routerLink=\"/app/prototypes\" class=\"m-standard-header__logo\">\n\t\t\t\tin\n\t\t\t</span>\n\n\t\t\t<div class=\"badge\">\n\n\t\t\t\t<app-avatar\n\t\t\t\t\t[initials]=\"user.initials\"\n\t\t\t\t\t[src]=\"user.avatarUrl\"\n\t\t\t\t\tclass=\"badge__avatar\">\n\t\t\t\t</app-avatar>\n\n\t\t\t\t<h1 class=\"m-standard-header__title badge__name\">\n\t\t\t\t\t{{ user.name }}\n\t\t\t\t</h1>\n\n\t\t\t</div>\n\n\t\t\t<div *ngIf=\"! isSelf\" class=\"person-actions\">\n\n\t\t\t\t<a\n\t\t\t\t\t[routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'user-projects', user.id ] } } ]\"\n\t\t\t\t\tclass=\"person-actions__add-to-projects\">\n\t\t\t\t\t+ Add to Projects\n\t\t\t\t</a>\n\n\t\t\t</div>\n\n\t\t\t<nav class=\"m-standard-header__nav\">\n\t\t\t\t<ng-template [ngIf]=\"isSelf\">\n\t\t\t\t\t<a routerLink=\"./profile\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Profile</a>\n\t\t\t\t\t<a routerLink=\"./password\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Password</a>\n\t\t\t\t\t<a routerLink=\"./billing\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Billing</a>\n\t\t\t\t\t<a routerLink=\"./notifications\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Notifications</a>\n\t\t\t\t\t<a routerLink=\"./activity\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Activity</a>\n\t\t\t\t</ng-template>\n\t\t\t\t<ng-template [ngIf]=\"! isSelf\">\n\t\t\t\t\t<a routerLink=\"./projects\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Projects</a>\n\t\t\t\t\t<a routerLink=\"./activity\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Activity</a>\n\t\t\t\t</ng-template>\n\t\t\t</nav>\n\n\t\t</div>\n\t</div>\n\n\t<div class=\"m-standard-body\">\n\t\t<div class=\"m-standard-body__container\">\n\n\t\t\t<router-outlet></router-outlet>\n\n\t\t</div>\n\t</div>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var notifications_view_component_1 = __webpack_require__(486);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var NotificationsViewModule = /** @class */ (function () {
    function NotificationsViewModule() {
    }
    NotificationsViewModule.routes = [
        {
            path: "notifications",
            component: notifications_view_component_1.NotificationsViewComponent
        }
    ];
    NotificationsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                notifications_view_component_1.NotificationsViewComponent
            ]
        })
    ], NotificationsViewModule);
    return NotificationsViewModule;
}());
exports.NotificationsViewModule = NotificationsViewModule;


/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var session_1 = __webpack_require__(12);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var NotificationsViewComponent = /** @class */ (function () {
    // I initialize the notifications-view component.
    function NotificationsViewComponent(activatedRoute, router, session) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        // Only the logged-in viewer can see this section.
        if (!session.isForUser(+this.activatedRoute.snapshot.parent.paramMap.get("id"))) {
            this.router.navigate(["/app/people", session.user.id, "notifications"]);
        }
    }
    NotificationsViewComponent = __decorate([
        core_1.Component({
            selector: "notifications-view",
            styles: [__webpack_require__(487)],
            template: __webpack_require__(488)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router,
            session_1.Session])
    ], NotificationsViewComponent);
    return NotificationsViewComponent;
}());
exports.NotificationsViewComponent = NotificationsViewComponent;


/***/ }),
/* 487 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 488 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tNotifications View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var password_view_component_1 = __webpack_require__(490);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PasswordViewModule = /** @class */ (function () {
    function PasswordViewModule() {
    }
    PasswordViewModule.routes = [
        {
            path: "password",
            component: password_view_component_1.PasswordViewComponent
        }
    ];
    PasswordViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                password_view_component_1.PasswordViewComponent
            ]
        })
    ], PasswordViewModule);
    return PasswordViewModule;
}());
exports.PasswordViewModule = PasswordViewModule;


/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var session_1 = __webpack_require__(12);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PasswordViewComponent = /** @class */ (function () {
    // I initialize the password-view component.
    function PasswordViewComponent(activatedRoute, router, session) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        // Only the logged-in viewer can see this section.
        if (!session.isForUser(+this.activatedRoute.snapshot.parent.paramMap.get("id"))) {
            this.router.navigate(["/app/people", session.user.id, "password"]);
        }
    }
    PasswordViewComponent = __decorate([
        core_1.Component({
            selector: "password-view",
            styles: [__webpack_require__(491)],
            template: __webpack_require__(492)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router,
            session_1.Session])
    ], PasswordViewComponent);
    return PasswordViewComponent;
}());
exports.PasswordViewComponent = PasswordViewComponent;


/***/ }),
/* 491 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 492 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tPassword View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 493 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var profile_view_component_1 = __webpack_require__(494);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProfileViewModule = /** @class */ (function () {
    function ProfileViewModule() {
    }
    ProfileViewModule.routes = [
        {
            path: "profile",
            component: profile_view_component_1.ProfileViewComponent
        }
    ];
    ProfileViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                profile_view_component_1.ProfileViewComponent
            ]
        })
    ], ProfileViewModule);
    return ProfileViewModule;
}());
exports.ProfileViewModule = ProfileViewModule;


/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var session_1 = __webpack_require__(12);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProfileViewComponent = /** @class */ (function () {
    // I initialize the profile-view component.
    function ProfileViewComponent(activatedRoute, router, session) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        // Only the logged-in viewer can see this section.
        if (!session.isForUser(+this.activatedRoute.snapshot.parent.paramMap.get("id"))) {
            this.router.navigate(["/app/people", session.user.id, "profile"]);
        }
    }
    ProfileViewComponent = __decorate([
        core_1.Component({
            selector: "profile-view",
            styles: [__webpack_require__(495)],
            template: __webpack_require__(496)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router,
            session_1.Session])
    ], ProfileViewComponent);
    return ProfileViewComponent;
}());
exports.ProfileViewComponent = ProfileViewComponent;


/***/ }),
/* 495 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 496 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tProfile View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var projects_view_component_1 = __webpack_require__(498);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProjectsViewModule = /** @class */ (function () {
    function ProjectsViewModule() {
    }
    ProjectsViewModule.routes = [
        {
            path: "projects",
            component: projects_view_component_1.ProjectsViewComponent
        }
    ];
    ProjectsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                projects_view_component_1.ProjectsViewComponent
            ]
        })
    ], ProjectsViewModule);
    return ProjectsViewModule;
}());
exports.ProjectsViewModule = ProjectsViewModule;


/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProjectsViewComponent = /** @class */ (function () {
    // I initialize the projects-view component.
    function ProjectsViewComponent(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    ProjectsViewComponent = __decorate([
        core_1.Component({
            selector: "projects-view",
            styles: [__webpack_require__(499)],
            template: __webpack_require__(500)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.Router])
    ], ProjectsViewComponent);
    return ProjectsViewComponent;
}());
exports.ProjectsViewComponent = ProjectsViewComponent;


/***/ }),
/* 499 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 500 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tProjects View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var list_view_component_1 = __webpack_require__(502);
var partial_service_1 = __webpack_require__(130);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ListViewModule = /** @class */ (function () {
    function ListViewModule() {
    }
    ListViewModule.routes = [
        {
            path: "list",
            component: list_view_component_1.ListViewComponent
        }
    ];
    ListViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            providers: [
                partial_service_1.PartialService
            ],
            declarations: [
                list_view_component_1.ListViewComponent
            ]
        })
    ], ListViewModule);
    return ListViewModule;
}());
exports.ListViewModule = ListViewModule;


/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(130);
var session_1 = __webpack_require__(12);
var ListViewComponent = /** @class */ (function () {
    // I initialize the list-view component.
    function ListViewComponent(activatedRoute, errorLogger, partialSerivce, router, session) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialSerivce;
        this.router = router;
        this.session = session;
        this.isLoading = true;
        this.users = null;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    ListViewComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ListViewComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get()
            .then(function (partial) {
            _this.isLoading = false;
            _this.users = partial.users.map(function (user) {
                return ({
                    id: user.id,
                    name: user.name,
                    initials: user.initials,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                    isOwner: _this.session.isForUser(user)
                });
            });
            _this.users.sort(function (a, b) {
                if (a.isOwner) {
                    return (-1);
                }
                else if (b.isOwner) {
                    return (1);
                }
                var aName = a.name.toLowerCase();
                var bName = b.name.toLowerCase();
                if (aName <= bName) {
                    return (-1);
                }
                else {
                    return (1);
                }
            });
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-people"
                    }
                }
            ]);
        });
    };
    ListViewComponent = __decorate([
        core_1.Component({
            selector: "list-view",
            styles: [
                __webpack_require__(28),
                __webpack_require__(503)
            ],
            template: __webpack_require__(504)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router,
            session_1.Session])
    ], ListViewComponent);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;


/***/ }),
/* 503 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.title {\n  color: #333C4E ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n}\n/*\n.plus {\n\tbackground-color: #FF3366 ;\n\tborder-radius: 50px 50px 50px 50px ;\n\tbox-shadow: 0px 1px 5px fade( #000000, 28% ) ;\n\tcolor: #FFFFFF ;\n\tfont-size: 34px ;\n\tfont-weight: 600 ;\n\theight: 50px ;\n\tline-height: 50px ;\n\tposition: absolute ;\n\tright: 0px ;\n\ttext-align: center ;\n\ttext-decoration: none ;\n\ttop: -28px ;\n\ttransition: all 150ms ease ;\n\twidth: 50px ;\n\n\t&:hover {\n\t\tborder-radius: 54px 54px 54px 54px ;\n\t\theight: 54px ;\n\t\tline-height: 54px ;\n\t\tright: -2px ;\n\t\ttop: -30px ;\n\t\twidth: 54px ;\n\t}\n}\n*/\n.users {\n  list-style-type: none ;\n  margin: 40px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.users:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.users__item {\n  display: flex ;\n  justify-content: stretch ;\n  float: left ;\n  height: 315px ;\n  margin: 0px 45px 40px 0px ;\n  width: 360px ;\n}\n.users__item--column-3 {\n  margin-right: 0px ;\n}\n.user {\n  background-color: #FFFFFF ;\n  border-radius: 3px 3px 3px 3px ;\n  box-shadow: 0px 1px 2px rgba(43, 59, 93, 0.29);\n  flex: 1 0 auto ;\n  position: relative ;\n  text-decoration: none ;\n}\n.user__avatar {\n  display: block ;\n  font-size: 48px ;\n  height: 148px ;\n  margin: 53px auto 20px auto ;\n  width: 148px ;\n}\n.user__name {\n  color: #424956 ;\n  display: block ;\n  font-size: 20px ;\n  font-weight: 400 ;\n  line-height: 25px ;\n  margin-bottom: 5px ;\n  text-align: center ;\n}\n.user__email {\n  color: #778295 ;\n  display: block ;\n  font-size: 15px ;\n  font-weight: 400 ;\n  line-height: 20px ;\n  text-align: center ;\n}\n.user__tag {\n  background-color: #CDD4E0 ;\n  border-radius: 2px 2px 2px 2px ;\n  color: #FFFFFF ;\n  font-size: 11px ;\n  font-weight: 400 ;\n  letter-spacing: 0.8px ;\n  line-height: 25px ;\n  padding: 0px 10px 0px 10px ;\n  position: absolute ;\n  right: 20px ;\n  text-transform: uppercase ;\n  top: 20px ;\n}\n"

/***/ }),
/* 504 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"m-standard-header\">\n\t<div class=\"m-standard-header__container\">\n\n\t\t<span routerLink=\"/\" class=\"m-standard-header__logo\">\n\t\t\tin\n\t\t</span>\n\n\t\t<h1 class=\"m-standard-header__title\">\n\t\t\tPeople\n\t\t</h1>\n\n\t</div>\n</div>\n\n<div class=\"m-stndard-body\">\n\t<div class=\"m-standard-body__container\">\n\n\t\t<!-- BEGIN: Loading State. -->\n\t\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t\t</ng-template>\n\t\t<!-- END: Loading State. -->\n\n\n\t\t<!-- BEGIN: Loaded State. -->\n\t\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t\t<div class=\"title\">\n\t\t\t\tYou Have {{ users.length }} Connections\n\t\t\t</div>\n\n\t\t\t<!-- <a [routerLink]=\"[ '/app', { outlets: { modal: 'modal/invite-user' } } ]\" class=\"plus\">+</a> -->\n\n\t\t\t<ul class=\"users\">\n\t\t\t\t<li \n\t\t\t\t\t*ngFor=\"let user of users; let i = index ;\"\n\t\t\t\t\tclass=\"users__item users__item--column-{{ ( ( i % 3 ) + 1 ) }}\">\n\n\t\t\t\t\t<a [routerLink]=\"[ '../', user.id ]\" class=\"user\">\n\t\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t\t[initials]=\"user.initials\"\n\t\t\t\t\t\t\t[src]=\"user.avatarUrl\"\n\t\t\t\t\t\t\tclass=\"user__avatar\">\n\t\t\t\t\t\t</app-avatar>\n\t\t\t\t\t\t<span class=\"user__name\">\n\t\t\t\t\t\t\t{{ user.name }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"user__email\">\n\t\t\t\t\t\t\t{{ user.email }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span *ngIf=\"user.isOwner\" class=\"user__tag\">\n\t\t\t\t\t\t\tOwner\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</a>\n\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t</ng-template>\n\t\t<!-- END: Loaded State. -->\t\n\n\t</div>\n</div>\n"

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var list_view_module_1 = __webpack_require__(506);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ProjectsViewModule = /** @class */ (function () {
    function ProjectsViewModule() {
    }
    ProjectsViewModule.routes = [
        {
            path: "projects",
            children: list_view_module_1.ListViewModule.routes.concat([
                // Handle the "no route" case.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "list"
                }
            ])
        }
    ];
    ProjectsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                list_view_module_1.ListViewModule
            ]
        })
    ], ProjectsViewModule);
    return ProjectsViewModule;
}());
exports.ProjectsViewModule = ProjectsViewModule;


/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var board_item_component_1 = __webpack_require__(507);
var freehand_item_component_1 = __webpack_require__(510);
var list_view_component_1 = __webpack_require__(513);
var partial_service_1 = __webpack_require__(131);
var prototype_item_component_1 = __webpack_require__(516);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ListViewModule = /** @class */ (function () {
    function ListViewModule() {
    }
    ListViewModule.routes = [
        {
            path: "list",
            component: list_view_component_1.ListViewComponent
        }
    ];
    ListViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                board_item_component_1.BoardItemComponent,
                freehand_item_component_1.FreehandItemComponent,
                list_view_component_1.ListViewComponent,
                prototype_item_component_1.PrototypeItemComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], ListViewModule);
    return ListViewModule;
}());
exports.ListViewModule = ListViewModule;


/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var BoardItemComponent = /** @class */ (function () {
    function BoardItemComponent() {
    }
    BoardItemComponent = __decorate([
        core_2.Component({
            selector: "board-item",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            inputs: ["item"],
            styles: [__webpack_require__(508)],
            template: __webpack_require__(509)
        })
    ], BoardItemComponent);
    return BoardItemComponent;
}());
exports.BoardItemComponent = BoardItemComponent;


/***/ }),
/* 508 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FAFAFA ;\n  border-radius: 2px 2px 2px 2px ;\n  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  display: block ;\n  position: relative ;\n  transition: all 200ms ease ;\n}\n:host:hover {\n  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.25);\n}\n.link {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.link__cta {\n  border: 1px solid #CCCCCC ;\n  border-radius: 36px 36px 36px 36px ;\n  color: #333333 ;\n  font-size: 12px ;\n  font-weight: 400 ;\n  height: 36px ;\n  left: 50% ;\n  line-height: 36px ;\n  margin-left: -84px;\n  opacity: 0 ;\n  position: absolute ;\n  text-align: center ;\n  text-transform: uppercase ;\n  top: 80px ;\n  transition: all 200ms ease ;\n  width: 166px ;\n}\n.link__cta:hover {\n  background-color: #1FC281 ;\n  border-color: #1FC281 ;\n  color: #FFFFFF ;\n}\n.link__name {\n  bottom: 30px ;\n  color: #333333 ;\n  font-size: 16px ;\n  max-width: 65% ;\n  left: 28px ;\n  line-height: 22px ;\n  overflow: hidden ;\n  position: absolute ;\n  text-overflow: ellipsis ;\n  white-space: nowrap ;\n}\n.link:hover .link__cta {\n  opacity: 1 ;\n}\n"

/***/ }),
/* 509 */
/***/ (function(module, exports) {

module.exports = "\n<a [routerLink]=\"item.resource\" class=\"link\">\n\t<span class=\"link__cta\">View Board</span>\n\t<span class=\"link__name\">{{ item.item.name }}</span>\n</a>\n"

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var FreehandItemComponent = /** @class */ (function () {
    function FreehandItemComponent() {
    }
    FreehandItemComponent = __decorate([
        core_2.Component({
            selector: "freehand-item",
            inputs: ["item"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [__webpack_require__(511)],
            template: __webpack_require__(512)
        })
    ], FreehandItemComponent);
    return FreehandItemComponent;
}());
exports.FreehandItemComponent = FreehandItemComponent;


/***/ }),
/* 511 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FAFAFA ;\n  border-radius: 2px 2px 2px 2px ;\n  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  display: block ;\n  position: relative ;\n  transition: all 200ms ease ;\n}\n:host:hover {\n  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.25);\n}\n.link {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.link__cta {\n  border: 1px solid #CCCCCC ;\n  border-radius: 36px 36px 36px 36px ;\n  color: #333333 ;\n  font-size: 12px ;\n  font-weight: 400 ;\n  height: 36px ;\n  left: 50% ;\n  line-height: 36px ;\n  margin-left: -84px;\n  opacity: 0 ;\n  position: absolute ;\n  text-align: center ;\n  text-transform: uppercase ;\n  top: 62px ;\n  transition: all 200ms ease ;\n  width: 166px ;\n}\n.link__cta:hover {\n  background-color: #1FC281 ;\n  border-color: #1FC281 ;\n  color: #FFFFFF ;\n}\n.link__footer {\n  background-color: #FFFFFF ;\n  border-radius: 0px 0px 2px 2px ;\n  border-top: 1px solid #EAEAEA ;\n  bottom: 0px ;\n  height: 90px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n.link__name {\n  bottom: 30px ;\n  color: #333333 ;\n  font-size: 16px ;\n  max-width: 65% ;\n  left: 28px ;\n  line-height: 22px ;\n  overflow: hidden ;\n  position: absolute ;\n  text-overflow: ellipsis ;\n  white-space: nowrap ;\n}\n.link:hover .link__cta {\n  opacity: 1 ;\n}\n"

/***/ }),
/* 512 */
/***/ (function(module, exports) {

module.exports = "\n<a [routerLink]=\"item.resource\" class=\"link\">\n\t<span class=\"link__cta\">View Freehand</span>\n\t<span class=\"link__footer\">\n\t\t<span class=\"link__name\">{{ item.item.name }}</span>\n\t</span>\n</a>\n"

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(131);
var ListViewComponent = /** @class */ (function () {
    // I initialize the list-view component.
    function ListViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.filterText = "";
        this.filterType = "all";
        this.filteredProjects = [];
        this.filterTextHasFocus = false; // This is updated in the HTML itself (easier).
        this.isLoading = true;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I navigate to the first item in the filtered list.
    ListViewComponent.prototype.handleEnter = function () {
        var project = this.filteredProjects.find(function (filteredProject) {
            return (filteredProject.isVisible);
        });
        if (project) {
            this.router.navigateByUrl(project.resource);
        }
    };
    ListViewComponent.prototype.handleFilter = function () {
        // NOTE: When we persist the filter, our subscription to the ActivatedRoute will
        // automatically alert us and we can loop the change back into the filtered list.
        this.persistFilterToRoute();
    };
    ListViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    ListViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.filterText = (paramMap.get("filterText") || "");
            _this.filterType = (paramMap.get("filterType") || "all");
            _this.applyFilterToList();
        });
        this.loadData();
    };
    ListViewComponent.prototype.showType = function (filterType) {
        this.filterType = filterType;
        // NOTE: When we persist the filter, our subscription to the ActivatedRoute will
        // automatically alert us and we can loop the change back into the filtered list.
        this.persistFilterToRoute();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ListViewComponent.prototype.applyFilterToList = function () {
        var _this = this;
        var normalizedFilter = this.filterText.trim().toLowerCase();
        var visibleIndex = 0;
        this.filteredProjects.forEach(function (filteredProject, i) {
            filteredProject.isVisible = false;
            // If the list if being filtered by type (ie, not all), and the given 
            // project doesn't match the given type, skip tag evaluation - we're
            // not going to show this list item.
            if ((_this.filterType !== "all") &&
                (_this.filterType !== filteredProject.type)) {
                return;
            }
            if (_this.containsSubstring(filteredProject.tags, normalizedFilter)) {
                filteredProject.column = ((visibleIndex++ % 3) + 1);
                filteredProject.isVisible = true;
            }
        });
    };
    // I determine if the collection of values contains the given input as a substring.
    ListViewComponent.prototype.containsSubstring = function (values, input) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (value.includes(input)) {
                return (true);
            }
        }
        return (false);
    };
    ListViewComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get()
            .then(function (partial) {
            _this.isLoading = false;
            _this.filteredProjects = [];
            for (var _i = 0, _a = partial.boards; _i < _a.length; _i++) {
                var board = _a[_i];
                _this.filteredProjects.push({
                    type: "board",
                    item: board,
                    tags: [board.name.toLowerCase()],
                    column: 0,
                    isVisible: false,
                    resource: "/app/boards/" + board.id
                });
            }
            for (var _b = 0, _c = partial.freehands; _b < _c.length; _b++) {
                var freehand = _c[_b];
                _this.filteredProjects.push({
                    type: "freehand",
                    item: freehand,
                    tags: [freehand.name.toLowerCase()],
                    column: 0,
                    isVisible: false,
                    resource: "/app/freehands/" + freehand.id
                });
            }
            for (var _d = 0, _e = partial.prototypes; _d < _e.length; _d++) {
                var prototype = _e[_d];
                _this.filteredProjects.push({
                    type: "prototype",
                    item: prototype,
                    tags: [prototype.name.toLowerCase()],
                    column: 0,
                    isVisible: false,
                    resource: "/app/prototypes/" + prototype.id
                });
            }
            _this.filteredProjects.sort(function (a, b) {
                var aName = a.item.name.toLowerCase();
                var bName = b.item.name.toLowerCase();
                if (aName < bName) {
                    return (-1);
                }
                else if (aName > bName) {
                    return (1);
                }
                else {
                    return (0);
                }
            });
            _this.applyFilterToList();
        })
            .catch(function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-projects"
                    }
                }
            ]);
        });
    };
    ListViewComponent.prototype.persistFilterToRoute = function () {
        var filterParams = {
            filterText: this.filterText,
            filterType: this.filterType
        };
        (!this.filterText) && delete (filterParams.filterText);
        (!this.filterType || (this.filterType === "all")) && delete (filterParams.filterType);
        this.router.navigate([
            filterParams
        ], {
            relativeTo: this.activatedRoute
        });
    };
    ListViewComponent = __decorate([
        core_1.Component({
            selector: "list-view",
            styles: [
                __webpack_require__(28),
                __webpack_require__(514)
            ],
            template: __webpack_require__(515)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], ListViewComponent);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;


/***/ }),
/* 514 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.filtering__search {\n  float: left ;\n}\n.filtering__categories {\n  float: right ;\n}\n.filtering:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.search__input {\n  border: 0px solid #CCCCCC ;\n  border-bottom-width: 1px ;\n  outline: 0px ;\n  padding: 10px 20px 10px 10px ;\n  width: 300px ;\n}\n.search__tip {\n  color: #666666 ;\n  display: inline-block;\n  font-size: 14px ;\n  margin-left: 15px ;\n  vertical-align: middle ;\n}\n.search__key {\n  background-color: #FAFAFA ;\n  border: 1px solid #DADADA ;\n  border-radius: 4px 4px 4px 4px ;\n  color: #CC0000 ;\n  display: inline-block;\n  margin: 0px 2px 0px 2px ;\n  padding: 1px 7px 2px 7px ;\n}\n.categories {\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.categories__item {\n  float: left ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 25px ;\n}\n.categories__link {\n  color: #8C96A9 ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  line-height: 42px ;\n  padding: 0px 5px 0px 5px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.categories__link:hover:not( .categories__link--on ) {\n  color: #596378 ;\n}\n.categories__link--on {\n  border-bottom: 2px solid #FF3366 ;\n  color: #FF3366 ;\n}\n.plus {\n  background-color: #FF3366 ;\n  border-radius: 50px 50px 50px 50px ;\n  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.28);\n  color: #FFFFFF ;\n  font-size: 34px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: -28px;\n  transition: all 150ms ease ;\n  width: 50px ;\n}\n.plus:hover {\n  border-radius: 54px 54px 54px 54px ;\n  height: 54px ;\n  line-height: 54px ;\n  right: -2px;\n  top: -30px;\n  width: 54px ;\n}\n.projects {\n  list-style-type: none ;\n  margin: 40px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.projects:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n}\n.projects__item {\n  float: left ;\n  height: 250px ;\n  margin: 20px 48px 20px 0px ;\n  position: relative ;\n  width: 356px ;\n}\n.projects__item--column-3 {\n  margin-right: 0px ;\n}\n.projects__link {\n  height: 250px ;\n  width: 356px ;\n}\n.failure-case a {\n  color: #999999 ;\n}\n"

/***/ }),
/* 515 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"m-standard-header\">\n\t<div class=\"m-standard-header__container\">\n\n\t\t<span routerLink=\"/\" class=\"m-standard-header__logo\">\n\t\t\tin\n\t\t</span>\n\n\t\t<h1 class=\"m-standard-header__title\">\n\t\t\tMy Projects\n\t\t</h1>\n\n\t</div>\n</div>\n\n<div class=\"m-stndard-body\">\n\t<div class=\"m-standard-body__container\">\n\n\t\t<div class=\"filtering\">\n\n\t\t\t<form class=\"filtering__search search\">\n\n\t\t\t\t<input\n\t\t\t\t\ttype=\"text\" \n\t\t\t\t\tname=\"filterText\"\n\t\t\t\t\t[(ngModel)]=\"filterText\" \n\t\t\t\t\t(ngModelChange)=\"handleFilter()\" \n\t\t\t\t\t(keydown.enter)=\"handleEnter()\"\n\t\t\t\t\t(focus)=\"filterTextHasFocus = true\"\n\t\t\t\t\t(blur)=\"filterTextHasFocus = false\"\n\t\t\t\t\tplaceholder=\"Search for a project...\" \n\t\t\t\t\tautocomplete=\"off\"\n\t\t\t\t\tautofocus\n\t\t\t\t\tclass=\"search__input\" \n\t\t\t\t/>\n\n\t\t\t\t<span *ngIf=\"( filterTextHasFocus && filterText.length )\" class=\"search__tip\">\n\t\t\t\t\t&#8592; <strong>Tip:</strong> Hit <code class=\"search__key\">Enter</code> to navigate to first item.\n\t\t\t\t</span>\n\n\t\t\t</form>\n\n\t\t\t<ul class=\"filtering__categories categories\">\n\t\t\t\t<li class=\"categories__item\">\n\t\t\t\t\t<a \n\t\t\t\t\t\t(click)=\"showType( 'all' )\"\n\t\t\t\t\t\tclass=\"categories__link\"\n\t\t\t\t\t\t[class.categories__link--on]=\"( filterType === 'all' )\">\n\t\t\t\t\t\tAll\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"categories__item\">\n\t\t\t\t\t<a\n\t\t\t\t\t\t(click)=\"showType( 'prototype' )\"\n\t\t\t\t\t\tclass=\"categories__link\"\n\t\t\t\t\t\t[class.categories__link--on]=\"( filterType === 'prototype' )\">\n\t\t\t\t\t\tPrototypes\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"categories__item\">\n\t\t\t\t\t<a\n\t\t\t\t\t\t(click)=\"showType( 'board' )\"\n\t\t\t\t\t\tclass=\"categories__link\"\n\t\t\t\t\t\t[class.categories__link--on]=\"( filterType === 'board' )\">\n\t\t\t\t\t\tBoards\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"categories__item\">\n\t\t\t\t\t<a\n\t\t\t\t\t\t(click)=\"showType( 'freehand' )\"\n\t\t\t\t\t\tclass=\"categories__link\"\n\t\t\t\t\t\t[class.categories__link--on]=\"( filterType === 'freehand' )\">\n\t\t\t\t\t\tFreehands\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t</div>\n\n\t\t<!-- BEGIN: Loading State. -->\n\t\t<ng-template [ngIf]=\"isLoading\">\n\n\t\t\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n\t\t</ng-template>\n\t\t<!-- END: Loading State. -->\n\n\n\t\t<!-- BEGIN: Loaded State. -->\n\t\t<ng-template [ngIf]=\"! isLoading\">\n\n\t\t\t<a [routerLink]=\"[ '/app', { outlets: { modal: 'modal/create-project' } } ]\" class=\"plus\">+</a>\n\n\t\t\t<ul class=\"projects\">\n\t\t\t\t<li \n\t\t\t\t\t*ngFor=\"let item of filteredProjects\"\n\t\t\t\t\tclass=\"projects__item projects__item--column-{{ item.column }}\"\n\t\t\t\t\t[appShowBlock]=\"item.isVisible\"\n\t\t\t\t\t[ngSwitch]=\"item.type\">\n\n\t\t\t\t\t<ng-template ngSwitchCase=\"prototype\">\n\t\t\t\t\t\t<prototype-item [item]=\"item\" class=\"projects__link\"></prototype-item>\n\t\t\t\t\t</ng-template>\n\n\t\t\t\t\t<ng-template ngSwitchCase=\"board\">\n\t\t\t\t\t\t<board-item [item]=\"item\" class=\"projects__link\"></board-item>\n\t\t\t\t\t</ng-template>\n\n\t\t\t\t\t<ng-template ngSwitchCase=\"freehand\">\n\t\t\t\t\t\t<freehand-item [item]=\"item\" class=\"projects__link\"></freehand-item>\n\t\t\t\t\t</ng-template>\n\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<p class=\"failure-case\">\n\t\t\t\t<a routerLink=\"/app/prototypes/999999\">Goto Missing Project</a>\n\t\t\t</p>\n\n\t\t</ng-template>\n\t\t<!-- END: Loaded State. -->\t\n\n\t</div>\n</div>\n"

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PrototypeItemComponent = /** @class */ (function () {
    function PrototypeItemComponent() {
    }
    PrototypeItemComponent = __decorate([
        core_2.Component({
            selector: "prototype-item",
            inputs: ["item"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: [__webpack_require__(517)],
            template: __webpack_require__(518)
        })
    ], PrototypeItemComponent);
    return PrototypeItemComponent;
}());
exports.PrototypeItemComponent = PrototypeItemComponent;


/***/ }),
/* 517 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #FAFAFA ;\n  border-radius: 2px 2px 2px 2px ;\n  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  display: block ;\n  position: relative ;\n  transition: all 200ms ease ;\n}\n:host:hover {\n  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.25);\n}\n.link {\n  bottom: 0px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n}\n.link__cta {\n  border: 1px solid #CCCCCC ;\n  border-radius: 36px 36px 36px 36px ;\n  color: #333333 ;\n  font-size: 12px ;\n  font-weight: 400 ;\n  height: 36px ;\n  left: 50% ;\n  line-height: 36px ;\n  margin-left: -84px;\n  opacity: 0 ;\n  position: absolute ;\n  text-align: center ;\n  text-transform: uppercase ;\n  top: 62px ;\n  transition: all 200ms ease ;\n  width: 166px ;\n}\n.link__cta:hover {\n  background-color: #1FC281 ;\n  border-color: #1FC281 ;\n  color: #FFFFFF ;\n}\n.link__footer {\n  background-color: #FFFFFF ;\n  border-radius: 0px 0px 2px 2px ;\n  border-top: 1px solid #EAEAEA ;\n  bottom: 0px ;\n  height: 90px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n.link__name {\n  bottom: 30px ;\n  color: #333333 ;\n  font-size: 16px ;\n  max-width: 65% ;\n  left: 28px ;\n  line-height: 22px ;\n  overflow: hidden ;\n  position: absolute ;\n  text-overflow: ellipsis ;\n  white-space: nowrap ;\n}\n.link:hover .link__cta {\n  opacity: 1 ;\n}\n"

/***/ }),
/* 518 */
/***/ (function(module, exports) {

module.exports = "\n<a [routerLink]=\"item.resource\" class=\"link\">\n\t<span class=\"link__cta\">View Prototype</span>\n\t<span class=\"link__footer\">\n\t\t<span class=\"link__name\">{{ item.item.name }}</span>\n\t</span>\n</a>\n"

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var detail_view_module_1 = __webpack_require__(520);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var PrototypesViewModule = /** @class */ (function () {
    function PrototypesViewModule() {
    }
    PrototypesViewModule.routes = [
        {
            path: "prototypes",
            children: detail_view_module_1.DetailViewModule.routes.concat([
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "/app/projects/list;filterType=prototype"
                }
            ])
        }
    ];
    PrototypesViewModule = __decorate([
        core_1.NgModule({
            imports: [
                detail_view_module_1.DetailViewModule
            ]
        })
    ], PrototypesViewModule);
    return PrototypesViewModule;
}());
exports.PrototypesViewModule = PrototypesViewModule;


/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var activity_view_module_1 = __webpack_require__(521);
var assets_view_module_1 = __webpack_require__(525);
var comments_view_module_1 = __webpack_require__(529);
var detail_view_component_1 = __webpack_require__(533);
var partial_service_1 = __webpack_require__(132);
var screens_view_module_1 = __webpack_require__(536);
var shared_module_1 = __webpack_require__(2);
var workflow_view_module_1 = __webpack_require__(540);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var DetailViewModule = /** @class */ (function () {
    function DetailViewModule() {
    }
    DetailViewModule.routes = [
        {
            path: ":id",
            component: detail_view_component_1.DetailViewComponent,
            children: activity_view_module_1.ActivityViewModule.routes.concat(assets_view_module_1.AssetsViewModule.routes, comments_view_module_1.CommentsViewModule.routes, screens_view_module_1.ScreensViewModule.routes, workflow_view_module_1.WorkflowViewModule.routes, [
                // Handle no route situation.
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "screens"
                }
            ])
        }
    ];
    DetailViewModule = __decorate([
        core_1.NgModule({
            imports: [
                activity_view_module_1.ActivityViewModule,
                assets_view_module_1.AssetsViewModule,
                comments_view_module_1.CommentsViewModule,
                screens_view_module_1.ScreensViewModule,
                shared_module_1.SharedModule,
                workflow_view_module_1.WorkflowViewModule
            ],
            declarations: [
                detail_view_component_1.DetailViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], DetailViewModule);
    return DetailViewModule;
}());
exports.DetailViewModule = DetailViewModule;


/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var activity_view_component_1 = __webpack_require__(522);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ActivityViewModule = /** @class */ (function () {
    function ActivityViewModule() {
    }
    ActivityViewModule.routes = [
        {
            path: "activity",
            component: activity_view_component_1.ActivityViewComponent
        }
    ];
    ActivityViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                activity_view_component_1.ActivityViewComponent
            ]
        })
    ], ActivityViewModule);
    return ActivityViewModule;
}());
exports.ActivityViewModule = ActivityViewModule;


/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ActivityViewComponent = /** @class */ (function () {
    // I initialize the activity-view component.
    function ActivityViewComponent() {
        // ...
    }
    ActivityViewComponent = __decorate([
        core_1.Component({
            selector: "activity-view",
            styles: [__webpack_require__(523)],
            template: __webpack_require__(524)
        }),
        __metadata("design:paramtypes", [])
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;


/***/ }),
/* 523 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 524 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tActivity\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var assets_view_component_1 = __webpack_require__(526);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var AssetsViewModule = /** @class */ (function () {
    function AssetsViewModule() {
    }
    AssetsViewModule.routes = [
        {
            path: "assets",
            component: assets_view_component_1.AssetsViewComponent
        }
    ];
    AssetsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                assets_view_component_1.AssetsViewComponent
            ]
        })
    ], AssetsViewModule);
    return AssetsViewModule;
}());
exports.AssetsViewModule = AssetsViewModule;


/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var AssetsViewComponent = /** @class */ (function () {
    // I initialize the assets-view component.
    function AssetsViewComponent() {
        // ...
    }
    AssetsViewComponent = __decorate([
        core_1.Component({
            selector: "assets-view",
            styles: [__webpack_require__(527)],
            template: __webpack_require__(528)
        }),
        __metadata("design:paramtypes", [])
    ], AssetsViewComponent);
    return AssetsViewComponent;
}());
exports.AssetsViewComponent = AssetsViewComponent;


/***/ }),
/* 527 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 528 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tAssets View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var comments_view_component_1 = __webpack_require__(530);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var CommentsViewModule = /** @class */ (function () {
    function CommentsViewModule() {
    }
    CommentsViewModule.routes = [
        {
            path: "comments",
            component: comments_view_component_1.CommentsViewComponent
        }
    ];
    CommentsViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                comments_view_component_1.CommentsViewComponent
            ]
        })
    ], CommentsViewModule);
    return CommentsViewModule;
}());
exports.CommentsViewModule = CommentsViewModule;


/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var CommentsViewComponent = /** @class */ (function () {
    // I initialize the comments-view component.
    function CommentsViewComponent() {
        // ...
    }
    CommentsViewComponent = __decorate([
        core_1.Component({
            selector: "comments-view",
            styles: [__webpack_require__(531)],
            template: __webpack_require__(532)
        }),
        __metadata("design:paramtypes", [])
    ], CommentsViewComponent);
    return CommentsViewComponent;
}());
exports.CommentsViewComponent = CommentsViewComponent;


/***/ }),
/* 531 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 532 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tComments View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(132);
var DetailViewComponent = /** @class */ (function () {
    // I initialize the detail-view component.
    function DetailViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.isLoading = true;
        this.prototype = null;
    }
    // ---
    // PUBLIE METHODS.
    // ---
    // I get called once when the component is being unmounted.
    DetailViewComponent.prototype.ngOnDestroy = function () {
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    // I get called once when the component is being mounted.
    DetailViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
    };
    // ---
    // PRIVATE METHODS.
    // ---
    DetailViewComponent.prototype.loadData = function (prototypeID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(prototypeID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.prototype = partial.prototype;
            _this.members = partial.members;
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        primary: ["projects", "list", { filterType: "prototype" }],
                        modal: "modal/error/could-not-load-prototype"
                    }
                }
            ]);
        });
    };
    DetailViewComponent = __decorate([
        core_1.Component({
            selector: "detail-view",
            styles: [
                __webpack_require__(28),
                __webpack_require__(534)
            ],
            template: __webpack_require__(535)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], DetailViewComponent);
    return DetailViewComponent;
}());
exports.DetailViewComponent = DetailViewComponent;


/***/ }),
/* 534 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.prototype-meta {\n  top: 25px ;\n  position: absolute ;\n  right: 0px ;\n}\n.prototype-meta:after {\n  clear: all ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.prototype-meta__share-actions {\n  float: left ;\n}\n.prototype-meta__member-actions {\n  float: left ;\n  margin-left: 10px ;\n}\n.share-actions:after {\n  clear: all ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.share-actions__item {\n  border-radius: 36px 36px 36px 36px ;\n  box-sizing: border-box;\n  float: left ;\n  height: 36px ;\n  line-height: 36px ;\n  text-decoration: none ;\n}\n.share-actions__item--user-test,\n.share-actions__item--liveshare {\n  border: 1px solid #464D5D ;\n  margin-right: 7px ;\n  width: 36px ;\n  color: #FFFFFF ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  text-align: center ;\n}\n.share-actions__item--share {\n  background-color: #11B683 ;\n  color: #FFFFFF ;\n  font-size: 11px ;\n  font-weight: 600 ;\n  margin-left: 18px ;\n  padding: 0px 30px 0px 30px ;\n  text-transform: uppercase ;\n}\n.member-actions {\n  display: block ;\n}\n.member-actions:after {\n  clear: all ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.member-actions__item {\n  height: 36px ;\n  float: left ;\n  position: relative ;\n  overflow: visible ;\n  width: 35px ;\n}\n.member-actions__item:nth-child( 1 ) {\n  z-index: 49;\n}\n.member-actions__item:nth-child( 2 ) {\n  z-index: 48;\n}\n.member-actions__item:nth-child( 3 ) {\n  z-index: 47;\n}\n.member-actions__item:nth-child( 4 ) {\n  z-index: 46;\n}\n.member-actions__item:nth-child( 5 ) {\n  z-index: 45;\n}\n.member-actions__item:nth-child( 6 ) {\n  z-index: 44;\n}\n.member-actions__avatar,\n.member-actions__overage,\n.member-actions__plus {\n  border-radius: 40px 40px 40px 40px ;\n  box-sizing: border-box;\n  color: #FFFFFF ;\n  display: block ;\n  height: 40px ;\n  left: 0px ;\n  position: absolute ;\n  top: -2px;\n  width: 40px ;\n}\n.member-actions__overage,\n.member-actions__plus {\n  letter-spacing: 1px ;\n  line-height: 36px ;\n  text-align: center ;\n}\n.member-actions__avatar {\n  background-color: #959BA1 ;\n  border: 2px solid #1F2532 ;\n}\n.member-actions__overage {\n  background-color: #1E8FE1 ;\n  border: 2px solid #1F2532 ;\n  font-size: 10px ;\n  font-weight: 700 ;\n}\n.member-actions__plus {\n  border: 1px dashed #464D5D ;\n  font-size: 20px ;\n  font-weight: 600 ;\n  line-height: 38px ;\n}\n.member-actions__plus:hover {\n  border-color: #676E7A ;\n}\n"

/***/ }),
/* 535 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<div class=\"m-standard-header\">\n\t\t<div class=\"m-standard-header__container m-standard-header__container--with-nav\">\n\n\t\t\t<span routerLink=\"/app/prototypes\" class=\"m-standard-header__logo\">\n\t\t\t\tin\n\t\t\t</span>\n\n\t\t\t<h1 class=\"m-standard-header__title\">\n\t\t\t\t{{ prototype.name }}\n\t\t\t</h1>\n\n\t\t\t<div class=\"prototype-meta\">\n\n\t\t\t\t<div class=\"prototype-meta__share-actions share-actions\">\n\t\t\t\t\t<a class=\"share-actions__item share-actions__item--user-test\">\n\t\t\t\t\t\tUT\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class=\"share-actions__item share-actions__item--liveshare\">\n\t\t\t\t\t\tLS\n\t\t\t\t\t</a>\n\t\t\t\t\t<a\n\t\t\t\t\t\t[routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'share-prototype', prototype.id ] } } ]\"\n\t\t\t\t\t\tclass=\"share-actions__item share-actions__item--share\">\n\t\t\t\t\t\tShare\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"prototype-meta__member-actions\">\n\t\t\t\t\t\n\t\t\t\t\t<a [routerLink]=\"[ '/app', { outlets: { modal: [ 'modal', 'prototype-members', prototype.id ] } } ]\" class=\"member-actions\">\n\t\t\t\t\t\t<span *ngFor=\"let member of members\" class=\"member-actions__item\">\n\t\t\t\t\t\t\t<app-avatar\n\t\t\t\t\t\t\t\t[initials]=\"member.initials\"\n\t\t\t\t\t\t\t\t[src]=\"member.avatarUrl\"\n\t\t\t\t\t\t\t\tclass=\"member-actions__avatar\">\n\t\t\t\t\t\t\t</app-avatar>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"member-actions__item\">\n\t\t\t\t\t\t\t<span class=\"member-actions__overage\">+3</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"member-actions__item\">\n\t\t\t\t\t\t\t<span class=\"member-actions__plus\">+</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</a>\n\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<nav class=\"m-standard-header__nav\">\n\t\t\t\t<a routerLink=\"./screens\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Screens</a>\n\t\t\t\t<a routerLink=\"./workflow\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Workflow</a>\n\t\t\t\t<a routerLink=\"./activity\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Activity</a>\n\t\t\t\t<a routerLink=\"./comments\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Comments</a>\n\t\t\t\t<a routerLink=\"./assets\" class=\"m-standard-header__nav-item\" routerLinkActive=\"m-standard-header__nav-item--on\">Assets</a>\n\t\t\t</nav>\n\n\t\t</div>\n\t</div>\n\n\t<div class=\"m-standard-body\">\n\t\t<div class=\"m-standard-body__container\">\n\n\t\t\t<router-outlet></router-outlet>\n\n\t\t</div>\n\t</div>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 536 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var partial_service_1 = __webpack_require__(133);
var screens_view_component_1 = __webpack_require__(537);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var ScreensViewModule = /** @class */ (function () {
    function ScreensViewModule() {
    }
    ScreensViewModule.routes = [
        {
            path: "screens",
            component: screens_view_component_1.ScreensViewComponent
        }
    ];
    ScreensViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                screens_view_component_1.ScreensViewComponent
            ],
            providers: [
                partial_service_1.PartialService
            ]
        })
    ], ScreensViewModule);
    return ScreensViewModule;
}());
exports.ScreensViewModule = ScreensViewModule;


/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var router_1 = __webpack_require__(1);
var core_1 = __webpack_require__(0);
var router_2 = __webpack_require__(1);
// Import these modules for their side-effects.
__webpack_require__(6);
// Import the application components and services.
var error_logger_1 = __webpack_require__(4);
var partial_service_1 = __webpack_require__(133);
var ScreensViewComponent = /** @class */ (function () {
    // I initialize the screens-view component.
    function ScreensViewComponent(activatedRoute, errorLogger, partialService, router) {
        this.activatedRoute = activatedRoute;
        this.errorLogger = errorLogger;
        this.partialService = partialService;
        this.router = router;
        this.filteredScreens = [];
        this.filterText = "";
        this.filterTextHasFocus = false; // This is updated in the HTML itself (easier).
        this.filterType = "active";
        this.isLoading = true;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    // I navigate to the first item in the filtered list.
    ScreensViewComponent.prototype.handleEnter = function () {
        var visibleScreen = this.filteredScreens.find(function (filteredScreen) {
            return (filteredScreen.isVisible);
        });
        if (visibleScreen) {
            this.router.navigateByUrl(visibleScreen.resource);
        }
    };
    ScreensViewComponent.prototype.handleFilter = function () {
        // NOTE: When we persist the filter, our subscription to the ActivatedRoute will
        // automatically alert us and we can loop the change back into the filtered list.
        this.persistFilterToRoute();
    };
    // I get called once when the component is being unmounted.
    ScreensViewComponent.prototype.ngOnDestroy = function () {
        (this.parentParamMapSubscription) && this.parentParamMapSubscription.unsubscribe();
        (this.paramMapSubscription) && this.paramMapSubscription.unsubscribe();
    };
    // I get called once when the component is being mounted.
    ScreensViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentParamMapSubscription = this.activatedRoute.parent.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.loadData(+paramMap.get("id"));
        });
        this.paramMapSubscription = this.activatedRoute.paramMap
            .delay(10)
            .subscribe(function (paramMap) {
            _this.filterText = (paramMap.get("filterText") || "");
            _this.filterType = (paramMap.get("filterType") || "active");
            _this.applyFilterToList();
        });
    };
    ScreensViewComponent.prototype.showType = function (filterType) {
        this.filterType = filterType;
        // NOTE: When we persist the filter, our subscription to the ActivatedRoute will
        // automatically alert us and we can loop the change back into the filtered list.
        this.persistFilterToRoute();
    };
    // ---
    // PRIVATE METHODS.
    // ---
    ScreensViewComponent.prototype.applyFilterToList = function () {
        var _this = this;
        var normalizedFilter = this.filterText.trim().toLowerCase();
        var visibleIndex = 0;
        this.filteredScreens.forEach(function (filteredScreen, i) {
            filteredScreen.isVisible = false;
            if (((_this.filterType === "active") && filteredScreen.screen.isArchived) ||
                ((_this.filterType === "archived") && !filteredScreen.screen.isArchived)) {
                return;
            }
            if (_this.containsSubstring(filteredScreen.tags, normalizedFilter)) {
                filteredScreen.column = ((visibleIndex++ % 4) + 1);
                filteredScreen.isVisible = true;
            }
        });
    };
    // I determine if the collection of values contains the given input as a substring.
    ScreensViewComponent.prototype.containsSubstring = function (values, input) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (value.includes(input)) {
                return (true);
            }
        }
        return (false);
    };
    ScreensViewComponent.prototype.loadData = function (prototypeID) {
        var _this = this;
        this.isLoading = true;
        this.partialService
            .get(prototypeID)
            .then(function (partial) {
            _this.isLoading = false;
            _this.filteredScreens = partial.screens.map(function (screen) {
                return ({
                    screen: screen,
                    tags: [screen.name.toLowerCase(), screen.filename.toLowerCase()],
                    column: 0,
                    isVisible: false,
                    resource: "/app/console/prototypes/" + screen.prototypeID + "/screens/" + screen.id
                });
            });
            _this.filteredScreens.sort(function (a, b) {
                var aName = a.screen.name.toLowerCase();
                var bName = b.screen.name.toLowerCase();
                if (aName < bName) {
                    return (-1);
                }
                else if (aName > bName) {
                    return (1);
                }
                else {
                    return (0);
                }
            });
            _this.applyFilterToList();
        }, function (error) {
            _this.errorLogger.log(error);
            _this.router.navigate([
                "/app",
                {
                    outlets: {
                        modal: "modal/error/could-not-load-prototype-screens"
                    }
                }
            ]);
        });
    };
    ScreensViewComponent.prototype.persistFilterToRoute = function () {
        var filterParams = {
            filterText: this.filterText,
            filterType: this.filterType
        };
        (!this.filterText) && delete (filterParams.filterText);
        (!this.filterType || (this.filterType === "active")) && delete (filterParams.filterType);
        this.router.navigate([
            filterParams
        ], {
            relativeTo: this.activatedRoute
        });
    };
    ScreensViewComponent = __decorate([
        core_1.Component({
            selector: "screens-view",
            styles: [__webpack_require__(538)],
            template: __webpack_require__(539)
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            error_logger_1.ErrorLogger,
            partial_service_1.PartialService,
            router_2.Router])
    ], ScreensViewComponent);
    return ScreensViewComponent;
}());
exports.ScreensViewComponent = ScreensViewComponent;


/***/ }),
/* 538 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.filtering__search {\n  float: left ;\n}\n.filtering__categories {\n  float: right ;\n}\n.filtering:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.search__input {\n  border: 0px solid #CCCCCC ;\n  border-bottom-width: 1px ;\n  outline: 0px ;\n  padding: 10px 20px 10px 10px ;\n  width: 300px ;\n}\n.search__tip {\n  color: #666666 ;\n  display: inline-block;\n  font-size: 14px ;\n  margin-left: 15px ;\n  vertical-align: middle ;\n}\n.search__key {\n  background-color: #FAFAFA ;\n  border: 1px solid #DADADA ;\n  border-radius: 4px 4px 4px 4px ;\n  color: #CC0000 ;\n  display: inline-block;\n  margin: 0px 2px 0px 2px ;\n  padding: 1px 7px 2px 7px ;\n}\n.categories {\n  list-style-type: none ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.categories__item {\n  float: left ;\n  margin: 0px 0px 0px 0px ;\n  padding: 0px 0px 0px 25px ;\n}\n.categories__link {\n  color: #8C96A9 ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 600 ;\n  line-height: 42px ;\n  padding: 0px 5px 0px 5px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.categories__link:hover:not( .categories__link--on ) {\n  color: #596378 ;\n}\n.categories__link--on {\n  border-bottom: 2px solid #FF3366 ;\n  color: #FF3366 ;\n}\n.plus {\n  background-color: #FF3366 ;\n  border-radius: 50px 50px 50px 50px ;\n  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.28);\n  color: #FFFFFF ;\n  font-size: 34px ;\n  font-weight: 600 ;\n  height: 50px ;\n  line-height: 50px ;\n  position: absolute ;\n  right: 0px ;\n  text-align: center ;\n  text-decoration: none ;\n  top: -28px;\n  transition: all 150ms ease ;\n  width: 50px ;\n}\n.plus:hover {\n  border-radius: 54px 54px 54px 54px ;\n  height: 54px ;\n  line-height: 54px ;\n  right: -2px;\n  top: -30px;\n  width: 54px ;\n}\n.screens {\n  list-style-type: none ;\n  margin: 40px 0px 0px 0px ;\n  padding: 0px 0px 0px 0px ;\n}\n.screens:after {\n  clear: both ;\n  content: \"\";\n  display: table ;\n}\n.screens__item {\n  float: left ;\n  height: 250px ;\n  margin: 20px 30px 20px 0px ;\n  position: relative ;\n  width: 270px ;\n}\n.screens__item--column-4 {\n  margin-right: 0px ;\n}\n.screens__link {\n  height: 250px ;\n  width: 270px ;\n}\n.screen {\n  background-color: #FAFAFA ;\n  border-radius: 2px 2px 2px 2px ;\n  bottom: 0px ;\n  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n  display: block ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n  top: 0px ;\n  transition: all 200ms ease ;\n}\n.screen:hover {\n  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.25);\n}\n.screen__cta {\n  border: 1px solid #CCCCCC ;\n  border-radius: 5px 5px 5px 5px ;\n  color: #333333 ;\n  font-size: 12px ;\n  font-weight: 400 ;\n  height: 36px ;\n  left: 50% ;\n  line-height: 36px ;\n  margin-left: -84px;\n  opacity: 0 ;\n  position: absolute ;\n  text-align: center ;\n  text-transform: uppercase ;\n  top: 62px ;\n  transition: all 200ms ease ;\n  width: 166px ;\n}\n.screen__cta:hover {\n  background-color: #1FC281 ;\n  border-color: #1FC281 ;\n  color: #FFFFFF ;\n}\n.screen__footer {\n  background-color: #FFFFFF ;\n  border-radius: 0px 0px 2px 2px ;\n  border-top: 1px solid #EAEAEA ;\n  bottom: 0px ;\n  height: 90px ;\n  left: 0px ;\n  position: absolute ;\n  right: 0px ;\n}\n.screen__name {\n  color: #47506E ;\n  display: block ;\n  font-size: 14px ;\n  font-weight: 400 ;\n  line-height: 20px ;\n  margin: 25px auto 5px auto ;\n  overflow: hidden ;\n  text-align: center ;\n  text-overflow: ellipsis ;\n  white-space: nowrap ;\n  width: 95% ;\n}\n.screen__filename {\n  color: #828EA6 ;\n  display: block ;\n  font-size: 12px ;\n  line-height: 17px ;\n  margin: 0px auto 0px auto ;\n  overflow: hidden ;\n  text-align: center ;\n  text-overflow: ellipsis ;\n  white-space: nowrap ;\n  width: 95% ;\n}\n.screen:hover .screen__cta {\n  opacity: 1 ;\n}\n"

/***/ }),
/* 539 */
/***/ (function(module, exports) {

module.exports = "\n<!-- BEGIN: Loading State. -->\n<ng-template [ngIf]=\"isLoading\">\n\n\t<app-loading-indicator class=\"loading\"></app-loading-indicator>\n\n</ng-template>\n<!-- END: Loading State. -->\n\n\n<!-- BEGIN: Loaded State. -->\n<ng-template [ngIf]=\"! isLoading\">\n\n\t<div class=\"filtering\">\n\n\t\t<form class=\"filtering__search search\">\n\n\t\t\t<input\n\t\t\t\ttype=\"text\" \n\t\t\t\tname=\"filterText\"\n\t\t\t\t[(ngModel)]=\"filterText\" \n\t\t\t\t(ngModelChange)=\"handleFilter()\" \n\t\t\t\t(keydown.enter)=\"handleEnter()\"\n\t\t\t\t(focus)=\"filterTextHasFocus = true\"\n\t\t\t\t(blur)=\"filterTextHasFocus = false\"\n\t\t\t\tplaceholder=\"Search for a screen...\" \n\t\t\t\tautocomplete=\"off\"\n\t\t\t\tautofocus\n\t\t\t\tclass=\"search__input\" \n\t\t\t/>\n\n\t\t\t<span *ngIf=\"( filterTextHasFocus && filterText.length )\" class=\"search__tip\">\n\t\t\t\t&#8592; <strong>Tip:</strong> Hit <code class=\"search__key\">Enter</code> to navigate to first item.\n\t\t\t</span>\n\n\t\t</form>\n\n\t\t<ul class=\"filtering__categories categories\">\n\t\t\t<li class=\"categories__item\">\n\t\t\t\t<a \n\t\t\t\t\t(click)=\"showType( 'active' )\"\n\t\t\t\t\tclass=\"categories__link\"\n\t\t\t\t\t[class.categories__link--on]=\"( filterType === 'active' )\">\n\t\t\t\t\tActive\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<li class=\"categories__item\">\n\t\t\t\t<a\n\t\t\t\t\t(click)=\"showType( 'archived' )\"\n\t\t\t\t\tclass=\"categories__link\"\n\t\t\t\t\t[class.categories__link--on]=\"( filterType === 'archived' )\">\n\t\t\t\t\tArchived\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t</ul>\n\n\t</div>\n\n\n\t<a class=\"plus\">+</a>\n\n\n\t<ul class=\"screens\">\n\t\t<li \n\t\t\t*ngFor=\"let item of filteredScreens\"\n\t\t\tclass=\"screens__item screens__item--column-{{ item.column }}\"\n\t\t\t[appShowBlock]=\"item.isVisible\">\n\n\t\t\t<a [routerLink]=\"item.resource\" class=\"screens__link screen\">\n\t\t\t\t<span class=\"screen__cta\">View Screen</span>\n\t\t\t\t<span class=\"screen__footer\">\n\t\t\t\t\t<span class=\"screen__name\">{{ item.screen.name }}</span>\n\t\t\t\t\t<span class=\"screen__filename\">{{ item.screen.filename }}</span>\n\t\t\t\t</span>\n\t\t\t</a>\n\n\t\t</li>\n\t</ul>\n\n</ng-template>\n<!-- END: Loaded State. -->\n"

/***/ }),
/* 540 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// Import the application components and services.
var workflow_view_component_1 = __webpack_require__(541);
var shared_module_1 = __webpack_require__(2);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var WorkflowViewModule = /** @class */ (function () {
    function WorkflowViewModule() {
    }
    WorkflowViewModule.routes = [
        {
            path: "workflow",
            component: workflow_view_component_1.WorkflowViewComponent
        }
    ];
    WorkflowViewModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            declarations: [
                workflow_view_component_1.WorkflowViewComponent
            ]
        })
    ], WorkflowViewModule);
    return WorkflowViewModule;
}());
exports.WorkflowViewModule = WorkflowViewModule;


/***/ }),
/* 541 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
var WorkflowViewComponent = /** @class */ (function () {
    // I initialize the workflow-view component.
    function WorkflowViewComponent() {
        // ...
    }
    WorkflowViewComponent = __decorate([
        core_1.Component({
            selector: "workflow-view",
            styles: [__webpack_require__(542)],
            template: __webpack_require__(543)
        }),
        __metadata("design:paramtypes", [])
    ], WorkflowViewComponent);
    return WorkflowViewComponent;
}());
exports.WorkflowViewComponent = WorkflowViewComponent;


/***/ }),
/* 542 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block ;\n}\n.placeholder__title {\n  color: #BBBDC2 ;\n  font-size: 26px ;\n  font-weight: 400 ;\n  line-height: 31px ;\n  margin-bottom: 20px ;\n}\n"

/***/ }),
/* 543 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"placeholder\">\n\t<div class=\"placeholder__title\">\n\t\tWorkflow View\n\t</div>\n\t\n\t<div class=\"placeholder__description\">\n\t\tThere are no further sub-divisions in this view.\n\t</div>\n</div>\n"

/***/ }),
/* 544 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(1);
var router_2 = __webpack_require__(1);
// Import the application components and services.
var session_1 = __webpack_require__(12);
var StandardViewComponent = /** @class */ (function () {
    // I initialize the standard view component.
    function StandardViewComponent(router, session) {
        this.router = router;
        this.session = session;
        this.isShowingUserDropdown = false;
        this.navigationSubscription = null;
        this.user = session.user;
    }
    // ---
    // PUBLIC METHODS.
    // ---
    StandardViewComponent.prototype.hideUserDropdown = function () {
        this.isShowingUserDropdown = false;
    };
    StandardViewComponent.prototype.ngOnDestroy = function () {
        (this.navigationSubscription) && this.navigationSubscription.unsubscribe();
    };
    StandardViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navigationSubscription = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.hideUserDropdown();
            }
        });
    };
    // I open the "Help" widget.
    StandardViewComponent.prototype.openHelp = function () {
        alert("Open help window!");
    };
    StandardViewComponent.prototype.toggleUserDropdown = function () {
        this.isShowingUserDropdown = !this.isShowingUserDropdown;
    };
    StandardViewComponent = __decorate([
        core_1.Component({
            selector: "standard-view",
            styles: [__webpack_require__(545)],
            template: __webpack_require__(546)
        }),
        __metadata("design:paramtypes", [router_2.Router,
            session_1.Session])
    ], StandardViewComponent);
    return StandardViewComponent;
}());
exports.StandardViewComponent = StandardViewComponent;


/***/ }),
/* 545 */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #F9F9FB ;\n  display: block ;\n  min-height: 100vh ;\n}\n:host:after {\n  content: \"\";\n  display: table ;\n  height: 0px ;\n}\n.nav {\n  background-color: #1F2532 ;\n}\n.nav__inner {\n  display: flex ;\n  height: 60px ;\n  margin: 0px auto 0px auto ;\n  position: relative ;\n  width: 1170px ;\n}\n.nav__logo {\n  color: #79808F ;\n  cursor: pointer ;\n  font-size: 18px ;\n  font-weight: 600 ;\n  height: 60px ;\n  line-height: 58px ;\n  position: absolute ;\n  left: -60px;\n  text-align: center ;\n  top: 0px ;\n  width: 40px ;\n}\n.nav__primary {\n  flex: 1 0 auto ;\n}\n.nav__secondary {\n  flex: 0 0 auto ;\n}\n.nav--learn {\n  background-color: transparent ;\n  position: relative ;\n  z-index: 50 ;\n}\n.primary__item {\n  color: #757B8C ;\n  cursor: pointer ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  height: 60px ;\n  line-height: 60px ;\n  padding: 0px 20px 0px 20px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  transition: color 100ms ease ;\n  -moz-transition: color 100ms ease ;\n  -webkit-transition: color 100ms ease ;\n}\n.primary__item:first-of-type {\n  padding-left: 0px ;\n}\n.primary__item:hover {\n  color: #ACB1BE ;\n}\n.primary__item--on {\n  color: #ACB1BE ;\n}\n.secondary__item {\n  color: #757B8C ;\n  cursor: pointer ;\n  font-size: 13px ;\n  font-weight: 600 ;\n  height: 60px ;\n  line-height: 60px ;\n  padding: 0px 20px 0px 20px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  transition: color 100ms ease ;\n  -moz-transition: color 100ms ease ;\n  -webkit-transition: color 100ms ease ;\n}\n.secondary__item:last-of-type {\n  padding-right: 0px ;\n}\n.secondary__item:hover {\n  color: #ACB1BE ;\n}\n.arrow-down {\n  font-size: 10px ;\n}\n.user-dropdown {\n  background-color: #FFFFFF ;\n  border-radius: 3px 3px 3px 3px ;\n  box-shadow: 0px 0px 1px rgba(76, 86, 103, 0.25), 0px 2px 18px rgba(31, 37, 50, 0.32);\n  padding: 34px 34px 34px 34px ;\n  position: absolute ;\n  right: -34px;\n  top: 60px ;\n  width: 272px ;\n  z-index: 50 ;\n}\n.user-dropdown__badge {\n  display: flex ;\n}\n.user-dropdown__avatar {\n  flex: 0 0 74px ;\n  margin-right: 17px ;\n}\n.user-dropdown__avatar img {\n  border-radius: 3px 3px 3px 3px ;\n  display: block ;\n  height: 74px ;\n  width: 74px ;\n}\n.user-dropdown__details {\n  flex: 1 0 auto ;\n}\n.user-dropdown__name {\n  color: #4B5362 ;\n  font-size: 16px ;\n  font-weight: 400 ;\n  line-height: 21px ;\n}\n.user-dropdown__email {\n  color: #8799B6 ;\n  font-size: 12px ;\n  line-height: 17px ;\n  margin-bottom: 9px ;\n}\n.user-dropdown__profile {\n  background-color: #FF4070 ;\n  border-radius: 2px 2px 2px 2px ;\n  color: #FFFFFF ;\n  display: block ;\n  font-size: 10px ;\n  font-weight: 600 ;\n  letter-spacing: 0.4px ;\n  line-height: 28px ;\n  text-align: center ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n  width: 113px ;\n}\n.user-dropdown__menu {\n  border-top: 1px solid #E8E9EA ;\n  margin-top: 24px ;\n  padding-top: 12px ;\n}\n.user-dropdown__menu-item {\n  color: #6F7685 ;\n  display: block ;\n  font-size: 12px ;\n  font-weight: 400 ;\n  letter-spacing: 0.8px ;\n  line-height: 17px ;\n  padding: 8px 0px 8px 0px ;\n  text-decoration: none ;\n  text-transform: uppercase ;\n}\n.help {\n  background-color: #191D28 ;\n  border-radius: 40px 40px 40px 40px ;\n  bottom: 30px ;\n  color: #FFFFFF ;\n  cursor: pointer ;\n  font-size: 16px ;\n  font-weight: 600 ;\n  height: 38px ;\n  line-height: 38px ;\n  padding: 0px 20px 0px 20px ;\n  position: fixed ;\n  right: 25px ;\n  text-decoration: none ;\n}\n"

/***/ }),
/* 546 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"nav\" [class.nav--learn]=\"learn.isActive\">\n\t<nav class=\"nav__inner\">\n\t\t\n\t\t<span *ngIf=\"learn.isActive\" routerLink=\"/\" class=\"nav__logo\">\n\t\t\tin\n\t\t</span>\n\n\t\t<nav class=\"nav__primary primary\">\n\t\t\t<a routerLink=\"/app/projects\" class=\"primary__item\" routerLinkActive=\"primary__item--on\">Projects</a>\n\t\t\t<a routerLink=\"/app/activity\" class=\"primary__item\" routerLinkActive=\"primary__item--on\">Activity</a>\n\t\t\t<a routerLink=\"/app/people\" class=\"primary__item\" routerLinkActive=\"primary__item--on\">People</a>\n\t\t\t<a routerLink=\"/app/learn\" #learn=\"routerLinkActive\" class=\"primary__item\" routerLinkActive=\"primary__item--on\">Learn</a>\n\t\t\t<a routerLink=\"/app/dsm\" class=\"primary__item\" routerLinkActive=\"primary__item--on\">DSM ( disabled )</a>\n\t\t</nav>\n\n\t\t<nav class=\"nav__secondary secondary\">\n\t\t\t<a [routerLink]=\"[ '/app', { outlets: { inbox: 'inbox' } } ]\" class=\"secondary__item\">Inbox</a>\n\t\t\t<a (click)=\"toggleUserDropdown()\" class=\"secondary__item userDropdownTrigger\">{{ user.name }} <span class=\"arrow-down\">▼</span></a>\n\t\t</nav>\n\n\t\t<div \n\t\t\t*ngIf=\"isShowingUserDropdown\"\n\t\t\t(mousedownoutside)=\"hideUserDropdown()\"\n\t\t\tdata-ignoreMousedownOutside=\"a.userDropdownTrigger\"\n\t\t\tclass=\"user-dropdown\">\n\n\t\t\t<div class=\"user-dropdown__badge\">\n\t\t\t\t<div class=\"user-dropdown__avatar\">\n\t\t\t\t\t<img [src]=\"user.avatarUrl\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"user-dropdown__details\">\n\t\t\t\t\t<div class=\"user-dropdown__name\">\n\t\t\t\t\t\t{{ user.name }}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"user-dropdown__email\">\n\t\t\t\t\t\t{{ user.email }}\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<a [routerLink]=\"[ '/app/people', user.id, 'profile' ]\" class=\"user-dropdown__profile\">View Profile</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<nav class=\"user-dropdown__menu\">\n\t\t\t\t<a [routerLink]=\"[ '/app', { outlets: { modal: 'modal/upgrade-plan' } } ]\" class=\"user-dropdown__menu-item\">Upgrade Plan</a>\n\t\t\t\t<a [routerLink]=\"[ '/app', { outlets: { updates: 'product-updates' } } ]\" class=\"user-dropdown__menu-item\">Product Updates</a>\n\t\t\t\t<a class=\"user-dropdown__menu-item\">Sign Out</a>\n\t\t\t</nav>\n\n\t\t</div>\n\n\t</nav>\n</div>\n\n<router-outlet></router-outlet>\n\n<a (click)=\"openHelp()\" class=\"help\">\n\tHelp\n</a>\n"

/***/ })
],[291]);