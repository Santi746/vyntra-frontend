"use client";

import { Virtuoso } from "react-virtuoso";
import WelcomeMessage from "@/shared/components/ui/molecules/messaging/WelcomeMessage";
import UserMessage from "@/shared/components/ui/molecules/messaging/UserMessage";
import ChatLoadingSkeleton from "@/shared/components/ui/atoms/messaging/ChatLoadingSkeleton";

/**
 * @organism ChatMessageList
 * @description Organismo AGNOSTICO para el área de contenido de mensajes.
 * Utiliza react-virtuoso para virtualización de alto rendimiento (Regla Vyne).
 *
 * @param {Object} props
 * @param {string} props.welcomeTitle
 * @param {string} props.welcomeDescription
 * @param {string} [props.welcomeIcon]
 * @param {Array} props.messages
 * @param {boolean} props.isLoading
 * @param {Function} props.fetchNextPage
 * @param {boolean} props.hasNextPage
 * @param {boolean} props.isFetchingNextPage
 * @param {Function} props.onReply
 */
export default function ChatMessageList({
  welcomeTitle,
  welcomeDescription,
  welcomeIcon = "hash",
  messages = [],
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onReply = () => {},
}) {
  // Virtuoso renderiza mejor cronológicamente. Revertimos el array para que el más viejo sea el índice 0.
  const reversedMessages = [...messages].reverse();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {isLoading ? (
        <ChatLoadingSkeleton />
      ) : (
        <Virtuoso
          className="no-scrollbar h-full w-full"
          data={reversedMessages}
          initialTopMostItemIndex={reversedMessages.length - 1}
          alignToBottom={true}
          followOutput="auto"
          startReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          itemContent={(i, msg) => {
            // Compara con el mensaje anterior (más viejo) para ocultar avatar si es el mismo autor
            const isSameAuthor = i > 0 && reversedMessages[i - 1]?.sender_uuid === msg.sender_uuid;

            return (
              <div className="py-0.5 px-4">
                <UserMessage
                  sender_uuid={msg.sender_uuid}
                  avatar_url={msg.user?.avatar_url}
                  username={msg.user?.username}
                  created_at={msg.created_at}
                  content={msg.content}
                  isSameAuthor={isSameAuthor}
                  status={msg.status}
                  parent_message_uuid={msg.parent_message_uuid}
                  onReply={() =>
                    onReply({
                      uuid: msg.uuid,
                      username: msg.user?.username,
                      content: msg.content,
                    })
                  }
                  i={i}
                />
              </div>
            );
          }}
          components={{
            Header: () => (
              <>
                {isFetchingNextPage && (
                  <div className="py-4 text-center text-sm text-gray-400">
                    Cargando historial...
                  </div>
                )}
                {!hasNextPage && (
                  <div className="pt-10 pb-5">
                    <WelcomeMessage
                      channelName={welcomeTitle}
                      channelDescription={welcomeDescription}
                      iconType={welcomeIcon}
                    />
                  </div>
                )}
              </>
            ),
          }}
        />
      )}
    </div>
  );
}
