import {type FC, memo} from "react";
import NavBarItem from "./navbarItem/NavbarItem.tsx";

export interface MenuAttributes {
    onClick?: () => void;
    id: string;
    title: string;
    dropdown: MenuAttributes[] | null;
}

export interface MenuProps {
    data: MenuAttributes[];
    subMenu?: boolean;
    onClick?: () => void;
}

const Navbar: FC<MenuProps> = ({data}) => {
    return (
        <>
            <ul className="flex items-center text-gray-800 font-bold">
                {data.map(({id, title, dropdown}) => (
                    <NavBarItem key={id} title={title} dropdown={dropdown} />
                ))}
            </ul>
        </>
    );
};

export default memo(Navbar);