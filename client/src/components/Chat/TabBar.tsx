import React, { useRef, useEffect } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { cn } from '~/utils';

interface Tab {
  id: string;
  title: string;
  isActive?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabClick?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onNewTab?: () => void;
  maxVisibleTabs?: number;
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onNewTab,
  maxVisibleTabs = 6,
  className
}) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const visibleTabs = tabs.slice(0, maxVisibleTabs);
  const overflowTabs = tabs.slice(maxVisibleTabs);
  const hasOverflow = overflowTabs.length > 0;

  // Scroll active tab into view
  useEffect(() => {
    if (activeTabId && tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTabId}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTabId]);

  return (
    <div className={cn(
      'flex h-10 w-full items-center gap-0.5 border-b border-border-light-alpha bg-gray-925 px-2',
      className
    )}>
      {/* Scrollable Tabs Container */}
      <div
        ref={tabsContainerRef}
        className="flex flex-1 items-center gap-0.5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
      >
        {visibleTabs.map((tab) => {
          const isActive = tab.id === activeTabId || tab.isActive;

          return (
            <div
              key={tab.id}
              data-tab-id={tab.id}
              className={cn(
                'group relative flex h-8 min-w-32 max-w-48 items-center gap-2 rounded-t-md px-3 transition-all duration-150',
                isActive
                  ? 'bg-gray-900 text-text-primary border-b-2 border-accent-purple'
                  : 'bg-transparent text-text-secondary hover:bg-gray-875 hover:text-text-primary'
              )}
            >
              {/* Tab Content */}
              <button
                onClick={() => onTabClick?.(tab.id)}
                className="flex flex-1 items-center gap-2 overflow-hidden"
                aria-label={`Switch to ${tab.title}`}
              >
                <span className="truncate text-xs font-medium">
                  {tab.title}
                </span>
              </button>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose?.(tab.id);
                }}
                className={cn(
                  'flex size-4 items-center justify-center rounded hover:bg-gray-800 transition-all',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
                aria-label={`Close ${tab.title}`}
              >
                <X className="size-3" strokeWidth={2} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Overflow Menu */}
      {hasOverflow && (
        <div className="relative">
          <button
            className="flex h-8 items-center gap-1 rounded-md px-2 hover:bg-gray-875 text-text-tertiary hover:text-text-primary transition-all"
            aria-label={`${overflowTabs.length} more tabs`}
          >
            <span className="text-2xs font-medium">
              +{overflowTabs.length}
            </span>
            <ChevronDown className="size-3" />
          </button>
          {/* TODO: Implement dropdown menu for overflow tabs */}
        </div>
      )}

      {/* New Tab Button */}
      <button
        onClick={onNewTab}
        className="flex size-8 items-center justify-center rounded-md hover:bg-gray-875 text-text-tertiary hover:text-text-primary transition-all"
        aria-label="New conversation"
      >
        <Plus className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
};

export default TabBar;
