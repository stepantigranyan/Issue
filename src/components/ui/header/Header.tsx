import type {FC, JSX} from "react";

interface HeaderProps {
    styles?: string;
    children: JSX.Element[];
}

const Header: FC<HeaderProps> = ({children, styles}) => {
    return (
        <div className={`w-full px-10 flex items-center justify-between ${styles}`}>
            {children}
        </div>
    );
};

export default Header;