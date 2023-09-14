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

# ChatPage.tsx:

1. **Initialization**:

   - The component initializes the chat client using the `useInitializeChatClient` hook. This involves setting up a connection to a chat server. (user authentication, initializes chat client)

2. **User Authentication**:

   - It fetches the user using the `useUser` hook. This suggests that the chat functionality requires user authentication, and the component depends on the authenticated user.

3. **State Management**:

   - The component manages the state of the chat sidebar with the `chatSidebarOpen` state variable and determines whether the side bar is opened or closed.

4. **Responsive Design**:

   - It uses the `useWindowSize` hook to track the window size, specifically to determine if it's a large screen. This is used to control the display of certain UI elements based on screen size.

5. **Service Workers**:

   - It sets up a service worker using the `registerServiceWorker` function, likely for handling background tasks and offline functionality.

6. **Push Notifications**:

   - The two useEffect (`setUpServiceWorker` and `syncPushSubscription`) blocks are responsible for setting up the service worker for push notifications and ensuring that the push subscription is synchronized with the server. This allows the chat application to deliver push notifications to users effectively. The setup and synchronization processes occur when the component is initially mounted.

   - The `setUpServiceWorker` function is defined and called immediately when the component is mounted.
   - When ` setUpServiceWorker` is called, it internally invokes `registerServiceWorker()` (from "utils/serviceWorker.ts"), which attempts to register the service worker script located at "utils/serviceWorker.ts".
   - If the registration is successful, it enables the service worker to handle tasks such as push notifications.

   - The `syncPushSubscription` function is used to synchronize the user's push notification subscription with the server.
   - It attempts to retrieve the current push notification subscription using the getCurrentPushSubscription function. This subscription likely includes information necessary for sending push notifications to the user.
   - It first calls `getCurrentPushSubscription` (from "@/notifications/pushService"), which retrieves the current push notification subscription. If a subscription exists, it then calls `sendPushSubscriptionToServer` (from "@/notifications/pushService") to send the subscription details to the server.

7. **Routing**:

   - This useEffect (`channelID`) listens to changes in the "channelId variable". When `channelId` becomes truthy (i.e., when a specific channel is selected), it modifies the browser's URL to "/chat" using the `history.replaceState` method. This can be useful for updating the URL and the browser's history without causing a full page reload when navigating to a chat channel.

8. **UI Rendering**:

   - If the chat client or user is not available (possibly due to authentication or initialization), it renders a loading indicator.

   - It renders the main chat interface, including components for chat channels and the chat sidebar.

   - It provides a button to toggle the chat sidebar, which is visible on mobile devices.

   - It uses a theme based on whether the selected theme is "dark" or "light."

   - It includes a `PushMessageListener` component, which suggests it handles incoming push messages.

# MenuBar.tsx and ChatSidebar.tsx

- `ChatSidebar.tsx` uses components and functionality defined in `Menubar.tsx` (`MenuBar`, `ThemeToggleButton`, `PushSubscriptionToggleButton`, and `useTheme`) to build a chat sidebar with various features and user interactions. `Menubar.tsx` provides user interface elements and functionality that enhance the chat sidebar's capabilities.

# MenuBar.tsx:

1. **MenuBar Component**:

   - The `MenuBar` component is defined as a functional component that receives the `onUserMenuClick` (`ChatSidebar.tsx`) callback as a prop. It also uses the `useTheme` hook to determine the current theme.
   - A `UserButton` component that handles user authentication and sign-out.
   - Components for push notification toggling (`PushSubscriptionToggleButton`), user menu (`Users`), and theme switching (`ThemeToggleButton`).

2. **ThemeToggleButton Component**:

   - This is a separate functional component responsible for rendering the theme toggle button (light/dark theme switch).
   - It uses the `useTheme` hook to access the current theme and allows users to switch between light and dark themes by clicking on the moon (dark) or sun (light) icons.
   -

3. **PushSubscriptionToggleButton Component**:

   - This component handles push notification toggling.
   - It maintains state variables to track the loading status, active push subscriptions, and confirmation messages related to enabling/disabling push notifications.
   - The component fetches the current push subscription when it mounts and provides buttons (BellOff and BellRing) for enabling and disabling push notifications. The appearance of these buttons can change based on the loading state and whether push notifications are currently enabled.
   - When push notifications are enabled, a bell icon with a "disable" action is displayed.
   - When push notifications are disabled, a bell icon with an "enable" action is displayed.
   - Additionally, this component uses the `DisappearingMessage` component to display confirmation messages that disappear after a while.

# ChatSidebar.tsx

- ChatSidebar.js defines a component for the chat sidebar.
- It receives the props specified in the `ChatSidebarProps` interface (`user`: "A user resource object representing the currently logged-in user."
  `show`: "A boolean indicating whether the sidebar should be displayed or hidden."
  `onClose`: "A callback function to be executed when the sidebar is closed."
  `customActiveChannel`: "An optional string representing a custom active channel."). Inside the component.
- A `useEffect` hook is used to monitor changes to the show prop. If show becomes false, it sets `usersMenuOpen` to false, effectively closing the user menu.
- A custom `ChannelPreviewCustom` component is defined using the `useCallback` hook. This component is a modification of `ChannelPreviewMessenger` and has custom behavior when a channel is selected. It calls the `onClose` callback and sets the active channel when a channel is selected.
- The ChannelList component displays a list of chat channels filtered by the user's ID.
- It uses a custom ChannelPreviewCustom component for rendering channel previews with custom behavior.
- The onClose function is called when a channel is selected to close the sidebar.

# ChatChannel.tsx

- ChatChannel.js defines a component for the main chat channel.
- It includes a Channel component that contains the chat interface elements.
- The ChannelHeader, MessageList, and MessageInput components are used to display and interact with chat messages.
- The Thread component is used to view message threads.
- The component's visibility is controlled by the show prop, and it hides the channel when a thread is active based on the hideChannelOnThread prop.
