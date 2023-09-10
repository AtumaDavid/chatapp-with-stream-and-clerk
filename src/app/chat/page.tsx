"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";

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

  // If the chat client or user is not available, show a loading indicator
  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      {/* this is the chat page <UserButton afterSignOutUrl="/" /> */}
      <Chat client={chatClient}>
        <div className="flex h-full flex-row">
          <div className="max-w-[360px w-full">
            <ChannelList
              filters={{ type: "messaging", members: { $in: [user.id] } }}
              sort={{ last_message: -1 }}
              options={{ state: true, presence: true, limit: 10 }}
            />
          </div>
          <div className="h-full w-full">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}
