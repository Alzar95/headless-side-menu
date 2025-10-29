import {useContext} from 'react';
import type {FC, ReactNode} from 'react';
import {MenuContext} from './HeadlessMenu';

const ToggleButton: FC<{
    children: (props: {
        isCollapsed: boolean | undefined;
        setIsCollapsed: ((isCollapsed: boolean) => void) | undefined
    }) => ReactNode
}> = ({children}) => {
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error('ToggleButton must be used within HeadlessMenu');
    }

    const {isCollapsed, setIsCollapsed} = context;

    const handleClick = () => {
        if (setIsCollapsed) {
            setIsCollapsed(!isCollapsed);
        }
    };

    return children({
        isCollapsed: context.isCollapsed,
        setIsCollapsed: handleClick
    });
};

export default ToggleButton;