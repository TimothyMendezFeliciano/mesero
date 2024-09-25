import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  // @ts-ignore
  () => import('react-chat-widget').then((m) => m.Widget),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

type DashboardLayoutProps = {
  TopComponent: ReactNode;
  LeftComponent: ReactNode;
  MainComponent: ReactNode;
};

// export default function DashboardLayout({
//   TopComponent,
//   LeftComponent,
//   MainComponent,
// }: DashboardLayoutProps) {
//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-grow-0">{TopComponent}</div>
//       <div className={'divider'} />
//       <div className="flex flex-grow overflow-auto">
//         <div className="w-1/3 overflow-auto">{LeftComponent}</div>
//         <div className={'divider divider-horizontal'} />
//         <div className="w-2/3 overflow-auto">{MainComponent}</div>
//       </div>
//     </div>
//   );
// }
export default function DashboardLayout({
  TopComponent,
  LeftComponent,
  MainComponent,
}: DashboardLayoutProps) {
  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  return (
    <>
      <div className={'flex flex-col h-screen'}>
        <div className={'flex-grow-0'}>{TopComponent}</div>
        <div className={'divider'} />
        <div className={'flex flex-grow overflow-auto justify-center'}>
          <div className={'divider divider-horizontal'} />
          <div className={'w-2/3 overflow-auto'}>{MainComponent}</div>
          <div className={'divider divider-horizontal'} />
        </div>
      </div>
      <ChatWidget handleNewUserMessage={handleNewUserMessage} />
    </>
  );
}
