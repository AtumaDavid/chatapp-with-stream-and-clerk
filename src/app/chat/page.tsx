"use client";
import { useUser } from "@clerk/nextjs";
import { Chat, LoadingIndicator } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import useInitializeChatClient from "./useInitializeChatClient";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import { mdBreakpoint } from "@/utils/tailwind";

// const userID = "user_2V7qZyxNskgUj7JNX9vjIGRC04s";

// const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

// chatClient.connectUser(
//   {
//     id: userID,
//     name: "Atuma David",
//   },
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yVjdxWnl4TnNrZ1VqN0pOWDl2aklHUkMwNHMifQ.z8KnFKywVcyWmo-Mj3NkdOV2ZS7g7m91opNQy5052wo"
// );

// const channel = chatClient.channel("messaging", "channel_1", {
//   name: "channel #1",
//   members: [userID],
// });

export default function ChatPage() {
  // Initialize the chat client and get the current user
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  //tracks windows size to determine if its large screen
  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChatSidebarOpen(false);
  }, [windowSize.width]);

  //The handleSidebarOnClose function is a callback to close the chat sidebar.
  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, []);

  // If the chat client or user is not available, show a loading indicator
  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 xl:px-20 xl:py-8">
      <div className="m-auto flex h-full min-w-[350px] max-w-[1600px] flex-col shadow-sm">
        {/* this is the chat page <UserButton afterSignOutUrl="/" /> */}
        <Chat client={chatClient}>
          <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
            <button onClick={() => setChatSidebarOpen(!chatSidebarOpen)}>
              {!chatSidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex h-full flex-row overflow-y-auto">
            <ChatSidebar
              user={user}
              show={isLargeScreen || chatSidebarOpen} //if isLargeScreen is true or chatSidebarOpen is true, then the ChatSidebar should be shown.
              onClose={handleSidebarOnClose}
            />
            <ChatChannel
              show={isLargeScreen || !chatSidebarOpen} //if isLargeScreen is true or chatSidebarOpen is false, then the ChatChannel should be shown.
              hideChannelOnThread={!isLargeScreen} //if isLargeScreen is false, the chat channel should be hidden when a message thread is active.
            />
          </div>
        </Chat>
      </div>
    </div>
  );
}
