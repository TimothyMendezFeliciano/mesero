import { ReactNode } from 'react';

type DashboardLayoutProps = {
  TopComponent: ReactNode;
  ChatRoom?: ReactNode;
  MainComponent: ReactNode;
};

export default function DashboardLayout({
  TopComponent,
  ChatRoom,
  MainComponent,
}: DashboardLayoutProps) {
  return (
    <>
      <div className={'flex flex-col h-screen'}>
        <div className={'flex-grow-0'}>{TopComponent}</div>
        <div className={'divider'} />
        <div className={'flex flex-grow overflow-auto justify-center'}>
          <div className={'divider divider-horizontal'} />
          <>{MainComponent}</>
          <div className={'divider divider-horizontal'} />
        </div>
      </div>
      {ChatRoom || null}
    </>
  );
}
