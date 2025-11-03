import {createContext, useState, useEffect} from 'react';
import type {FC, ReactNode} from 'react';
import type {MenuContextType, HeadlessMenuProps} from '../../utils/types/menu';
import MenuItem from './MenuItem';
import ToggleButton from './ToggleButton';
import ItemWithSubmenu from './ItemWithSubmenu';
import Submenu from './Submenu';
import MobileDrawerOverlay from './MobileDrawerOverlay';

interface HeadlessMenuComponent extends FC<HeadlessMenuProps> {
    Item: typeof MenuItem;
    ToggleButton: typeof ToggleButton;
    ItemWithSubmenu: typeof ItemWithSubmenu;
    Submenu: typeof Submenu;
}

const MenuContext = createContext<MenuContextType | null>(null);

const HeadlessMenu: HeadlessMenuComponent = ({
                                                 children,
                                                 activeItemProps = null,
                                                 onItemClick,
                                                 defaultCollapsed = false,
                                                 mobileBreakpoint = 768
                                             }) => {
    const [activeItem, setActiveItem] = useState<string | null>(activeItemProps);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [activeSubmenuItems, setActiveSubmenuItemsState] = useState<Map<string, string>>(new Map());

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
    const [mobileDrawerContent, setMobileDrawerContent] = useState<ReactNode>(null);
    const [mobileDrawerTitle, setMobileDrawerTitle] = useState<string>('');

    // Определяем мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    // Эффект для сброса состояния подменю при изменении мобильного режима
    useEffect(() => {
        closeAllSubmenus();

        if (mobileDrawerOpen) {
            closeMobileDrawer();
        }
    }, [isMobile]);

    const handleSetActiveItem = (id: string) => {
        setActiveItem(id);
        // Вызываем внешний обработчик, если он передан
        if (onItemClick) {
            onItemClick(id);
        }
        // Закрываем все подменю при выборе пункта
        if (isMobile) {
            closeAllSubmenus();
        }
    };

    const handleSetIsCollapsed = (isCollapsedProperty: boolean) => {
        setIsCollapsed(isCollapsedProperty);
    };

    const toggleExpanded = (id: string) => {
        setExpandedItem(prev => {
            // Если кликаем на уже открытое подменю - закрываем его
            if (prev === id) {
                return null;
            }
            // Иначе открываем новое подменю (закрывая предыдущее)
            return id;
        });
    };

    const closeAllSubmenus = () => {
        setExpandedItem(null);
    };

    const setActiveSubmenuItem = (parentId: string, childId: string) => {
        setActiveSubmenuItemsState(prev => {
            const newMap = new Map(prev);
            newMap.set(parentId, childId);
            return newMap;
        });
    };

    // Функция для проверки, является ли пункт подменю
    const isSubmenuItem = (itemId: string): boolean => {
        // Проверяем, есть ли этот ID в качестве ключа в activeSubmenuItems
        // или содержит ли он дефис (предполагая, что ID подменю имеют формат "parent-child")
        return activeSubmenuItems.has(itemId) || itemId.includes('-');
    };

    // Функция для получения родительского ID из ID подменю
    const getParentIdFromChild = (childId: string): string | null => {
        if (childId.includes('-')) {
            return childId.split('-')[0];
        }
        return null;
    };

    // Функции для управления Drawer
    const openMobileDrawer = (content: ReactNode, title: string) => {
        setMobileDrawerContent(content);
        setMobileDrawerTitle(title);
        setMobileDrawerOpen(true);
    };

    const closeMobileDrawer = () => {
        setMobileDrawerOpen(false);
        setMobileDrawerContent(null);
        setMobileDrawerTitle('');
    };

    return (
        <MenuContext.Provider value={{
            activeItem,
            setActiveItem: handleSetActiveItem,
            isCollapsed,
            setIsCollapsed: handleSetIsCollapsed,
            expandedItem,
            toggleExpanded,
            closeAllSubmenus,
            isMobile,
            activeSubmenuItems,
            setActiveSubmenuItem,
            isSubmenuItem,
            getParentIdFromChild,
            mobileDrawerOpen,
            openMobileDrawer,
            closeMobileDrawer,
        }}>
            {typeof children === 'function'
                ? children({isCollapsed, isMobile, mobileDrawerOpen})
                : children
            }

            {/* Рендерим Mobile Drawer */}
            {isMobile && mobileDrawerOpen && (
                <MobileDrawerOverlay
                    onClose={closeMobileDrawer}
                    title={mobileDrawerTitle}
                >
                    {mobileDrawerContent}
                </MobileDrawerOverlay>
            )}
        </MenuContext.Provider>
    );
};

HeadlessMenu.Item = MenuItem;
HeadlessMenu.ToggleButton = ToggleButton;
HeadlessMenu.ItemWithSubmenu = ItemWithSubmenu;
HeadlessMenu.Submenu = Submenu;

export {MenuContext};
export default HeadlessMenu;