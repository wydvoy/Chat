import React from 'react';
import { Circle, Settings } from 'lucide-react';
import { cn } from '~/utils';

interface StatusBarProps {
  modelName?: string;
  agentName?: string;
  tokenUsage?: {
    used: number;
    total: number;
  };
  connectionStatus?: 'connected' | 'connecting' | 'disconnected';
  onSettingsClick?: () => void;
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  modelName = 'GPT-4',
  agentName,
  tokenUsage,
  connectionStatus = 'connected',
  onSettingsClick,
  className
}) => {
  const statusColors = {
    connected: 'text-accent-green',
    connecting: 'text-amber-500',
    disconnected: 'text-red-500',
  };

  const statusLabels = {
    connected: 'Connected',
    connecting: 'Connecting...',
    disconnected: 'Disconnected',
  };

  const tokenPercentage = tokenUsage
    ? Math.min((tokenUsage.used / tokenUsage.total) * 100, 100)
    : 0;

  return (
    <div className={cn(
      'flex h-10 w-full items-center justify-between border-b border-border-light-alpha bg-gray-925 px-4',
      className
    )}>
      {/* Left Section: Model & Agent Info */}
      <div className="flex items-center gap-4">
        {/* Model Name */}
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded bg-accent-purple/10">
            <Circle className="size-2.5 fill-accent-purple text-accent-purple" />
          </div>
          <span className="font-mono text-xs font-medium text-text-primary">
            {modelName}
          </span>
        </div>

        {/* Agent Name (if active) */}
        {agentName && (
          <>
            <div className="h-4 w-px bg-border-medium-alpha" />
            <div className="flex items-center gap-2">
              <span className="text-2xs text-text-tertiary">Agent:</span>
              <span className="font-mono text-xs text-accent-teal">
                {agentName}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Center Section: Token Usage */}
      {tokenUsage && (
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xs text-text-quaternary">
            {tokenUsage.used.toLocaleString()} / {tokenUsage.total.toLocaleString()} tokens
          </span>
          <div className="relative h-1.5 w-32 overflow-hidden rounded-full bg-gray-850">
            <div
              className={cn(
                'absolute left-0 top-0 h-full rounded-full transition-all duration-300',
                tokenPercentage > 80 ? 'bg-amber-500' : 'bg-accent-green'
              )}
              style={{ width: `${tokenPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Right Section: Connection Status & Settings */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <div className={cn(
            'size-1.5 rounded-full',
            connectionStatus === 'connected' && 'bg-accent-green animate-pulse',
            connectionStatus === 'connecting' && 'bg-amber-500 animate-pulse',
            connectionStatus === 'disconnected' && 'bg-red-500'
          )} />
          <span className={cn(
            'text-2xs font-medium',
            statusColors[connectionStatus]
          )}>
            {statusLabels[connectionStatus]}
          </span>
        </div>

        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="flex size-6 items-center justify-center rounded-md hover:bg-gray-850 text-text-tertiary hover:text-text-primary transition-all"
          aria-label="Settings"
        >
          <Settings className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
