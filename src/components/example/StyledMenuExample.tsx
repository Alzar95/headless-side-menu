import {Fragment, useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import HeadlessMenu from '../headless/HeadlessMenu';

const StyledMenuExample = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('home');

    // Синхронизируем с URL при загрузке
    useEffect(() => {
        const pathItem = location.pathname.split('/')[1] || 'home';
        setActiveItem(pathItem);
    }, [location]);

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        navigate(`/${itemId}`);
    };

    return <Fragment>
        <HeadlessMenu
            activeItemProps={activeItem}
            onItemClick={handleItemClick}>
            {({isCollapsed, isMobile}) => (
                <div className={`
              ${isMobile
                    ? 'flex min-h-[194vh] flex-row h-16 items-center justify-around px-2'
                    : 'flex flex-col h-screen bg-purple-100 shadow-lg transition-all duration-300 ease-in-out'
                }
              ${isCollapsed && !isMobile ? 'w-16' : 'w-64 min-w-[200px] max-w-[80vw]'}`}>

                    {isMobile ? (
                        // Горизонтальное мобильное меню
                        <Fragment>
                            <HeadlessMenu.Item id="music">
                                {({isActive}) => (
                                    <div className={`p-3 rounded-full ${isActive ? 'bg-blue-500 text-white' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"/>
                                        </svg>
                                    </div>
                                )}
                            </HeadlessMenu.Item>

                            <HeadlessMenu.Item id="dashboard">
                            {({isActive}) => (
                                    <div className={`p-3 rounded-full ${isActive ? 'bg-blue-500 text-white' : ''}`}>
                                        <span className="text-lg">📊</span>
                                    </div>
                                )}
                            </HeadlessMenu.Item>

                            <HeadlessMenu.ItemWithSubmenu
                                id="products"
                                trigger={({isActive}) => (
                                    <div className={`p-3 rounded-full ${isActive ? 'bg-blue-500 text-white' : ''}`}>
                                        <span className="text-lg">📦</span>
                                        <span className="hidden">Продукты</span>
                                    </div>
                                )}>
                            <HeadlessMenu.Submenu position="bottom">
                                    <HeadlessMenu.Item id="products-product-1">
                                        {({isActive}) => (
                                            <div
                                                className={`px-6 py-4 text-lg border-b border-gray-100 ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                                                Продукт 1
                                            </div>
                                        )}
                                    </HeadlessMenu.Item>
                                    <HeadlessMenu.Item id="products-product-2">
                                        {({isActive}) => (
                                            <div
                                                className={`px-6 py-4 text-lg ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                                                Продукт 2
                                            </div>
                                        )}
                                    </HeadlessMenu.Item>
                                </HeadlessMenu.Submenu>
                            </HeadlessMenu.ItemWithSubmenu>
                        </Fragment>
                    ) : (
                        // Вертикальное десктоп меню
                        <Fragment>
                            <nav className="flex-1">
                                <>
                                    <HeadlessMenu.Item id="music">
                                        {({isActive}) => (
                                            <div className={`
                                            p-3 rounded cursor-pointer transition-colors
                                            flex items-center justify-center gap-3
                                            ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                                        `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"/>
                                                </svg>
                                                {!isCollapsed && (
                                                    <span className="flex-1 truncate">
                                                            Музыка
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </HeadlessMenu.Item>
                                    <HeadlessMenu.Item id="dashboard">
                                        {({isActive}) => (
                                            <div className={`
                                            p-3 rounded cursor-pointer transition-colors
                                            flex items-center justify-center gap-3
                                            ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                                        `}>
                                                <span>📊</span>
                                                {!isCollapsed && (
                                                    <span className="flex-1 truncate">
                                                            Аналитика и отчетность
                                                        </span>
                                                )}
                                            </div>
                                        )}
                                    </HeadlessMenu.Item>
                                    <HeadlessMenu.ItemWithSubmenu
                                        id="products"
                                        defaultActiveChild="products-product-1"
                                        trigger={({isExpanded, isActive}) => (
                                            <div className={`
                                        p-3 rounded cursor-pointer transition-colors
                                        flex items-center gap-3
                                        ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                                        ${isCollapsed ? 'justify-center' : ''}`}>
                                                <span>📦</span>
                                                {!isCollapsed && (
                                                    <Fragment>
                                                        <span className="flex-1 truncate">Продукты</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M9 5l7 7-7 7"/>
                                                        </svg>
                                                    </Fragment>
                                                )}
                                            </div>
                                        )}>
                                        <HeadlessMenu.Submenu
                                            position={isCollapsed ? 'right' : 'bottom'}>
                                            <HeadlessMenu.Item id="products-product-1">
                                                {({isActive}) => (
                                                    <div className={`
                                                            px-4 py-2 text-sm transition-colors
                                                            ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                                                        `}>
                                                        Продукт 1
                                                    </div>
                                                )}
                                            </HeadlessMenu.Item>
                                            <HeadlessMenu.Item id="products-product-2">
                                                {({isActive}) => (
                                                    <div className={`
                                                        px-4 py-2 text-sm transition-colors
                                                        ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                                                    `}>
                                                        Продукт 2
                                                    </div>
                                                )}
                                            </HeadlessMenu.Item>
                                        </HeadlessMenu.Submenu>
                                    </HeadlessMenu.ItemWithSubmenu>
                                </>
                            </nav>
                            <HeadlessMenu.ToggleButton>
                                {({isCollapsed, setIsCollapsed}) => (
                                    <button className={`flex justify-center`}
                                            onClick={setIsCollapsed}>
                                        {isCollapsed ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                                            </svg>
                                        }
                                    </button>
                                )}
                            </HeadlessMenu.ToggleButton>
                        </Fragment>
                    )}
                </div>
            )}
        </HeadlessMenu>
    </Fragment>
};

export default StyledMenuExample;