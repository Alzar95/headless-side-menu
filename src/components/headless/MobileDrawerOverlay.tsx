import {Fragment} from 'react';
import type { FC, ReactNode } from 'react';

interface MobileDrawerOverlayProps {
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const MobileDrawerOverlay: FC<MobileDrawerOverlayProps> = ({
                                                               onClose,
                                                               title,
                                                               children
                                                           }) => {
    return (
        <Fragment>
            {/* Затемненный оверлей */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer панель */}
            <div className={`
                      fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 
                      max-h-[80vh] overflow-hidden flex flex-col
                      transform transition-transform duration-300 ease-out
                    `}>
                {/* Заголовок и кнопка закрытия */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Контент Drawer */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </Fragment>
    );
};

export default MobileDrawerOverlay;