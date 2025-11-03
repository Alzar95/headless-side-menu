import {useContext, useMemo, Fragment} from 'react';
import type {FC} from 'react';
import type {MenuItemProps} from '../../utils/types/menu';
import {MenuContext} from './HeadlessMenu';

const MenuItem: FC<MenuItemProps> = ({id, children}) => {
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error('MenuItem must be used within HeadlessMenu');
    }

    const {
        activeItem,
        setActiveItem,
        isMobile,
        setActiveSubmenuItem,
        isCollapsed,
        closeAllSubmenus,
        isSubmenuItem,
        getParentIdFromChild
    } = context;

    // Определяем родительский элемент для этого пункта (если он в подменю)
    const parentId = getParentIdFromChild ? getParentIdFromChild(id) : null;

    // Определяем, активен ли этот пункт
    const isActive = useMemo(() => {
        if (!activeItem) return false;

        // Для обычных пунктов (не в подменю) - стандартная проверка
        if (!parentId) {
            return activeItem === id;
        }

        // Для пунктов в подменю:
        if (isCollapsed || isMobile) {
            // В свернутом/мобильном состоянии пункт подменю активен только если нет активного обычного пункта
            const hasActiveRegularItem = activeItem && !isSubmenuItem(activeItem);
            return activeItem === id && !hasActiveRegularItem;
        }

        // В развернутом состоянии - стандартная проверка
        return activeItem === id;
    }, [activeItem, id, isCollapsed, parentId, isSubmenuItem, isMobile]);

    const handleClick = () => {
        setActiveItem(id);

        // Если это пункт подменю, сохраняем его как активный для родителя
        if (parentId) {
            setActiveSubmenuItem(parentId, id);
        }

        // Закрываем все подменю при клике на пункт (опционально)
        if (isCollapsed) {
            closeAllSubmenus();
        }

        // Закрываем мобильный Drawer при выборе пункта
        if (isMobile && context.closeMobileDrawer) {
            context.closeMobileDrawer();
        }
    };

    return <Fragment>
        <div
            data-id={id}
            data-active={isActive}
            onClick={handleClick}>
            {typeof children === 'function'
                ? children({isActive})
                : children
            }
        </div>
    </Fragment>
};

export default MenuItem;