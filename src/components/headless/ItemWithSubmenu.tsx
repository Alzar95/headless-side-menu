import {useContext, useMemo, Fragment} from 'react';
import type {FC} from 'react';
import type {ItemWithSubmenuProps} from '../../utils/types/menu';
import {MenuContext} from './HeadlessMenu';

const ItemWithSubmenu: FC<ItemWithSubmenuProps> = ({id, children, trigger, defaultActiveChild}) => {
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error('ItemWithSubmenu must be used within HeadlessMenu');
    }

    const {
        expandedItems,
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

    const isExpanded = expandedItems?.has(id) || false;
    const activeChildId = activeSubmenuItems.get(id);

    // Определяем, активен ли этот пункт меню
    const isActive = useMemo(() => {
        if (!isCollapsed) {
            // В развернутом состоянии пункт с подменю никогда не активен
            return false;
        }

        // В свернутом состоянии пункт с подменю активен только если:
        // 1. Есть активный дочерний элемент
        // 2. Активный элемент НЕ является обычным пунктом меню
        if (activeChildId) {
            // Проверяем, не активен ли в это же время обычный пункт меню
            const hasActiveRegularItem = activeItem && !isSubmenuItem(activeItem);
            return !hasActiveRegularItem;
        }

        return false;
    }, [isCollapsed, activeChildId, activeItem, isSubmenuItem]);

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
                }
                toggleExpanded?.(id);
            }
        }
    };

    const handleMouseEnter = () => {
        if (isCollapsed && !isMobile) {
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
        const drawerTitle = trigger({isExpanded, isActive}).props.children[1].props.children;

        openMobileDrawer?.(drawerContent, drawerTitle);
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
