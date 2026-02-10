import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IconNav } from './IconNav';
import { ContextPanel } from './ContextPanel';
import { StatusBar } from '../Chat/StatusBar';
import { TabBar } from '../Chat/TabBar';
import { useWorkspaceShortcuts } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
  className
}) => {
  const [activeNavItem, setActiveNavItem] = useRecoilState(store.activeNavItem);
  const [isContextPanelCollapsed, setIsContextPanelCollapsed] = useRecoilState(store.isContextPanelCollapsed);
  const tabs = useRecoilValue(store.workspaceTabs);
  const activeTabId = useRecoilValue(store.activeTabId);
  const selectedModel = useRecoilValue(store.selectedModel);
  const activeAgentName = useRecoilValue(store.activeAgentName);
  const tokenUsage = useRecoilValue(store.tokenUsage);
  const connectionStatus = useRecoilValue(store.connectionStatus);

  // Enable workspace keyboard shortcuts
  useWorkspaceShortcuts({
    onNavItemChange: (item) => {
      setActiveNavItem(item);
    },
    onPanelToggle: () => {
      setIsContextPanelCollapsed((prev) => !prev);
    },
    enabled: true,
  });

  const handleTabClick = (tabId: string) => {
    console.log('Tab clicked:', tabId);
    // TODO: Implement tab switching logic
  };

  const handleTabClose = (tabId: string) => {
    console.log('Tab closed:', tabId);
    // TODO: Implement tab closing logic
  };

  const handleNewTab = () => {
    console.log('New tab requested');
    // TODO: Implement new tab creation logic
  };

  return (
    <div className={cn('flex h-screen w-full overflow-hidden bg-gray-950', className)}>
      {/* Icon Navigation Sidebar */}
      <IconNav
        activeItem={activeNavItem}
        onItemClick={setActiveNavItem}
      />

      {/* Context Panel */}
      <ContextPanel
        isCollapsed={isContextPanelCollapsed}
        onCollapse={setIsContextPanelCollapsed}
      />

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Status Bar */}
        <StatusBar
          modelName={selectedModel}
          agentName={activeAgentName ?? undefined}
          tokenUsage={tokenUsage ?? undefined}
          connectionStatus={connectionStatus}
          onSettingsClick={() => console.log('Settings clicked')}
        />

        {/* Tab Bar */}
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId ?? undefined}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
          onNewTab={handleNewTab}
        />

        {/* Main Content Area (Chat Messages + Input) */}
        <div className="flex-1 overflow-hidden bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
