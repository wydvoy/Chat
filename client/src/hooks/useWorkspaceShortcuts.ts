import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import store from '~/store';
import type { IconNavItem } from '~/components/Workspace/IconNav';

interface WorkspaceShortcutsConfig {
  onNavItemChange?: (item: IconNavItem) => void;
  onTabSwitch?: (direction: 'next' | 'prev') => void;
  onPanelToggle?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

const navItemsByNumber: Record<string, IconNavItem> = {
  '1': 'chat',
  '2': 'agents',
  '3': 'prompts',
  '4': 'files',
  '5': 'settings',
};

/**
 * Custom hook for workspace keyboard shortcuts
 *
 * Shortcuts:
 * - Ctrl+1-5: Switch between icon nav items
 * - Ctrl+Tab: Switch to next tab
 * - Ctrl+Shift+Tab: Switch to previous tab
 * - Ctrl+B: Toggle context panel
 * - Esc: Close panels/dialogs
 */
export function useWorkspaceShortcuts(config: WorkspaceShortcutsConfig = {}) {
  const {
    onNavItemChange,
    onTabSwitch,
    onPanelToggle,
    onEscape,
    enabled = true,
  } = config;

  const setActiveNavItem = useSetRecoilState(store.activeNavItem);
  const setIsContextPanelCollapsed = useSetRecoilState(store.isContextPanelCollapsed);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isModifier = ctrlKey || metaKey;

      // Don't interfere with input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Esc to work in input fields
        if (key === 'Escape') {
          target.blur();
          onEscape?.();
        }
        return;
      }

      // Ctrl+1-5: Switch nav items
      if (isModifier && key >= '1' && key <= '5') {
        event.preventDefault();
        const navItem = navItemsByNumber[key];
        if (navItem) {
          setActiveNavItem(navItem);
          onNavItemChange?.(navItem);
        }
        return;
      }

      // Ctrl+Tab: Switch tabs
      if (isModifier && key === 'Tab') {
        event.preventDefault();
        const direction = shiftKey ? 'prev' : 'next';
        onTabSwitch?.(direction);
        return;
      }

      // Ctrl+B: Toggle context panel
      if (isModifier && key === 'b') {
        event.preventDefault();
        setIsContextPanelCollapsed((prev) => !prev);
        onPanelToggle?.();
        return;
      }

      // Esc: Close panels/dialogs
      if (key === 'Escape') {
        event.preventDefault();
        onEscape?.();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    enabled,
    onNavItemChange,
    onTabSwitch,
    onPanelToggle,
    onEscape,
    setActiveNavItem,
    setIsContextPanelCollapsed,
  ]);
}

export default useWorkspaceShortcuts;
