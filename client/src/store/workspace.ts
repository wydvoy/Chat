import { atom } from 'recoil';
import { atomWithLocalStorage } from './utils';

export type IconNavItem = 'chat' | 'agents' | 'prompts' | 'files' | 'settings' | 'profile';
export type ContextSection = 'files' | 'recent' | 'agent' | 'tools';

interface WorkspaceTab {
  id: string;
  title: string;
  conversationId?: string;
  isActive?: boolean;
}

interface WorkspaceState {
  enableWorkspaceLayout: boolean;
  activeNavItem: IconNavItem;
  isContextPanelCollapsed: boolean;
  expandedContextSections: Set<ContextSection>;
  tabs: WorkspaceTab[];
  activeTabId: string | null;
}

// Feature flag for workspace layout (persisted to localStorage)
const enableWorkspaceLayout = atomWithLocalStorage<boolean>('enableWorkspaceLayout', false);

// Active navigation item (chat, agents, prompts, etc.)
const activeNavItem = atomWithLocalStorage<IconNavItem>('activeNavItem', 'chat');

// Context panel collapsed state
const isContextPanelCollapsed = atomWithLocalStorage<boolean>('isContextPanelCollapsed', false);

// Expanded context panel sections
const expandedContextSections = atomWithLocalStorage<ContextSection[]>(
  'expandedContextSections',
  ['files', 'recent']
);

// Workspace tabs (conversation tabs)
const workspaceTabs = atom<WorkspaceTab[]>({
  key: 'workspaceTabs',
  default: [
    {
      id: 'default',
      title: 'New Conversation',
      isActive: true,
    },
  ],
});

// Active tab ID
const activeTabId = atom<string | null>({
  key: 'activeTabId',
  default: 'default',
});

// Selected model for status bar
const selectedModel = atom<string>({
  key: 'selectedModel',
  default: 'Claude Opus 4.6',
});

// Active agent name for status bar
const activeAgentName = atom<string | null>({
  key: 'activeAgentName',
  default: null,
});

// Token usage tracking
const tokenUsage = atom<{ used: number; total: number } | null>({
  key: 'tokenUsage',
  default: null,
});

// Connection status
const connectionStatus = atom<'connected' | 'connecting' | 'disconnected'>({
  key: 'connectionStatus',
  default: 'connected',
});

export default {
  enableWorkspaceLayout,
  activeNavItem,
  isContextPanelCollapsed,
  expandedContextSections,
  workspaceTabs,
  activeTabId,
  selectedModel,
  activeAgentName,
  tokenUsage,
  connectionStatus,
};
