import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  () => import('react-chat-widget').then((m) => m.Widget),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

type ChatRoomProps = {
  restaurantName?: string;
};

export function ChatRoom({ restaurantName }: ChatRoomProps) {
  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
  };
  return <ChatWidget handleNewUserMessage={handleNewUserMessage} />;
}
