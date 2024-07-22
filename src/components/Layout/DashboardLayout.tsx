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
      <div className="flex-grow-0 border-2 border-red-500">{TopComponent}</div>
      <div className="flex flex-grow overflow-auto border-2 border-black">
        <div className="w-1/3 overflow-auto border-2 border-blue-500">{LeftComponent}</div>
        <div className="w-2/3 overflow-auto border-2 border-green-500">{MainComponent}</div>
      </div>
    </div>
  );
}
