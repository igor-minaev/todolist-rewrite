import React, {FC} from 'react';

type SuperButtonPropsType = {
    children: React.ReactNode
    callBack: () => void
}


export const SuperButton: FC<SuperButtonPropsType> = ({children, callBack}) => {
    const onClickHandler = () => {
        callBack()
    }
    return (
        <button onClick={onClickHandler}>{children}</button>
    );
};

