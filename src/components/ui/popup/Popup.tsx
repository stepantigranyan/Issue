import {type FC, type JSX, useRef} from 'react';

import useOutsideClick from "../../../hooks/useOutsideClick.ts";
import Teleport from "../../shared/Teleport.tsx";

export interface PopupProps {
    children: JSX.Element[];
    onCancel: () => void;
}

const PopUp: FC<PopupProps> = ({ children, onCancel}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideClick(wrapperRef, onCancel);

    return (
        <Teleport target={'root-portal'}>
            <div className={'h-screen w-full backdrop-blur-sm flex items-center justify-center absolute top-0 left-0 z-100'}>
                <div className={'border border-solid border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-y-10  p-10 bg-white z-100'} ref={wrapperRef}>
                    {children}
                </div>
            </div>
        </Teleport>
    );
};

export default PopUp;