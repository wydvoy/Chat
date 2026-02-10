import React from 'react';
import { MessageSquare, Users, FileText, FolderOpen, Settings, User } from 'lucide-react';
import { TooltipAnchor } from '@librechat/client';
import { cn } from '~/utils';

export type IconNavItem = 'chat' | 'agents' | 'prompts' | 'files' | 'settings' | 'profile';

interface IconNavProps {
  activeItem?: IconNavItem;
  onItemClick?: (item: IconNavItem) => void;
  className?: string;
}

interface NavItem {
  id: IconNavItem;
  icon: React.ElementType;
  label: string;
  tooltip: string;
}

const navItems: NavItem[] = [
  { id: 'chat', icon: MessageSquare, label: 'Chat', tooltip: 'Conversations' },
  { id: 'agents', icon: Users, label: 'Agents', tooltip: 'AI Agents' },
  { id: 'prompts', icon: FileText, label: 'Prompts', tooltip: 'Prompt Library' },
  { id: 'files', icon: FolderOpen, label: 'Files', tooltip: 'File Manager' },
  { id: 'settings', icon: Settings, label: 'Settings', tooltip: 'Settings' },
  { id: 'profile', icon: User, label: 'Profile', tooltip: 'User Profile' },
];

export const IconNav: React.FC<IconNavProps> = ({
  activeItem = 'chat',
  onItemClick,
  className
}) => {
  return (
    <div className={cn(
      'flex h-full w-14 flex-col items-center border-r border-border-light-alpha bg-gray-925',
      className
    )}>
      {/* Logo/Brand Section */}
      <div className="flex h-14 w-full items-center justify-center border-b border-border-light-alpha">
        <div className="flex size-8 items-center justify-center rounded-md bg-accent-purple text-white font-bold text-sm">
          LC
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col gap-1 py-4">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <TooltipAnchor
              key={item.id}
              description={item.tooltip}
              side="right"
              render={
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={cn(
                    'relative flex h-10 w-full items-center justify-center transition-all duration-150',
                    'hover:bg-gray-850',
                    isActive ? 'text-accent-purple' : 'text-text-tertiary hover:text-text-primary'
                  )}
                  aria-label={item.label}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 h-full w-0.5 bg-accent-purple" />
                  )}
                  <Icon className="size-5" strokeWidth={1.5} />
                </button>
              }
            />
          );
        })}
      </nav>

      {/* Bottom Items (Settings, Profile) */}
      <div className="flex flex-col gap-1 border-t border-border-light-alpha py-4">
        {navItems.slice(4).map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <TooltipAnchor
              key={item.id}
              description={item.tooltip}
              side="right"
              render={
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={cn(
                    'relative flex h-10 w-full items-center justify-center transition-all duration-150',
                    'hover:bg-gray-850',
                    isActive ? 'text-accent-purple' : 'text-text-tertiary hover:text-text-primary'
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <div className="absolute left-0 h-full w-0.5 bg-accent-purple" />
                  )}
                  <Icon className="size-5" strokeWidth={1.5} />
                </button>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default IconNav;
