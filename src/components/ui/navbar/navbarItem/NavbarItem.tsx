import type {FC} from "react";
import type {MenuAttributes} from "../Navbar.tsx";
import Dropdown from "../../dropdown/Dropdown.tsx";

export interface NavbarItemProps {
    title: string;
    dropdown: MenuAttributes[] | null;
}

const NavBarItem: FC<NavbarItemProps> = ({title, dropdown}) => {
    return (
        <li className={`group/main relative cursor-pointer flex items-center gap-x-2 p-5 hover:bg-gray-800 hover:text-white`}>
            <span>{title}</span>
            {dropdown &&
                <>
                    <Dropdown data={dropdown} />
                    <span><i className="fa-solid fa-caret-down" /></span>
                </>}
        </li>
    );
};

export default NavBarItem;