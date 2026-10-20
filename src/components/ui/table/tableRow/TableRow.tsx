import {type FC, type JSX, memo} from "react";

export interface TableRowProps {
    children: JSX.Element[];
    style?: string;
}

const TableRow: FC<TableRowProps> = ({children, style}) => {
    return (
        <div className={`px-3 py-5 ${style}`}>
            {children}
        </div>
    );
};

export default memo(TableRow);