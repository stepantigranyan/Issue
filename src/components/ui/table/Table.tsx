import {type FC, type JSX, memo} from "react";

export interface TableProps {
    children: JSX.Element | JSX.Element[];
    style?: string;
}

const Table: FC<TableProps> = ({children, style}) => {
    return (
        <div className={`w-full px-5 flex flex-col ${style}`}>
            {children}
        </div>
    );
};

export default memo(Table);