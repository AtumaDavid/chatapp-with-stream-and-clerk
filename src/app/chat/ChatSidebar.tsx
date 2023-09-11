import React, { useCallback } from "react";
import MenuBar from "./MenuBar";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";

interface ChatSidebarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}
export default function ChatSidebar({ user, show, onClose }: ChatSidebarProps) {
  // ChannelPreviewCustom defines a custom action to be taken when a channel is selected,
  // setting the channel as active and potentially closing the sidebar.
  //The onClose function is called when a channel is selected to close the sidebar.
  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );
  return (
    <div
      className={` w-full flex-col md:max-w-[360px] ${
        show ? "flex" : "hidden"
      }`}
    >
      <MenuBar />
      {/* list of chat channels filtered by the user's ID */}
      <ChannelList
        filters={{ type: "messaging", members: { $in: [user.id] } }}
        sort={{ last_message: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: { filters: { members: { $in: [user.id] } } },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
}
