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

  **use authentication and token generation**

  - /api/get-token/route.ts(GET function to generate token), /chat/page.tsx (main chat interface), /chat/useInitializeChatClients.ts (custom hook), env.ts

  - In summary, the code sets up a chat interface using the Stream Chat API, authenticates users, generates tokens for user authentication, and handles environment variable configuration.
  - The ChatPage component (/chat/page.tsx) is the main chat interface, the useInitializeChatClient hook(/chat/useInitializeChatClients.ts) initializes the chat client and handles user authentication, the GET function generates tokens (/api/get-token/route.ts), and env(env.ts) manages environment variables.

# ChatPage.js:

-ChatPage.js is the main chat page component.
-It initializes the chat client using the useInitializeChatClient hook and fetches the user with useUser. (**use authentication and token generation**)
-It manages the state of the chat sidebar with the chatSidebarOpen state variable.
-The useWindowSize hook tracks the window size to determine if it's a large screen.
-The handleSidebarOnClose function is a callback to close the chat sidebar.
-If the chat client or user is not available, it displays a loading indicator.
-It renders a chat interface including a menu button for mobile devices.

# MenuBar.js

-MenuBar.js defines a component representing a menu bar.
-It includes a user button (possibly for user actions) and an icon to show users.
-The component is styled with CSS classes to control its appearance.

# ChatSidebar.js

-ChatSidebar.js defines a component for the chat sidebar.
-It includes the MenuBar component at the top.
-The ChannelList component displays a list of chat channels filtered by the user's ID.
-It uses a custom ChannelPreviewCustom component for rendering channel previews with custom behavior.
-The onClose function is called when a channel is selected to close the sidebar.

# ChatChannel.js

-ChatChannel.js defines a component for the main chat channel.
-It includes a Channel component that contains the chat interface elements.
-The ChannelHeader, MessageList, and MessageInput components are used to display and interact with chat messages.
-The Thread component is used to view message threads.
-The component's visibility is controlled by the show prop, and it hides the channel when a thread is active based on the hideChannelOnThread prop.
