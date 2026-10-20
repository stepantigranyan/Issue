import {type FC, memo} from "react";
import type {MenuAttributes} from "../../navbar/Navbar.tsx";
import Dropdown from "../Dropdown.tsx";

const DropdownItem: FC<MenuAttributes> = ({title, dropdown}) => {
    return (
        <li className={`group/${title} text-gray-800 relative flex items-center justify-center gap-x-3 px-2 py-3 hover:bg-gray-800 hover:text-white`}>
            <span className="text-sm text-center">{title}</span>
            {dropdown &&
                <>
                    <Dropdown data={dropdown} subMenu={true} />
                    <span><i className="fa-solid fa-caret-down"/></span>
                </>
            }
        </li>
    );
};

export default memo(DropdownItem);