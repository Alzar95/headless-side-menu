import { useLocation, useNavigate } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import HeadlessMenu from '../headless/HeadlessMenu';

interface AppMenuProps {
    children: ReactNode;
    className?: string;
    mobileBreakpoint?: number;
}

interface MenuGroupProps {
    label: string;
    children: ReactNode;
    icon?: ReactNode;
    defaultActive?: string;
}

interface MenuItemProps {
    label: string;
    to: string;
    icon?: ReactNode;
}

const menuItemBase = "flex items-center w-full p-3 rounded-lg transition-colors duration-200 cursor-pointer";
const menuItemActive = "bg-blue-500 text-white shadow-md";
const menuItemInactive = "text-gray-700 hover:bg-gray-100";

const AppMenu: FC<AppMenuProps> & {
    Group: FC<MenuGroupProps>;
    Item: FC<MenuItemProps>;
    ToggleButton: FC;
} = ({ children, className = '', mobileBreakpoint = 768 }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const activeItem = location.pathname;

    const handleItemClick = (path: string) => {
        navigate(path);
    };

    return (
        <HeadlessMenu
            activeItemProps={activeItem}
            onItemClick={handleItemClick}
            mobileBreakpoint={mobileBreakpoint}>
            {({ isCollapsed, isMobile }) => (
                <div className={`
                    // Базовые стили
                    font-sans antialiased
                    
                    // Десктоп vs мобильный layout
                    ${isMobile
                    ? 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg'
                    : 'h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out'
                }
                    
                    // Состояние свернутости (только для десктопа)
                    ${!isMobile && (isCollapsed ? 'w-16' : 'w-64')}
                    
                    // Пользовательские классы
                    ${className}
                `}>
                    {/* Десктопное меню */}
                    {!isMobile && (
                        <div className="h-full flex flex-col">
                            <nav className="flex-1 py-4">
                                {children}
                            </nav>
                            <AppMenu.ToggleButton />
                        </div>
                    )}

                    {/* Мобильное меню */}
                    {isMobile && (
                        <div className="px-2 py-2">
                            <div className="flex justify-around items-center">
                                {children}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </HeadlessMenu>
    );
};

// Компонент группы меню
const MenuGroup: FC<MenuGroupProps> = ({ label, children, icon, defaultActive }) => {
    return (
        <HeadlessMenu.ItemWithSubmenu
            id={`group-${label}`}
            trigger={({ isActive }) => (
                <div className={`
                    ${menuItemBase}
                    ${isActive ? menuItemActive : menuItemInactive}`}>
                    {icon && (
                        <span className="flex-shrink-0 w-5 h-5 mr-5 flex items-center justify-center">
                            {icon}
                        </span>
                    )}
                    <span className="flex-1 truncate font-medium">{label}</span>
                </div>
            )}
            drawerTitle={label}
            defaultActiveChild={defaultActive}>
            <HeadlessMenu.Submenu>
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48">
                    {children}
                </div>
            </HeadlessMenu.Submenu>
        </HeadlessMenu.ItemWithSubmenu>
    );
};

// Компонент пункта меню
const MenuItem: FC<MenuItemProps> = ({ label, to, icon }) => {
    return (
        <HeadlessMenu.Item id={to}>
            {({ isActive }) => (
                <div className={`
                    ${menuItemBase}
                    ${isActive ? menuItemActive : menuItemInactive}`}>
                    {icon && (
                        <span className="flex-shrink-0 w-5 h-5 mr-5 flex items-center justify-center">
                            {icon}
                        </span>
                    )}
                    <span className="flex-1 truncate font-medium">{label}</span>
                </div>
            )}
        </HeadlessMenu.Item>
    );
};

// Компонент кнопки переключения
const ToggleButton: FC = () => {
    return (
        <HeadlessMenu.ToggleButton>
            {({ isCollapsed, setIsCollapsed }) => (
                <button
                    className={`
                        w-full py-3 border-t border-gray-200 bg-white 
                        text-gray-600 hover:text-gray-900 hover:bg-gray-50 
                        transition-colors duration-200 flex items-center justify-center
                    `}
                    onClick={() => setIsCollapsed?.(!isCollapsed)}
                >
                    {isCollapsed ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    )}
                </button>
            )}
        </HeadlessMenu.ToggleButton>
    );
};

// Присваиваем компоненты
AppMenu.Group = MenuGroup;
AppMenu.Item = MenuItem;
AppMenu.ToggleButton = ToggleButton;

export default AppMenu;