import {Fragment} from 'react';
import type {FC} from 'react';
import type {SubmenuProps} from '../../utils/types/menu';

const Submenu: FC<SubmenuProps> = ({children}) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default Submenu;
