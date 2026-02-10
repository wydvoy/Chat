import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Clock, Bot, Wrench, X } from 'lucide-react';
import { cn } from '~/utils';

interface ContextPanelProps {
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
}

interface ContextSection {
  id: string;
  title: string;
  icon: React.ElementType;
  defaultExpanded?: boolean;
}

const sections: ContextSection[] = [
  { id: 'files', title: 'Active Files', icon: ChevronRight, defaultExpanded: true },
  { id: 'recent', title: 'Recent Conversations', icon: Clock, defaultExpanded: true },
  { id: 'agent', title: 'Agent Context', icon: Bot, defaultExpanded: false },
  { id: 'tools', title: 'MCP Tools', icon: Wrench, defaultExpanded: false },
];

export const ContextPanel: React.FC<ContextPanelProps> = ({
  isCollapsed = false,
  onCollapse,
  className
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.filter(s => s.defaultExpanded).map(s => s.id))
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => onCollapse?.(false)}
        className="flex h-full w-12 items-start justify-center border-r border-border-light-alpha bg-gray-925 pt-4 hover:bg-gray-900 transition-colors"
        aria-label="Expand context panel"
      >
        <ChevronRight className="size-4 text-text-tertiary" />
      </button>
    );
  }

  return (
    <div className={cn(
      'flex h-full w-70 flex-col border-r border-border-light-alpha bg-gray-925',
      className
    )}>
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border-light-alpha px-4">
        <h2 className="text-sm font-semibold text-text-primary">Context</h2>
        <button
          onClick={() => onCollapse?.(true)}
          className="flex size-6 items-center justify-center rounded-md hover:bg-gray-850 text-text-tertiary hover:text-text-primary transition-all"
          aria-label="Collapse context panel"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="border-b border-border-ultra-light">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-875 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="size-4 text-text-tertiary" />
                ) : (
                  <ChevronRight className="size-4 text-text-tertiary" />
                )}
                <SectionIcon className="size-4 text-accent-purple" strokeWidth={1.5} />
                <span className="text-xs font-medium text-text-secondary">
                  {section.title}
                </span>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-4 py-2">
                  {section.id === 'files' && (
                    <div className="space-y-1">
                      <div className="text-2xs text-text-quaternary py-2">
                        No active files
                      </div>
                    </div>
                  )}

                  {section.id === 'recent' && (
                    <div className="space-y-1">
                      {/* Placeholder for recent conversations */}
                      <div className="rounded-md bg-gray-875 px-3 py-2 hover:bg-gray-850 cursor-pointer transition-colors">
                        <p className="text-xs text-text-primary truncate">
                          Previous conversation...
                        </p>
                        <p className="text-2xs text-text-quaternary mt-1">
                          2 hours ago
                        </p>
                      </div>
                      <div className="rounded-md bg-gray-875 px-3 py-2 hover:bg-gray-850 cursor-pointer transition-colors">
                        <p className="text-xs text-text-primary truncate">
                          Another conversation...
                        </p>
                        <p className="text-2xs text-text-quaternary mt-1">
                          Yesterday
                        </p>
                      </div>
                    </div>
                  )}

                  {section.id === 'agent' && (
                    <div className="space-y-2">
                      <div className="text-2xs text-text-quaternary py-2">
                        No agent active
                      </div>
                    </div>
                  )}

                  {section.id === 'tools' && (
                    <div className="space-y-2">
                      <div className="text-2xs text-text-quaternary py-2">
                        No MCP tools configured
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextPanel;
