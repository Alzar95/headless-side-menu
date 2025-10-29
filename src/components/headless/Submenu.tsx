import {Fragment} from 'react';
import type {FC} from 'react';
import type {SubmenuProps} from '../../utils/types/menu';

const Submenu: FC<SubmenuProps> = ({children, position = 'right'}) => {
    return (
        <Fragment>
            {
                position === 'right' ? <div className={`
                bg-white shadow-lg rounded-md min-w-[150px]
                border border-gray-200`}>
                        {children}
                    </div> :
                    <div>
                        {children}
                    </div>
            }
        </Fragment>
    );
};

export default Submenu;
