This is a startapp application for Expo + Django applications, you need to have basic knowledge for both Expo and Django as I'm only going to highlight the most important thing.

This uses Clerk for authentication and user management, syncing user data through webhooks. 

ESSENCE OF THIS PROJECT:
- to make relations between clerk users and django models possible

PROJECT SETUP:

Initial steps:
1.) Go to your clerk application and navigate to configure / API 
2.) Copy the following:
‌ ( PUBLISHABLE KEY / PUBLIC KEY ) 
‌JWKS PUBLIC KEY
‌FRONTEND API URL
save them temporarily somewhere 'cause we're using them in the next steps

INSIDE THE BACKEND FOLDER:
Create a .env file and define the following values:

1.) CLERK_ISSUER=[ FRONTEND API URL ] 
2.) CLERK_JWT_PUBLIC_KEY=[ JWKS PUBLIC KEY ]

INSIDE THE FRONTEND FOLDER:
Create a .env.local file and define the following values:
1.)EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=[ PUBLISHABLE_KEY ]
2.) EXPO_PUBLIC_API_URL=[ YOUR BACKEND URL ] //DONT WORRY ABOUT THIS FOR NOW, I'LL TELL YOU WHAT SHOULD BE THE VALUE LATER

IMPORTANT:
on development mode, django runs at LOCALHOST ( http://127.0.0.1:8000/ ). while this works with expo go, it doesn't work with Clerk Webhooks.

TO SOLVE THIS:
1.) Install cloudflared in your local machine ( if not yet installed )
2.)  run the following script in your terminal:
-> cloudflared tunnel --url http://127.0.0.1:8000/
3.) copy the url provided by cloudflared after you run the script ( this will be your BACKEND_URL )
4.) navigate to your clerk application and go to configure / webhook then paste the url you copied followed by /user/webhook
ex. https://example.com/user/webhook

----- FINISHED -----