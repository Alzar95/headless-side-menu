import {Fragment} from 'react';
import AppMenu from '../AppMenu/AppMenu';

const BusinessMenu = () => {
    const MusicIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
    );

    const DashboardIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );

    const ProductsIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    );

    return <Fragment>
        <AppMenu className="shadow-xl">
            <AppMenu.Group label="Музыка" defaultActive={'/music/tracks'} icon={<MusicIcon />}>
                <AppMenu.Item label="Треки" to="/music/tracks" />
                <AppMenu.Item label="Альбомы" to="/music/albums" />
                <AppMenu.Item label="Исполнители" to="/music/artists" />
            </AppMenu.Group>

            <AppMenu.Item label="Дашборд" to="/dashboard" icon={<DashboardIcon />} />

            <AppMenu.Group label="Продукты" defaultActive={'/products/1'} icon={<ProductsIcon />}>
                <AppMenu.Item label="Продукт 1" to="/products/1" />
                <AppMenu.Item label="Продукт 2" to="/products/2" />
                <AppMenu.Item label="Продукт 3" to="/products/3" />
            </AppMenu.Group>
        </AppMenu>
    </Fragment>
};

export default BusinessMenu;