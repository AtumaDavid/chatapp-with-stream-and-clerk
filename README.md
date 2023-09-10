# Next.js 13 WhatsApp Web Clone with Web Push Notifications

This project uses [Stream's chat SDK] to provide a fully functional live chat with attachments, reactions, threads, and more. It also uses the **web push** API to send push notifications about new chat messages even if the browser window is closed.

# Other technologies used:

- Next.js 13 app router
- Clerk for authentication
- TailwindCSS
- TypeScript

# Dependencies:

- @clerk/nextjs
- @clerk/themes
- @t3-oss/env-nextjs
- stream-chat
- stream-chat-react
- zod
- @types/web-push
- eslint-config-prettier
- prettier@2.8.8
- prettier-plugin-tailwindcss@0.4.1
- lucid-react
- tailwind-merge
- web-push
- svix

**configurations**

# prettier.config.js

-set up a "prettier.config.js" file.
module.exports = {
plugins: ["prettier-plugin-tailwindcss"],
};

# setup eslint with prettier

{
"extends": ["next/core-web-vitals", "prettier"]
}

**project**

# Authentication

-using "clerk.com" for authentication

# customizable React Button

-@components/Button.tsx

# clerk auth

- the following was added to the .env file to enable signIn and signUp in custom URL
  "NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat"

  # creating and configuring environment variables for your application(API keys and secrets.)

  **focused files**

  - /api/get-token/route.ts(GET function to generate token), /chat/page.tsx (main chat interface), /chat/useInitializeChatClients.ts (custom hook), env.ts

  - In summary, the code sets up a chat interface using the Stream Chat API, authenticates users, generates tokens for user authentication, and handles environment variable configuration.
  - The ChatPage component (/chat/page.tsx) is the main chat interface, the useInitializeChatClient hook(/chat/useInitializeChatClients.ts) initializes the chat client and handles user authentication, the GET function generates tokens (/api/get-token/route.ts), and env(env.ts) manages environment variables.
