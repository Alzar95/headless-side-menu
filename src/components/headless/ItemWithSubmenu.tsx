import {useContext, useMemo, Fragment} from 'react';
import type {FC} from 'react';
import type {ItemWithSubmenuProps} from '../../utils/types/menu';
import {MenuContext} from './HeadlessMenu';

const ItemWithSubmenu: FC<ItemWithSubmenuProps> = ({id, children, trigger, defaultActiveChild, drawerTitle}) => {
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error('ItemWithSubmenu must be used within HeadlessMenu');
    }

    const {
        expandedItem,
        toggleExpanded,
        activeItem,
        isCollapsed,
        setActiveItem,
        activeSubmenuItems,
        setActiveSubmenuItem,
        isMobile,
        isSubmenuItem,
        openMobileDrawer,
    } = context;

    const isExpanded = expandedItem === id;
    const activeChildId = activeSubmenuItems.get(id);

    // Определяем, активен ли этот пункт меню
    const isActive = useMemo(() => {
        // В мобильном режиме или свернутом состоянии:
        // MenuGroup активен, если у него есть активный дочерний элемент И этот дочерний элемент является текущим активным
        if (isMobile || isCollapsed) {
            return activeChildId !== undefined && activeChildId === activeItem;
        }

        // В развернутом состоянии MenuGroup никогда не активен
        return false;
    }, [isCollapsed, activeChildId, activeItem, isMobile]);

    const handleTriggerClick = () => {
        if (isMobile) {
            handleMobileTriggerClick();
        } else {
            if (isCollapsed) {
                // В свернутом состоянии при клике активируем первый дочерний элемент
                if (!activeChildId && defaultActiveChild) {
                    setActiveSubmenuItem(id, defaultActiveChild);
                    setActiveItem(defaultActiveChild);
                } else if (activeChildId) {
                    setActiveItem(activeChildId);
                }
                toggleExpanded?.(id);
            } else {
                // В развернутом состоянии при клике активируем первый дочерний элемент, если нет активного
                if (!activeChildId && defaultActiveChild) {
                    setActiveSubmenuItem(id, defaultActiveChild);
                    setActiveItem(defaultActiveChild);
                } else if (!isSubmenuItem(activeItem)) {
                    setActiveItem(activeChildId);
                }
                toggleExpanded?.(id);
            }
        }
    };

    const handleMouseEnter = () => {
        if (isCollapsed && !isMobile && !isExpanded) {
            toggleExpanded?.(id);
        }
    };

    const handleMouseLeave = () => {
        if (isCollapsed && !isMobile && isExpanded) {
            toggleExpanded?.(id);
        }
    };

    // Обработчик клика для мобильных устройств
    const handleMobileTriggerClick = () => {
        // Контент для Drawer
        const drawerContent = (
            <div className="py-2">
                {children}
            </div>
        );

        // Получаем заголовок
        const valueDrawerTitle = drawerTitle ? drawerTitle : '';

        openMobileDrawer?.(drawerContent, valueDrawerTitle);
    };

    return (
        <Fragment>
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Триггер пункта меню */}
                <div
                    onClick={handleTriggerClick}
                    data-id={id}
                    data-expanded={isExpanded}
                    data-active={isActive}>
                    {
                        typeof trigger === 'function'
                        ? trigger({isExpanded, isActive})
                        : trigger
                    }
                </div>

                {/* Подменю */}
                {isExpanded && (
                    <div className={`
                        ${isCollapsed && !isMobile
                        ? 'absolute top-0 left-[95%] z-50'
                        : 'width-[100%]'
                    }`}>
                        {children}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default ItemWithSubmenu;
