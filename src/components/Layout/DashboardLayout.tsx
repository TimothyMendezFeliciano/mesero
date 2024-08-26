import { ReactNode } from 'react';

type DashboardLayoutProps = {
  TopComponent: ReactNode;
  LeftComponent: ReactNode;
  MainComponent: ReactNode;
};

export default function DashboardLayout({
  TopComponent,
  LeftComponent,
  MainComponent,
}: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow-0">{TopComponent}</div>
      <div className={'divider'} />
      <div className="flex flex-grow overflow-auto">
        <div className="w-1/3 overflow-auto">{LeftComponent}</div>
        <div className={'divider divider-horizontal'} />
        <div className="w-2/3 overflow-auto">{MainComponent}</div>
      </div>
    </div>
  );
}
