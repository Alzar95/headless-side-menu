import type {FC, ReactNode} from 'react';

export interface MenuContextType {
    activeItem: string | null;
    setActiveItem: (id: string) => void;
    expandedItems?: Set<string>;
    toggleExpanded?: (id: string) => void;
    closeAllSubmenus: () => void;
    isMobile?: boolean;
    isCollapsed?: boolean; // состояние свернутости
    setIsCollapsed?: (isCollapsed: boolean) => void;
    activeSubmenuItems: Map<string, string>; // parentId -> activeChildId
    setActiveSubmenuItem: (parentId: string, childId: string) => void;
    isSubmenuItem: (itemId: string) => boolean;
    getParentIdFromChild: (childId: string) => string | null;
    mobileDrawerOpen?: boolean;
    openMobileDrawer?: (content: ReactNode, title: string) => void;
    closeMobileDrawer?: () => void;
}

export interface HeadlessMenuProps {
    children?: ReactNode | ((props: {
        isCollapsed: boolean;
        isMobile: boolean;
        mobileDrawerOpen?: boolean;
    }) => ReactNode);
    activeItemProps?: string;
    defaultActive?: string;
    onActiveChange?: (id: string) => void;
    onItemClick?: (itemId: string) => void;
    defaultCollapsed?: boolean;
    isCollapsed?: boolean;
    setIsCollapsed?: (isCollapsed: boolean) => void;
    expandedItems?: string[]; // Контролируемое состояние подменю
    onExpandedChange?: (expandedItems: string[]) => void;
    mobileBreakpoint?: number; // Брейкпоинт для мобильного вида
}

export interface MenuItemProps {
    id: string;
    children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
    hasSubmenu?: boolean;
}

export interface ItemWithSubmenuProps {
    id: string;
    children: ReactNode;
    trigger: ReactNode | ((props: { isExpanded: boolean; isActive: boolean }) => ReactNode);
    defaultActiveChild?: string; // ID дочернего элемента по умолчанию
}

export interface SubmenuProps {
    children: ReactNode;
    position?: 'right' | 'bottom'; // Позиция подменю
}