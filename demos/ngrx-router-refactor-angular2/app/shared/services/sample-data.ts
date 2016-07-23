
var boardID = 0;
var projectID = 0;
var screenID = 0;

export var sampleData = {
	boards: [
		{
			id: ++boardID,
			name: "Style And Branding Guide",
			items: []
		},
		{
			id: ++boardID,
			name: "Mood Board",
			items: []
		},
		{
			id: ++boardID,
			name: "Reaction GIFs",
			items: []
		}
	],
	projects: [
		{
			id: ++projectID,
			name: "Public Site Redesign",
			screens: [
				{
					id: ++screenID,
					name: "Home Page",
					filename: "home_page.png"
				},
				{
					id: ++screenID,
					name: "About Page",
					filename: "about_us_page.png"
				},
				{
					id: ++screenID,
					name: "Our Team",
					filename: "tema_page.png"
				},
				{
					id: ++screenID,
					name: "Contact Us",
					filename: "home_page.png"
				},
				{
					id: ++screenID,
					name: "Portfolio",
					filename: "portfolio_v3.png"
				},
				{
					id: ++screenID,
					name: "Case Study",
					filename: "case_study.png"
				}
			]
		},
		{
			id: ++projectID,
			name: "Mobile App v1",
			screens: [
				{
					id: ++screenID,
					name: "Login",
					filename: "login.png"
				},
				{
					id: ++screenID,
					name: "Sign-Up",
					filename: "sign-up.png"
				},
				{
					id: ++screenID,
					name: "Home Screen",
					filename: "home.png"
				},
				{
					id: ++screenID,
					name: "Detail Screen",
					filename: "detail.png"
				}
			]
		},
		{
			id: ++projectID,
			name: "Mobile App v2.1",
			screens: [
				{
					id: ++screenID,
					name: "Login",
					filename: "login.png"
				},
				{
					id: ++screenID,
					name: "Sign-Up",
					filename: "sign-up.png"
				},
				{
					id: ++screenID,
					name: "Forgot Password",
					filename: "forgot-password.png"
				},
				{
					id: ++screenID,
					name: "Reset Password",
					filename: "reset-password.png"
				},
				{
					id: ++screenID,
					name: "Home Screen",
					filename: "home.png"
				},
				{
					id: ++screenID,
					name: "Detail Screen",
					filename: "detail.png"
				},
				{
					id: ++screenID,
					name: "Profile",
					filename: "profile.png"
				},
				{
					id: ++screenID,
					name: "Preferences",
					filename: "preferences.png"
				}
			]
		},
		{
			id: ++projectID,
			name: "Email Templates",
			screens: [
				{
					id: ++screenID,
					name: "Welcome to our App",
					filename: "welcome.png"
				},
				{
					id: ++screenID,
					name: "Please reset your password",
					filename: "password-reset.png"
				},
				{
					id: ++screenID,
					name: "Your password has been changed",
					filename: "pw-change-conf.png"
				},
				{
					id: ++screenID,
					name: "Achievement unlocked!",
					filename: "acheivement.png"
				},
				{
					id: ++screenID,
					name: "Contact us - thank you",
					filename: "contact-us__thank-you.png"
				},
				{
					id: ++screenID,
					name: "Sales lead - INTERNAL",
					filename: "sales_lead.png"
				}
			]
		}
	]
};
