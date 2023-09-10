//custom hook
//This is a custom React hook that helps initialize the chat client and manage user authentication for the chat.
import { env } from "@/env";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export default function useInitializeChatClient() {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    //if user.id is not defined, return
    if (!user?.id) return;

    // Initialize the chat client
    const client = StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY);

    // Connect the user to the chat client
    client
      .connectUser(
        {
          id: user.id,
          name: user.fullName || user.id, //if no fullname, us userID
          image: user.imageUrl,
        },
        async () => {
          // Fetch a token to authenticate the user
          const response = await fetch("/api/get-token");
          if (!response.ok) {
            throw Error("Failed to get token");
          }
          const body = await response.json();
          return body.token;
        }
      )
      .catch((error) => console.error("Failed to connect user", error))
      .then(() => setChatClient(client));

    // Cleanup function to disconnect the user when the component unmounts
    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Failed to disconnect user", error))
        .then(() => console.log("Connection closed"));
    };
  }, [user?.id, user?.fullName, user?.imageUrl]);

  return chatClient;
}
