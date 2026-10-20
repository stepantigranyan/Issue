import {type FC, type JSX, memo, useRef} from 'react';

import useOutsideClick from "../../../hooks/useOutsideClick.ts";
import Teleport from "../../shared/Teleport.tsx";

export interface PopupProps {
    children: JSX.Element[];
    onCancel: () => void;
    style?: string;
}

const PopUp: FC<PopupProps> = ({ children, onCancel, style}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideClick(wrapperRef, onCancel);

    return (
        <Teleport target={'root-portal'}>
            <div className={'h-screen w-full backdrop-blur-sm flex items-center justify-center absolute top-0 left-0 z-100'}>
                <div className={`${style} p-10 bg-white z-100`} ref={wrapperRef}>
                    {children}
                </div>
            </div>
        </Teleport>
    );
};

export default memo(PopUp);